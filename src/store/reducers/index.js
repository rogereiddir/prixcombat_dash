import { combineReducers } from "redux";
import {products} from "./products";
import {categories} from "./categories";

const rootReducer = combineReducers({
  products,
  categories
});

export default rootReducer;
