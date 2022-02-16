import React, { Component } from "react";
import styled, { css } from "styled-components";
import Grid from "./Grid";

class Gallery extends Component {
  styledImg = styled.img`
    width: 100%;
    display: block;
    border: 2px solid #d1d1d1;
    border-radius: 20px;
    margin: 5px;
    ${(props) =>
      props.inline &&
      css`
        display: inline-block;
        ${() =>
          props.length < 8
            ? `width: calc( ( 100% / 4 ) - 10px);`
            : `width: calc( ( 100% / ${props.length - 3} ) - 10px);`}
      `}
    ${(props) =>
      props.active &&
      `
      border:none;
      box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
      margin:25px;
      `}
  `;
  state = {
    activePhoto: this.props.imgArray[0],
  };
  render() {
    const { imgArray, productName } = this.props;

    return (
      <Grid
        parent
        direction="col"
        gap="10px"
        className="gallery"
        alignContent="center"
      >
        <Grid item cols="3">
          {imgArray.map(
            (photo) =>
              imgArray.indexOf(photo) <= 2 && (
                <this.styledImg
                  key={photo}
                  src={photo}
                  alt={productName}
                  onClick={() => this.setState({ activePhoto: photo })}
                />
              )
          )}
        </Grid>
        <Grid item cols="9">
          <this.styledImg
            src={this.state.activePhoto}
            alt={productName}
            active
          />
        </Grid>
        <Grid item cols="12">
          {imgArray.map(
            (photo) =>
              imgArray.indexOf(photo) > 2 && (
                <this.styledImg
                  key={photo}
                  src={photo}
                  alt={productName}
                  length={imgArray.length}
                  onClick={() => this.setState({ activePhoto: photo })}
                  inline
                />
              )
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Gallery;
