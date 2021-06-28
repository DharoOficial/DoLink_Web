import http from '../utils/http-axious';

const listar = dados =>{

    return http.get(`company`, JSON.stringify(dados), {

    });

}

const listarvagas = dados =>{

    return http.get(`company/vagancy/${dados}`, {

    });

}

const listarvaga = dados => {
    
    return http.get(`vagancy/search/id/${dados}`, {

    });

}

const listarmatch = dados => {

    return http.get(`match/search/${dados}`, {

    });
}

const excluirmatch = dados => {
    
    console.log(dados)

    return http.delete(`match/remove/${dados}`, {

    });
}

const alterar = dados => {
    return http.put(`company/${dados.id}`, JSON.stringify(dados), {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-dolink')}`
        }
    });
}

const excluir = dados => {
    return http.delete(`company/${dados.id}`, JSON.stringify(dados), {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-dolink')}`
        }
    });
}
const alterarStatus = dados => {
    return http.put(`vagancy/update/state/`, JSON.stringify(dados), {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-dolink')}`
        }
    });
}

export default {

    listar,
    listarvagas,
    listarvaga,
    listarmatch,
    excluirmatch,
    alterarStatus

}