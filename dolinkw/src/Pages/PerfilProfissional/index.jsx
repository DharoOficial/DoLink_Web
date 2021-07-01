import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Rodape from '../../components/footer';
import { Table, Button, Form } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useFormik } from 'formik';
import { url } from '../../utils/constants';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import './index.css';

const PerfilProfissional = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const token = localStorage.getItem('token-dolink');
    const idProfissional = jwtDecode(localStorage.getItem('token-dolink')).Id;
    const [arquivo, setArquivo] = useState([])
    const [visualizador, setVisualizador] = useState('')
    const formik = useFormik({
        initialValues: {
            nome: '',
            email : '',
            telefone : '',
            cpf: '',
            cep: '',
            sobreMim : '',
            faixaSalarial : '',
            linkedin : '',
            repositorio : '',
            curriculo : {
              ultimaEmpresa : '',
              dataInicial : '',
              dataFinal : '',
              cargo : '',
              descricaoFuncao : '',
              naoTenhoExperiencia : false
            },
            skillsProfissional : []
        }
    })

    const formikEdit = useFormik({
        initialValues : {
          nome: '',
          email : '',
          telefone : '',
          cpf: '',
          cep: '',
          sobreMim : '',
          faixaSalarial : '',
          linkedin : '',
          repositorio : '',
          curriculoProfissional : {
            ultimaEmpresa : '',
            dataInicial : '',
            dataFinal : '',
            cargo : '',
            descricaoFuncao : '',
            naoTenhoExperiencia : false
          },
          skillsProfissional : []
        }
    })

    useEffect(() => {
        BuscarDados()
    }, []);

    const BuscarDados = () => {
        fetch(`https://dolink.azurewebsites.net/v1/professional/search/id/${idProfissional}`, {
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
                cpf : response.data.cpf,
                cep : response.data.cep,
                sobreMim : response.data.sobreMim,
                faixaSalarial : response.data.faixaSalarial,
                linkedin : response.data.linkedin,
                repositorio : response.data.repositorio,
                curriculo : {
                  ultimaEmpresa : response.data.curriculo.ultimaEmpresa,
                  dataInicial : response.data.curriculo.dataInicial,
                  dataFinal : response.data.curriculo.dataFinal,
                  cargo : response.data.curriculo.cargo,
                  descricaoFuncao : response.data.curriculo.descricaoFuncao,
                  naoTenhoExperiencia : response.data.curriculo.naoTenhoExperiencia
                }
            })
            console.log(formik.values.curriculo.dataInicial)
        })
    }

    // const editarInformacoes = (event) => {
    //     event.preventDefault()

    //     let formdata = new FormData();
    //     formdata.set("id", idEmpresa);
    //     formdata.set("nome", formikEdit.values.nome === '' ? formik.values.nome : formikEdit.values.nome)
    //     formdata.set("email", formikEdit.values.email === '' ? formik.values.email : formikEdit.values.email)
    //     formdata.set("telefone", formikEdit.values.telefone === '' ? formik.values.telefone : formikEdit.values.telefone)
    //     formdata.set("descricao", formikEdit.values.descricao === '' ? formik.values.descricao : formikEdit.values.descricao)
    //     formdata.set("cnpj", formikEdit.values.cnpj === '' ? formik.values.cnpj : formikEdit.values.cnpj)
    //     formdata.set("cep", formikEdit.values.cep === '' ? formik.values.cep : formikEdit.values.cep)
    //     formdata.set("regiao", formikEdit.values.regiao === '' ? formik.values.regiao : formikEdit.values.regiao)
    //     formdata.set("dominio", formikEdit.values.dominio === '' ? formik.values.dominio : formikEdit.values.dominio)
    //     formdata.append("arquivo", arquivo)

    //     console.log(formdata)

    //     fetch(`https://dolink.azurewebsites.net/v1/company/update`, {
    //         method : 'PUT',
    //         body : formdata,
    //         headers : {
    //             "Authorization" : `Bearer ${token}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(erro => console.log(erro))
    // }

    return (
        <>
            <Header />
            <div className="tituloPerfilProfissional">
                <hr/>
                    <h1>Perfil profissional</h1>
                <hr/>
            </div>
            <div className="container_perfil_profissional_form">
                <Form className="formulario_perfil_profissional">
                    <fieldset>
                        <legend>Dados do profissional <hr/></legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicNome" className="input-block">
                                <Form.Label>Nome do profissional :</Form.Label>
                                <Form.Control type="text" name="nome" placeholder={formik.values.nome}
                                            /*value={nome} onChange={e => setNome(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="input-block">
                                <Form.Label>Email do profissional :</Form.Label>
                                <Form.Control type="text" name="email" placeholder={formik.values.email}
                                            /*value={email} onChange={e => setEmail(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicTelefone" className="input-block">
                                <Form.Label>Telefone do profissional :</Form.Label>
                                <Form.Control type="text" name="telefone" placeholder={formik.values.telefone}
                                            /*value={telefone} onChange={e => setTelefone(e.target.value)}*//>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>        
                        <legend>Dados completar <hr/></legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicCnpj" className="input-block">
                                <Form.Label>Cpf do profissional :</Form.Label>
                                <Form.Control type="text" name="cnpj" placeholder={formik.values.cpf}
                                            /*value={cnpj} onChange={e => setCnpj(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicCep" className="input-block">
                                <Form.Label>CEP do profissional :</Form.Label>
                                <Form.Control type="text" name="cep" placeholder={formik.values.cep}
                                            /*value={cep} onChange={e => setCep(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao" className="input-block">
                                <Form.Label>Sobre mim :</Form.Label>
                                <Form.Control as="textarea" name="descricao" rows={4} placeholder={formik.values.cep}
                                            /*value={descricao} onChange={e => setDescricao(e.target.value)}*//>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Informações adicionais <hr/></legend>
                        <div className="campos">
                        <Form.Group controlId="formBasicCep" className="input-block">
                                <Form.Label>Faixa salarial :</Form.Label>
                                <Form.Control type="number" name="cep" placeholder={formik.values.faixaSalarial}
                                            /*value={cep} onChange={e => setCep(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicDominio" className="input-block">
                                <Form.Label>Perfil do LinkedIn :</Form.Label>
                                <Form.Control type="url" name="dominio" placeholder={formik.values.linkedin}
                                            /*value={linkedin} onChange={e => setLinkedin(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicDominio" className="input-block">
                                <Form.Label>Perfil do Github :</Form.Label>
                                <Form.Control type="url" name="dominio" placeholder={formik.values.repositorio}
                                            /*value={dominio} onChange={e => setDominio(e.target.value)}*//>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Experiência do profissional <hr/></legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicCep" className="input-block">
                                <Form.Label>Última empresa :</Form.Label>
                                <Form.Control type="text" placeholder={formik.values.curriculo.ultimaEmpresa}
                                            /*value={ultimaEmpresa} onChange={e => setUltimaEmpresa(e.target.value)}*//>
                            </Form.Group>

                            <div className="form-input-data">
                                <Form.Group controlId="formBasicDatas" className="input-block input-block-date">
                                    <Form.Label>Data inicial :</Form.Label>
                                    <input id="dateStart" type="date" defaultValue={formik.values.curriculo.dataInicial.replace('T00:00:00Z', '')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        /*value={dataInicial} onChange={e => setDataInicial(e.target.value)}*/
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicDatas" className="input-block input-block-date">
                                    <Form.Label>Data final :</Form.Label>
                                    <input id="dateFinish" type="date" defaultValue={formik.values.curriculo.dataFinal.replace('T00:00:00Z', '')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        /*value={dataFinal} onChange={e => setDataFinal(e.target.value)}*/
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group controlId="formBasicCep" className="input-block">
                                <Form.Label>Último cargo :</Form.Label>
                                <Form.Control type="text" placeholder={formik.values.curriculo.cargo}
                                            /*value={cargo} onChange={e => setCargo(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicDominio" className="input-block">
                                <Form.Label>Descreva sua função :</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder={formik.values.curriculo.descricaoFuncao}
                                            /*value={descricaoFuncao} onChange={e => setDescricaoFuncao(e.target.value)}*//>
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox" className="input-block inputCheck">
                                <Form.Label>Eu não possuo experiência profissional!</Form.Label>
                                    <Form.Check name="terms" /*value={experiencia} onChange={e => setExperiencia(e.target.value)}*//>
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                    <legend>Habilidades e skills  <hr/></legend>
                    <div className="campos">
                        <div className="campos-select">
                            <button type="button" className="botaoAddSkill"
                                        /*onClick={addNovaSkillItem}*/>+ adicionar habilidade</button>
                            <div></div>
                        </div>
                        
                    </div>
                </fieldset>
                    <div className="buttons_empresa">
                        <Button variant="success" type="submit" className="confirm">Editar dados</Button>
                    </div>
                </Form>
            </div>
            <Rodape className="rodapePerfilEmpresa" />
        </>
    )
}
export default PerfilProfissional;