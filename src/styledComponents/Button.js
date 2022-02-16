import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";

class Button extends Component {
  btnActive = keyframes`
  50%{
    transform:translateY(1px);
  }
    100%{
      transform:translateY(0);

    }
  `;

  styledButton = styled.button`
    background-color: #fff;
    color: #000;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 0.7em;

    ${(props) => css`
      ${() => props.font && `font-size:${props.font};`}
      ${() => props.fullWidth && `width:100%;`}   
      ${() => props.color && `background-color:${props.color};`}
      ${() => props.noBorder && `border:none;`}
      ${() => props.small && `padding:.3em;`}
      ${() => props.primary && `background-color: #5ece7b;color: #fff;`}
      ${() => props.secondary && `background-color: #000;color: #fff;`}
      ${() => props.warning && `background-color: #ff3939;color: #fff;`}
      ${() => props.disabled && `background-color: #c1c1c1;`}
    `};
    &:active {
      animation: ${this.btnActive} 0.2s ease-in;
    }
    &:hover:not(:disabled) {
      filter: brightness(1.1);
    }
    &.circle-btn {
      position: absolute;
      height: 50px;
      width: 50px;
      right: 0px;
      bottom: 0px;
      border-radius: 50%;
      padding: 0px;
      z-index: 1;
      border: none;
      box-shadow: rgb(145, 145, 145) 1px 3px 5px;
    }
  `;
  render() {
    return (
      <this.styledButton {...this.props}>
        {this.props.children}
      </this.styledButton>
    );
  }
}

export default Button;
