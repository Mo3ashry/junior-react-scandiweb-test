import React, { Component } from "react";
import styled from "styled-components";

export default class Badge extends Component {
  styledBadge = styled.span`
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    position: absolute;
    bottom: 1rem;
    right: 0;
    font-size: 0.7rem;
    line-height: 1rem;
  `;
  render() {
    return (
      <this.styledBadge {...this.props}>{this.props.children}</this.styledBadge>
    );
  }
}
