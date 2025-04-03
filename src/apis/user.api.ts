import { User } from '../types/user.type'
import { SuccessResponse } from '../types/untils.type'
import http from '../utils/http'
const url = 'tai-khoan/'
const userApi = {
  getAllUser() {
    return http.get<SuccessResponse<User>>(url)
  },
  getProfile(id: number) {
    return http.get<SuccessResponse<User>>(`${url}/${id}`)
  },
  updateProfile(id: number, body: Partial<User>) {
    return http.put<SuccessResponse<User>>(`${url}/${id}`, body)
  }
}

export default userApi
