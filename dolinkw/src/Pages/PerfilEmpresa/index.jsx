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
import empresaServico from '../../servicos/empresaServico';
import Acessiblidade from '../../utils/acessibility'

const PerfilEmpresa = () => {
    
    const { addToast } = useToasts();
    
    const history = useHistory();
    
    const [idEmpresa, setIdEmpresa] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cep, setCep] = useState('');
    const [regiao, setRegiao] = useState('');
    const [empresas, setEmpresas] = useState([]);
    
    const token = localStorage.getItem('token-dolink');
    
    const formik = useFormik({
        initialValues: {
            
            id: 0,
            nome: '',
            cnpj: '',
            cep: '',
            regiao: '',
            telefone: ''
            
        }
    })
    
    useEffect(() => {
        Acessiblidade();
        listarEmpresa();
        
    }, []);

    const listarEmpresa = () => {
        empresaServico
            .listar()
            .then(resultado => {
                setEmpresas(resultado.data.data);
                console.log(JSON.stringify(empresas));
            })
            .catch(erro => {
                console.error(`erro ${erro}`);
            })
    }

    const editar = (event) => {
        event.preventDefault();

        const empresa = empresas.filter(x => {

            return x.id === event.target.value;

        })

        formik.setValues({

            id: empresa[0].id,
            nome: empresa[0].nome,
            cnpj: empresa[0].cnpj,
            cep: empresa[0].cep,
            regiao: empresa[0].regiao,
            telefone: empresa[0].telefone

        })
    }

    const alterar = (event) => {
        event.preventDefault();

        fetch(`${url}company/update`, {
            method: "PUT",
            body: JSON.stringify({
                Nome: nome,
                CNPJ: cnpj,
                CEP: cep,
                Regiao: regiao,
                Telefone: telefone,

            }),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                // Verifica se a validação for OK e caso seja, informa a resposta
                console.log(response);

            })
            .catch((err) => console.error(err));
    };


    const excluir = (event) => {
        event.preventDefault();

        const idEmpresa = jwtDecode(token).Id;

        fetch(url + 'company/remove', {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({

                Id: idEmpresa

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
                <h1 className="tituloPerfilEmpresa">Perfil - Empresa</h1>
                <div className="esp"></div>
                <hr className="linha" />
            </div>
            {
                empresas.filter(item => jwtDecode(token).Id === item.id).map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="SectionItensEmpresas">
                                <input type="text" className="itemPerfilEmpresa" placeholder={item.nome} />
                                <input type="text" className="itemPerfilEmpresa" placeholder={item.cnpj} />
                                <input type="text" className="itemPerfilEmpresa" placeholder={item.cep} />
                                <input type="text" className="itemPerfilEmpresa" placeholder={item.regiao} />
                                <input type="text" className="itemPerfilEmpresa" placeholder={item.telefone} />
                            </div>
                            <div className="sectionDeBotoes">
                                <div>
                                </div>
                                <div className="botoesPerfilEmpresa">
                                    <Button variant="warning" value={item.id} onClick={event => alterar(event)} >Editar</Button>
                                    <Button variant="danger" onClick={event => excluir(event)} style={{ marginLeft: '40px' }}>Excluir</Button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <Rodape className="rodapePerfilEmpresa" />
        </div>
    )
}
export default PerfilEmpresa;