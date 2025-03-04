import axios, { AxiosRequestConfig } from 'axios';
// config
import { ACCESS_TOKEN_KEY, HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

axiosInstance.defaults.headers.common.Authorization = accessToken;

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
