import { LOAD_CATEGORIES  } from "../actionTypes";

export const categories = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...action.categories];
    default:
      return state;
  }
};

