import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Option = styled.div`
  width: 15%;
  height: 100%;
  font-size: 20px;
  line-height: 30px;
  position: relative;
  padding: 0 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  top: 1px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ affinage }) =>
    affinage ? "rgb(67, 147, 250)" : "rgb(77, 77, 77)"};
  opacity: ${({ clickable }) => (clickable ? 1 : 0.3)};
  box-shadow: ${({ open }) =>
    open
      ? "0px -15px 35px -15px rgba(0, 0, 0, 0) inset"
      : "0px -15px 35px -15px rgba(0, 0, 0, 0.7) inset"};
`;

class Menu extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "20%"
        }}
      >
        {this.props.affinage ? (
          <Wrapper>
            <Option
              onClick={() => this.props.handleOptionClick("init")}
              open={this.props.open === "init"}
              clickable
              affinage={this.props.affinage}
            >
              Initialisation
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("13")}
              open={this.props.open === "13"}
              clickable
              affinage={this.props.affinage}
            >
              Affinage Signal 13
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("14")}
              open={this.props.open === "14"}
              clickable
              affinage={this.props.affinage}
            >
              Affinage Signal 14
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("15")}
              open={this.props.open === "15"}
              clickable
              affinage={this.props.affinage}
            >
              Affinage Signal 15
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("16")}
              open={this.props.open === "16"}
              clickable
              affinage={this.props.affinage}
            >
              Affinage Signal 16
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("M")}
              open={this.props.open === "M"}
              clickable
              affinage={this.props.affinage}
            >
              M
            </Option>
          </Wrapper>
        ) : (
          <Wrapper>
            <Option
              onClick={() => this.props.handleOptionClick("4")}
              open={this.props.open === "4"}
              clickable
              affinage={this.props.affinage}
            >
              FRÉQUENCE QUANTIQUE FONDAMENTALE 4
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("7")}
              open={this.props.open === "7"}
              clickable
              affinage={this.props.affinage}
            >
              FRÉQUENCE QUANTIQUE FONDAMENTALE 7
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("9")}
              open={this.props.open === "9"}
              clickable
              affinage={this.props.affinage}
            >
              FRÉQUENCE QUANTIQUE FONDAMENTALE 9
            </Option>
            <Option
              onClick={
                this.props.results["9"] === true
                  ? () => this.props.handleOptionClick("10")
                  : ""
              }
              open={this.props.open === "10"}
              affinage={this.props.affinage}
              clickable={this.props.results["9"] === true}
            >
              FRÉQUENCE QUANTIQUE FONDAMENTALE 10
            </Option>
            <Option
              onClick={() => this.props.handleOptionClick("M")}
              open={this.props.open === "M"}
              affinage={this.props.affinage}
              clickable
            >
              M
            </Option>
          </Wrapper>
        )}
      </div>
    );
  }
}

export default Menu;
