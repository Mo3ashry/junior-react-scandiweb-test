export const getCurrentPrice = (product, userCurrency) => {
  return product.prices?.find(
    (price) => price.currency.label === userCurrency.label
  ).amount;
};
export const isInCart = (cart, productId) => {
  return cart.some((item) => item.id === productId);
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
