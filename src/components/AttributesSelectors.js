import React, { Component } from "react";
import { connect } from "react-redux";
import CustomRadioBtn from "../styledComponents/CustomRadioBtn";
import {
  AttrsContainer,
  ProductHeader,
  SubTitle,
} from "../styledComponents/General.styled";
import Grid from "../styledComponents/Grid";
import { getCurrentPrice } from "../utils/helper";

export class AttributesSelectors extends Component {
  handleUserAttributes = (attrName, attrValue) => {
    const { setAttributes } = this.props;
    setAttributes(attrName, attrValue);
  };
  renderAttrLabels = (label) => {
    return <SubTitle>{label}:</SubTitle>;
  };
  render() {
    const { product, userAttributes, userCurrency } = this.props;
    return (
      <div>
        <ProductHeader>
          <h2 className="brand"> {product.brand}</h2>
          <SubTitle className="product-name"> {product.name}</SubTitle>
        </ProductHeader>
        {product.attributes.map((attribute) => (
          <AttrsContainer key={product.id + attribute.id}>
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
          </AttrsContainer>
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
