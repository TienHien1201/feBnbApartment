import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import {
  clearLS,
  setProfileToLS,
  setTokensToLS,
  setIsAuthenticatedToLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS
} from './auth'
import path from '../constants/path'

class Https {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = getAccessTokenFromLS()
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Interceptor cho response: Xử lý token và refresh token
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          // Lưu profile, token và trạng thái isAuthenticated
          setProfileToLS(data.data.user)
          setTokensToLS(data.data.access_token, data.data.refresh_token || '')
          setIsAuthenticatedToLS(true)
        } else if (url === path.logout) {
          clearLS()
        } else if (url === path.refreshToken) {
          const data = response.data as { access_token: string }
          // Cập nhật access_token mới
          setTokensToLS(data.access_token, getRefreshTokenFromLS() || '')
        }
        return response
      },
      async (error: AxiosError) => {
        if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
          // Access token hết hạn, thử refresh token
          const refreshToken = getRefreshTokenFromLS()
          if (refreshToken) {
            try {
              const refreshResponse = await this.instance.post(path.refreshToken, { refresh_token: refreshToken })
              const newAccessToken = refreshResponse.data.access_token
              // Cập nhật access_token mới
              setTokensToLS(newAccessToken, refreshToken)
              // Thử lại yêu cầu ban đầu với access_token mới
              const originalRequest = error.config!
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
              return this.instance(originalRequest)
            } catch (refreshError) {
              // Refresh token thất bại (hết hạn hoặc không hợp lệ), đăng xuất người dùng
              clearLS()
              toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
              window.location.href = path.login // Chuyển hướng về trang đăng nhập
              return Promise.reject(refreshError)
            }
          } else {
            // Không có refresh token, đăng xuất người dùng
            clearLS()
            toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
            window.location.href = path.login
            return Promise.reject(error)
          }
        } else if (error.response && error.response.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Https().instance
export default http
