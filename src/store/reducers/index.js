import { combineReducers } from "redux";
import categories from "./categoriesReducer";
import cart from "./cartReducer";
import userCurrency from "./currencyReducer";

export default combineReducers({
  categories,
  cart,
  userCurrency,
});
