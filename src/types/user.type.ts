// Cách để tạo nhanh 1 cái interface bằng cách qua bên API mà ta đã tạo copy dáng vào sau đó rê chuột vào cái ta vừa paste nó sẽ hiện từng kiể dữ liệu của từng trường

import { Customer } from './customer.type'

type Role = 'user' | 'admin'
export interface User {
  id: number
  username: string
  email: string
  quyen?: Role
  phone?: number
  address?: string
  password?: string
  khachHang?: Customer // Made optional with the ? mark
  avatar?: string
}
