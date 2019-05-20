import { dataProvider } from "../../services/dataProvider";
import { LOAD_CATEGORIES } from "../actionTypes";

let apiUrl = 'http://192.168.99.101:5000';


export const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    categories
});

export const CreateCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "CREATE", "admin/categories", params)
  };
};

export const DeleteCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "DELETE_MANY", "admin/categories", params)
  };
};

export const UpdateCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "UPDATE", "admin/categories", params)
  };
};

export const fetchCategories = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/categories", params)
  };
};


export const fetchOneCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_ONE", "admin/categories", params)
  };
};