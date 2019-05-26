import { LOAD_SUB_CATEGORIES  } from "../actionTypes";

export const subcategories = (state = [], action) => {
  switch (action.type) {
    case LOAD_SUB_CATEGORIES:
      return [...action.subcategories];
    default:
      return state;
  }
};

