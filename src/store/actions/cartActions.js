export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CHANGE_ATTRIBUTE = "CHANGE_ATTRIBUTE";
export const SET_PRODUCT_QUANTITY = "SET_PRODUCT_QUANTITY";

export const addToCart = (product, userAttributes) => {
  return {
    type: ADD_TO_CART,
    data: {
      product,
      userAttributes,
      quantity: 1,
      id: Date.now() * Math.floor(Math.random() * 100),
    },
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};
export const changeUserAttrs = (id, attrName, attrValue) => {
  return {
    type: CHANGE_ATTRIBUTE,
    id,
    attrName,
    attrValue,
  };
};
export const setProductQuantity = (id, quantity) => {
  return {
    type: SET_PRODUCT_QUANTITY,
    id,
    quantity,
  };
};
