import { getAllCategories } from "../../utils/fetchApi";

export const STORE_ALL_CATEGORIES = "STORE_ALL_CATEGORIES";

export const storeCategoriesNames = async (dispatch) => {
  return await getAllCategories()
    .then((res) => {
      dispatch({
        type: STORE_ALL_CATEGORIES,
        data: res.data.categories.map((category) => category.name),
      });
    })
    .catch((err) => ({ message: err.message }));
};
