import { dataProvider } from "../../services/dataProvider";


let apiUrl = 'http://192.168.99.101:5000';



export const user_signin= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "AUTH", "users/auth/signin", params)
  };
};

export const user_signup= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "AUTH", "users/auth/signup", params)
  };
};
