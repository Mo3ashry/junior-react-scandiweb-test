import React, { Component } from "react";
import { connect } from "react-redux";
import { setProductAmount } from "../store/actions/cartActions";
import Button from "../styledComponents/Button";
import Carousel from "../styledComponents/Carousel";
import Grid from "../styledComponents/Grid";
import Flex from "../styledComponents/Flex";
// import { getProductById } from "../utils/fetchApi";
import StructureLoader from "../styledComponents/StructureLoader";
import SubTitle from "../styledComponents/SubTitle";
import { Link } from "react-router-dom";
import { getCurrentPrice } from "../utils/helper";
import CustomRadioBtn from "../styledComponents/CustomRadioBtn";

class CartItem extends Component {
  render() {
    const { quantity, userAttributes, product, dispatch, userCurrency } =
      this.props;
    return !this.props.loading ? (
      <Flex className="cart-item">
        <Flex direction="column" style={{ maxWidth: "60%" }}>
          <Grid item>
            <Link
              to={`/product/${product.id}`}
              onClick={() =>
                this.props.handleViewBag && this.props.handleViewBag()
              }
            >
              <h2 style={{ marginBottom: "0" }}> {product.brand}</h2>
              <SubTitle style={{ marginTop: "2px" }}> {product.name}</SubTitle>
            </Link>
          </Grid>
          <Grid item>
            <h3>
              {userCurrency.symbol}
              {getCurrentPrice(product, userCurrency)}
            </h3>
          </Grid>
          {product.attributes.map((attribute) => (
            <Grid
              item
              key={product.id + attribute.id}
              parent
              gap="5px"
              direction="col"
            >
              {attribute.items.map((item) => (
                <Grid item key={product.id + item.id}>
                  <CustomRadioBtn
                    type={attribute.type}
                    item={item}
                    name={attribute.name}
                    id={product.id + attribute.id + item.id}
                    displayOnly
                    isSelected={Boolean(
                      userAttributes[attribute.name] === item.value
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Flex>
        <Grid
          parent
          direction="col"
          style={{ maxWidth: "40%", minWidth: "30%" }}
        >
          <Grid
            item
            parent
            direction="row"
            cols="4"
            style={{ justifyItems: "center" }}
          >
            <Grid item rows="3">
              <Button
                onClick={() =>
                  dispatch(setProductAmount(product.id, quantity + 1))
                }
              >
                +
              </Button>
            </Grid>
            <Grid item rows="6">
              {quantity}
            </Grid>
            <Grid item rows="3">
              <Button
                onClick={() => {
                  if (quantity > 1)
                    dispatch(setProductAmount(product.id, quantity - 1));
                }}
              >
                -
              </Button>
            </Grid>
          </Grid>
          <Grid item cols="8">
            {" "}
            <Carousel
              links="next-prev"
              imgArray={product.gallery}
              product={product.name}
            />
          </Grid>
        </Grid>
      </Flex>
    ) : (
      <StructureLoader type="cartItem" />
    );
  }
}
function mapStateToProps({ userCurrency }, props) {
  const { userAttributes, quantity, ...product } = props.item;
  return { userCurrency, userAttributes, quantity, product };
}
export default connect(mapStateToProps)(CartItem);
