import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';
import {  useHistory  } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import { urlLucas } from '../../utils/constants';
import Banner from '../../components/banner'
import http from '../../utils/http-axious';

import "./style.css";
import Acessiblidade from '../../utils/acessibility'

const EsqueciMinhaSenha = () => {

    useEffect(() => {
        Acessiblidade()
      }, []);


    const history = useHistory();
    const { addToast } = useToasts();
    const [email, setEmail] = useState('')
    const [novaSenha, setNovaSenha] = useState('')

    const Redirect = (event) => {
        event.preventDefault();

        history.push("/")
    }

    const ResetarSenha = (event) => {
        event.preventDefault()

        fetch(`${urlLucas}account/reset/password`, {
            method : 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body : JSON.stringify({
                'email' : email
            })
        })
        .then(resultado => resultado.json())
        .then(resultado => {
            let a = resultado.mensagem;

            if(!resultado.sucesso){
                resultado.data.map((erro, index) => {
                    var mensagem = "";
                    
                    resultado.mensagem === "palavras inadequadas" ? 
                    mensagem = `A palavra '${erro.palavra.toUpperCase()}' não pode ser usada`
                    :
                    mensagem = erro.message
                    
                    return addToast(mensagem, { appearance: 'error', autoDismiss: true })
                    
                })
            }
            addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
            history.push('/')
        })
        .catch((err) => console.error(err));
    }

    return (
            <div class="container_principal">
                <Banner titulo="Recupere sua senha"
                        texto="Informe os dados pertinentes a sua conta, para recuperar seu acesso na nossa plataforma!"
                        img="https://3hthz41e5xgb3uj7bx32mhb4-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/salarios-profissionais-de-ti-e-ciberseguranca-2.png" />
                        
                <div className="container_esqueci_senha_form">
                    <div className="titulo_esqueci_senha">
                        <hr/>
                        <h1>Encontre sua conta</h1>
                        <hr/>
                    </div>
                    <p>Insira seu email para procurar os dados da sua conta</p>

                    <Form className="formulario_esqueci_senha">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Informe seu email ..."
                                    value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                Informe o email pertinente a sua conta
                            </Form.Text>
                        </Form.Group>
                        <div className="buttons_esqueci_senha">
                            <Button type="button" className="cancel" onClick={e => Redirect(e)}>
                                Cancelar
                            </Button>
                            {
                            email === '' ?
                                <Button variant="success" type="submit" className="confirm" disabled>Pesquisar</Button>
                                :
                                <Button variant="success" type="submit" className="confirm"
                                    onClick={e => ResetarSenha(e)}>Pesquisar</Button>
                        }
                            
                        </div>
                    </Form>
                </div>
            </div>
    );
}

export default EsqueciMinhaSenha