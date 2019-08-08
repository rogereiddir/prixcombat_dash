import { dataProvider } from "../../services/dataProvider";
import { LOAD_SUB_CATEGORIES } from "../actionTypes";

let apiUrl = 'http://localhost:5000';


export const loadSubCategories = subcategories => ({
    type: LOAD_SUB_CATEGORIES,
    subcategories
});

export const CreateSubCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "CREATE", "admin/subcategories", params)
  };
};

export const DeleteSubCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "DELETE_MANY", "admin/subcategories", params)
  };
};

export const UpdateSubCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "UPDATE", "admin/subcategories", params)
  };
};

export const fetchSubcategories = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/subcategories", params)
  };
};


export const fetchOneSubCategory = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_ONE", "admin/subcategories", params)
  };
};