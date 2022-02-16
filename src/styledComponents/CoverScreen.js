import React, { Component } from "react";
import styled from "styled-components";

export default class CoverScreen extends Component {
  cover = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgb(0 0 0 / 72%);
    position: fixed;
    right: 0;
    z-index: 2;
  `;
  render() {
    return <this.cover></this.cover>;
  }
}
