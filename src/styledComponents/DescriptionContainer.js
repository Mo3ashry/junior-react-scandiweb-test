import React, { Component } from "react";
import styled from "styled-components";

export default class DescriptionContainer extends Component {
  descriptionDiv = styled.div`
    margin: 0.5rem;
    font-size: 1.2rem;
    font-weight: 400;
  `;
  render() {
    return <this.descriptionDiv {...this.props}>{this.props.children}</this.descriptionDiv>;
  }
}
