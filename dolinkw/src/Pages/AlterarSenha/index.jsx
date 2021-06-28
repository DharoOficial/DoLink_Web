import React, { useState, useEffect } from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer"
import "./index.css";
import Acessiblidade from '../../utils/acessibility'

const AlterarSenha = () => {
    
    useEffect(() => {
        Acessiblidade()
      }, []);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [conf, setConf] = useState("");

    const alterar = (event) => {
        event.preventDefault();

        fetch('https://localhost:5001/v1/account/update/password', {
            method: "PUT",
            body: JSON.stringify({
                senha: senha,
                email: email,
                conf: conf,

            }),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                // Verifica se a validação for OK e caso seja, informa a resposta
                if (response.ok) {
                    console.log(response.json());
                    alert('senha alterada')
                }
            })
            .catch((err) => console.error(err));
    };

    return (

        <div className="mainn">
            <Header />
            <div className="controlee">
                <form className="form-cupom" onSubmit={alterar}>
                    <div className="form-group">
                        <div className="barra"></div>
                        <div className="textarea">
                            <input
                                type="text"
                                name="email1"
                                value={email}
                                className="form-control"
                                placeholder="coloque seu email"
                                onChange={(event) => setEmail(event.target.value)}
                            >
                            </input>
                        </div>
                        <div className="textarea">
                            <input
                                type="password"
                                name="senha1"
                                value={senha}
                                className="form-control"
                                placeholder="Coloque sua nova senha"
                                onChange={(event) => setSenha(event.target.value)}
                            >
                            </input>
                        </div>
                        <div className="textarea">
                            <input
                                type="password"
                                name="conf1"
                                value={conf}
                                className="form-control"
                                placeholder="Confirme sua nova senha"
                                onChange={(event) => setConf(event.target.value)}
                            >
                            </input>
                        </div>
                        <div className="btn">
                            <button
                                name="alterar"
                                type="submit"
                                value="vcupom"
                                className="input-btn-vagas"
                            >alterar</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )

}

export default AlterarSenha;
