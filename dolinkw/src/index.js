import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from 'react-toast-notifications'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import LinkedInPage from './Pages/LinkedinReact';
import Home from './Pages/Home';
import EscolhaCadastro from './Pages/EscolhaCadastro';
import CadastroProfissional from './Pages/CadastroProfissional';
import CadastroDeVagas from './Pages/CadastroDeVagas';
import CadastroEmpresa from './Pages/CadastroEmpresa';
import EditarVagas from './Pages/EditarVagas';
import ListagemVagas from './Pages/ListagemVagas';
import ListagemVagaEspecifica from './Pages/ListagemVagaEspecifica';
import PerfilEmpresa from './Pages/PerfilEmpresa';
import Login from './Pages/Login';
import EsqueciMinhaSenha from './Pages/EsqueciMinhaSenha';
import PerfilProfissional from './Pages/PerfilProfissional';
import EditarProfissional from './Pages/EditarProfissional';
import MatchProfissional from './Pages/MatchProfissional';
import AlterarSenha from './Pages/AlterarSenha';
import MatchConfirmadoProf from './Pages/MatchConfirmadoProf';
import EditarEmpresa from './Pages/EditarEmpresa'
import DadosProfissional from './Pages/dadosProfissional';


const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/linkedinpopup" component={LinkedInPopUp} /> */}
      {/* <Route path="/linkedin" component={LinkedInPage} /> */}
      <Route path="/choose/signup" component={EscolhaCadastro}/>
      <Route path="/professional/create" component={CadastroProfissional}/>
      <Route path="/vagancy/create" component={CadastroDeVagas}/>
      <Route path="/company/create" component={CadastroEmpresa}/>
      <Route path="/vagancy/edit" component={EditarVagas}/>
      <Route path="/company/edit" component={EditarEmpresa}/>
      <Route path="/vagancy" component={ListagemVagas}/>
      <Route path="/vagancy/data" component={ListagemVagaEspecifica}/>
      <Route path="/company/data" component={PerfilEmpresa}/>
      <Route path="/professional/data" component={PerfilProfissional}/>
      <Route path="/professional/prematch" component={MatchProfissional}/>
      <Route path="/professional/matchs" component={MatchConfirmadoProf}/>
      <Route path="/professional/data" component={DadosProfissional}/>
      <Route path="/forget/password" component={EsqueciMinhaSenha}/>
      <Route path="/professional/edit" component={EditarProfissional}/>
      <Route path="/update/password" component={AlterarSenha}/>
      <Route path="/login" component={Login}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  <ToastProvider>
    {routing}
  </ToastProvider>,
  document.getElementById('root')
);

reportWebVitals();
