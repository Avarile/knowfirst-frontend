import axios from 'axios';
import notify from '../util/notify';
import storageService from '../util/storageServicve';
import { overrideHttpType } from '../util/overideHttpType';

const _http = axios.create({
  // url: process.env.APP_DOMAIN,
  timeout: 1000 * 30,
});

_http.interceptors.request.use(
  (config: any) => {
    const token = storageService.getItem('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err: any) => {
    throw err;
  }
);

_http.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response.data.data.content;
    
  },
  (err) => {
    const { response } = err;
    const { status, data } = response;

    throw new Error(data.message)
  }
);

export const http = overrideHttpType(_http);
