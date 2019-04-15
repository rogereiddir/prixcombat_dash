import { dataProvider } from "../../services/dataProvider";
import { LOAD_CATEGORIES , CREATE_CATEGORY } from "../actionTypes";
let apiUrl = 'http://localhost:5000';


export const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    categories
});

export const createCategory = category => ({
  type: CREATE_CATEGORY,
  category
});

export const AddCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "CREATE", "admin/categories", params)
      .then(res => {
        dispatch(createCategory(res));
      })
      .catch(err => {
        console.log(err)
      });
  };
};


export const fetchCategories = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/categories", params)
      .then(res => {
        dispatch(loadCategories(res));
      })
      .catch(err => {
        console.log(err)
      });
  };
};