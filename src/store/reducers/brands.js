import { LOAD_BRANDS  } from "../actionTypes";

export const brands = (state = [], action) => {
  switch (action.type) {
    case LOAD_BRANDS:
      return [...action.brands];
    default:
      return state;
  }
};

