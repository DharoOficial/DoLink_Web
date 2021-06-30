import React, { useEffect, useState } from 'react'
import './index.css'
import Header from '../../components/header';
import Rodape from '../../components/footer';
import { Table, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import empresaServico from '../../servicos/empresaServico';
import { url, publish } from '../../utils/constants';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import Acessiblidade from '../../utils/acessibility'

const ListagemVagas = () => {
    
    const { addToast } = useToasts();
    const [titulo, setTitulo] = useState('');
    const [faixaSalarial, setFaixaSalarial] = useState('');
    const [local, setLocal] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [vagas, setVagas] = useState([]);
    const [statusVaga, setStatusVaga] = useState([]);
    const [termo, setTermo] = useState('')
    const token = localStorage.getItem('token-dolink');
    const idEmpresa = jwtDecode(token).Id;
    
    useEffect(() => {
        Acessiblidade();
        listarVagas();
    }, []);

    const listarVagas = () => {
        fetch(`${publish}/company/vagancy/${idEmpresa}`, {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(resultado => resultado.json())
        .then(resultado => {
            setVagas(resultado.data);
            console.log("oajdnfó~sdinb")
            console.log(resultado);
        })
        .catch(erro => {
            console.error(`erro ${erro}`);
        })
            
    }

    const AlterarStatus = (event, item, status) => {
        let body;
        console.log(item)
        if(status === "Padrao"){
            body = {
                status : 1,
                id : item
            }
        }
        else{
             body = {
                status : 0,
                id : item
            }
        }
        console.log(item)

        event.preventDefault();
        fetch(`${publish}/vagancy/update/state/`, {
            method : "PUT",
            body : JSON.stringify(body),
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        
        window.location.reload()
    }

    const Botao = (status, id) => {
        //console.log(status)
        if (status === "Padrao") {
            return (
                <>
                    <button type="submit" name="VagaAtiva" onClick={e => AlterarStatus(e, id, status)} className="botaoAlterarStatusVagaAtivo" >
                        <div className="StatusDeotaoAtivado"></div>
                    </button>
                </>
            )
        }
        else {
            return (
                <>
                    <button type="submit" name="vagaDesativada" onClick={e => AlterarStatus(e, id, status)} className="botaoAlterarStatusVagaDesativado" >
                        <div className="StatusDeotaoDesatvado"></div>
                    </button>
                </>
            )
        }
    }


    return (

        <div className="englobatudoNaPaginiaListagemDeVagas">
            <Header />

            <div className="tituloMatch">
                <hr className="linha" />
                <div className="esp"></div>
                <h1>Vagas Cadastradas</h1>
                <div className="esp"></div>
                <hr className="linha" />
            </div>

            <div className="sectionCampoBuscaVagas">

                <input className="campoBuscaVagas"
                    placeholder="Digite o título da vaga..."
                    onChange={event => { setTermo(event.target.value) }}
                />

                <button type="submit"><img src="https://media.discordapp.net/attachments/819577034530881567/855104124848177172/unknown.png" alt="" /></button>
            </div>

            <main>
                <div className="estilizacaoDePaginaListagemVaga">

                    <div className="FiltoDeVagasListagem">

                        <div className="sectionFiltroPrincipal">
                            <div className="filtroBuscaVaga">
                                <h3>Filtros de Busca</h3>
                            </div>

                            <div className="sectionFiltroRegiao">
                                <h4>Região</h4>
                                <input
                                    type="text"
                                    placeholder="Informe a região da vaga"
                                    onChange={event => { setTermo(event.target.value) }}
                                />
                            </div>

                            <div className="sectionFiltroBeneficios">
                                <h4>Faixa Salarial</h4>
                                <input
                                    type="text"
                                    placeholder="Informe o salário da vaga"
                                    onChange={event => { setTermo(event.target.value) }}
                                />
                            </div>

                            {/* <div className="sectionBotaoFiltro">
                                <button type="submit">Aplicar!</button>
                            </div> */}
                        </div>

                    </div>


                    <div className="sectionDeCardsDasVagas">
                        {
                            vagas.filter((item) => {
                                if (termo == "") {
                                    return item
                                } else if (item.titulo.toLowerCase().includes(termo.toLowerCase())) {
                                    return item
                                }
                                else if (item.local.toLowerCase().includes(termo.toLowerCase())) {
                                    return item
                                }
                                else if (item.faixaSalarial.toLowerCase().includes(termo.toLowerCase())) {
                                    return item
                                }
                            }).map((item) => {
                                return (
                                    <div className="LinkDeCardsDeVagaListagemdeVagas" >
                                        <div className="cardsDeVagas">
                                            <div className="cardiparaEstilizacaoDeListagemDeVaga">
                                                <div className="cardiBotao_Titulo">
                                                    {Botao(item.status, item.id)}
                                                    <p className="TituloCardaVagas">{item.titulo}</p>
                                                </div>
                                                <p style={{ 'margin-bottom': '0.6em', 'maxWidth': '95%' }}>Descrição: {item.descricao}</p>
                                                <p style={{ 'margin-bottom': '0.6em' }}>Local: {item.local}</p>
                                                <p style={{ 'margin-bottom': '0.6em' }}>Faixa Salarial: R$ {item.faixaSalarial}</p>
                                                <button className="botaoVerVaga"><Link to={{ pathname: '/ListagemVagaEspecifica', state: { IdVaga: item.id } }}>Ver Matchs</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
            <Rodape />
        </div>

    )

}

export default ListagemVagas;