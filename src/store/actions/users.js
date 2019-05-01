import { dataProvider } from "../../services/dataProvider";
import { LOAD_USERS } from "../actionTypes";

let apiUrl = 'http://localhost:5000';


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