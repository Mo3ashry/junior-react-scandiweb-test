import React, { Component } from "react";
import styled from "styled-components";

export default class Container extends Component {
  styledContainer = styled.div`
    padding: 1em 3em;
    color: #1d1f22;
    ${(props) => props.small && `padding:1em 1em;`};
    &.not-found {
      text-align: center;
      & > .not-found-text {
        font-size: 5rem;
      }
    }
  `;

  render() {
    return (
      <this.styledContainer {...this.props}>
        {this.props.children}
      </this.styledContainer>
    );
  }
}
