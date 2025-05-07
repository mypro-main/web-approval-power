import axios, { AxiosRequestConfig } from 'axios';
// config
import { ACCESS_TOKEN_KEY, HOST_API, LOGIN_METHOD_KEY } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const method = sessionStorage.getItem(LOGIN_METHOD_KEY);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (method) {
    config.headers['X-Identity-Method'] = method;
  }

  return config;
});

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
