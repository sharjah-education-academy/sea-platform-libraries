import axios, { AxiosError, AxiosResponse } from "axios";

type AxiosOptions = {
  JWTTokenKey?: string;
  withCredentials?: boolean;
};

export const createInstance = (
  baseURL: string,
  options: AxiosOptions = { withCredentials: true, JWTTokenKey: "JWTToken" }
) => {
  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.defaults.withCredentials = options.withCredentials;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(options.JWTTokenKey);
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError) => {
      console.log(`Error: ${error.message}`);

      return Promise.reject(error.response?.data);
    }
  );

  return axiosInstance;
};
