import { User } from '../types/user.type'

// Lưu profile và token vào localStorage
export const setProfileToLS = (profile: User) => {
  if (profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
  }
}

// Lưu access_token và refresh_token vào localStorage
export const setTokensToLS = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}

// Lưu trạng thái isAuthenticated
export const setIsAuthenticatedToLS = (isAuthenticated: boolean) => {
  localStorage.setItem('is_authenticated', JSON.stringify(isAuthenticated))
}

// Lấy profile từ localStorage
export const getProfileFromLS = (): User | null => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

// Lấy access_token từ localStorage
export const getAccessTokenFromLS = (): string | null => {
  return localStorage.getItem('access_token')
}

// Lấy refresh_token từ localStorage
export const getRefreshTokenFromLS = (): string | null => {
  return localStorage.getItem('refresh_token')
}

// Lấy trạng thái isAuthenticated từ localStorage
export const getIsAuthenticatedFromLS = (): boolean => {
  const result = localStorage.getItem('is_authenticated')
  return result ? JSON.parse(result) : false
}

// Xóa tất cả dữ liệu trong localStorage
export const clearLS = () => {
  localStorage.removeItem('profile')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('is_authenticated')
}
