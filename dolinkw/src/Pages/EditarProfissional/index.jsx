import React, { useState, useEffect } from "react";
import { url } from '../../utils/constants';
import Header from "../../components/header";
import Footer from "../../components/footer"
import { useToasts } from 'react-toast-notifications';
import Acessiblidade from '../../utils/acessibility'


const EditarProfissional = () => {
    
    useEffect(() => {
        Acessiblidade()
      }, []);

    const { addToast } = useToasts();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [qtdImgs, setQntdItens] = useState([]);

    const alterar = (event) => {
        event.preventDefault();

        fetch(`${url}professional/update`, {
            method: "PUT",
            body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefone

            }),
            headers: {
                "content-type": "application/json",
            },
        })
            .then(resultado => resultado.json())
            .then(resultado => {
                let a = resultado.mensagem + " " + JSON.stringify(resultado.data);
                console.log(resultado.data)

                setQntdItens(a);

                console.log(resultado.mensagem + " " + JSON.stringify(resultado.data))
                // var separadores = ['"', ':', ',', '}']
                // const keys = a.split(new RegExp('(' + separadores.join('|') + ')'))
                // const keys1 = qtdImgs.split(' ')

                if (resultado.sucesso) {
                    addToast(resultado.mensagem, { appearance: 'success', autoDismiss: true })
                } else {
                    addToast(a, { appearance: 'error', autoDismiss: true })
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="edit">
            <Header />
            <div className="fields">
                <form className="form-cupom" onSubmit={alterar}>
                    <div className="form-group">
                        <div className="textarea">
                            <input
                                type="text"
                                name="nome"
                                value={nome}
                                className="form-control"
                                placeholder="Seu novo nome"
                                onChange={(event) => setNome(event.target.value)}
                            >
                            </input>
                        </div>
                        <div className="textarea">
                            <input
                                type="text"
                                name="email"
                                value={email}
                                className="form-control"
                                placeholder="seu novo email"
                                onChange={(event) => setEmail(event.target.value)}
                            >
                            </input>
                        </div>
                        <div className="textarea">
                            <input
                                type="text"
                                name="telefone"
                                value={telefone}
                                className="form-control"
                                placeholder="seu novo telefone"
                                onChange={(event) => setTelefone(event.target.value)}
                            >
                            </input>
                        </div>
                        <button
                            type="submit"
                            value="vcupom"
                            className="input-btn-vagas"
                        >Editar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditarProfissional;