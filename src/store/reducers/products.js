import { LOAD_PRODUCTS } from "../actionTypes";

export const products = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
};


