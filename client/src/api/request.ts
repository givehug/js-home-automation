import axios from 'axios';
import config from '../../../config';
import {USER_SESSION_TOKEN} from '../data/constants';

const API_URL = config.BASE_URL + '/api/';

/**
 * Request headers object interface
 */
interface RequestHeaders {
  ['x-auth']?: string;
}

/**
 * Get request headers object
 * If user token in localStorage decorate headers with x-auth
 */
const getHeaders = (): RequestHeaders => {
  const token = localStorage.getItem(USER_SESSION_TOKEN);
  const headers: RequestHeaders = {};

  if (token) {
    headers['x-auth'] = token;
  }

  return headers;
};

/**
 * Make http request with provided options
 * @param url request url
 * @param method method type
 * @param data data/body object if any
 */
const request = (url: string, method: string, data?: object): Promise<any> => {
  return axios({
    method,
    url: API_URL + url,
    data,
    headers: getHeaders(),
  });
};

export default request;
