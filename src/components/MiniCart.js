import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../styledComponents/Button";
import Flex from "../styledComponents/Flex";
import { CapitalizeSmHeader } from "../styledComponents/General.styled";
import Grid from "../styledComponents/Grid";
import { getCurrentPrice } from "../utils/helper";
import { Cart } from "./Cart";

export class MiniCart extends Cart {
  renderHeader = () => {
    return (
      <CapitalizeSmHeader>
        My Bag: {this.props.cart?.length}items
      </CapitalizeSmHeader>
    );
  };
  renderTotalPrice = () => (
    <Flex className="full-width">
      <CapitalizeSmHeader>Total :</CapitalizeSmHeader>
      <h2>{`${this.props.userCurrency.symbol} ${this.props.totalAmount.toFixed(
        2
      )}`}</h2>
    </Flex>
  );

  renderLinks = () => (
    <Grid parent gap="5px" direction="col" className="full-width">
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
  const totalAmount = cart.reduce((totalAmount, item) => {
    return (
      totalAmount + getCurrentPrice(item.product, userCurrency) * item.quantity
    );
  }, 0);
  const miniCart = true;
  return { cart, userCurrency, totalAmount, miniCart, handleViewBag };
}
export default connect(mapStateToProps)(MiniCart);
