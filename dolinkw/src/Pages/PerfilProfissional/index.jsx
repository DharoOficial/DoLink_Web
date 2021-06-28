import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Rodape from "../../components/footer";
import { useFormik } from "formik";
import { url } from "../../utils/constants";
import { Table, Button, ProgressBar, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import profissionalServico from "../../servicos/profissionalServico";
import http from "../../utils/http-axious";
import "./index.css";
import { LinkedIn } from "@material-ui/icons";
import Acessiblidade from '../../utils/acessibility'


const PerfilProfissional = () => {
  const token = localStorage.getItem("token-dolink");

  const idProfissional = jwtDecode(token).Id;

  const history = useHistory();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [ultimaEmpresa, setUltimaEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [descricaoFuncao, setDescricaoFuncao] = useState("");

  const [repositorio, setRepositorio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [sobreMim, setSobreMim] = useState("");

  const [profissionais, setProfissionais] = useState([]);
  const [skills, setSkills] = useState([]);

  const [skillItems, setSkillItems] = useState([
    {
      id: "",
      nome: "",
      nivel: 0,
      hash: "",
    },
  ]);

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
      ...skillItems,
      {
        id: "",
        nome: "",
        nivel: 0,
        hash: "",
      },
    ]);

    skillItems.push();
  };

  useEffect(() => {
    Acessiblidade();
    listarProfissional();
    listarSkills();
  }, []);

  const listarSkills = () => {
    http
      .get("https://localhost:5001/v1/skills", {
        method: "GET",
      })
      .then((resultado) => {
        setSkills(resultado.data.data);
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      nome: "",
      email: "",
      telefone: "",
      ultimaEmpresa: "",
      cargo: "",
      descricaoFuncao: "",
      repositorio: "",
      linkedin: "",
      sobreMim: "",
    },
  });


  const listarProfissional = () => {
    profissionalServico
      .listar()
      .then((resultado) => {
        setProfissionais(resultado.data.data);
      })
      .catch((erro) => {
        console.error(`erro ${erro}`);
      });
  };

  // const editar = (event) =>{
  //     event.preventDefault();

  //     const empresa = empresas.filter(x => {

  //         return x.id === event.target.value;

  //     })

  //     formik.setValues({

  //         id : empresa[0].id,
  //         nome : empresa[0].nome,
  //         cnpj : empresa[0].cnpj,
  //         cep : empresa[0].cep,
  //         regiao : empresa[0].regiao,
  //         telefone : empresa[0].telefone

  //     })
  // }

  const alterar = (event) => {
    event.preventDefault();

    fetch(`${url}professional/update/general`, {
      method: "PUT",
      body: JSON.stringify({
        Id: idProfissional,
        Repositorio: repositorio,
        Linkedin: linkedin,
        SobreMim: sobreMim,
        UltimaEmpresa: ultimaEmpresa,
        Cargo: cargo,
        DescricaoFuncao: descricaoFuncao,
        SkillsProfissional: skillItems,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        // Verifica se a validação for OK e caso seja, informa a resposta
        if (response.ok) {
          console.log(response.json());
          alert("Cadastro Finalizado!");
          history.push("/matchProfissional");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />

      <form className="sectionPerfilProfissionalAltura" onSubmit={alterar}>
        <div className="sectionPerfilProfissionalLargura">
          <Table className="tabelaPerfilEmpresa">
            <tbody>
              {profissionais
                .filter((item) => jwtDecode(token).Id === item.id)
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <div className="itensPerfilProfissional">
                        <div className="sectionItensProfissional">
                          <h2>Finalize seu cadastro com dados adicionais!</h2>

                          <div className="sectionDadosAdicionais">
                            <div className="portfolioSection">
                              <legend>Seu Portfólio</legend>
                              <input
                                type="text"
                                className="form-control"
                                value={repositorio}
                                placeholder="Link do GitHub"
                                onChange={(event) =>
                                  setRepositorio(event.target.value)
                                }
                              />

                              <input
                                type="text"
                                className="form-control"
                                value={linkedin}
                                placeholder="Link do Linkedin"
                                onChange={(event) =>
                                  setLinkedin(event.target.value)
                                }
                              />

                              <input
                                type="text"
                                className="form-control"
                                value={sobreMim}
                                placeholder="Sobre Mim!"
                                onChange={(event) =>
                                  setSobreMim(event.target.value)
                                }
                              />
                            </div>
                            <div className="dadosProfissionaisSection">
                              <legend>Dados Profissionais</legend>
                              <input
                                type="text"
                                className="form-control"
                                value={ultimaEmpresa}
                                placeholder="Última Empresa (Não é obrigatório)"
                                onChange={(event) =>
                                  setUltimaEmpresa(event.target.value)
                                }
                              />

                              <input
                                type="text"
                                className="form-control"
                                value={cargo}
                                placeholder="Cargo (Não é obrigatório)"
                                onChange={(event) =>
                                  setCargo(event.target.value)
                                }
                              />

                              <input
                                type="text"
                                className="form-control"
                                value={descricaoFuncao}
                                placeholder="Função (Não é obrigatório)"
                                onChange={(event) =>
                                  setDescricaoFuncao(event.target.value)
                                }
                              />
                            </div>
                            <div className="skillsSection">
                              <fieldset>
                                <legend>
                                  Skills
                                  <button
                                    type="button"
                                    className="botaoAddSkill"
                                    onClick={addNovaSkillItem}
                                  >
                                    + adicionar habilidade
                                  </button>
                                </legend>
                                <div className="campos">
                                  {skillItems.map((skill, index) => {
                                    return (
                                      <div className="selects_style">
                                        <Form.Group controlId="formBasicSkill">
                                          <Form.Control
                                            className="select_skill"
                                            as="select"
                                            value={`${skill.id}|${skill.nome}|${skill.hash}`}
                                            onChange={(e) =>
                                              setSkillValue(
                                                index,
                                                "id|nome|hash",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="||" hidden>
                                              Selecione uma opção
                                            </option>
                                            {skills.map((item, index) => {
                                              return (
                                                <option
                                                  key={item.id}
                                                  value={`${item.id}|${item.nome}|${item.hash}`}
                                                >
                                                  {item.nome}
                                                </option>
                                              );
                                            })}
                                          </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicSkillNivel">
                                          <Form.Control
                                            className="select_skill_nivel"
                                            as="select"
                                            value={skill.nivel}
                                            onChange={(e) =>
                                              setSkillValue(
                                                index,
                                                "nivel",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="0" hidden>
                                              Selecione um nível
                                            </option>
                                            <option value="1">Basico</option>
                                            <option value="2">
                                              Intermediario
                                            </option>
                                            <option value="3">Avançado</option>
                                          </Form.Control>
                                        </Form.Group>
                                      </div>
                                    );
                                  })}
                                </div>
                              </fieldset>
                            </div>

                            <button
                              type="submit"
                              className="botao-profissional"
                            >
                              Finalizar!
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* <div className="botoesPerfilProfissional">
                                                <Button variant="warning" value={item.id} onClick={event => alterar(event)} >Editar</Button>
                                                <Button variant="danger" value={item.id} OnClick={event => excluir(event)} style={{ marginLeft : '40px'}}>Desativar</Button>
                                            </div> */}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </form>
      <Rodape className="rodapePerfilEmpresa" />
    </div>
  );
};

export default PerfilProfissional;
