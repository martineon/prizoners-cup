import React, { Component } from "react";
import styled from "styled-components";

const Bar = styled.div`
  width: 40vw;
  height: 50px;
  background-color: rgb(77, 77, 77);
  border: 2px solid rgb(77, 77, 77);
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  & ${Step}:nth-child(20) {
    height: 70px;
    border-right: 5px solid #8b8b8b;
    position: relative;
    &::after {
      content: "2000";
      position: absolute;
      top: -20px;
      font-size: 15px;
    }
  }

  & > div {
    border-right: 3px solid #8b8b8b;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #f00;
    transform-origin: bottom center;
    top: -15px;
    left: -11px;
    transition: transform 2s ease;
    transform: ${({ score }) =>
      "translateX( calc( (40vw / 25) * (" + score + " / 100) ) )"};
  }
  &::before {
    content: "${({ score }) => score}";
    position: absolute;
    width: 20px;
    height: 0;
    transform-origin: bottom center;
    text-align: center;
    top: -40px;
    left: -15px;
    transition: transform 2s ease;
    transform: ${({ score }) =>
      "translateX( calc( (40vw / 25) * (" + score + " / 100) ) )"};
  }
`;

const Step = styled.div`
  width: calc(100% / 25);
  height: 100%;
`;

class Scoring extends Component {
  render() {
    return (
      <Bar score={this.props.score}>
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
      </Bar>
    );
  }
}

export default Scoring;
