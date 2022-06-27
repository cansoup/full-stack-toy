import {request} from 'graphql-request';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8000';
const URL = 'http://localhost:8000/graphql';

// // axios fetcher
// const fetcher = async (method, url, ...rest) => {
//   const res = await axios[method](url, ...rest);
//   return res.data;
// }
// export default fetcher;

// graphql fetcher
export const fetcher = (query, variables = {}) => request(URL, query, variables);


/*
...rest를 사용하는 이유
get/delete 와 post/put이 필요로 하는 파라미터가 달라 이 두 가지 경우에 모두 대응하기 위해서
get: axios.get(url[, config])
delete: axios.delete(url[, config])
post: axios.post(url, data[, config])
put: axios.put(url, data[, config])
*/ 