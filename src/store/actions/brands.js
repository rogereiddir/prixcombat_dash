import { dataProvider } from "../../services/dataProvider";
import { LOAD_BRANDS } from "../actionTypes";

let apiUrl = 'http://localhost:5000';


export const loadBrands = brands => ({
    type: LOAD_BRANDS,
    brands
});

export const CreateBrand= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "CREATE", "admin/brands", params)
  };
};

export const DeleteBrand= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "DELETE_MANY", "admin/brands", params)
  };
};

export const fetchBrands = (params = {
  pagination: { page: 1, perPage: 11 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/brands", params)
  };
};


export const fetchOneBrand= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_ONE", "admin/brands", params)
  };
};