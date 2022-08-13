import axios from 'axios';
import {
  UserToken,
  UserLoginPayload,
  UserRegisterPayload,
  User,
  Todo,
} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const setAuthorizationHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = token;
};
export const removeAuthorizationHeader = () => {
  api.defaults.headers.common['Authorization'] = '';
};

export const login = (payload: UserLoginPayload) => {
  const formData = new FormData();

  formData.append('username', payload.email);
  formData.append('password', payload.password);
  return api.post<UserToken>('/login', formData);
};

export const register = (payload: UserRegisterPayload) =>
  api.post<UserToken>('/register', payload);

export const getProfile = () => api.get<User>('/me');

export const getTodos = () => api.get<Todo[]>('/todos');
