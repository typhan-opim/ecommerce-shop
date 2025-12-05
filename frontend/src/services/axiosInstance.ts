// axiosInstance.ts
import axios, { type AxiosInstance } from "axios";
import { setupRequestInterceptor, setupResponseInterceptor } from "./interceptors";

const DEFAULT_TIMEOUT = 180000;

const createApiInstance = (): AxiosInstance => {
  const base = import.meta.env.VITE_BACKEND_URL || '';
  const instance = axios.create({
    baseURL: base,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true, // 쿠키 포함 (리프레시 토큰용)
  });

  // 인터셉터 설정
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);

  return instance;
};

const axiosInstance = createApiInstance();

export default axiosInstance;
