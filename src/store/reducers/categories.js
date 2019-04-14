import { LOAD_CATEGORIES  } from "../actionTypes";

const categorie = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...action.categories];
    default:
      return state;
  }
};


export default categorie;