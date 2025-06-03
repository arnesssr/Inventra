import axios from 'axios';
import { API_CONFIG } from './api/config';

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: API_CONFIG.headers,
  timeout: API_CONFIG.timeout
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${API_CONFIG.apiKey}`;
  return config;
});

export { api };
