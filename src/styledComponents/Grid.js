import React, { Component } from "react";
import styled, { css } from "styled-components";

export default class Grid extends Component {
  styledGrid = styled.div`
    ${"" /* grid parent */}
    ${(props) =>
      props?.parent &&
      css`
        display: grid;
        align-items: center;
        grid-gap:2px;
        ${() =>
          props.direction === "col" && `grid-template-columns:repeat(12,1fr);`}
        ${() =>
          props.direction === "row" && `grid-template-rows:repeat(12,1fr);`}
        ${() => props.gap && `grid-gap:${props.gap};`}
        ${() => props.alignContent && `align-content:${props.alignContent};`}
        ${() => props.alignItems && `align-items:${props.alignItems};`};
        ${() => props.justifyItems && `justify-items:${props.justifyItems};`};
        ${() =>
          props.justifyContent && `justify-content:${props.justifyContent};`};
        }
      `}
      ${"" /* grid item */}
    ${(props) =>
      props?.item &&
      css`
        text-align: start;
        ${() => props.align && `text-align: ${props.align};`}
        ${() => props.rows && `grid-row:span ${props.rows};`}
        ${() => props.cols && `grid-column:span ${props.cols};`}
        ${() => props.alignSelf && `align-self:${props.alignSelf}`}
      `}
      
      &.category-card {
      padding: 0.5rem;
      // box-shadow:  0px 4px 35px rgba(168, 172, 176, 0.19) ;
      position: relative;
      &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
        ${
          "" /* edit for resubmission
        11.Add To Cart button on PLP should be visible only on hover. <=Done */
        }
        .circle-btn {
          display: block;
        }
      }
    }
    &.category-item {
      height: 300px;
      background-color: #fff;
      width: 100%;
      text-align: center;
      position: relative;
    }
    &.out-stock {
      filter: opacity(0.5);
    }
    &.cart-item-control {
      max-width: 40%;
      min-width: 30%;
    }
    &.full-width {
      width: 100%;
    }
    &.full-height {
      height: 100%;
    }
    
  `;

  render() {
    return (
      <this.styledGrid {...this.props}>{this.props.children}</this.styledGrid>
    );
  }
}
