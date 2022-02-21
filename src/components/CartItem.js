import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeFromCart,
  setProductQuantity,
} from "../store/actions/cartActions";
import Button from "../styledComponents/Button";
import Carousel from "../styledComponents/Carousel";
import Grid from "../styledComponents/Grid";
import Flex from "../styledComponents/Flex";
import StructureLoader from "../styledComponents/StructureLoader";
import { getCurrentPrice } from "../utils/helper";
import CustomRadioBtn from "../styledComponents/CustomRadioBtn";
import deleteIcon from "../utils/icons/delete.svg";
import {
  ProductHeader,
  SubTitle,
  ProductLink,
} from "../styledComponents/General.styled";

class CartItem extends Component {
  render() {
    const { quantity, userAttributes, product, dispatch, userCurrency, id } =
      this.props;
    return !this.props.loading ? (
      <Flex alignItems="flex-start" className="cart-item">
        <Flex direction="column" className="cart-flex">
          <div>
            <ProductLink
              to={{
                pathname: `/product/${product.id}`,
                state: { product },
              }}
              onClick={() =>
                this.props.handleViewBag && this.props.handleViewBag()
              }
            >
              <ProductHeader>
                <h2 className="brand"> {product.brand}</h2>
                <SubTitle className="product-name"> {product.name}</SubTitle>
              </ProductHeader>
            </ProductLink>
            {/* edit for resubmission
            3.It should be possible to remove a product from the Cart Overlay. <= Done*/}
            <Button noBorder small onClick={() => dispatch(removeFromCart(id))}>
              <img src={deleteIcon} alt="Delete" className="icon" />
            </Button>
          </div>
          <div>
            <h3>
              {userCurrency.symbol}
              {getCurrentPrice(product, userCurrency)}
            </h3>
          </div>
          {/* edit for resubmission
            12.Attributes are overlapping on the Cart page.<=Done */}
          {product.attributes.map((attribute) => (
            <div key={product.id + attribute.id}>
              {/*edit for resubmission
               8.Attributes like "yes" and "no" are meaningless without a label.
              Please implement the label for attributes in the cart. <=Done*/}
              <SubTitle>{attribute.name}</SubTitle>
              <Grid parent gap="5px" direction="col">
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
            </div>
          ))}
        </Flex>
        <Grid parent direction="col" className="cart-item-control">
          <Grid item parent direction="row" cols="4" justifyItems="center">
            <Grid item rows="3">
              <Button
                onClick={() => dispatch(setProductQuantity(id, quantity + 1))}
              >
                +
              </Button>
            </Grid>
            <Grid item rows="6">
              <SubTitle>{quantity}</SubTitle>
            </Grid>
            <Grid item rows="3">
              <Button
                onClick={() => {
                  if (quantity > 1)
                    dispatch(setProductQuantity(id, quantity - 1));
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
  const { userAttributes, quantity, product, id } = props.item;
  return { userCurrency, userAttributes, quantity, product, id };
}
export default connect(mapStateToProps)(CartItem);
