import React, { Component } from "react";
import styled from "styled-components";

export default class DisplayError extends Component {
  errorContainer = styled.div`
    padding: 2rem;
    width: 80%;
    background-color: #ff3333;
    color: #fff;
    margin: auto;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    position: absolute;
    top: 40%;
    left: 10%;
  `;
  render() {
    return (
      <this.errorContainer {...this.props}>
        {this.props.children}
      </this.errorContainer>
    );
  }
}
