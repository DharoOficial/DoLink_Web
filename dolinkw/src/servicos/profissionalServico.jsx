import http from '../utils/http-axious';


const listar = dados =>{

    return http.get(`professional`, JSON.stringify(dados), {

    });

}

const listarId = dados =>{

    return http.get(`professional/search/id${dados}`, {

    });

}

export default {

    listar

}