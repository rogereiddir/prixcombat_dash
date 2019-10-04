import { dataProvider } from "../../services/dataProvider";
import { LOAD_BRANDS } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'



export const loadBrands = brands => ({
    type: LOAD_BRANDS,
    brands
});

export const CreateBrand= (params) => {
  return dispatch => {
    return dataProvider("CREATE", "admin/brands", params)
  };
};

export const DeleteBrand= (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "admin/brands", params)
  };
};

export const fetchBrands = (params = {
  pagination: { page: 1, perPage: 11 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "admin/brands", params).then((res)=>{
      dispatch(loadBrands(res))
    }).catch(err => {
      handleTokenErrors(err)
    });  
  };
};


export const fetchOneBrand= (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "admin/brands", params)
  };
};