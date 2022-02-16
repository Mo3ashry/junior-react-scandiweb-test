import { getProductById } from "../../utils/fetchApi";
import { setDefaultAttributes } from "../../utils/helper";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CHANGE_ATTRIBUTE = "CHANGE_ATTRIBUTE";
export const SET_PRODUCT_AMOUNT = "SET_PRODUCT_AMOUNT";

export const addToCart = async (dispatch, productId, selectedAttrs) => {
  return await getProductById(productId)
    .then((res) => {
      const userAttributes = selectedAttrs
        ? selectedAttrs
        : setDefaultAttributes(res.data.product.attributes);
      return res.data.product.inStock
        ? dispatch({
            type: ADD_TO_CART,
            product: {
              ...res.data.product,
              userAttributes,
              quantity: 1,
            },
          })
        : { message: "sorry this product is out of stock" };
    })
    .catch((err) => ({ message: err.message }));
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};
export const changeUserAttrs = (productId, attrName, attrValue) => {
  return {
    type: CHANGE_ATTRIBUTE,
    productId,
    attrName,
    attrValue,
  };
};
export const setProductAmount = (productId, quantity) => {
  return {
    type: SET_PRODUCT_AMOUNT,
    productId,
    quantity,
  };
};
