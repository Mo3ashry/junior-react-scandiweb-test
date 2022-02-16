import React, { Component } from "react";
import Flex from "./Flex";
import styled, { css, keyframes } from "styled-components";
import Grid from "./Grid";

export default class StructureLoader extends Component {
  opacityAnimation = keyframes`
  50%{
      opacity:.5
  }
    to{
        opacity:1
    }
    `;
  loaderContainer = styled.div`
    margin-bottom: 0.5em;
    animation: ${this.opacityAnimation} 1s ease-in infinite;
  `;
  imgLoader = styled.div`
    width: 6em;
    height: 6em;
    background-color: #c1c1c1;
    border-radius: 3px;
    ${({ size }) => css`
      ${() => size === "large" && `width: 30vw; height: 30vw;`}
      ${() => size === "full" && `width: 100%; height: 100%;`}
    `}
  `;
  textLoader = styled.div`
    width: 15em;
    height: 1em;
    background-color: #c1c1c1;
    margin-top: 0.5em;
    ${({ size }) => css`
      ${() => size === "large" && `width: 15em;`}
      ${() => size === "medium" && `width: 12em;`}
      ${() => size === "small" && `width: 8em; margin-top:1em;`}
      ${() => size === "btn" && `width: 15em;height:2em;border-radius:5px`}
    `}
  `;
  // loader for cart item
  cartItemLoader = () => {
    return (
      <this.loaderContainer>
        <Flex className="cart-item">
          <div>
            <this.textLoader size="large" />
            <this.textLoader size="medium" />
            <this.textLoader size="small" />
            <this.textLoader size="small" />
          </div>
          <this.imgLoader />
        </Flex>
      </this.loaderContainer>
    );
  };
  // loader for category page
  categoryLoader = () => {
    return (
      <this.loaderContainer>
        <Grid parent direction="row" gap="10px">
          <Grid item rows={9} className="category-item">
            <this.imgLoader size="full" />
          </Grid>
          <Grid item rows={3}>
            <this.textLoader size="large" />
            <this.textLoader size="medium" />
          </Grid>
        </Grid>
      </this.loaderContainer>
    );
  };
  productPageLoader = () => {
    return (
      <this.loaderContainer>
        <Flex>
          <this.imgLoader size="large" />

          <div>
            <this.textLoader size="large" />
            <this.textLoader size="large" />
            <this.textLoader size="medium" />
            <this.textLoader size="small" />
            <this.textLoader size="btn" />
            <this.textLoader size="medium" />
            <this.textLoader size="small" />
          </div>
        </Flex>
      </this.loaderContainer>
    );
  };

  render() {
    const { type } = this.props;
    return (
      <>
        {type === "cartItem" && this.cartItemLoader()}
        {type === "category" && this.categoryLoader()}
        {type === "product" && this.productPageLoader()}
      </>
    );
  }
}
