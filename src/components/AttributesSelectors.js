import React, { Component } from "react";
import { connect } from "react-redux";
import { changeUserAttrs } from "../store/actions/cartActions";
import CustomRadioBtn from "../styledComponents/CustomRadioBtn";
import Grid from "../styledComponents/Grid";
import SubTitle from "../styledComponents/SubTitle";
import { getCurrentPrice, isInCart } from "../utils/helper";

export class AttributesSelectors extends Component {
  handleUserAttributes = (attrName, attrValue) => {
    const { cart, product, dispatch, setAttributes } = this.props;
    setAttributes(attrName, attrValue);
    isInCart(cart, product.id) &&
      dispatch(changeUserAttrs(product.id, attrName, attrValue));
  };
  renderAttrLabels = (label) => {
    return <SubTitle>{label}:</SubTitle>;
  };
  render() {
    const { product, userAttributes, userCurrency } = this.props;
    return (
      <div>
        <div className="product-header" style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "0" }}> {product.brand}</h2>
          <SubTitle style={{ marginTop: "2px" }}> {product.name}</SubTitle>
        </div>
        {product.attributes.map((attribute) => (
          <div
            key={product.id + attribute.id}
            style={{ maxWidth: "min-content", marginBottom: "10px" }}
          >
            {this.renderAttrLabels(attribute.name)}
            <Grid
              parent
              direction="col"
              alignItems="baseline"
              gap="3px"
              onChange={(e) =>
                this.handleUserAttributes(attribute.name, e.target.value)
              }
            >
              {attribute.items.map((item) => (
                <Grid item key={product.id + item.id}>
                  <CustomRadioBtn
                    type={attribute.type}
                    item={item}
                    name={attribute.name}
                    id={product.id + attribute.id + item.id}
                    isSelected={Boolean(
                      userAttributes[attribute.name] === item.value
                    )}
                    displayOnly={product.inStock ? false : true}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
        <div>
          {this.renderAttrLabels("Price")}
          <SubTitle>
            {userCurrency.symbol}
            {getCurrentPrice(product, userCurrency)}
          </SubTitle>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ userCurrency, cart }) {
  return { userCurrency, cart };
}

export default connect(mapStateToProps)(AttributesSelectors);
