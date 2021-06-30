import React, { useState } from "react"
import Banner from '../../components/banner'
import { Form, Button } from 'react-bootstrap'
import { url, urlLucas, publish } from '../../utils/constants'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Acessiblidade from '../../utils/acessibility'
import './index.css';

const CadastroEmpresa = () => {
    const history = useHistory();
    const { addToast } = useToasts();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const Login = (email, senha) => {
        fetch(`${publish}/account/signin`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Senha: senha
            })
        })
        .then(resultado => resultado.json())
        .then(resultado => {

            if(resultado.sucesso) {

                addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
                localStorage.setItem('token-dolink', resultado.data.token);
                history.push('/company/edit');
            } else {
                addToast(resultado.mensagem, { appearance: 'error', autoDismiss : true })
            }
        })
    }

    const cadastrar = (event) => {
        event.preventDefault();

        fetch(`${publish}/company/signup`, {
            method: 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                nome : nome,
                senha : senha,
                email : email,
                telefone : telefone
            })
        })
        .then(resultado => resultado.json())
        .then(resultado => {
            let a = resultado.mensagem + " " + JSON.stringify(resultado.data);

            if(resultado.sucesso) {
                addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
                Login(email, senha)

            } else {
                addToast(a, { appearance: 'error', autoDismiss : true })
            }
        })
        .catch(erro => {
            console.error('erro na API ' + erro);
        })
    }

    return (
        <div className="container_empresa_principal">
            <Banner titulo="Preencha seus dados empresariais"
                        texto="Informe seus dados para que possamos te ajudar a encontrar os melhores profissionais!"
                        img="https://blog.ipog.edu.br/wp-content/uploads/2018/02/Profissional-de-TI.jpg"
                    />
            <div className="container_empresa_form">
                <div className="titulo_profissional">
                    <hr/>
                    <h1>Sign Up</h1>
                    <hr/>
                </div>

                <Form className="formulario_empresa">
                    <Form.Group controlId="formBasicNomeCompanhia">
                        <Form.Control type="text" placeholder="Informe o nome da companhia ..."
                                    value={nome} onChange={e => setNome(e.target.value)}/>
                        <Form.Text className="text-muted"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Informe seu email ..."
                                    value={email} onChange={e => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicSenha">
                        <Form.Control type="password" placeholder="Informe sua senha ..."
                                        value={senha} onChange={e => setSenha(e.target.value)}/>
                        <Form.Text className="text-muted"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicTelefone">
                        <Form.Control type="tel" placeholder="Informe seu telefone com DDD ..."
                                        value={telefone} onChange={e => setTelefone(e.target.value)}/>
                        <Form.Text className="text-muted"/>
                    </Form.Group>
                    <div className="buttons_empresa">
                        <p>Já possui uma conta? <a href="/">Login</a></p>
                        {
                            email === '' || senha === '' || nome === '' || telefone === '' ?
                                <Button variant="success" type="submit" className="confirm" disabled>Cadastrar-se
                                </Button>
                                :
                                <Button variant="success" type="submit" className="confirm" onClick={e => cadastrar(e)}>
                                    Cadastrar-se
                                </Button>
                        }
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default CadastroEmpresa;

{/* <Form.File id="fileCategoria" onChange={event => setArquivo(event.target.files[0])} />
                                    {arquivo && <img src={arquivo} />} */}
