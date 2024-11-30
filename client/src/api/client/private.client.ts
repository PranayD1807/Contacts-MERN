import axios, { InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

const localHostUrl = "http://127.0.0.1:8080/";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prodUrl = "https://portfolio-2-0-2so7.vercel.app/";
const baseURL = `${localHostUrl}api/v1/`;

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig) => {
    cfg.headers = cfg.headers || {};

    cfg.headers["Authorization"] = `Bearer ${
      localStorage.getItem("actkn") || ""
    }`;

    cfg.headers["Content-Type"] = "application/json";

    return cfg;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
