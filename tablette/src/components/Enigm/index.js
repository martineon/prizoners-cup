import React, { Component } from "react";
import styled from "styled-components";

import Menu from "./menu.js";
import Content from "./content.js";

const Wrapper = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Mail = styled.div`
  width: 80%;
  height: 80%;
  background: #fff;
  color: #000;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  width: 50%;
  height: 60px;
  border-radius: 5px;
  font-size: 25px;
  border: 2px solid rgb(125, 125, 125);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Enigm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: "4",
      finishFrequence: false,
      mail: false,
      affinage: false
    };
  }

  handleOptionClick = id => {
    console.log(id);
    this.setState({ open: id });
  };

  handleFinishFrequence = () => {
    this.setState({
      finishFrequence: true
    });
    window.setTimeout(() => this.setState({ mail: true }), 5000);
  };

  showAffinage = () => {
    this.setState({
      affinage: true
    });
    this.handleOptionClick("init");
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.results["4"] === true &&
      nextProps.results["7"] === true &&
      nextProps.results["9"] === true &&
      nextProps.results["10"] === true
    ) {
      this.handleFinishFrequence();
    }
  }

  render() {
    return (
      <Wrapper>
        {this.state.finishFrequence && !this.state.affinage ? (
          !this.state.mail ? (
            <p style={{ fontSize: "25px" }}>
              Fréquence quantiques fondamentales cohérentes : Initialisation du
              processus d’ouverture de la faille spatio-temporelle
            </p>
          ) : (
            <Mail>
              <p style={{ fontSize: "25px", textAlign: "left" }}>
                Agents, <br />
                <br /> Bravo! Mission accomplie !! <br />
                <br /> Votre requête a été traitée par le centre d’analyse
                quantique : la faille spatio-temporelle est en cours
                d’ouverture. <br />
                <br /> Afin de faciliter le travail des prochaines semaines et
                pour démontrer plus avant vos compétences, vous pouvez dès
                maintenant commencer l’affinage du signal. <br />
                <br /> Tout le QG vous remercie et vous félicite! <br />
                <br /> Agent Laure Fontville
              </p>
              <Button onClick={this.showAffinage}>Commencer l'affinage</Button>
            </Mail>
          )
        ) : (
          <div style={{ width: "90%", height: "100%" }}>
            <Menu
              handleOptionClick={id => this.handleOptionClick(id)}
              open={this.state.open}
              affinage={this.state.affinage}
              results={this.props.results}
              affinage={this.state.affinage}
            />
            <Content
              open={this.state.open}
              sendAnswer={(id, answer) => this.props.sendAnswer(id, answer)}
              results={this.props.results}
              handleFinishFrequence={this.handleFinishFrequence}
              affinage={this.state.affinage}
            />
          </div>
        )}
      </Wrapper>
    );
  }
}

export default Enigm;
