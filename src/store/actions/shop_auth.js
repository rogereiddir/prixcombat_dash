import { dataProvider } from "../../services/dataProvider";




export const shop_signin= (params) => {
  return dispatch => {
    return dataProvider("AUTH", "shops/auth/signin", params)
  };
};

export const shop_signup= (params) => {
  return dispatch => {
    return dataProvider("AUTH", "shops/auth/signup", params)
  };
};
