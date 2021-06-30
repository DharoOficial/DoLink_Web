import React, { useEffect, useState } from 'react';
import '../../Pages/PerfilEmpresa/index.css';
import Header from '../../components/header';
import Rodape from '../../components/footer';
import { Table, Button, Form } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useFormik } from 'formik';
import { url } from '../../utils/constants';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import empresaServico from '../../servicos/empresaServico';

const PerfilEmpresa = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const token = localStorage.getItem('token-dolink');
    const idEmpresa = jwtDecode(localStorage.getItem('token-dolink')).Id;
    const [arquivo, setArquivo] = useState([])
    const [visualizador, setVisualizador] = useState('')
    const formik = useFormik({
        initialValues: {
            nome: '',
            email : '',
            telefone : '',
            cnpj: '',
            cep: '',
            regiao: '',
            telefone: '',
            descricao : '',
            dominio : '',
            arquivo : '',
            imagem : ''
        }
    })

    const formikEdit = useFormik({
        initialValues : {
            nome: '',
            email : '',
            telefone : '',
            cnpj: '',
            cep: '',
            regiao: '',
            telefone: '',
            descricao : '',
            dominio : '',
            arquivo : ''
        }
    })

    const VisualizarImagem = (event) => {
        setVisualizador(URL.createObjectURL(event.target.files[0]))
        
        setArquivo(event.target.files[0])
    }

    useEffect(() => {
        BuscarDados()
    }, []);

    const BuscarDados = () => {
        fetch(`https://dolink.azurewebsites.net/v1/company/search/id/${idEmpresa}`, {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            formik.setValues({
                nome : response.data.nome,
                email : response.data.email,
                telefone : response.data.telefone,
                cnpj : response.data.cnpj,
                cep : response.data.cep,
                regiao : response.data.regiao,
                descricao : response.data.descricao,
                dominio : response.data.dominio,
                imagem : response.data.imagem
            })
        })
    }

    const editarInformacoes = (event) => {
        event.preventDefault()

        let formdata = new FormData();
        formdata.set("id", idEmpresa);
        formdata.set("nome", formikEdit.values.nome === '' ? formik.values.nome : formikEdit.values.nome)
        formdata.set("email", formikEdit.values.email === '' ? formik.values.email : formikEdit.values.email)
        formdata.set("telefone", formikEdit.values.telefone === '' ? formik.values.telefone : formikEdit.values.telefone)
        formdata.set("descricao", formikEdit.values.descricao === '' ? formik.values.descricao : formikEdit.values.descricao)
        formdata.set("cnpj", formikEdit.values.cnpj === '' ? formik.values.cnpj : formikEdit.values.cnpj)
        formdata.set("cep", formikEdit.values.cep === '' ? formik.values.cep : formikEdit.values.cep)
        formdata.set("regiao", formikEdit.values.regiao === '' ? formik.values.regiao : formikEdit.values.regiao)
        formdata.set("dominio", formikEdit.values.dominio === '' ? formik.values.dominio : formikEdit.values.dominio)
        formdata.append("arquivo", arquivo)

        console.log(formdata)

        fetch(`https://dolink.azurewebsites.net/v1/company/update`, {
            method : 'PUT',
            body : formdata,
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
        .catch(erro => console.log(erro))
    }

    return (
        <>
            <Header />
            <div className="tituloPerfilEmpresa">
                <hr/>
                    <h1>Perfil empresa</h1>
                <hr/>
            </div>
            <div className="container_perfil_empresa_form">
            <Form className="formulario_perfil_empresa">
                    <fieldset>
                        <legend>Dados da empresa <hr/></legend>
                        <div className="campos">
                            <div className="formFile">
                                <Form.Group controlId="formBasicFile" className="input-block-file">
                                    <Form.Label for="fileImage">Alterar logo</Form.Label>
                                    <Form.File id="fileImage" type="file" name="arquivo"  onChange={e => VisualizarImagem(e)} />
                                </Form.Group>
                                {
                                    visualizador !== '' ?
                                        <img src={visualizador} alt=""/>
                                        :
                                        <img src={formik.values.imagem} alt=""/>
                                }
                            </div>

                            <Form.Group controlId="formBasicNome" className="input-block">
                                <Form.Label>Nome da empresa :</Form.Label>
                                <Form.Control type="text" name="nome" placeholder={formik.values.nome}
                                                value={formikEdit.values.nome} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="input-block">
                                <Form.Label>Email da empresa :</Form.Label>
                                <Form.Control type="text" name="email" placeholder={formik.values.email}
                                                value={formikEdit.values.email} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicTelefone" className="input-block">
                                <Form.Label>Telefone da empresa :</Form.Label>
                                <Form.Control type="text" name="telefone" placeholder={formik.values.telefone}
                                                value={formikEdit.values.telefone} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>        
                        <legend>Dados completar <hr/></legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicCnpj" className="input-block">
                                <Form.Label>Cnpj da empresa :</Form.Label>
                                <Form.Control type="text" name="cnpj" placeholder={formik.values.cnpj}
                                                value={formikEdit.values.cnpj} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCep" className="input-block">
                                <Form.Label>CEP da empresa :</Form.Label>
                                <Form.Control type="text" name="cep" placeholder={formik.values.cep}
                                                value={formikEdit.values.cep} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicRegiao" className="input-block">
                                <Form.Label>Região da empresa :</Form.Label>
                                <Form.Control type="text" name="regiao" placeholder={formik.values.regiao}
                                                value={formikEdit.values.regiao} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Informações adicionais <hr/></legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicDescricao" className="input-block">
                                <Form.Label>Descrição da empresa :</Form.Label>
                                <Form.Control as="textarea" name="descricao" rows={4} placeholder={formik.values.descricao}
                                                value={formikEdit.values.descricao} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicDominio" className="input-block">
                                <Form.Label>Domínio da empresa :</Form.Label>
                                <Form.Control type="url" name="dominio" placeholder={formik.values.dominio}
                                            value={formikEdit.values.dominio} onChange={e => formikEdit.handleChange(e)}/>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <div className="buttons_empresa">
                        {
                            formik.values.nome === '' || formik.values.email === '' || formik.values.telefone === '' || formik.values.regiao === '' || formik.values.cep === '' ||
                            formik.values.cnpj === '' || formik.values.descricao === '' || formik.values.dominio === '' || formik.values.arquivo === null ?
                                <Button variant="success" type="submit" className="confirm" disabled>Finalizar</Button>
                                :
                                <Button variant="success" type="submit" className="confirm" onClick={e => editarInformacoes(e)}>Editar dados</Button>
                        }
                    </div>
                </Form>
            </div>
            <Rodape className="rodapePerfilEmpresa" />
        </>
    )
}
export default PerfilEmpresa;