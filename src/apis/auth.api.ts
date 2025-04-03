import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/tai-khoan/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/tai-khoan/login', body)
  },
  logout() {
    return http.post('/tai-khoan/logout')
  }
}

export default authApi
