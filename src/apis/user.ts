import * as http from './request';

export function login(data: any) {
  return http.post('/user/login', data);
}
export function register(data: any) {
  return http.post('/user/register', data);
}
