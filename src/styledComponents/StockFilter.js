import React, { Component } from "react";
import styled from "styled-components";

export default class StockFilter extends Component {
  filterDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    filter: opacity(0.5);
    background-color: #fff;
    text-transform: uppercase;
    line-height: 10;
    color: #c1c1c1;
    font-size: 2rem;
    text-align: center;
  `;
  render() {
    return <this.filterDiv>Out of stock</this.filterDiv>;
  }
}
