import { dataProvider } from "../../services/dataProvider";
import { LOAD_PRODUCTS } from "../actionTypes";
let apiUrl = 'http://localhost:5000'
export const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});

export const fetchProducts = (params) => {
  return dispatch => {
    return dataProvider(apiUrl,"GET_LIST", "admin/products",params)
    .then(res => {
      dispatch(loadProducts(res));
    })
    .catch(err => {
      console.log(err)
    });
  };
};


