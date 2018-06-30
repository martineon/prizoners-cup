import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import styled from "styled-components";

import Timer from "./components/Timer";
import Scoring from "./components/Scoring";
import Enigm from "./components/Enigm";

const WrapScoreTimer = styled.div`
  width: 100vw;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  padding: 50px 0;
`;

const Header = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
`;

const Title = styled.div`
  font-size: 40px;
  text-transform: uppercase;
  color: #fff;
`;

const Logo = styled.img`
  width: 9vh;
`;

const api_url = process.env.SERVER_API_URL;

const socket = openSocket(window.location.hostname + ":8000");

socket.on("connect", () => {
  socket.emit("tablette", { tablette: firstPath });
});

const start = id => {
  socket.emit("start", { id: id });
};

const stop = id => {
  socket.emit("stop", { id: id });
};

const restart = id => {
  socket.emit("restart", { id: id });
};

const sendAnswer = (id, answer) => {
  socket.emit("answer", {
    id: id,
    answer: answer,
    tabId: firstPath
  });
};

const firstPath = window.location.pathname.replace(/(\/[^\/]*).*/, "$1");

const updateTimeLeft = cb => {
  socket.on("TimeLeft " + firstPath, data => {
    cb(null, data);
  });
};

const updateResults = cb => {
  socket.on("results enigm " + firstPath, data => {
    cb(null, data);
  });
};

const updateScoring = cb => {
  socket.on("update scoring " + firstPath, data => {
    cb(null, data);
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    updateTimeLeft((err, data) => {
      this.setState({
        timeLeft: data.timeLeft,
        totalTime: data.totalTime
      });
    });
    updateResults((err, data) => {
      this.setState({
        results: data.results
      });
    });
    updateScoring((err, data) => {
      this.setState({
        score: data.score
      });
    });
    this.state = {
      timeLeft: 2700000,
      totalTime: 2700000,
      score: 0,
      enigmToDisplay: 4,
      results: {},
      start: false,
      finish: false
    };
  }

  componentDidMount() {
    console.log(firstPath);
    // start(firstPath);
  }

  render() {
    return (
      <div className="App">
        <Header>
          <div
            style={{
              width: "90vw",
              height: "80%",
              display: "flex",
              padding: "2% 0",
              justifyContent: "space-around",
              alignItems: "center",
              background: "rgb(77, 77, 77)",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px"
            }}
          >
            <Logo src="/assets/Logo.svg" />
            <Title>analyse des fréquences quantiques fondamentales</Title>
            <Logo src="/assets/Logo.svg" />
          </div>
        </Header>
        <WrapScoreTimer>
          <Timer
            timeLeft={this.state.timeLeft}
            totalTime={this.state.totalTime}
          />
          <Scoring score={this.state.score} />
        </WrapScoreTimer>
        <Enigm
          enigmToDisplay={this.state.enigmToDisplay}
          results={this.state.results}
          sendAnswer={(id, answer) => sendAnswer(id, answer)}
        />
      </div>
    );
  }
}

export default App;
