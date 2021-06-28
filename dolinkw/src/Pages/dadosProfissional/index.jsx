import React, { useEffect, useState } from 'react';
import '../../Pages/PerfilEmpresa/index.css';
import Header from '../../components/header';
import Rodape from '../../components/footer';
import { Table, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useFormik } from 'formik';
import { url } from '../../utils/constants';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import profissionalServico from '../../servicos/empresaServico';
import Acessiblidade from '../../utils/acessibility'

const DadosProfissional = () => {

    const { addToast } = useToasts();

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('');

    const token = localStorage.getItem('token-dolink');

    const idProfissional = jwtDecode(token).Id;

    useEffect(() => {

        listarProfissional();
        Acessiblidade();


    }, []);

    const listarProfissional = () => {
        
        fetch(`${url}professional/search/id/${idProfissional}`, {
            method: 'GET',
            headers: {

                'content-type' : 'application/json'

            },
            })
            .then(resultado => resultado.json())
            .then(resultado => {

                if(resultado.sucesso) {
                    
                    console.log(resultado);
                    setNome(resultado.data.nome)
                    setEmail(resultado.data.email)
                    setTelefone(resultado.data.telefone)
                    addToast(resultado.mensagem, { appearance: 'success', autoDismiss: true })

                } else {
                    addToast(resultado.mensagem, { appearance: 'error', autoDismiss: true })
                }

            })



    }


    const excluir = (event) => {
        event.preventDefault();

        const idProfissional = jwtDecode(token).Id;

        fetch(url + 'professional/remove', {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({

                Id: idProfissional

            })
        })
            .then(response => response.json())

            .then(response => {
                let a = response.mensagem + " " + JSON.stringify(response.data);
                if (response.sucesso) {
                    console.log(response)
                    addToast(response.mensagem, { appearance: 'success', autoDismiss: true })
                    history.push('/login');
                } else {
                    addToast(a, { appearance: 'error', autoDismiss: true })
                }
                localStorage.removeItem('token-dolink');
                history.push('/')
            })
    }




    return (
        <div className="backgroundColorPages">
            <Header />

            <div className="titulo">
                <hr className="linha" />
                <div className="esp"></div>
                <h1 className="tituloPerfilEmpresa">Perfil - Profissional</h1>
                <div className="esp"></div>
                <hr className="linha" />
            </div>
        
                        <div>
                            <div className="SectionItensEmpresas">
                                <input type="text" className="itemPerfilEmpresa" placeholder={nome} />
                                <input type="text" className="itemPerfilEmpresa" placeholder={email} />
                                <input type="text" className="itemPerfilEmpresa" placeholder={telefone} />
                            </div>
                            <div className="sectionDeBotoes">
                                <div>
                                </div>
                                <div className="botoesPerfilEmpresa">
                                    <Button variant="warning" value={idProfissional} href="/perfilProfissional" >Editar</Button>
                                    <Button variant="danger" onClick={event => excluir(event)} style={{ marginLeft: '40px' }}>Excluir</Button>
                                </div>
                            </div>
                        </div>
                    )
                )
            
            <Rodape className="rodapePerfilEmpresa" />
        </div>
    )
}
export default DadosProfissional;