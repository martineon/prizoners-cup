import React, { Component } from "react";
import anime from "animejs";
import styled from "styled-components";

const Svg = styled.svg`
  opacity: 1;
`;

class Enigm10 extends Component {
  componentDidMount() {
    console.log();
    let timeLine = anime.timeline({
      targets: document.getElementById("enigm10"),
      easing: "linear",
      complete: function(anim) {
        if (anim.completed) {
          let lastTimeline = anime.timeline({
            targets: document.getElementById("enigm10"),
            easing: "linear",
            loop: true
          });
          lastTimeline
            .add({
              opacity: 1,
              duration: 500,
              delay: 4000
            })
            .add({
              opacity: 0,
              duration: 500,
              delay: 3000
            });
          lastTimeline.play;
        }
      }
    });
    timeLine
      .add({
        opacity: 0,
        duration: 500,
        delay: 1000
      })
      .add({
        opacity: 1,
        duration: 500,
        delay: 2000
      })
      .add({
        opacity: 0,
        duration: 500,
        delay: 1000
      })
      .add({
        opacity: 1,
        duration: 500,
        delay: 2000
      })
      .add({
        opacity: 0,
        duration: 500,
        delay: 1000
      })
      .add({
        opacity: 1,
        duration: 500,
        delay: 2000
      })
      .add({
        opacity: 0,
        duration: 500,
        delay: 1000
      })
      .add({
        opacity: 1,
        duration: 500,
        delay: 3000
      })
      .add({
        opacity: 0,
        duration: 500,
        delay: 2000
      });
  }

  render() {
    return (
      <img
        style={{ height: "80%" }}
        id="enigm10"
        src="/assets/enigm10.svg"
        alt=""
      />
    );
  }
}

export default Enigm10;
