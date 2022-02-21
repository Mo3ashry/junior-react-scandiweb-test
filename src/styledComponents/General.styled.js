import styled from "styled-components";
import { Link } from "react-router-dom";

/* edit for resubmission
  9.Please don't use the style prop with constant values. Move such styles to CSS.<=Done*/

export const SubTitle = styled.p`
  font-weight: 500;
  font-size: 1.2em;
`;

export const UppercaseHeader = styled.h1`
  text-transform: uppercase;
`;
export const CapitalizeHeader = styled.h1`
  text-transform: capitalize;
`;
export const CapitalizeSmHeader = styled.h2`
  text-transform: capitalize;
`;

export const Badge = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  position: absolute;
  bottom: 1rem;
  right: 0;
  font-size: 0.7rem;
  line-height: 1rem;
`;
export const AttrsContainer = styled.div`
  max-width: min-content;
  margin-bottom: 10px;
`;

export const CartMenu = styled.div`
  position: absolute;
  background-color: #fff;
  color: #1d1f22;
  height: 65vh;
  z-index: 3;
  right: 0;
  min-width: 25vw;
  font-size: 0.6rem;
`;
export const ProductLink = styled(Link)`
  display: inline-block;
  margin-right: 1.5em;
`;
export const CoverScreen = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0 0 0 / 72%);
  position: fixed;
  right: 0;
  z-index: 2;
`;

export const DescriptionContainer = styled.div`
  margin: 0.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: #1d1f22;
`;
export const DisplayError = styled.div`
  padding: 2rem;
  width: 80%;
  background-color: #ff3333;
  color: #fff;
  margin: auto;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  position: absolute;
  top: 40%;
  left: 10%;
`;
export const DisplayInPageError = styled.div`
  padding: 0.5rem;
  width: 100%;
  background-color: #ff3333;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin: 1rem;
`;
export const ProductHeader = styled.div`
  margin-bottom: 2em;
  &.category-product-header {
    margin: 0;
  }
  & > .brand {
    margin: 0;
  }
  & > .product-name {
    margin-top: 2px;
  }
`;
export const RelativeDiv = styled.div`
  margin-right: 0.5rem;
  position: relative;
  display: inline;
`;
export const StockFilterText = styled.p`
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  z-index: 1;
  filter: opacity(0.5);
  background-color: #fff;
  text-transform: uppercase;
  color: #2a2a2a;
  font-size: 2rem;
  text-align: center;
`;
