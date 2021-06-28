var request = require('request');

// curl -ik -X POST https://www.linkedin.com/oauth/v2/accessToken \
// -d grant_type=authorization_code \
// -d code=AQSG0wqQHDxit-ZQ-inBUtqxhfCOc-b7YgAYeSK5hvlJTA5AeJ6OfQqJmY9CDozRr58nctMQyNiRs1qdcCDx3fdVOALVbsyFL0HKoAWoKbbfp_m9TJHQdzDQbT-QhG7veQIDu-CxDV1SwIMhZR2j_eQjAb56r1eEz00UKJqRezPSTYy3i8Q40n735l8y8gketAuE-jmwq_hbpzv-Pd0 \
// -d redirect_uri=https%3A%2F%2Fwww.corujasdev.com.br \
// -d client_id=78uhsx2xachf35 \
// -d client_secret=d14o1bFcWuBJfs46 \

function getAccessToken(authCode, done) {
    request.post({url:"https://www.linkedin.com/oauth/v2/accessToken",form:{

        grant_type:'authorization_code',
        code:authCode,
        redirect_uri:'https%3A%2F%2Fwww.corujasdev.com.br',
        client_id:'78uhsx2xachf35', 
        client_secret:'d14o1bFcWuBJfs46'


    }}, function(err,res,responseBody){
        if (err) {
            console.log(err);
            done(err,null);
        }
        else{
            done(null,JSON.parse(responseBody));
        }
    });
}

function callMeApi(accessToken, done) {
    request.get({url:"https://api.linkedin.com/v2/me",headers:{"Authorization": "Bearer "+accessToken }}, function(err,res,responseBody){
        if (err) {
            console.log(err);
            done(err,null);
        }
        else{
            done(null,JSON.parse(responseBody));
        }
    });
}

function callEmailApi(accessToken, done) {
    request.get({url:"https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",headers:{"Authorization": "Bearer "+accessToken }}, function(err,res,responseBody){
        if (err) {
            console.log(err);
            done(err,null);
        }
        else{
            // console.log(responseBody)
            done(null,JSON.parse(responseBody));
        }
    });
}


function main(authCode, done){
    getAccessToken(authCode, function(err,res){
      if (err) {done (err)}
      else{  
            var access_token = res.access_token;
            callMeApi(access_token, function(err,res){
                if (err) {done (err)}
                else{ 
                    var firstName = res.localizedFirstName
                    var lastName = res.localizedLastName
                    callEmailApi(access_token, function(err,res){
                        if (err) {done (err)}
                        else{ 
                            var email = res.elements[0] ["handle~"].emailAddress;
                            done(null, 'success');
                        }
                    });
                }
            });
        }
    });
}

exports.handler = (event, context, callback) => {
	const done = (err, res) => callback(null, {
		statusCode: err ? '400' : '302',
		body: err ? err.message : JSON.stringify(res),
		headers: {
			'Location': 'http://localhost:3000/',
			'Content-Type': 'text/html',
			'Access-Control-Allow-Methods': 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
			'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
			'Access-Control-Allow-Origin': '*'
		},
	});
	if (event){
		switch (event.httpMethod) {
			case 'GET':
				if (event && event.queryStringParameters && event.queryStringParameters.code && event.queryStringParameters.state){ 
					var state = decodeURIComponent(event.queryStringParameters.state);
					var code = decodeURIComponent(event.queryStringParameters.code);
					main(code, done);
				} else {
					console.log("ERROR:  Informações especificadas incorretamente. Onde está o code & state?");
					done(new Error('<h1>Algo deu errado. Tente a opção de se cadastrar.</h1>'));  
				}
        	break;
		}
	}
}

