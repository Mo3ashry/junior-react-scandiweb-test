import React, { Component } from "react";
import styled from "styled-components";

export default class RelativeDiv extends Component {
  relative = styled.div`
    margin-right: 0.5rem;
    position: relative;
    display: inline;
  `;
  render() {
    return (
      <this.relative ref={this.props.divRef} {...this.props}>
        {this.props.children}
      </this.relative>
    );
  }
}
