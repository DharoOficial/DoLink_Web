import React, { useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Carousel } from "react-bootstrap";
import "./index.css";
import Acessiblidade from '../../utils/acessibility'
  

const Home = () => {
  
  useEffect(() => {
    Acessiblidade()
  }, []);

  return (
    <div>
      <Header />
      <div className="body1">
        <div className="section_firstmain">
          <div className="content">
            <h1>Dê um up em sua carreira!!</h1>
            <p>
              Somos uma empresa que visa a facilitação do encontro entre uma empresa em busca de um profissional e
              um profissional em busca de uma empresa, ou seja, automatizamos esse match!!
            </p>
            <a href="/choosesignup" class="botaoCadastro">
              Cadastrar
            </a>
          </div>

          <div className="imageHome">
            <img
              src="https://media.discordapp.net/attachments/836953521751326720/839940212125073518/unknown.png"
              alt=""
              width="491.65"
              height="344"
            />
          </div>
        </div>
      </div>

      <div className="second_main">
        <div className="sectionLargura">
          <div className="sectionSlide">
            <div className="slideimg1">
              <img
                className="slideImg1"
                src="https://media.discordapp.net/attachments/836953521751326720/839940262985990225/unknown.png?width=722&height=676"
                alt="First slide"
              />
            </div>

            <div className="textoslide1">
              <h1>Quem somos?</h1>
              <p>
                Formados durante a pandemia, a DoLink foi um projeto inicialmente criado para fins acadêmicos, mas que, depois
                de todo o esforço e motivação dos membros nessa jornada, tornou-se um projeto open-source que
                visa ajudar toda a comunidade de dev!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="thirdMain">

        <hr />

        <div className="sectionLarguraThird">

          <div className="textoEsquerdo">

            <h1>Recrute os melhores profissionais</h1>
            <p>Cadastre uma vaga com as skills necessárias para ela, e espere um profissional perfeitamente apropriado dar match!</p>

          </div>

          <div className="textoDireito">

            <a class="botaoVaga">
              Divulgar Vaga
            </a>

          </div>

        </div>

        <hr />

      </div>


      <div className="fourthMain">

        <div className="sectionLarguraFourth">

          <div className="contentFourth">

            <div className="imageLeft">
              <img src="https://media.discordapp.net/attachments/836953521751326720/840223574094118922/imagem_2021-05-07_104605-removebg-preview.png" alt="" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit commodi, porro perferendis corporis labore esse eligendi eum iste illo laboriosam, ab rem quod adipisci saepe sint maiores dolorem fugit.</p>
            </div>

            <div className="imageRight">
              <img src="https://media.discordapp.net/attachments/836953521751326720/840223585863598100/imagem_2021-05-07_104645-removebg-preview.png" alt="" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit commodi, porro perferendis corporis labore esse eligendi eum iste illo laboriosam, ab rem quod adipisci saepe sint maiores dolorem fugit.</p>
            </div>

          </div>

        </div>

      </div>

      {/* <Footer /> */}

    </div>
  );
};

export default Home;
