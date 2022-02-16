import React, { Component } from "react";
import styled, { css } from "styled-components";

export default class Flex extends Component {
  FlexBox = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-direction: row;
    gap: 7px;
    ${({ direction }) => css`
      ${() => direction === "column" && `flex-direction: column;`}
      ${() => direction === "row" && `flex-direction: row;`}
    `}
    ${(props) => css`
      ${() => props.alignItems && `align-items: ${props.alignItems};`}
      ${() =>
        props.justifyContent && `justify-content: ${props.justifyContent};`}
    `}
      
      &.cart-item {
      border-top: 1px solid #000;
      max-width: 80vw;
      padding-top: 10px;
    }
    & > .nav-cart {
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: #c1c1c1 #ebebeb;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background: #ebebeb;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #c1c1c1;
      }
    }
  `;
  render() {
    return <this.FlexBox {...this.props}>{this.props.children}</this.FlexBox>;
  }
}
