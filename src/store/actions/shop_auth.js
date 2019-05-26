import { dataProvider } from "../../services/dataProvider";


let apiUrl = 'http://localhost:5000';


export const shop_signin= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "AUTH", "shops/auth/signin", params)
  };
};

export const shop_signup= (params) => {
  return dispatch => {
    return dataProvider(apiUrl, "AUTH", "shops/auth/signup", params)
  };
};
