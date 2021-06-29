import React, { useState, useEffect } from "react"
import { Form, Button, ProgressBar } from 'react-bootstrap'
import {  useHistory  } from 'react-router-dom';
import warningIcon from '../../imgs/icons/warning.svg'
import Header from "../../components/header";
import Footer from "../../components/footer"
import jwtDecode from 'jwt-decode';
import http from '../../utils/http-axious';
import "./index.css";
import { useToasts } from 'react-toast-notifications';



const CadastroDeVagas = () => {
    const history = useHistory();
    const token = localStorage.getItem('token-dolink');
    const { addToast } = useToasts();
    const idEmpresa = jwtDecode(token).Id;
    const [skills, setSkills] = useState([])
    const [titulo, setTitulo] = useState("");
    const [faixasalarial, setFaixasalarial] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");
    const [beneficios, setBeneficios] = useState("");
    const [skillItems, setSkillItems] = useState([{
        id: "", nome: "", nivel: 0, hash: "", tipo : 1
    }])
    const [skillDesejadaItems, setSkillDesejadaItems] = useState([{
        id: "", nome: "", nivel: 0, hash: "", tipo : 2
    }])


    const setSkillRequeridValue = (position, campo, valor) => {
        console.log(skills)
        let val = valor.split('|')[1]
        console.log(skills.indexOf(val))
        const atualizarSkillItems = skillItems.map((skillItem, index) => {
            if (index === position) {
                return { ...skillItem,
                    [campo.split('|')[0]]: valor.split('|')[0],
                    [campo.split('|')[1]]: valor.split('|')[1],
                    [campo.split('|')[2]]: valor.split('|')[2],
                    ['nivel']: valor,
                    ['tipo'] : 1
                }
            }

            return skillItem;
        })

        setSkillItems(atualizarSkillItems);
    }

    const setSkillDesejadaValue = (position, campo, valor) => {
        const atualizarSkillDesejadaItems = skillDesejadaItems.map((skillDesejadaItem, index) => {
            if (index === position) {
                return { ...skillDesejadaItem,
                    [campo.split('|')[0]]: valor.split('|')[0],
                    [campo.split('|')[1]]: valor.split('|')[1],
                    [campo.split('|')[2]]: valor.split('|')[2],
                    ['nivel']: valor,
                    ['tipo'] : 2
                }
            }

            return skillDesejadaItem;
        })

        setSkillDesejadaItems(atualizarSkillDesejadaItems);
    }

    const addNovaSkillRequeridaItem = () => {
        setSkillItems([
            ...skillItems,
            {
                id: "", nome: "", nivel: 0, hash: "", tipo : 1
            }
        ])

        skillItems.push()
    }

    const addNovaSkillDesejadaItem = () => {
        setSkillDesejadaItems([
            ...skillDesejadaItems,
            {
                id: "", nome: "", nivel: 0, hash: "", tipo : 2
            }
        ])

        skillDesejadaItems.push()
    }

    useEffect(() => {
        listarSkills()
    }, [])

    const cadastrar = (event) => {
        event.preventDefault();

        var allSkills = skillItems.concat(skillDesejadaItems)

        fetch('https://dolink.azurewebsites.net/v1/vagancy/create', {
            method: "POST",
            body: JSON.stringify({
                idEmpresa: idEmpresa,
                titulo: titulo,
                faixasalarial: faixasalarial,
                local: local,
                descricao: descricao,
                beneficios: beneficios,
                especificacoesSkills: allSkills
            }),
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(resultado => resultado.json())
        .then(resultado => {
            let a = resultado.mensagem;

            if(resultado.sucesso){
                addToast(resultado.mensagem, { appearance: 'success', autoDismiss : true })
                history.push('/ListagemVagas');

            }else{
                resultado.data.map((erro, index) => {
                    var mensagem = "";

                    resultado.mensagem === "palavras inadequadas" ? 
                        mensagem = `A palavra '${erro.palavra.toUpperCase()}' não pode ser usada`
                        :
                        mensagem = erro.message

                    return addToast(mensagem, { appearance: 'error', autoDismiss: true })
                    
                })
            }
        })
        .catch((err) => console.error(err));
    };

    const listarSkills = () => {
        http.get('https://dolink.azurewebsites.net/v1/skills', {
            method: 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(resultado => {
            setSkills(resultado.data.data);
        })
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <Header />
            <div className="tituloVaga">
                <hr/>
                    <h1>Cadastrar Vaga</h1>
                <hr/>
            </div>
            <main className="container_principal_vaga">
                <Form>
                <fieldset id="#">
                        <legend>Dados da vaga</legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicTitulo" className="input-block">
                                <Form.Label>Título da vaga</Form.Label>
                                <Form.Control type="text" placeholder=""
                                    value={titulo} onChange={e => setTitulo(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicRegiao" className="input-block">
                                <Form.Label>Local da vaga</Form.Label>
                                <Form.Control type="text" placeholder=""
                                    value={local} onChange={e => setLocal(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao" className="input-block">
                                <Form.Label>Descrição da vaga</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder=""
                                    value={descricao} onChange={e => setDescricao(e.target.value)} />
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Detalhes</legend>
                        <div className="campos">
                            <Form.Group controlId="formBasicTitulo" className="input-block">
                                <Form.Label>Faixa salarial</Form.Label>
                                <Form.Control type="number" placeholder=""
                                    value={faixasalarial} onChange={e => setFaixasalarial(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao" className="input-block">
                                <Form.Label>Descreva os benefícios</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder=""
                                    value={beneficios} onChange={e => setBeneficios(e.target.value)} />
                            </Form.Group>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Habilidades requeridas
                            <button type="button" onClick={addNovaSkillRequeridaItem}>+ Adicionar habilidade</button>
                        </legend>
                        <div className="campos">
                            {
                                skillItems.map((skill, index) => {
                                    return (
                                        <div className="selects_style">
                                            <Form.Group controlId="formBasicSkill">
                                                <Form.Control className="select_skill" as="select" value={`${skill.id}|${skill.nome}|${skill.hash}`}
                                                    onChange={e => setSkillRequeridValue(index, 'id|nome|hash', e.target.value)}>
                                                    <option value="||" hidden>Selecione uma opção</option>
                                                    {
                                                        skills.map((item, index) => {
                                                            return (
                                                                <option key={item.id} value={`${item.id}|${item.nome}|${item.hash}`}>{item.nome}</option>
                                                            )
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicSkillNivel">
                                                <Form.Control className="select_skill_nivel" as="select" value={skill.nivel}
                                                    onChange={e => setSkillRequeridValue(index, 'nivel', e.target.value)}>
                                                    <option value="0" hidden>Selecione um nível</option>
                                                    <option value="1">Basico</option>
                                                    <option value="2">Intermediario</option>
                                                    <option value="3">Avançado</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Habilidades desejáveis
                            <button type="button" onClick={addNovaSkillDesejadaItem}>+ Adicionar habilidade</button>
                        </legend>
                        <div className="campos">
                            {
                                skillDesejadaItems.map((skill, index) => {
                                    return (
                                        <div className="selects_style">
                                            <Form.Group controlId="formBasicSkill">
                                                <Form.Control className="select_skill" as="select" value={`${skill.id}|${skill.nome}|${skill.hash}`}
                                                    onChange={e => setSkillDesejadaValue(index, 'id|nome|hash', e.target.value)}>
                                                    <option value="||" hidden>Selecione uma opção</option>
                                                    {
                                                        skills.map((item, index) => {
                                                            return (
                                                                <option key={item.id} value={`${item.id}|${item.nome}|${item.hash}`}>{item.nome}</option>
                                                            )
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicSkillNivel">
                                                <Form.Control className="select_skill_nivel" as="select" value={skill.nivel}
                                                    onChange={e => setSkillDesejadaValue(index, 'nivel', e.target.value)}>
                                                    <option value="0" hidden>Selecione um nível</option>
                                                    <option value="1">Basico</option>
                                                    <option value="2">Intermediario</option>
                                                    <option value="3">Avançado</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        {
                            titulo === '' || faixasalarial === '' || beneficios === '' || descricao === '' || local === '' || skillItems.length === 0 ?
                                <button type="button" className="disabled" disabled>Salvar cadastro</button>
                                :
                                <button type="submit" className="createButton" onClick={e => cadastrar(e)}>Salvar cadastro</button>
                        }
                    </footer>
                </Form>
            </main>            
            <Footer className="rodapeVagas" />
        </div>
    )
}

export default CadastroDeVagas;