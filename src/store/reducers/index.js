import { combineReducers } from "redux";
import {products} from "./products";
import {categories} from "./categories";
import {shops} from "./shops";
import {brands} from "./brands";
import {users} from "./users";
import {loading} from "./isloading";

const rootReducer = combineReducers({
  products,
  categories,
  shops,
  brands,
  users,
  loading
});

export default rootReducer;
