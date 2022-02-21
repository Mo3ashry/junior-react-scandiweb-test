import React, { Component } from "react";
import styled from "styled-components";

export default class MenuContainer extends Component {
  currencyMenu = styled.div`
    position: absolute;
    top: 10px;
    right: 1rem;
    background-color: #fff;
    color: #1d1f22;
    z-index: 3;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    & > ul {
      margin: 0;
      padding: 0.5rem;
      list-style: none;
      min-width: 7rem;
      text-align: center;
      & > li {
        margin-bottom: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        opacity: 0.5;

        ${
          "" /* edit for resubmission
        2.Currency Switcher items don't highlight on hover. <=Solved*/
        }
        &.selected, &:hover {
          opacity: 1;
        }
      }
    }
  `;
  render() {
    return (
      <this.currencyMenu {...this.props}>
        {this.props.children}
      </this.currencyMenu>
    );
  }
}
