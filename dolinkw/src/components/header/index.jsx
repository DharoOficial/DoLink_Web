import React from 'react';
import './index.css';
import jwt_decode from 'jwt-decode';
import { useHistory} from 'react-router-dom';
import logo from '../../imgs/logo.png'
import {  Nav, NavDropdown  } from 'react-bootstrap';

const Header = () => {

    const history = useHistory();

    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem('token-dolink');

        history.push('/');
    }


    const renderMenu = () => {
        const token = localStorage.getItem('token-dolink')
    
        if (token === null) {
            return (
                <div className="cabecalho">
                    <div className="logo">
                        <img src={logo} alt="logo da empresa Dolink" />
                    </div>
                    <div className="botoes">
                        <a className="buttonIn" href="/login">Sign In</a>
                        <a className="buttonUp" href="/choose/signup"> Sign Up</a>
                    </div>
                </div>
            );
        } else if (jwt_decode(token).Roles === "Empresa") {
            // Role = 2 (Administrador)
            // Role = 3 (Padrão)
            return (
                <div className="cabecalho">
                <div className="logo">
                    <img src={logo} alt="logo da empresa Dolink" />
                </div>
                <div className="botoes">
                    <a className="buttonPerfilCompany" href="/company/data" >Empresa</a>
                    <a className="buttonCadastroVagasCompany" href="/vagancy/create" >Cadastro - Vagas</a>
                    <a className="buttonCadastroVagasCompany" href="/vagancy" >Vagas</a>
                    <a className="buttonExitCompany"hreft="" onClick={event => sair(event)}>Sair</a>
                </div>
                </div>
            )
        } else if (jwt_decode(token).Roles === "Profissional") {
            return (
                <div className="cabecalho">
                <div className="logo">
                    <img src={logo} alt="logo da empresa Dolink" />
                </div>
                <div className="botoes">
                    {/* Alterar para /dadosProfissional após fazer cadastro com login incluso */}
                    <a className="buttonPerfilCompany" href="/professional/data">Profissional</a>
                    <a className="buttonSeePreMatch" href='/professional/prematch'>Recomendações</a>
                    <a className="buttonCadastroVagasCompany" href="/professional/matchs">Match</a>
                    <a className="buttonExitCompany"hreft="" onClick={event => sair(event)}>Sair</a>
                </div>
                </div>
            )
        } else {

            return (
                <div className="cabecalho">
                <div className="logo">
                    <img src={logo} alt="logo da empresa Dolink" />
                </div>
                <div className="botoes">
                    <a className="buttonIn" href="/login">Sign In</a>
                    <a className="buttonUp" href="/choose/signup"> Sign Up</a>
                </div>
            </div>
            )
        }
    }
    

    return (

            <div className="botoes">

                { renderMenu () }

            </div>
    )
}

export default Header;