import React, { Component } from "react";
import styled from "styled-components";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const TimeLeft = styled.div`
  width: 40vw;
  height: 50px;
  border: 2px solid rgb(77, 77, 77);
  position: relative;

  &::before {
    content: '';
    width: ${({ width }) => width + "%"};
    height: 50px;
    transition: width 2s ;
    background-color: rgb(77, 77, 77);
    position: absolute;
    left: 0;
    top: 0;
  }
  &::after {
    content: '${({ timeLeft }) => millisToMinutesAndSeconds(timeLeft)}';
    color: rgb(138, 138, 138);
    position: absolute;
    ${"" /* left: ${({ width }) => -10 + width + "%"}; */}
    transform: translateY(-50%);
    top: -50%;
  }
`;

class Timer extends Component {
  render() {
    return (
      <TimeLeft
        width={this.props.timeLeft / this.props.totalTime * 100}
        timeLeft={this.props.timeLeft}
      />
    );
  }
}

export default Timer;
