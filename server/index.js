"use strict";
const express = require("express");
const app = express();
const _ = require("lodash");
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const postToSpreadsheet = require("./spreadsheet.js");
const data = require("./data.json").enigms;
const sanitizeString = require("./func.js");

dotenv.load();

const PORT = process.env.SERVER_API_URL;

app.use(bodyParser.json());

server.listen(PORT);

console.log("Server running on port: " + PORT);

let timer = 2700000;
var allClients = [];
let timeout = 1000;
const tablette = {
  "/tablette1": {
    score: 0,
    timeLeft: timer,
    timerInterval: 0,
    results: {
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "7": false,
      "8": false,
      "9": false,
      "10": false,
      "11": false,
      "12": false,
      "13": false,
      "14": false,
      M: false,
      "10-SC": false,
      T: false
    }
  },
  "/tablette2": {
    score: 0,
    timeLeft: timer,
    timerInterval: 0,
    results: {
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "7": false,
      "8": false,
      "9": false,
      "10": false,
      "11": false,
      "12": false,
      "13": false,
      "14": false,
      M: false,
      "10-SC": false,
      T: false
    }
  }
};

const actualDate = new Date();
// const actualDate = new Date("07/11/2018");
const v1 = new Date("07/5/2018");
const v2 = new Date("07/10/2018");
const v3 = new Date("07/14/2018");

function getVersion() {
  if (actualDate > v1 && actualDate < v2) {
    return "v2";
  } else if (actualDate > v2) {
    return "v3";
  } else {
    return "v1";
  }
}

console.log("version: ", getVersion());

app.get("/", (req, res) => {
  res.send("Go to /tablette1 OR /tablette2 OR /gm");
});

app.use(express.static(path.join(__dirname, "/../tablette", "build")));

app.get("/tablette1", (req, res) => {
  res.sendFile(path.join(__dirname, "/../tablette", "build", "index.html"));
});

app.get("/tablette2", (req, res) => {
  res.sendFile(path.join(__dirname, "/../tablette", "build", "index.html"));
});

app.use(express.static(path.join(__dirname, "/../gm", "build")));
app.get("/gm", (req, res) => {
  res.sendFile(path.join(__dirname, "/../gm", "build", "index.html"));
});

app.get("*", (req, res) => res.send("Go to /tablette1 OR /tablette2 OR /gm"));

function questionSuccess(tabId, id) {
  let enigm = data.filter(item => item.enigm === id)[0];
  tablette[tabId].score = tablette[tabId].score + enigm.point;
  tablette[tabId].results[id] = true;
  io.emit("update scoring" + tabId, { score: tablette[tabId].score });
  // console.log("enigm: ", enigm);
  console.log(`Score ${tabId}: `, tablette[tabId].score);
}

function toggleSucces(tabId, id, bool) {
  let enigm = data.filter(item => item.enigm === id)[0];
  if (bool) {
    tablette[tabId].score = tablette[tabId].score + enigm.point;
  } else {
    tablette[tabId].score = tablette[tabId].score - enigm.point;
  }
  tablette[tabId].results[id] = bool;
  io.emit("update scoring" + tabId, { score: tablette[tabId].score });
}

function handleAnswer(tabId, id, answer) {
  console.log("handle : ", id, " / ", answer, " / tabId", tabId);
  if (tablette[tabId].results[id] === true) {
    return true;
  }
  if (answer !== undefined) {
    let question = data.filter(item => item.enigm === id)[0];

    let sanAnswer = sanitizeString(answer);
    console.log("answer: ", answer);
    console.log("sanAnswer: ", sanAnswer);

    let questionAnswer = () =>
      Array.isArray(question.answers[getVersion()])
        ? question.answers[getVersion()].map(item => item.toUpperCase())
        : question.answers[getVersion()].toUpperCase();

    console.log("questionAnswer: ", questionAnswer());

    switch (question.type) {
      case "word":
        if (Array.isArray(questionAnswer())) {
          if (questionAnswer().indexOf(sanAnswer) !== -1) {
            return questionSuccess(tabId, id);
          }
        } else {
          if (sanAnswer === questionAnswer()) {
            return questionSuccess(tabId, id);
          }
        }
      case "sequence":
        if (Array.isArray(sanAnswer)) {
          let totalGoodAnswer = 0;

          sanAnswer.forEach(item => {
            if (questionAnswer().indexOf(item) !== -1) {
              totalGoodAnswer += 1;
            }

            if (totalGoodAnswer === questionAnswer().length) {
              return questionSuccess(tabId, id);
            } else {
              return false;
            }
          });
        }
      default:
        return true;
    }
  }
}

function startTimer(id) {
  console.log(id);
  stopTimer(id);
  tablette[id].timerInterval = setInterval(() => {
    tablette[id].timeLeft = tablette[id].timeLeft - timeout;
    // console.log("Time Left of " + id + " :" + tablette[id].timeLeft);
    io.emit("update scoring " + id, { score: tablette[id].score });
    io.emit("TimeLeft " + id, {
      timeLeft: tablette[id].timeLeft,
      totalTime: timer
    });
    // gmInfos();
    if (tablette[id].timeLeft === 0 || tablette[id].timeLeft < 0) {
      stopTimer(id);
    }
  }, timeout);
}

function stopTimer(id) {
  clearInterval(tablette[id].timerInterval);
}

function gmInfos() {
  io.emit("gm infos", { tablette: tablette });
}

function sendResults(tabId) {
  io.emit("results enigm " + tabId, { results: tablette[tabId].results });
}

function handlePostError(bool) {
  if (bool) {
    io.emit("post success");
  } else {
    io.emit("post failed");
  }
}

io.on("connection", socket => {
  let tabId;
  socket.emit("users connected", { users: allClients.length });
  socket.on("tablette", data => {
    if (data.tablette === "/tablette1" || data.tablette === "/tablette2") {
      console.log(data);
      tabId = data.tablette;
      socket.emit("TimeLeft", {
        timeLeft: tablette[tabId].timeLeft,
        totalTime: timer
      });
      console.log("User Conect: ", tabId);
    }
  });

  socket.on("take point", data => {
    if (data.calcul === "plus") {
      console.log(tablette[data.tabId].score);
      tablette[data.tabId].score = tablette[data.tabId].score + 100;
    } else if (data.calcul === "moins") {
      console.log(tablette[data.tabId].score);
      tablette[data.tabId].score = tablette[data.tabId].score - 100;
    }
  });

  sendResults("/tablette1");
  sendResults("/tablette2");

  socket.on("answer", data => {
    handleAnswer(data.tabId, data.id, data.answer);
    sendResults(data.tabId);
  });

  socket.on("gm answer", data => {
    toggleSucces(data.tabId, data.id, data.bool);
    sendResults(data.tabId);
  });

  socket.on("start", data => {
    if (data.id === "/tablette1" || data.id === "/tablette2") {
      stopTimer(data.id);
      startTimer(data.id);
      console.log("Game started");
    }
  });

  socket.on("restart", data => {
    // if (data.tablette === "/tablette1" || data.tablette === "/tablette2") {
    tablette[data.id].timeLeft = timer;
    tablette[data.id].score = 0;
    tablette[data.id].results = {
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "7": false,
      "8": false,
      "9": false,
      "10": false,
      "11": false,
      "12": false,
      "13": false,
      "14": false,
      M: false,
      "10-SC": false,
      T: false
    };
    sendResults(data.id);
    stopTimer(data.id);
    io.emit("TimeLeft " + data.id, {
      timeLeft: tablette[data.id].timeLeft,
      totalTime: timer
    });
    // startTimer(data.id);
    console.log("Game restarted");
    // }
  });

  socket.on("stop", data => {
    // if (data.tablette === "/tablette1" || data.tablette === "/tablette2") {
    stopTimer(data.id);
    console.log("Game stopped");
    // }
  });

  // socket.on("disconnect", () => {
  //   let i = allClients.indexOf(socket);
  //   allClients.splice(i, 1);
  //   stopTimer();
  //   console.log("user disconect: ", socket.id);
  // });
});
