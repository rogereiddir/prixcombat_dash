import { dataProvider } from "../../services/dataProvider";
import { LOAD_USERS , SET_CURRENT_USER } from "../actionTypes";


export function refreshToken(params) {
  return dispatch => {
    return dataProvider("REFRESHING_TOKEN", "users/auth/refreshToken", params)
  };
}

export function userLogout(params) {
  return dispatch => {
    return dataProvider("LOGOUT", "users/auth/signout", params)
  };
}

export function shopLogout(params) {
  return dispatch => {
    return dataProvider("LOGOUT", "shops/auth/signout", params)
  };
}


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export const loadUsers = users => ({
    type: LOAD_USERS,
    users
});

export const CreateUser = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "admin/users", params)
  };
};

export const DeleteUser = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "admin/users", params)
  };
};

export const fetchUsers = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "admin/users", params)
  };
};


export const fetchOneUser = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "admin/users", params)
  };
};