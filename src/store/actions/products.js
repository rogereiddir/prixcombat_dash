import { dataProvider } from "../../services/dataProvider";
import { LOAD_PRODUCTS } from "../actionTypes";
let apiUrl = 'http://localhost:5000'

export const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});

export const CreateProduct = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "CREATE", "admin/products", params)
  };
};

export const DeleteProduct = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "DELETE_MANY", "admin/products", params)
  };
};

export const fetchProducts = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/products", params)
  };
};


export const fetchOneProduct = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_ONE", "admin/products", params)
  };
};

