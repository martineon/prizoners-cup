import React, { Component } from "react";
import styled from "styled-components";

import Enigm10 from "./enigm10.js";

const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  background-color: ${({ affinage }) =>
    affinage ? "rgb(67, 147, 250)" : "rgb(77, 77, 77)"};
  display: flex;
  align-items: center;
`;

const AnswerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 90%;
  width: 100%;
`;
const Image = styled.img`
  height: 80%;
`;

const Input = styled.input`
  width: 50vw;
  height: 60px;
  font-size: 30px;
  border-radius: 5px;
  text-align: center;
  border: none;
`;

const InputOne = styled.input`
  width: 50px;
  height: 50px;
  font-size: 30px;
  text-align: center;
  border-radius: 5px;
  border: none;
`;

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.div`
  padding: 0 25px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  background: rgb(187, 187, 187);
  border-radius: 5px;
`;

const Title = styled.h1`
  color: #fff;
  text-transform: uppercase;
`;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      answerTen: [],
      answerM: ["", "", ""],
      scanClick: false,
      reqFrequence: false
    };
  }

  handleMultipleInput = (e, i) => {
    let answer = this.state.answerTen;
    answer[i] = e.target.value;
    this.setState({
      answerTen: answer
    });
  };

  handleAnswerM = (e, i) => {
    let answer = this.state.answerM;
    answer[i] = e.target.value;
    this.setState({
      answerM: answer
    });
  };

  renderEnigm = () => {
    switch (this.props.open) {
      case "4":
        return (
          <AnswerWrapper>
            {this.props.results["4"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <AnswerWrapper>
                <Title>FRÉQUENCE QUANTIQUE FONDAMENTALE 4</Title>
                <Input
                  type="text"
                  placeholder="Un mot"
                  onKeyPress={e =>
                    e.key === "Enter"
                      ? this.props.sendAnswer("4", this.state.answer)
                      : ""
                  }
                  onChange={e => this.setState({ answer: e.target.value })}
                />
                <Button
                  onClick={() => this.props.sendAnswer("4", this.state.answer)}
                >
                  Valider
                </Button>
              </AnswerWrapper>
            )}
          </AnswerWrapper>
        );
      case "7":
        return (
          <AnswerWrapper>
            {this.props.results["7"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <AnswerWrapper>
                <Title>FRÉQUENCE QUANTIQUE FONDAMENTALE 7</Title>
                <Input
                  type="text"
                  placeholder="Un mot"
                  onChange={e => this.setState({ answer: e.target.value })}
                  onKeyPress={e =>
                    e.key === "Enter"
                      ? this.props.sendAnswer("7", this.state.answer)
                      : ""
                  }
                />
                <Button
                  onClick={() => this.props.sendAnswer("7", this.state.answer)}
                >
                  Valider
                </Button>
              </AnswerWrapper>
            )}
          </AnswerWrapper>
        );
      case "9":
        return (
          <AnswerWrapper>
            {this.props.results["9"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <AnswerWrapper>
                <Title>FRÉQUENCE QUANTIQUE FONDAMENTALE 9</Title>
                <Input
                  type="text"
                  placeholder="Un nombre"
                  onChange={e => this.setState({ answer: e.target.value })}
                  onKeyPress={e =>
                    e.key === "Enter"
                      ? this.props.sendAnswer("9", this.state.answer)
                      : ""
                  }
                />
                <Button
                  onClick={() => this.props.sendAnswer("9", this.state.answer)}
                >
                  Valider
                </Button>
              </AnswerWrapper>
            )}
          </AnswerWrapper>
        );
      case "10":
        return (
          <AnswerWrapper>
            {this.props.results["10"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <BoxWrapper>
                {!this.state.scanClick && !this.state.reqFrequence ? (
                  ""
                ) : (
                  <Box>
                    <Enigm10 />
                  </Box>
                )}

                {!this.state.scanClick ? (
                  <AnswerWrapper>
                    <Button onClick={() => this.setState({ scanClick: true })}>
                      Lancer le scan
                    </Button>
                  </AnswerWrapper>
                ) : (
                  <Box>
                    <Title>FRÉQUENCE QUANTIQUE FONDAMENTALE 10</Title>
                    <Row>
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 0)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 1)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 2)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 3)}
                      />
                    </Row>
                    <Row>
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 4)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 5)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 6)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 7)}
                      />
                    </Row>
                    <Row>
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 8)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 9)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 10)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 11)}
                      />
                    </Row>
                    <Row>
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 12)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 13)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 14)}
                      />
                      <InputOne
                        maxLength="1"
                        type="text"
                        onChange={e => this.handleMultipleInput(e, 15)}
                      />
                    </Row>
                    <Button
                      onClick={() =>
                        this.props.sendAnswer(
                          "10",
                          this.state.answerTen.join("")
                        )
                      }
                    >
                      Valider
                    </Button>
                  </Box>
                )}
              </BoxWrapper>
            )}
          </AnswerWrapper>
        );
      case "M":
        return (
          <AnswerWrapper>
            {this.props.results["M"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <AnswerWrapper>
                <Title>Quantum Tags</Title>
                <Input
                  type="text"
                  placeholder="Des caractères"
                  onChange={e => this.handleAnswerM(e, 0)}
                  tabIndex="1"
                />
                <Input
                  type="text"
                  placeholder="Des caractères"
                  onChange={e => this.handleAnswerM(e, 1)}
                  tabIndex="2"
                />
                <Input
                  type="text"
                  placeholder="Des caractères"
                  onChange={e => this.handleAnswerM(e, 2)}
                  tabIndex="3"
                />
                <Button
                  onClick={() => this.props.sendAnswer("M", this.state.answerM)}
                >
                  Valider
                </Button>
              </AnswerWrapper>
            )}
          </AnswerWrapper>
        );
      case "init":
        return (
          <AnswerWrapper>
            <Title>Affinage du Signal</Title>
            <img src="/assets/init-affinage.png" alt="" />
          </AnswerWrapper>
        );
      case "13":
        return (
          <AnswerWrapper>
            {this.props.results["13"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <AnswerWrapper>
                <Input
                  type="text"
                  placeholder="Un mot"
                  onChange={e => this.setState({ answer: e.target.value })}
                  onKeyPress={e =>
                    e.key === "Enter"
                      ? this.props.sendAnswer("9", this.state.answer)
                      : ""
                  }
                />
                <Button
                  onClick={() => this.props.sendAnswer("13", this.state.answer)}
                >
                  Valider
                </Button>
              </AnswerWrapper>
            )}
          </AnswerWrapper>
        );
      case "14":
        return (
          <AnswerWrapper>
            {this.props.results["14"] === true ? (
              <Title>Réussi</Title>
            ) : (
              <AnswerWrapper>
                <Input
                  type="text"
                  placeholder="Un mot"
                  onChange={e => this.setState({ answer: e.target.value })}
                  onKeyPress={e =>
                    e.key === "Enter"
                      ? this.props.sendAnswer("9", this.state.answer)
                      : ""
                  }
                />
                <Button
                  onClick={() => this.props.sendAnswer("14", this.state.answer)}
                >
                  Valider
                </Button>
              </AnswerWrapper>
            )}
          </AnswerWrapper>
        );
      default:
        return (
          <AnswerWrapper>
            <Input
              type="text"
              onChange={e => this.setState({ answer: e.target.value })}
              placeholder="Un mot"
            />
            <Button>Valider</Button>
          </AnswerWrapper>
        );
    }
  };

  render() {
    return (
      <Wrapper affinage={this.props.affinage}>{this.renderEnigm()}</Wrapper>
    );
  }
}

export default Content;
