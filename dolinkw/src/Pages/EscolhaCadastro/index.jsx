import React, {useEffect} from 'react';
import './index.css';
import Acessiblidade from '../../utils/acessibility'

const EscolhaCadastro = () => {
    
    useEffect(() => {
        Acessiblidade()
      }, []);

    return(

        <div>
            <div className="body">

                <div className="sectionLargura1">

                    <div className="sectionEscolha">
                        
                    <a className="botaoBackHome" href="/"><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5434 25.7649L4.28168 16.3077L12.5434 6.85048C13.211 6.08539 13.1331 4.92357 12.3681 4.25533C11.603 3.58772 10.4418 3.6662 9.77291 4.43067L0.454307 15.098C-0.151436 15.7908 -0.151436 16.8251 0.454307 17.5178L9.773 28.1853C10.1371 28.6009 10.6466 28.8143 11.1591 28.8143C11.5883 28.8143 12.0192 28.6648 12.3681 28.36C13.1332 27.6918 13.2116 26.53 12.5434 25.7649Z" fill="black"/>
                        <path d="M31.6345 14.4683H1.8392C0.823359 14.4683 0 15.2915 0 16.3075C0 17.3233 0.823359 18.1467 1.8392 18.1467H31.6345C36.9761 18.1467 41.3216 22.4921 41.3216 27.8332C41.3216 33.1743 36.9761 37.5197 31.6345 37.5197H4.29152C3.27568 37.5197 2.45232 38.343 2.45232 39.3589C2.45232 40.3747 3.27568 41.1981 4.29152 41.1981H31.6345C39.0036 41.1981 45 35.2023 45 27.8332C45 20.4641 39.0042 14.4683 31.6345 14.4683Z" fill="black"/>
                    </svg></a>

                        <div className="middleSectionPrincipal">

                            <div className="firstLinhaSignup">

                                <div className="atributosPrimeiraLinha">
                                    <img src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" width="150px" />
                                    <h1 className="signUph1">Sign up</h1>
                                    <img src="https://cdn.discordapp.com/attachments/836953521751326720/840966116675420200/unknown.png" alt="" width="150px"/>

                                </div>
                                
                            </div>

                            <div className="secondLinhaSignup">

                                <p>Você deseja se cadastrar como?</p>

                            </div>

                            <div className="sectionBotaoEscolha">

                                <a href="/professional/create" class="botaoCadastroContaProfissional">
                                    Profissional
                                </a>

                                <h1 className="h1Cadastro">Ou</h1>

                                <a href="/company/create" class="botaoCadastroEmpresa">
                                    Empresa
                                </a>

                            </div>

                            <div className="possueCadastro">

                                <p className="linkCadastro" href="">Já possui cadastro?</p> <a className="loginLink" href="/login">Login</a>

                            </div>

                        </div>

                    </div>

                    <div className="sectionImage">

                        <img className="imageEscolha" src="https://media.discordapp.net/attachments/836953521751326720/840805164944457758/unknown.png?width=845&height=939" alt="" />

                    </div>                    

                </div>
                
            </div>
        </div>

    )
}

export default EscolhaCadastro;