import React, { Component } from "react";
import styled from "styled-components";

export default class CartMenu extends Component {
  menuContainer = styled.div`
    position: absolute;
    background-color: #fff;
    height: 65vh;
    z-index: 3;
    right: 0;
    min-width: 25vw;
    font-size: 0.6rem;
  `;
  render() {
    return <this.menuContainer>{this.props.children}</this.menuContainer>;
  }
}
