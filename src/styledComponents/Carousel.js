import React, { Component } from "react";
import styled from "styled-components";
import next from "../utils/icons/next.svg";
import prev from "../utils/icons/prev.svg";

class Carousel extends Component {
  styledCarousel = styled.div`
    height: 100%;
    position: relative;
    &:hover {
      transform: scale(1.05);
    }
  `;
  photoLinks = styled.div`
    width: 100%;
    position: absolute;
    bottom: 10px;
    text-align: center;
  `;
  dotLink = styled.span`
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #a9a9a9;
    display: inline-block;
    margin-right: 0.5rem;
    cursor: pointer;
    &.active{background-color: #696969;
    transform: scale(1.5, 1.5);
    }
    }
  `;
  imgContainer = styled.div`
    display: none;
  `;
  carouselImg = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;
  nextPrev = styled.div`
    position: absolute;
    width: 100%;
    top: 50%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: 1.5em;
    & > img {
      background-color: #c1c1c1;
    }
  `;

  state = {
    src: this.props.imgArray[0],
  };

  render() {
    const { imgArray, product } = this.props;
    return (
      <this.styledCarousel>
        <this.carouselImg src={this.state.src} alt={product} />
        {this.props.links === "dots" && imgArray.length > 1 && (
          <this.photoLinks onClick={(e) => e.preventDefault()}>
            {imgArray.map((img) => (
              <this.dotLink
                key={imgArray.indexOf(img)}
                className={this.state.src === img ? "active" : ""}
                onClick={() => this.setState({ src: img })}
              />
            ))}
          </this.photoLinks>
        )}
        {this.props.links === "next-prev" && imgArray.length > 1 && (
          <this.nextPrev>
            <img
              src={prev}
              alt="previous"
              onClick={() => {
                const currentImgIndex = imgArray.indexOf(this.state.src);
                currentImgIndex > 0
                  ? this.setState({ src: imgArray[currentImgIndex - 1] })
                  : this.setState({ src: imgArray[imgArray.length - 1] });
              }}
            />
            <img
              src={next}
              alt="next"
              onClick={() => {
                const currentImgIndex = imgArray.indexOf(this.state.src);
                currentImgIndex < imgArray.length - 1
                  ? this.setState({ src: imgArray[currentImgIndex + 1] })
                  : this.setState({ src: imgArray[0] });
              }}
            />
          </this.nextPrev>
        )}
      </this.styledCarousel>
    );
  }
}

export default Carousel;
