import { dataProvider } from "../../services/dataProvider";
import { LOAD_SUB_CATEGORIES } from "../actionTypes";



export const loadSubCategories = subcategories => ({
    type: LOAD_SUB_CATEGORIES,
    subcategories
});

export const CreateSubCategory = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "admin/subcategories", params)
  };
};

export const DeleteSubCategory = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "admin/subcategories", params)
  };
};

export const UpdateSubCategory = (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "admin/subcategories", params)
  };
};

export const fetchSubcategories = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "admin/subcategories", params)
  };
};


export const fetchOneSubCategory = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "admin/subcategories", params)
  };
};