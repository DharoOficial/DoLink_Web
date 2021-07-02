import { React, useState, useEffect } from 'react';
import Header from '../../components/header';
import Rodape from '../../components/footer';
import { Link } from 'react-router-dom';
import empresaServico from '../../servicos/empresaServico';
import jwtDecode from 'jwt-decode';
import http from '../../utils/http-axious';
import { useToasts } from 'react-toast-notifications';
import './index.css';
import Acessiblidade from '../../utils/acessibility'

const MatchProfissional = () => {
    
    const { addToast } = useToasts();
    
    const [vagas, setVagas] = useState([]);
    const [idVaga, setIdVaga] = useState();
    const [idMatch, setIdMatch] = useState();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [local, setLocal] = useState('');
    const [faixaSalarial, setFaixaSalarial] = useState('');
    
    const token = localStorage.getItem('token-dolink');
    
    const idProfissional = jwtDecode(token).Id;
    
    useEffect(() => {
        listarPreMatch();
        Acessiblidade();
    }, [])
    
    const listarPreMatch = () => {
        http.get('https://dolink.azurewebsites.net/v1/vagancy/prematch/' + idProfissional, {
            method: 'GET',
            body: JSON.stringify({
                idVaga: idVaga
            }),
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
            .then(resultado => {
                setVagas(resultado.data.data);
                console.log(vagas)
            })
            .catch((err) => console.log(err))
    }

    const darMatch = (event, id) => {
        event.preventDefault();

        fetch('https://dolink.azurewebsites.net/v1/match', {
            method: 'POST',
            body: JSON.stringify({

                idProfissional: idProfissional,
                idVaga: id

            }),
            headers: {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
        })
            .then(resultado => resultado.json())
            .then((resultado) => {

                if (resultado.sucesso) {
                    addToast(resultado.mensagem, { appearance: 'success', autoDismiss: true })
                } else {
                    addToast(resultado.mensagem, { appearance: 'error', autoDismiss: true })
                }

            })
            .catch((err) => console.error(err));
    }

    return (

        <div>
            <Header />

            <div className="titulo">
                <hr className="linha" />
                <div className="esp"></div>
                <h1>Vagas compatíveis</h1>
                <div className="esp"></div>
                <hr className="linha" />
            </div>

            <a className="linkMatchsConfirmados" href="/professional/matchs">Ver Matchs Confirmados</a>

            <main>
                <div className="estilizacaoDePaginaListagemMatch">

                    {
                        vagas.length === 0
                        ? (
                            <h2 className="sadlyNothingPreMatch">Nenhum match foi encontrado :(</h2>
                        )
                        : (
                            vagas.map((item, index) => {
                                return (
                                    <div >
    
                                        <div className="LinkDeCardListagemdeMatch" >
                                            <div className="cardsDeMatch">
                                                <div className="cardiparaEstilizacaoDeListagemDeMatch">
                                                    <p className="TituloCardaMatch">{item.titulo}</p>
                                                    <p style={{ 'margin-bottom': '0.6em', 'maxWidth': '95%' }}>{item.descricao.substring(0, 60)}...</p>
                                                    <p style={{ 'margin-bottom': '0.6em' }}><strong>Faixa Salarial</strong>:</p>
                                                    <p style={{ 'margin-bottom': '0.6em' }}>R${item.faixaSalarial}</p>
    
                                                    <button onClick={e => darMatch(e, item.id)} className="botaoDarMatch" type="submit">Dar Match!</button>
    
                                                    {/* <button onClick={console.log(item.id)} className="botaoDarMatch" type="button" >Dar Match!</button> */}
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }


                </div>
            </main>

            <Rodape />
        </div>

    )

}

export default MatchProfissional;