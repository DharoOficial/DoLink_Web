import {React, useState, useEffect} from 'react';
import Header from '../../components/header';
import Rodape from '../../components/footer';
import jwtDecode from 'jwt-decode';
import {  url, publish  } from '../../utils/constants';
import {  useHistory  } from 'react-router-dom';
import './index.css'
import empresaServico from '../../servicos/empresaServico';
import Acessiblidade from '../../utils/acessibility'

const MatchConfirmadoProf = () => {
    
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [local, setLocal] = useState('');
    
    const [matchs, setMatchs] = useState([]);
    
    const [idMatch, setIdMatch] = useState('');
    
    const history = useHistory();
    
    useEffect(() => {
        
        Acessiblidade();
        listarMatch();

    }, [matchs])

    const token = localStorage.getItem('token-dolink');  
    const idProfissional = jwtDecode(token).Id;

    const listarMatch = () => {

       fetch(`${publish}/match/search/${idProfissional}`, {
           method : 'GET',
           headers : {
               'Authorization' : `Bearer ${token}`
           }
       })
       .then(resultado => resultado.json())
        .then(resultado => {
            
            setMatchs(resultado.data)

        })
        .catch(erro =>{
            console.error(`erro ${erro}`);
        })
    }

    const excluirMatch = (event, id) => {
        event.preventDefault();

        fetch(`${publish}match/remove/` + id, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({

                id : id

            }),
        })
            .then(response => response.json())
            .then(response => {
                alert('Match cancelado!')
            })
    }

    return(

        <div>
            <Header />

                <div className="title">
                    <hr className="line" />
                        <div className="espm"></div>
                            <h1>Matchs Confirmados</h1>
                        <div className="espm"></div>
                    <hr className="linha" />
                </div>

                

                <main>

               

                <div className="estilizacaoDePaginaConfirmarMatch">
                

                    {
                        matchs.length === 0
                        ? (
                            <h2 className="sadlyNothing">Nenhum match confirmado foi encontrado :(</h2>
                        )
                        : (
                            matchs.map((item, index) => {
                                return (
                                    <div >
                                        <div className="LinkDeCardListagemdeMatch" >
                                            <div className="cardsDeMatch">
                                                <div className="cardiparaEstilizacaoDeListagemDeMatch">
                                                    <p className="TituloCardaMatch">{item.dadosVaga.titulo}</p>
                                                    <p style={{ 'margin-bottom': '0.6em', 'maxWidth' : '95%'  }}>{item.dadosVaga.descricao.substring(0, 100)}...</p>
                                                    <p style={{ 'margin-bottom': '0.6em' }}>Local: {item.dadosVaga.local}</p>
                                                    
                                                    <button onClick={e => excluirMatch(e, item.id)} className="botaoRemoverMatch"  type="submit">Cancelar Match!</button>
                                                    
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

export default MatchConfirmadoProf;