import React, { useState, useEffect } from 'react';
import contaServico from '../../servicos/contaServico';
import { useFormik } from 'formik';
import './index.css';
import { Form, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import LinkedIn from '../../Pages/LinkedinReact';
import { HistoryRounded } from '@material-ui/icons';
import { url, publish } from '../../utils/constants';
import jwt_decode from 'jwt-decode';
import Acessiblidade from '../../utils/acessibility'
import Banner from  '../../components/banner'

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

        fetch(`${publish}/account/signin`, {
            method: 'POST',
            body: JSON.stringify({
                Email: email,
                Senha: senha,
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(resultado => resultado.json())
            .then(resultado => {
                console.log(resultado.data)
                if (resultado.data.length !== 0) {
                    addToast(resultado.mensagem, { appearance: 'success', autoDismiss: true })
                    localStorage.setItem('token-dolink', resultado.data.token);
                    const token = localStorage.getItem('token-dolink');

                    if (jwt_decode(token).Roles === "Empresa") {
                        history.push('/vagancy/create')

                    } else if (jwt_decode(token).Roles === "Profissional") {

                        history.push('/professional/prematch')
                    }

                } else {
                    addToast(resultado.mensagem, { appearance: 'error', autoDismiss: true })
                }
            })
            .catch(erro => {
                console.error('erro na API ' + erro);
            })
    }

    return (
        <div>
            <Form >
                <div className="bodyLogin">
                <Banner titulo="Seu futuro  começa aqui!"
                        texto="Faça seu login agora mesmo!!!"
                        img="https://www.techlise.com.br/blog/wp-content/uploads/2020/06/profissionais-ti.jpg"
                    />
                    <div className="sectionContentLogin">
                        <div className="middleSectionLogin">
                            <div className="firstLinhaLogin">
                                <img className="linhasSignin" src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" />
                                <h1>Sign In</h1>
                                <img className="linhasSignin" src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" />
                            </div>

                            <Form className="formulario_login">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Informe seu email ..."
                                        value={email} onChange={e => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted" />
                                </Form.Group>
                                <Form.Group controlId="formBasicSenha">
                                    <Form.Control type="password" placeholder="Informe sua senha ..."
                                        value={senha} onChange={e => setSenha(e.target.value)} />
                                    <Form.Text className="text-muted" />
                                </Form.Group>
                            </Form>

                            <div className="secondLinhaLogin">
                                <div className="botoesSigninLogin">

                                    <a className="esqueciMinhaSenhaLink" href="/forget/password">Esqueceu Sua Senha?</a>
                                    <button type="submit" onClick={logar} className="botaoLoginAccount">Sign In</button>

                                    <p className="cadastrarContaLink" >Não possue uma conta? <a href="/choose/signup">Cadastre-se!</a></p>
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