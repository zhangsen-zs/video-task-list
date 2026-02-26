import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

/** 接口统一响应结构（按后端约定可调整 code/msg 字段名） */
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message?: string;
  msg?: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/** 请求拦截：可在此添加 token、租户等 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = getToken(); if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/** 响应拦截：统一解析 data，统一错误提示 */
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    const code = res?.code;
    const msg = res?.message ?? res?.msg ?? '请求失败';

    if (code === 0 || code === 200 || response.status === 200) {
      return response;
    }

    // 按业务 code 处理（如 401 跳转登录）
    // if (code === 401) { ... }
    return Promise.reject(new Error(typeof msg === 'string' ? msg : '请求失败'));
  },
  (error) => {
    const message = error.response?.data?.message ?? error.response?.data?.msg ?? error.message ?? '网络异常';
    return Promise.reject(new Error(message));
  }
);

/** 请求方法封装：直接返回 data，异常由调用方 catch */
export async function request<T>(config: Parameters<AxiosInstance['request']>[0]): Promise<T> {
  const response = await instance.request<ApiResponse<T>>(config);
  const res = response.data;
  if (res && typeof (res as ApiResponse<T>).data !== 'undefined') {
    return (res as ApiResponse<T>).data;
  }
  return response.data as unknown as T;
}

export function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  return request<T>({ method: 'get', url, params });
}

export function post<T>(url: string, data?: unknown, params?: Record<string, unknown>): Promise<T> {
  return request<T>({ method: 'post', url, data, params });
}

export function put<T>(url: string, data?: unknown, params?: Record<string, unknown>): Promise<T> {
  return request<T>({ method: 'put', url, data, params });
}

export function del<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  return request<T>({ method: 'delete', url, params });
}

export default instance;
