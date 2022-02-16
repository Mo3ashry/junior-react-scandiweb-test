import React, { Component } from "react";
import styled from "styled-components";

class SubTitle extends Component {
  paragraph = styled.p`
    font-weight: 500;
    font-size: 1.2em;
  `;
  render() {
    return (
      <this.paragraph {...this.props}>{this.props.children}</this.paragraph>
    );
  }
}

export default SubTitle;
