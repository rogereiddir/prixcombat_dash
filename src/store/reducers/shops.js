import { LOAD_SHOPS  } from "../actionTypes";

export const shops = (state = [], action) => {
  switch (action.type) {
    case LOAD_SHOPS:
      return [...action.shops];
    default:
      return state;
  }
};

