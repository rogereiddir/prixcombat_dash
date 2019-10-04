import { dataProvider } from "../../services/dataProvider";
import { LOAD_PRODUCTS } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});

export const CreateProduct = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "admin/products", params)
  };
};

export const DeleteProduct = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "admin/products", params)
  };
};

export const fetchProducts = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "admin/products", params).then((res)=>{
      dispatch(loadProducts(res))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};


export const fetchOneProduct = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "admin/products", params)
  };
};

