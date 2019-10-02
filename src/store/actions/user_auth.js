import { dataProvider } from "../../services/dataProvider";





export const user_signin= (params) => {
  return dispatch => {
    return dataProvider("AUTH", "users/auth/signin", params)
  };
};

export const user_signup= (params) => {
  return dispatch => {
    return dataProvider("AUTH", "users/auth/signup", params)
  };
};
