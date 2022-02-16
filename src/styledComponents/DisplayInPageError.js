import React, { Component } from "react";
import styled from "styled-components";

export default class DisplayInPageError extends Component {
  errorBox = styled.div`
    padding: 0.5rem;
    width: 100%;
    background-color: #ff3333;
    color: #fff;
    margin: auto;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    margin: 1rem;
  `;
  render() {
    return <this.errorBox {...this.props}>{this.props.children}</this.errorBox>;
  }
}
