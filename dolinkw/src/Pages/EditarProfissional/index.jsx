import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Rodape from "../../components/footer";
import { useToasts } from 'react-toast-notifications';
import { useFormik } from "formik";
import { url, publish } from "../../utils/constants";
import { Table, Button, ProgressBar, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import profissionalServico from "../../servicos/profissionalServico";
import http from "../../utils/http-axious";
import "./index.css";
import { LinkedIn } from "@material-ui/icons";

const EditarProfissional = () => {
    const { addToast } = useToasts();
    const token = localStorage.getItem("token-dolink");
    const idProfissional = jwtDecode(token).Id;
    const history = useHistory();
    const [cpf, setCpf] = useState('')
    const [cep, setCep] = useState('')
    const [ultimaEmpresa, setUltimaEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [descricaoFuncao, setDescricaoFuncao] = useState('');
    const [repositorio, setRepositorio] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [experiencia, setExperiencia] = useState(false);
    const [sobreMim, setSobreMim] = useState('');
    const [faixaSalarial, setFaixaSalarial] = useState('')
    const [dataInicial, setDataInicial] = useState(new Date());
    const [dataFinal, setDataFinal] = useState(new Date());
    const [skills, setSkills] = useState([]);
    const [skillItems, setSkillItems] = useState([{
      id: "", nome: "", nivel: 0, hash: "",
    }]);

  const setSkillValue = (position, campo, valor) => {
    console.log(campo, valor);
    const atualizarSkillItems = skillItems.map((skillItem, index) => {
      if (index === position) {
        return {
          ...skillItem,
          [campo.split("|")[0]]: valor.split("|")[0],
          [campo.split("|")[1]]: valor.split("|")[1],
          [campo.split("|")[2]]: valor.split("|")[2],
          ["nivel"]: valor,
        };
      }

      return skillItem;
    });

    setSkillItems(atualizarSkillItems);
  };
  const addNovaSkillItem = () => {
    setSkillItems([
      ...skillItems, {
            id: "", nome: "", nivel: 0, hash: "",
      }]);

    skillItems.push();
  };

  useEffect(() => {
    listarSkills();
  }, []);

  const listarSkills = () => {
    http
      .get(`${publish}/skills`, {
        method: "GET",
        headers : {
            'Authorization' : `Bearer ${token}`
        }
      })
      .then((resultado) => {
        setSkills(resultado.data.data);
      })
      .catch((err) => console.log(err));
  };

  const Editar = (event) => {
    event.preventDefault();

    fetch(`${publish}/professional/update/general`, {
      method: "PUT",
      body: JSON.stringify({
        Id: idProfissional,
        CPF : cpf,
        CEP : cep,
        SobreMim : sobreMim,
        FaixaSalarial : faixaSalarial,
        LinkedIn : linkedin,
        repositorio : repositorio,
        Curriculo : {
            UltimaEmpresa : ultimaEmpresa,
            DataInicial : dataInicial,
            DataFinal : dataFinal,
            Cargo : cargo,
            DescricaoFuncao : descricaoFuncao,
            NaoTenhoExperiencia : experiencia
        },
        SkillsProfissional: skillItems,
      }),
      headers: {
        "content-type": "application/json",
        'Authorization' : `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then((response) => {
        let a = response.mensagem;

            if(!response.sucesso){
                response.data.map((erro, index) => {
                    var mensagem = "";
                    
                    response.mensagem === "palavras inadequadas" ? 
                    mensagem = `A palavra '${erro.palavra.toUpperCase()}' não pode ser usada`
                    :
                    mensagem = erro.message
                    
                    return addToast(mensagem, { appearance: 'error', autoDismiss: true })
                })
            }

            if(response.sucesso){
                addToast(response.mensagem, { appearance: 'success', autoDismiss : true })
                history.push('/professional/prematch')
            }
    })
    .catch((err) => console.error(err));
  }

  return (
    <div>
        <Header />
        <div className="container_editar_profissional_form">
            <Form className="formulario_editar_profissional">
                <h2>Finalize seu cadastro com dados adicionais!</h2>
                <fieldset>
                    <legend>Dados a profissional <hr/></legend>
                    <div className="campos">                                                    
                        <Form.Group controlId="formBasicCnpj" className="input-block">
                            <Form.Label>Cpf da profissional : </Form.Label>
                            <Form.Control type="text" value={cpf} onChange={e => setCpf(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCep" className="input-block">
                            <Form.Label>CEP da profissional :</Form.Label>
                            <Form.Control type="text" value={cep} onChange={e => setCep(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicDescricao" className="input-block">
                            <Form.Label>Sobre mim :</Form.Label>
                            <Form.Control as="textarea" rows={3} value={sobreMim} onChange={e => setSobreMim(e.target.value)}/>
                        </Form.Group>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Informações adicionais <hr/></legend>
                    <div className="campos">
                        <Form.Group controlId="formBasicCep" className="input-block">
                            <Form.Label>Faixa salarial :</Form.Label>
                            <Form.Control type="number" value={faixaSalarial} onChange={e => setFaixaSalarial(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicDominio" className="input-block">
                            <Form.Label>LinkedIn do profissional</Form.Label>
                            <Form.Control type="url" placeholder="http:// ...." value={linkedin} onChange={e => setLinkedin(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicDominio" className="input-block">
                            <Form.Label>Github do profissional</Form.Label>
                            <Form.Control type="url" placeholder="http:// ...." value={repositorio} onChange={e => setRepositorio(e.target.value)}/>
                        </Form.Group>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Experiência do profissional <hr/></legend>
                    <div className="campos">
                        <Form.Group controlId="formBasicCep" className="input-block">
                            <Form.Label>Última empresa :</Form.Label>
                            <Form.Control type="text" value={ultimaEmpresa} onChange={e => setUltimaEmpresa(e.target.value)}/>
                        </Form.Group>

                        <div className="form-input-data">
                            <Form.Group controlId="formBasicDatas" className="input-block input-block-date">
                                <Form.Label>Data inicial :</Form.Label>
                                <input id="dateStart" type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={dataInicial} onChange={e => setDataInicial(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDatas" className="input-block input-block-date">
                                <Form.Label>Data final :</Form.Label>
                                <input id="dateFinish" type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={dataFinal} onChange={e => setDataFinal(e.target.value)}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group controlId="formBasicCep" className="input-block">
                            <Form.Label>Último cargo :</Form.Label>
                            <Form.Control type="text" value={cargo} onChange={e => setCargo(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicDominio" className="input-block">
                            <Form.Label>Descreva sua função :</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descricaoFuncao} onChange={e => setDescricaoFuncao(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox" className="input-block inputCheck">
                            <Form.Label>Eu não possuo experiência profissional!</Form.Label>
                            <Form.Check name="terms" value={experiencia} onChange={e => setExperiencia(e.target.value)}
                            /*isInvalid={!!errors.terms}
                            feedback={errors.terms}*//>
                        </Form.Group>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Habilidades e skills  <hr/></legend>
                    <div className="campos">
                        <div className="campos-select">
                            <button type="button" className="botaoAddSkill"
                                        onClick={addNovaSkillItem}>+ adicionar habilidade</button>
                            <div></div>
                        </div>
                        {
                        skillItems.map((skill, index) => {
                            return (
                                <div className="selects_style_profissional">
                                    <Form.Group controlId="formBasicSkill">
                                        <Form.Control className="select_skill_profissional" as="select" value={`${skill.id}|${skill.nome}|${skill.hash}`}
                                                        onChange={e => setSkillValue(index, "id|nome|hash", e.target.value)}>
                                            <option value="||" hidden>Selecione uma opção</option>
                                            {
                                                skills.map((item, index) => {
                                                    return (
                                                        <option key={item.id} value={`${item.id}|${item.nome}|${item.hash}`}>{item.nome}</option>
                                                    );
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicSkillNivel">
                                        <Form.Control className="select_skill_nivel_profissional" as="select" value={skill.nivel}
                                            onChange={e => setSkillValue(index, "nivel", e.target.value)}>
                                            <option value="0" hidden>Selecione um nível</option>
                                            <option value="1">Basico</option>
                                            <option value="2">Intermediario</option>
                                            <option value="3">Avançado</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            );
                        })}
                    </div>
                </fieldset>
                <div className="buttons_profissional">
                    {/* {
                        cnpj === '' || cep === '' || regiao === '' || descricao === '' || dominio === '' ?
                            <Button variant="success" type="submit" className="confirm" disabled>Finalizar</Button>
                            : */}
                            <Button variant="success" type="submit" className="confirm"
                                onClick={e => Editar(e)}>Finalizar</Button>
                    {/* } */}
                </div>
            </Form>
        </div>
        <Rodape className="rodapePerfilprofissional" />
    </div>
  );
};

export default EditarProfissional;
