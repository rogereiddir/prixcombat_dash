import { dataProvider } from "../../services/dataProvider";
import { LOAD_USERS , SET_CURRENT_USER } from "../actionTypes";
import {setTokenHeader} from '../../services/dataProvider'

let apiUrl = 'http://192.168.99.101:5000';

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function userLogout() {
  return dispatch => {
    return dataProvider(apiUrl, "LOGOUT", "users/auth/signout")
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
    return dataProvider(apiUrl, "CREATE", "admin/users", params)
  };
};

export const DeleteUser = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "DELETE_MANY", "admin/users", params)
  };
};

export const fetchUsers = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_LIST", "admin/users", params)
  };
};


export const fetchOneUser = (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "GET_ONE", "admin/users", params)
  };
};