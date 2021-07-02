import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Acessiblidade from '../../utils/acessibility'
import back from '../../imgs/icons/back-black.svg'
import Banner from '../../components/banner'
import './index.css';

const EscolhaCadastro = () => {
    
    useEffect(() => {
        Acessiblidade()
      }, []);

    return(

        <div>
            <div className="body">
                <Link to="/" ><img src={back} className="back-pag" /></Link>
                <div className="sectionLargura1">
                    <div className="sectionEscolha">
                        <Banner titulo="Selecione seu perfil correspondente" position="right"
                            texto="Para que possamos te redirecionar para continuar o cadastro na nossa plataforma, selecione primeiro seu tipo de perfil"
                            img="https://addee.com.br/wp-content/uploads/2018/05/201411-quer-ser-um-profissional-de-ti-de-sucesso-confira-7-dicas-1.jpg"/>
                        <div className="middleSectionPrincipal">
                            <div className="firstLinhaSignup">
                                <div className="atributosPrimeiraLinha">
                                    <img src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" width="150px" />
                                    <h1 className="signUph1">Sign up</h1>
                                    <img src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" width="150px" />
                                    </div>
                            </div>
                            <div className="secondLinhaSignup">
                                <p>Você deseja se cadastrar como?</p>
                            </div>
                            <div className="sectionBotaoEscolha">
                                <a href="/professional/create" class="botaoCadastroContaProfissional">Profissional</a>
                                <h1 className="h1Cadastro">Ou</h1>
                                <a href="/company/create" class="botaoCadastroEmpresa">Empresa</a>
                            </div>
                            <div className="possueCadastro">
                                <p className="linkCadastro" href="">Já possui cadastro?</p> <a className="loginLink" href="/login">Login</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default EscolhaCadastro;