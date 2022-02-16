import React, { Component } from "react";
import styled from "styled-components";

export default class DeleteSpan extends Component {
  lineSpan = styled.span`
    transform: rotate(135deg);
    position: absolute;
    width: 50px;
    top: 25px;
    right: 0px;
    display: inline-block;
    border: 1px solid #919191;
  `;
  render() {
    return <this.lineSpan {...this.props}>{this.props.children}</this.lineSpan>;
  }
}
