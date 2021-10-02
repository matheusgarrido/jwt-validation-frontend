import Axios, { AxiosInstance } from 'axios';

export const baseUrl = 'http://localhost:8080/';

const getAxiosInstance = Axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default getAxiosInstance;
