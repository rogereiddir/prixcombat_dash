import { combineReducers } from "redux";
import {products} from "./products";
import {categories} from "./categories";
import {subcategories} from "./subcategories";
import {shops} from "./shops";
import {brands} from "./brands";
import {users} from "./users";
import {loading} from "./isloading";
import {fetching} from "./isFetchingToken";
import {loggingout} from "./isLoggingOut"
import {user} from "./auth";

const rootReducer = combineReducers({
  products,
  categories,
  shops,
  brands,
  subcategories,
  users,
  loading,
  fetching,
  loggingout,
  userAuth:user
});

export default rootReducer;
