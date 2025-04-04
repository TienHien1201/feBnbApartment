

// Định nghĩa User cho AuthResponse
export interface User {
  id: number
  username: string
  email: string
  quyen?: 'user' | 'admin'
  phone?: number
  address?: string
  avatar?: string
  // Các trường khác có thể có trong response đăng nhập
}

// Response từ API khi đăng nhập/đăng ký
export interface AuthResponse {
  user: User
  access_token: string
  refresh_token?: string
}
