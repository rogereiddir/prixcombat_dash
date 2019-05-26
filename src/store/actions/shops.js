import { dataProvider } from "../../services/dataProvider";
import { LOAD_SHOPS } from "../actionTypes";

let apiUrl = 'http://localhost:5000';


export function shopLogout() {
  return dispatch => {
    return dataProvider(apiUrl, "LOGOUT", "users/auth/signout")
  };
}


export const loadShops = shops => ({
    type: LOAD_SHOPS,
    shops
});

export const CreateShop = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "CREATE", "admin/shops", params)
  };
};

export const DeleteShop = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "DELETE_MANY", "admin/shops", params)
  };
};

export const fetchShops = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/shops", params)
  };
};


export const fetchOneShop = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_ONE", "admin/shops", params)
  };
};