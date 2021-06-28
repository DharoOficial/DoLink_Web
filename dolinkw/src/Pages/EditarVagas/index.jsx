import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer"
import LogoVaga from '../../imgs/Logovaga.png'
import "./index.css";
import { useToasts } from 'react-toast-notifications';
import Acessiblidade from '../../utils/acessibility'




const EditarVagas = () => {
    
    useEffect(() => {
        Acessiblidade()
      }, []);
    
    const { addToast } = useToasts();
    const [titulo, setTitulo] = useState("");
    const [faixasalarial, setFaixasalarial] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");
    const [beneficios, setBeneficios] = useState("");


    const [images, setImages] = useState([]);

    const onFileChange = (files) => {
        setImages(f => [...f, ...files]);
    };

    const handleClick = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {

            formData.append(`images`, images[i]);
        }

        fetch('https://609a8adb0f5a13001721b68b.mockapi.io/api/v1/', {
            body: formData,
            method: "POST"
        }).then(res => console.log(res));
    };



    const alterar = (event) => {
        event.preventDefault();

        fetch('https://localhost:5001/v1/vagancy/update', {
            method: "PUT",
            body: JSON.stringify({
                id: "60b6710ccd5b4b4cffea7453",
                titulo: titulo,
                faixasalarial: faixasalarial,
                local: local,
                descricao: descricao,
                beneficios: beneficios

            }),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                // Verifica se a validação for OK e caso seja, informa a resposta
                let a = response.mensagem + " " + JSON.stringify(response.data);
                if(response.sucesso) {
                    addToast(response.mensagem, { appearance: 'success', autoDismiss : true })
                } else {
                    addToast(a, { appearance: 'error', autoDismiss : true })
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="main">
            <Header />
            <div className="titulo">
                <hr className="linha" />
                <div className="esp"></div>
                <h1>Editar Vaga</h1>
                <div className="esp"></div>
                <hr className="linha" />
            </div>
            {/* <div className="imagem">
                <img src={LogoVaga} alt="Logo da vaga da empresa" />
            </div> */}
            {/* <div className="logovaga">
                <form>

                    <label For="arquivo">escolha a logo da empresa</label>
                    <input type="file" alt="escolha a logo da empresa" id="arquivo" multiple={true} onChange={e => onFileChange(e.target.files)} />

                </form>

                <button class="button" onClick={handleClick}>Upload</button>
            </div> */}
            <form className="form-cupom-edit" onSubmit={alterar}>
                        <div className="form-group-edit">
                            <div className="textarea-edit">
                                <input
                                    type="text"
                                    name="titulo novo"
                                    value={titulo}
                                    className="form-control-edit"
                                    placeholder="Titulo"
                                    onChange={(event) => setTitulo(event.target.value)}
                                >
                                </input>
                            </div>
                            <div className="textarea-edit">
                                <input
                                    type="text"
                                    name="faixasalarial nova"
                                    value={faixasalarial}
                                    className="form-control-edit"
                                    placeholder="Faixa Salarial"
                                    onChange={(event) => setFaixasalarial(event.target.value)}
                                >
                                </input>
                            </div>
                            <div className="textarea-edit">
                                <input
                                    type="text"
                                    name="local novo"
                                    value={local}
                                    className="form-control-edit"
                                    placeholder="Local"
                                    onChange={(event) => setLocal(event.target.value)}
                                >
                                </input>
                            </div>
                            <div className="textarea-edit">
                                <input
                                    type="text"
                                    name="descricao nova"
                                    value={descricao}
                                    className="form-control-edit"
                                    placeholder="Descrição da vaga"
                                    onChange={(event) => setDescricao(event.target.value)}
                                >
                                </input>
                            </div>
                            <div className="textarea-edit">
                                <input 
                                    type="text"
                                    name="beneficios novo"
                                    value={beneficios}
                                    className="form-control-edit"
                                    placeholder="Beneficios"
                                    onChange={(event) => setBeneficios(event.target.value)}
                                >
                                </input>
                                
                            </div>
                            <button
                                class="salvar"
                                type="submit"
                                value="vcupom"
                                className="input-btn2"
                            >Editar</button>
                        </div>
                    </form>
                    <Footer/>
        </div>
    );
}

export default EditarVagas;
