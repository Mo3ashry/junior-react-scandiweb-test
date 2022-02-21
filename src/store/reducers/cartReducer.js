import {
  ADD_TO_CART,
  CHANGE_ATTRIBUTE,
  REMOVE_FROM_CART,
  SET_PRODUCT_QUANTITY,
} from "../actions/cartActions";

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.concat(action.data);
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.id);
    case CHANGE_ATTRIBUTE:
      return state.map((item) => {
        if (item.product.id === action.productId) {
          return {
            ...item,
            userAttributes: {
              ...item.userAttributes,
              [action.attrName]: action.attrValue,
            },
          };
        } else return item;
      });
    case SET_PRODUCT_QUANTITY:
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, quantity: action.quantity };
        }
        return item;
      });
    default:
      return state;
  }
}
