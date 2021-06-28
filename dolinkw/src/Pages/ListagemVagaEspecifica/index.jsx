import {  useEffect, useState,  React} from 'react';
import './index.css';
import empresaServico from '../../servicos/empresaServico';
import jwtDecode from 'jwt-decode';
import {  Button, Table  } from 'react-bootstrap';
import Header from '../../components/header';
import Rodape from '../../components/footer'
import Acessiblidade from '../../utils/acessibility'

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
        empresaServico
        .listarvaga(IdVaga)
        .then(resultado =>{
            setTitulo(resultado.data.data.titulo)
            setFaixaSalarial(resultado.data.data.faixaSalarial)
            setLocal(resultado.data.data.local)
            setDescricao(resultado.data.data.descricao)
            setBeneficios(resultado.data.data.beneficios)
            console.log(resultado.data.data)
        })
        .catch(erro =>{
            console.error(`erro ${erro}`);
        })
    }

    const listarMatch = () => {

        empresaServico
        .listarmatch(IdVaga)
        .then(resultado => {

            setNome(resultado.data.data.nome)
            setEmail(resultado.data.data.email)
            setTelefone(resultado.data.data.telefone)
            setProfissionais(resultado.data.data)
            console.log(resultado)

        })
        .catch(erro =>{
            console.error(`erro ${erro}`);
        })
    }

    // function copyRoomCode() {
    //     navigator.clipboard.writeText(email);
    // }

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
                            <p className="salarioVaga" >Salário: R${faixaSalarial}</p>
                            <p className="descricaoVaga" >Descrição: {descricao}</p>

                            <div className="sectionMatchAltura">

                                {
                                    profissionais.count === 0
                                    ? (
                                        <h3>Nenhum match foi encontrado :(</h3>
                                    )
                                    : (
                                        profissionais.map((item, index) => {

                                            return(
                                                    <div className="sectionMatchProf">
                                                        <div className="sectionMatchProfLargura">
                                                            <p className="dadosProfMatch" >{item.dadosProfissional.nome}</p>
                                                            <p className="dadosProfMatch">{item.dadosProfissional.email}</p>
                                                            <p className="dadosProfMatch">{item.dadosProfissional.telefone}</p>
                                                            <button className="chatMatch">Chat</button>
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