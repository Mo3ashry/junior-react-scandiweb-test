import { isEqual } from "lodash";

export const getCurrentPrice = (product, userCurrency) => {
  return product.prices?.find(
    (price) => price.currency.label === userCurrency.label
  ).amount;
};
export const findInCart = (cart, productId, userAttributes) => {
  return cart.find(
    (item) =>
      item.product.id === productId &&
      isEqual(item.userAttributes, userAttributes)
  );
};

export const setDefaultAttributes = (attributes) => {
  return attributes.reduce(
    (selectedAttrs, attribute) => ({
      ...selectedAttrs,
      [attribute.name]: attribute.items[0].value,
    }),
    {}
  );
};
