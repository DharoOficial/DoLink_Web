import React, { useEffect, useState } from "react";
import { useToasts } from 'react-toast-notifications';
import { Form, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { url, urlLucas } from "../../utils/constants";
import Header from "../../components/header";
import Rodape from "../../components/footer";
import jwtDecode from "jwt-decode";
import "./style.css";
import { EditSharp } from "@material-ui/icons";

const EditarEmpresa = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const token = localStorage.getItem("token-dolink");
    const idEmpresa = jwtDecode(token).Id;
    const [cnpj, setCnpj] = useState('')
    const [cep, setCep] = useState('')
    const [regiao, setRegiao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [dominio, setDominio] = useState('')
    const [arquivo, setArquivo] = useState([])
    const [visualizador, setVisualizador] = useState('')

    const VisualizarImagem = (event) => {
        setArquivo(event.target.files[0])

        setVisualizador(URL.createObjectURL(event.target.files[0]))
    }

    const Editar = (event) => {
        event.preventDefault()

        let formdata = new FormData();
        formdata.set('id', idEmpresa);
        formdata.set('cnpj', cnpj);
        formdata.set('cep', cep);
        formdata.set('regiao', regiao);
        formdata.set('descricao', descricao);
        formdata.set('dominio', dominio);
        formdata.append('arquivo', arquivo);

        fetch(`${urlLucas}company/update/general`, {
            method : "PUT",
            body : formdata
        })
        .then(response => response.json())
        .then(response => {
            let a = response.mensagem;

            if(!response.sucesso){
                response.data.map((erro, index) => {
                    var mensagem = "";
                    
                    response.mensagem === "palavras inadequadas" ? 
                    mensagem = `A palavra '${erro.palavra.toUpperCase()}' não pode ser usada`
                    :
                    mensagem = erro.message
                    
                    return addToast(mensagem, { appearance: 'error', autoDismiss: true })
                })
            }

            if(response.sucesso){
                addToast(response.mensagem, { appearance: 'success', autoDismiss : true })
                history.push('/cadastrodevagas')
            }
        })
    }

    return (
        <>
            <Header/>
            <div className="container_editar_empresa_form">
                <Form className="formulario_editar_empresa">
                    <h2>Finalize seu cadastro com dados adicionais!</h2>
                    <fieldset>
                        <legend>Dados a empresa <hr/></legend>
                        <div className="campos">
                            <div className="formFile">
                                <Form.Group controlId="formBasicFile" className="input-block-file">
                                    <Form.Label for="fileImage">Logo da empresa</Form.Label>
                                    <Form.File id="fileImage" onChange={e => VisualizarImagem(e)} />
                                </Form.Group>

                                {visualizador && <img src={visualizador} className="imgVisualizador"/>}
                            </div>
                                                        
                            <Form.Group controlId="formBasicCnpj" className="input-block">
                                <Form.Label>Cnpj da empresa</Form.Label>
                                <Form.Control type="text" placeholder=""
                                    value={cnpj} onChange={e => setCnpj(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCep" className="input-block">
                                <Form.Label>CEP da empresa</Form.Label>
                                <Form.Control type="text" placeholder=""
                                    value={cep} onChange={e => setCep(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicRegiao" className="input-block">
                                <Form.Label>Região da empresa</Form.Label>
                                <Form.Control type="text" placeholder=""
                                    value={regiao} onChange={e => setRegiao(e.target.value)}/>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Informações adicionais <hr/></legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicDescricao" className="input-block">
                                <Form.Label>Descrição da empresa</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder=""
                                    value={descricao} onChange={e => setDescricao(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicDominio" className="input-block">
                                <Form.Label>Domínio da empresa</Form.Label>
                                <Form.Control type="url" placeholder="http:// ...."
                                    value={dominio} onChange={e => setDominio(e.target.value)}/>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <div className="buttons_empresa">
                        {
                            cnpj === '' || cep === '' || regiao === '' || descricao === '' || dominio === '' ?
                                <Button variant="success" type="submit" className="confirm" disabled>Finalizar</Button>
                                :
                                <Button variant="success" type="submit" className="confirm"
                                    onClick={e => Editar(e)}>Finalizar</Button>
                        }
                    </div>
                </Form>
            </div>
        </>
    )
}

export default EditarEmpresa