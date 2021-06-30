import React, { useState, useEffect } from 'react';
import contaServico from '../../servicos/contaServico';
import {  useFormik  } from 'formik';
import './index.css';
import {  Form, Button  } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import {  useToasts  } from 'react-toast-notifications';
import {useHistory} from 'react-router-dom';
import LinkedIn from '../../Pages/LinkedinReact';
import { HistoryRounded } from '@material-ui/icons';
import { url, publish } from '../../utils/constants';
import jwt_decode from 'jwt-decode';
import Acessiblidade from '../../utils/acessibility'

const Login = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        Acessiblidade()
    }, []);

    const logar = (event) => {
        event.preventDefault();

        fetch(`${publish}/account/signin` ,{
            method : 'POST',
            body: JSON.stringify({
                Email: email,
                Senha: senha,
            }),
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(resultado => resultado.json())
        .then(resultado => {
            console.log(resultado.data)
            if(resultado.data.token !== "") {
                addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
                localStorage.setItem('token-dolink', resultado.data.token);
                const token = localStorage.getItem('token-dolink');

                if(jwt_decode(token).Roles === "Empresa") {
                    history.push('/vagancy/create')
                    
                } else if (jwt_decode(token).Roles === "Profissional") {
                    
                    history.push('/professional/prematch')
                }
                
            }else{
                addToast(resultado.mensagem, { appearance: 'error', autoDismiss : true })                
            }
        })
        .catch(erro => {
            console.error('erro na API ' + erro);
        })
    }


    // const formik = useFormik({

    //     initialValues :{
    //         email : '',
    //         senha : ''

    //     },
    //     onSubmit : values => { 
    //         contaServico
    //             .logar(values)
    //             .then(resultado => resultado.json())
    //             .then(resultado =>{
    //                 if(resultado.sucesso){
    //                     //apresenta a notificação
    //                     addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
    //                     //salva token no localstorage
    //                     localStorage.setItem('token-dolink', resultado.data.token);
    //                     console.log(resultado);
    //                     //redireciona página admin
    //                     const token = localStorage.getItem('token-dolink');
    //                     if( jwt_decode(token).Role === "Empresa") {

    //                         history.push('/cadastrodevagas');

    //                     } else if (jwt_decode(token).Role === "Profissional") {

    //                         history.push('/perfilProfissional')

    //                     }

    //                 } else {

    //                     addToast(resultado.mensagem, { appearance: 'error', autoDismiss : true })

    //                 }
    //             })
    //             .catch(erro => {
    //                 console.error('erro na API ' + erro);
    //             })
    //     }
    // });

    // const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');

    // const logar = (event) => {
    //     event.preventDefault();

    //     fetch(`${url}account/signin`, {
    //         method: 'POST',
    //         body: JSON.stringify({
                
    //             email : email,
    //             senha : senha

    //         }),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    // }

    return (

        <div>
            
            <Form >

                <div className="bodyLogin">

                    <div className="sectionImageLogin">

                        <img className="loginImage" src="https://media.discordapp.net/attachments/819577034530881567/842753282417885210/unknown.png?width=539&height=676" alt="" />

                    </div>

                    <div className="sectionContentLogin">

                        <div className="middleSectionLogin">
                            
                            <div className="firstLinhaLogin">
                                <img className="linhasSignin" src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" />
                                    <h1>Sign In</h1>
                                <img className="linhasSignin" src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" />
                            </div>

                            <div className="secondLinhaLogin">

                                <div className="infotextprofissional">

                                    <input type="email" className="inputProfissionalSign" placeholder="Informe seu Email" value={email} 
                                    onChange={(event) => setEmail(event.target.value)}/>

                                </div>

                                <div className="infotextprofissional">

                                    <input type="password" autocomplete="off" className="inputProfissionalSign" placeholder="Informe sua Senha" value={senha} 
                                    onChange={(event) => setSenha(event.target.value)}/>

                                </div>

                                <div className="botoesSigninLogin">

                                    <a className="esqueciMinhaSenhaLink" href="/esqueciminhasenha">Esqueceu Sua Senha?</a>

                                    <button type="submit" onClick={logar} className="botaoLoginAccount">Sign In</button>

                                    <p className="cadastrarContaLink" >Não possue uma conta? <a href="/choosesignup">Cadastre-se!</a></p>

                                    {/* <a className="linkedinButtonSigninA" href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=78uhsx2xachf35&redirect_uri=http://localhost:3000/
">
                                        <img className="linkedinButtonSignin" src="https://media.discordapp.net/attachments/819577034530881567/849756557507428352/unknown.png?width=824&height=153" alt="" />
                                    </a> */}

                                    {/* <LinkedIn /> */}


                                </div>


                            </div>

                            

                        </div>

                    </div>                

                </div>
            
            </Form>

        </div>

    )

}

export default Login;