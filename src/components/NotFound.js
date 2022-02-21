import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../styledComponents/Button";
import Container from "../styledComponents/Container";

export default class NotFound extends Component {
  render() {
    return (
      <Container className="not-found">
        <p className="not-found-text">404</p>
        <h2>page not found </h2>
        <h3>Sorry, the page you're looking for is not exist</h3>
        <Button secondary>
          <Link to="/">Home</Link>
        </Button>
      </Container>
    );
  }
}
