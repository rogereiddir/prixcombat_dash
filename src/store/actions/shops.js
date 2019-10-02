import { dataProvider } from "../../services/dataProvider";
import { LOAD_SHOPS } from "../actionTypes";



export function shopLogout() {
  return dispatch => {
    return dataProvider("LOGOUT", "users/auth/signout")
  };
}


export const loadShops = shops => ({
    type: LOAD_SHOPS,
    shops
});

export const CreateShop = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "admin/shops", params)
  };
};

export const DeleteShop = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "admin/shops", params)
  };
};

export const fetchShops = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "admin/shops", params)
  };
};


export const fetchOneShop = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "admin/shops", params)
  };
};