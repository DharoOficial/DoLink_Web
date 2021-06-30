import {useState, React, useEffect} from 'react';
import {  url, urlLucas, publish } from '../../utils/constants';
import {useHistory} from 'react-router-dom';
import {  useToasts  } from 'react-toast-notifications';
import Banner from '../../components/banner'
import { Form, Button } from 'react-bootstrap'
import jwtDecode from 'jwt-decode';
import './index.css';
import Acessiblidade from '../../utils/acessibility'

const CadastroProfissional = () => {   

    useEffect(() => {
        Acessiblidade()
      }, []);
    

    const { addToast } = useToasts();
    const history = useHistory();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const login = (email, senha) => {

        fetch(`${publish}/account/signin`, {
            method: 'POST',
            body: JSON.stringify({
                Email: email,
                Senha: senha
            }),
            headers: {
                'content-type' : 'application/json'
            }})
            .then(resultado => resultado.json())
            .then(resultado => {
                if(resultado.sucesso) {
                    console.log(resultado)
                    addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
                    localStorage.setItem('token-dolink', resultado.data.token);
                    history.push('/professional/edit');
                } else {
                    addToast(resultado.mensagem, { appearance: 'error', autoDismiss : true })
                }
            })
    }

    const cadastrar = (event) =>{
        event.preventDefault();

        fetch(`${publish}/professional/signup`,{
            method: 'POST',
            body: JSON.stringify({
                Nome: nome,
                Email: email,
                Senha: senha,
                Telefone: telefone
            }),
            headers: {
                'content-type': 'application/json'
            }})
            .then(resultado => resultado.json())
            .then(resultado=> {
                let a = resultado.mensagem;

                if(resultado.sucesso === true){
                    addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
                    login(email, senha);

                }else{
                    resultado.data.map((erro, index) => {
                        var mensagem = `A palavra '${erro.palavra.toUpperCase()}' não pode ser usada`
    
                        return addToast(mensagem, { appearance: 'error', autoDismiss: true })
                    })
                    
                    addToast(resultado.mensagem, { appearance: 'error', autoDismiss: true })
                }
            })
            .catch((err) => console.error(err));
    }

    return(
        <div className="container_profissional_principal">
            <Banner titulo="Preencha seus dados pessoais"
                        texto="Informe seus dados para que possamos te ajudar a encontrar o emprego dos sonhos!"
                        img="https://blog.ipog.edu.br/wp-content/uploads/2018/02/Profissional-de-TI.jpg"
                    />
            <div className="container_profissional_form">
                <div className="titulo_profissional">
                    <hr/>
                    <h1>Sign Up</h1>
                    <hr/>
                </div>

                <Form className="formulario_profissional">
                    <Form.Group controlId="formBasicNome">
                        <Form.Control type="text" placeholder="Informe seu nome ..."
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
                        <Form.Control type="tel" placeholder="Informe seu telefone ..."
                                        value={telefone} onChange={e => setTelefone(e.target.value)}/>
                        <Form.Text className="text-muted"/>
                    </Form.Group>
                    <div className="buttons_profissional">
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

export default CadastroProfissional;