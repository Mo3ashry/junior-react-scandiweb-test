import React, { Component } from "react";
import styled from "styled-components";

export default class NavStyledLink extends Component {
  styledLink = styled.div` 
    height: 100%;
    display: inline-block;
    position: relative;
    padding: 0 0.5rem;
    text-align: center;
    text-transform: uppercase;
    >a{
      color: #000;
      ${(props) =>
        props.active === "true" &&
        `color:#5ECE7B;}
    &:after{
      content:"";
      display:block;
      bottom:0;
      left:0;
      position:absolute;
      width:100%;
      border-bottom:2px solid #5ECE7B;
    }
    `};
  `;
  render() {
    return (
      <this.styledLink {...this.props}>{this.props.children}</this.styledLink>
    );
  }
}
