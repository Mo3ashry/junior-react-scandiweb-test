import {
  ADD_TO_CART,
  CHANGE_ATTRIBUTE,
  REMOVE_FROM_CART,
  SET_PRODUCT_AMOUNT,
} from "../actions/cartActions";

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.concat(action.product);
    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.id);
    case CHANGE_ATTRIBUTE:
      return state.map((product) => {
        if (product.id === action.productId) {
          return {
            ...product,
            userAttributes: {
              ...product.userAttributes,
              [action.attrName]: action.attrValue,
            },
          };
        } else return product;
      });
    case SET_PRODUCT_AMOUNT:
      return state.map((product) => {
        if (product.id === action.productId) {
          return { ...product, quantity: action.quantity };
        }
        return product;
      });
    default:
      return state;
  }
}
