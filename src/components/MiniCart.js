import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../styledComponents/Button";
import Flex from "../styledComponents/Flex";
import Grid from "../styledComponents/Grid";
import { getCurrentPrice } from "../utils/helper";
import { Cart } from "./Cart";

export class MiniCart extends Cart {
  renderHeader = () => {
    return (
      <h2 style={{ textTransform: "capitalize" }}>
        My Bag: {this.props.cart?.length}items
      </h2>
    );
  };
  renderTotalPrice = () => (
    <Flex style={{ width: "100%" }}>
      <h2 style={{ textTransform: "capitalize" }}>Total :</h2>{" "}
      <h2>{`${this.props.userCurrency.symbol} ${this.props.totalAmount.toFixed(
        2
      )}`}</h2>
    </Flex>
  );

  renderLinks = () => (
    <Grid parent gap="5px" direction="col" style={{ width: "100%" }}>
      <Grid item cols="6">
        <Link to="/cart">
          <Button
            fullWidth
            font="1rem"
            onClick={() => this.props.handleViewBag()}
          >
            view bag
          </Button>
        </Link>
      </Grid>
      <Grid item cols="6">
        <Button fullWidth primary font="1rem">
          checkout
        </Button>
      </Grid>
    </Grid>
  );
}

function mapStateToProps({ cart, userCurrency }, { handleViewBag }) {
  // calculate total price for the cart
  const totalAmount = cart.reduce((totalAmount, product) => {
    return (
      totalAmount + getCurrentPrice(product, userCurrency) * product.quantity
    );
  }, 0);
  const miniCart = true;
  return { cart, userCurrency, totalAmount, miniCart, handleViewBag };
}
export default connect(mapStateToProps)(MiniCart);
