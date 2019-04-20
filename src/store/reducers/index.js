import { combineReducers } from "redux";
import {products} from "./products";
import {categories} from "./categories";
import {loading} from "./isloading";

const rootReducer = combineReducers({
  products,
  categories,
  loading
});

export default rootReducer;
