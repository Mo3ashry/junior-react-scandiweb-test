import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

export default class BallsLoader extends Component {
  loadAnimate = keyframes`
  50%{opacity:.2;}
  to{opacity:1}
  `;
  loaderContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 40%;
  `;
  ball = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c1c1c1;
    vertical-align: middle;
    display: inline-block;
    margin: 3px;
    animation: ${this.loadAnimate} 1.25s ease-in infinite;
    ${({ delay }) =>
      delay &&
      `
    animation-delay:${delay}s;
    `}
  `;
  loading = styled.p`
    color: #c1c1c1;
    display: inline-block;
    margin: 3px;
    font-size: 2rem;
    font-weight: 700;
  `;

  render() {
    return (
      <this.loaderContainer>
        <this.loading>loading</this.loading>

        <this.ball></this.ball>
        <this.ball delay=".25"></this.ball>
        <this.ball delay=".5"></this.ball>
        <this.ball delay=".75"></this.ball>
      </this.loaderContainer>
    );
  }
}
