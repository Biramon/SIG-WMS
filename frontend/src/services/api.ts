import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Acesso negado');
          break;
        case 404:
          console.error('Recurso não encontrado');
          break;
        case 500:
          console.error('Erro interno do servidor');
          break;
        default:
          break;
      }
    } else if (error.request) {
      console.error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      console.error('Erro ao processar requisição');
    }

    return Promise.reject(error);
  }
);

// API methods helper
export const apiGet = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.get<T>(url, config);
};

export const apiPost = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data, config);
};

export const apiPut = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.put<T>(url, data, config);
};

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.delete<T>(url, config);
};

export default api;