import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../styledComponents/Container";
import Flex from "../styledComponents/Flex";
import Grid from "../styledComponents/Grid";
import CartItem from "./CartItem";

export class Cart extends Component {
  state = {
    loading: true,
    bag: null,
  };

  renderHeader = () => {
    return <h1 style={{ textTransform: "uppercase" }}>cart</h1>;
  };
  renderTotalPrice = () => {
    return null;
  };
  renderLinks = () => {
    return null;
  };

  demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  };
  componentDidMount() {
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
  }
  render() {
    const { cart } = this.props;
    return (
      <Container small={this.props.miniCart ? true : false}>
        {cart.length > 0 ? (
          <Flex
            direction="column"
            style={this.props.miniCart && { height: "60vh" }}
          >
            {this.renderHeader()}
            <div className={this.props.miniCart && "nav-cart"}>
              {cart?.map((product) => (
                <CartItem
                  item={product}
                  key={product.id}
                  loading={this.state.loading}
                  handleViewBag={this.props.handleViewBag}
                />
              ))}
            </div>
            {this.renderTotalPrice()}
            {this.renderLinks()}
          </Flex>
        ) : (
          <Grid item rows="12" align="center" alignSelf="start">
            <h1>Your cart is empty.</h1>
          </Grid>
        )}
      </Container>
    );
  }
}
function mapStateToProps({ cart, userCurrency }) {
  return { cart, userCurrency };
}
export default connect(mapStateToProps)(Cart);
