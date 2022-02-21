import React, { Component } from "react";
import styled, { css } from "styled-components";

class CustomRadioBtn extends Component {
  radioInput = styled.input.attrs({ type: "radio" })`
    visibility: hidden;
    width: 0;
    height: 0;
  `;
  styledLabel = styled.label`
    display: inline-block;
    border: 1px solid #000;
    color: #1d1f22;
    padding: 0.5em;
    white-space: nowrap;
    ${({ isSelected, displayOnly }) =>
      isSelected && !displayOnly && `color:#fff;background-color:#000;`}
    ${(props) =>
      props.type === "swatch" &&
      `
        border:${props.isSelected ? ".4em solid #c1c1c1" : "none"};
        height: 2em;
        width: 2em;
        display: block;
        border-radius: 50%;
        background-color: ${props.value};
        box-shadow: 0px 2px 4px rgb(0 0 0 / 20%);
    `}
    ${(props) =>
      props.displayOnly &&
      !props.isSelected &&
      css`
        filter: opacity(0.2);
        ${() => props.type !== "swatch" && `background-color:#c1c1c1;`}
      `}
  `;

  render() {
    const { name, item, id, isSelected, type, displayOnly } = this.props;
    return (
      <>
        <this.styledLabel
          htmlFor={id}
          isSelected={isSelected}
          type={type}
          value={item.value}
          displayOnly={displayOnly}
        >
          {type !== "swatch" && item.displayValue}
        </this.styledLabel>
        <this.radioInput
          disabled={displayOnly ? true : false}
          type="radio"
          name={name}
          id={id}
          value={item.value}
        />
      </>
    );
  }
}

export default CustomRadioBtn;
