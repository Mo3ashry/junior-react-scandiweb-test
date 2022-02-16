import React, { Component } from "react";
import styled from "styled-components";

export default class Container extends Component {
  styledContainer = styled.div`
    padding: 1em 3em;
    ${(props) => props.small && `padding:1em 1em;`}
  `;

  render() {
    return (
      <this.styledContainer {...this.props}>
        {this.props.children}
      </this.styledContainer>
    );
  }
}
