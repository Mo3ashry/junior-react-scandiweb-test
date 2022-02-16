import { STORE_ALL_CATEGORIES } from "../actions/categoriesActions";

export default function categories(state = [], action) {
  switch (action.type) {
    case STORE_ALL_CATEGORIES:
      return action.data;
    default:
      return state;
  }
}
