import axios from "axios";
import { stringify } from 'query-string';

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function dataProvider(apiUrl , type , path , params) {
  let url ='';
  let method ='';
  let data='';
  switch(type){
    case "GET_LIST": {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([
                (page - 1) * perPage,
                page * perPage - 1,
            ]),
            filter: JSON.stringify(params.filter),
        };
        url = `${apiUrl}/${path}?${stringify(query)}`;
        method = 'GET';
        console.log(url)
        break;
    }
    case "GET_ONE":
        url = `${apiUrl}/${path}/${params.id}`;
        method = 'GET';
        break;
    case "CREATE":
        url = `${apiUrl}/${path}`;
        method = 'POST';
        data = JSON.stringify(params.data);
        break;
    case "UPDATE":
        url = `${apiUrl}/${path}/${params.id}`;
        method = 'PUT';
        data = JSON.stringify(params.data);
        break;
    case "DELETE":
        url = `${apiUrl}/${path}/${params.id}`;
        method = 'DELETE';
        break;
    case "DELETE_MANY":
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        url = `${apiUrl}/${path}?${stringify(query)}`;
        method = 'DELETE';
        break;
    case "GET_MANY_REFERENCE": {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([
                (page - 1) * perPage,
                page * perPage - 1,
            ]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        url = `${apiUrl}/${path}?${stringify(query)}`;
        method = 'GET';
        break;
    }
    default:
        throw new Error(`Unsupported Data Provider request type ${type}`);
  }


  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](url, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}