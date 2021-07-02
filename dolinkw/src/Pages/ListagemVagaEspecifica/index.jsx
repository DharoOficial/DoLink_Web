import {  useEffect, useState,  React} from 'react';
import './index.css';
import empresaServico from '../../servicos/empresaServico';
import { url, publish } from '../../utils/constants';
import jwtDecode from 'jwt-decode';
import {  Button, Table  } from 'react-bootstrap';
import Header from '../../components/header';
import Rodape from '../../components/footer'
import Acessiblidade from '../../utils/acessibility'
import foguinho from '../../imgs/icons/fogo.svg'
import money from '../../imgs/icons/money.svg'

const ListagemVagaEspecifica = (props) => {
    
    
    const token = localStorage.getItem('token-dolink');  
    
    //Definindo valores da vaga que a empresa cadastrou.
    const [IdVaga, setIdVaga] = useState(props.location.state.IdVaga);
    const [titulo, setTitulo] = useState('');
    const [faixaSalarial, setFaixaSalarial] = useState('');
    const [local, setLocal] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [descricao, setDescricao] = useState('');
    const [beneficios, setBeneficios] = useState('');
    const [vagas, setVagas] = useState([]);
    
    //Definindo valores do profissional que deu match na vaga.
    const [profissionais, setProfissionais] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    
    
    
    useEffect(() => {
        
        listarVaga();
        listarMatch();
        Acessiblidade();
        
    }, []);
    
    const listarVaga = () => {
        fetch(`${publish}/vagancy/search/id/${IdVaga}`, {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(resultado => resultado.json())
        .then(resultado =>{
            setTitulo(resultado.data.titulo)
            setFaixaSalarial(resultado.data.faixaSalarial)
            setLocal(resultado.data.local)
            setDescricao(resultado.data.descricao)
            setBeneficios(resultado.data.beneficios)
        })
        .catch(erro =>{
            console.error(`erro ${erro}`);
        })
    }

    const listarMatch = () => {

        fetch(`${publish}/match/search/${IdVaga}`, {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(resultado => resultado.json())
        .then(resultado => {
            setNome(resultado.data.nome)
            setEmail(resultado.data.email)
            setTelefone(resultado.data.telefone)
            setProfissionais(resultado.data)
        })
        .catch(erro =>{
            console.error(`erro ${erro}`);
        })
    }
    return(

        <div>
            <Header />

                <div className="tituloMatch">
                    <hr className="linha" />
                    <div className="esp"></div>
                    <h1>Matchs na Vaga</h1>
                    <div className="esp"></div>
                    <hr className="linha" />
                </div>

                <div className="sectionPerfilEmpresaAltura">

                    <div className="sectionVagaEspecificaLargura">

                        <div className="sectionInfoVaga">

                            <h1 className="tituloVaga" >{titulo}</h1>
                            <p className="salarioVaga" ><strong>Salário:</strong> R${faixaSalarial}</p>
                            <p className="descricaoVaga" >Descrição: {descricao.substring(0, 100)}...</p>

                            <div className="sectionMatchAltura">

                                {
                                    profissionais.length === 0
                                    ? (
                                        <h3>Nenhum match foi encontrado :(</h3>
                                    )
                                    : (
                                        profissionais.map((item, index) => {

                                            return(
                                                    <div className="sectionMatchProf">
                                                        <div className="sectionMatchProfLargura">
                                                            <p className="dadosProfMatch" ><strong>{item.dadosProfissional.nome}</strong></p>
                                                            <p className="dadosProfMatch">{item.dadosProfissional.email.substring(0, 10)}...</p>
                                                            <p className="dadosProfMatch">{item.dadosProfissional.telefone.substring(0, 8)}...</p>
                                                            {
                                                                item.nivelAcesso === 3 ? 
                                                                    <div className="niveis">
                                                                        <img src={foguinho} alt=""/>
                                                                        <img src={money} alt=""/>
                                                                    </div>
                                                                :
                                                                    item.nivelAcesso === 2 ?
                                                                        <div className="niveis">
                                                                            <img src={foguinho} alt=""/>
                                                                        </div>
                                                                    :
                                                                    <div className="niveis">
                                                                        <img src={money} alt=""/>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>                                                                    
                                            )
                                        })
                                    )
                                }
                            </div>

                        </div>

            

                    </div>
                </div>
            <Rodape />
        </div>
    )
}

export default ListagemVagaEspecifica;