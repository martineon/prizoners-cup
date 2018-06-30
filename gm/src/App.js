import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import styled from "styled-components";
import _ from "lodash";

const TabletteWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ResultsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Enigm = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const Button = styled.div`
  padding: 5px 10px;
  font-size: 15px;
  background: rgb(210, 210, 210);
  color: #404040;
  border-radius: 5px;
`;

const socket = openSocket(window.location.hostname + ":8000");

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const start = id => {
  socket.emit("start", { id: id });
};

const stop = id => {
  socket.emit("stop", { id: id });
};

const postToSpreedsheet = data => {
  socket.emit("postToSpreadsheet", data);
};

const restart = id => {
  socket.emit("restart", { id: id });
};

const updateResults1 = cb => {
  socket.on("results enigm /tablette1", data => {
    cb(null, data);
  });
};

const sendAnswer = (id, tabId, bool) => {
  socket.emit("gm answer", {
    id: id,
    tabId: tabId,
    bool: bool
  });
};

const updateResults2 = cb => {
  socket.on("results enigm /tablette2", data => {
    cb(null, data);
  });
};

const updateTimers1 = cb => {
  socket.on("TimeLeft /tablette1", data => {
    cb(null, data);
  });
};

const updateScoring1 = cb => {
  socket.on("update scoring /tablette1", data => {
    cb(null, data);
  });
};

const updateScoring2 = cb => {
  socket.on("update scoring /tablette2", data => {
    cb(null, data);
  });
};

const updateTimers2 = cb => {
  socket.on("TimeLeft /tablette2", data => {
    cb(null, data);
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    updateTimers1((err, data) => {
      this.setState({
        TimeLeft1: data.timeLeft
      });
    });
    updateResults1((err, data) => {
      this.setState({
        results1: data.results
      });
    });
    updateResults2((err, data) => {
      this.setState({
        results2: data.results
      });
    });
    updateTimers2((err, data) => {
      this.setState({
        TimeLeft2: data.timeLeft
      });
    });
    updateScoring1((err, data) => {
      this.setState({
        score1: data.score
      });
    });
    updateScoring2((err, data) => {
      this.setState({
        score2: data.score
      });
    });
    this.state = {
      results1: {},
      results2: {},
      TimeLeft1: 2700000,
      TimeLeft2: 2700000,
      score1: 0,
      score2: 0,
      team1: "",
      email1: "",
      team2: "",
      email2: ""
    };
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <TabletteWrapper>
          <h1>Tablette 1</h1>
          <h3>{millisToMinutesAndSeconds(this.state.TimeLeft1)}</h3>
          <h3>Score: {this.state.score1} pts</h3>
          <Button
            style={{ margin: "5px 0" }}
            onClick={() => start("/tablette1")}
          >
            start Tablette 1
          </Button>
          <Button
            style={{ margin: "5px 0" }}
            onClick={() => stop("/tablette1")}
          >
            stop Tablette 1
          </Button>
          <Button
            style={{ margin: "5px 0" }}
            onClick={() => restart("/tablette1")}
          >
            restart Tablette 1
          </Button>
          <div
            style={{
              width: "50%"
            }}
          >
            {_.map(this.state.results1, (value, key) => {
              return (
                <ResultsWrapper>
                  <Enigm>Enigme {key}: </Enigm>
                  <div>{value ? "Réussi" : "En attente"}</div>
                  <Enigm>
                    <Button
                      onClick={() => sendAnswer(key, "/tablette1", !value)}
                    >
                      {value ? "Annulé" : "Réussi"}
                    </Button>
                  </Enigm>
                </ResultsWrapper>
              );
            })}
          </div>
          {/* <div>
            <label htmlFor="team1">team</label>
            <input
              type="text"
              name="team1"
              onChange={e => this.setState({ team1: e.target.value })}
            />
            <label htmlFor="email1">email</label>
            <input
              type="text"
              name="email1"
              onChange={e => this.setState({ email1: e.target.value })}
            />
            <Button
              onClick={() =>
                postToSpreedsheet({
                  Email: this.state.email1,
                  Team: this.state.team1,
                  Score: this.state.score1
                })
              }
            >
              Envoyer les scores
            </Button>
          </div> */}
        </TabletteWrapper>
        <TabletteWrapper>
          <h1>Tablette 2</h1>
          <h3>{millisToMinutesAndSeconds(this.state.TimeLeft2)}</h3>
          <h3>Score: {this.state.score2} pts</h3>
          <Button
            style={{ margin: "5px 0" }}
            onClick={() => start("/tablette2")}
          >
            start Tablette 2
          </Button>
          <Button
            style={{ margin: "5px 0" }}
            onClick={() => stop("/tablette2")}
          >
            stop Tablette 2
          </Button>
          <Button
            style={{ margin: "5px 0" }}
            onClick={() => restart("/tablette2")}
          >
            restart Tablette 2
          </Button>
          <div
            style={{
              width: "50%"
            }}
          >
            {_.map(this.state.results2, (value, key) => {
              return (
                <ResultsWrapper>
                  <Enigm>Enigme {key}: </Enigm>
                  <div>{value ? "Réussi" : "En attente"}</div>
                  <Enigm>
                    <Button
                      onClick={() => sendAnswer(key, "/tablette2", !value)}
                    >
                      {value ? "Annulé" : "Réussi"}
                    </Button>
                  </Enigm>
                </ResultsWrapper>
              );
            })}
          </div>
          {/* <div>
            <label htmlFor="team2">team</label>
            <input
              type="text"
              name="team2"
              onChange={e => this.setState({ team2: e.target.value })}
            />
            <label htmlFor="email2">email</label>
            <input
              type="text"
              name="email2"
              onChange={e => this.setState({ email2: e.target.value })}
            />
            <Button
              onClick={() =>
            postToSpreedsheet({
            Email: this.state.email2,
            Team: this.state.team2,
            Score: this.state.score2
            })
              }
            >
              Envoyer les scores
            </Button>
          </div> */}
        </TabletteWrapper>
      </div>
    );
  }
}

export default App;
