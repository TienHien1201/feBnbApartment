import { AxiosResponse } from 'axios'
import http from '../utils/http'
import { Customer } from '../types/customer.type'

const customerApi = {
  getCustomerById: (id: string): Promise<AxiosResponse<Customer>> => {
    return http.get(`/khach-hang/${id}`)
  },
  getCustomerByIdUser: (userId: string): Promise<AxiosResponse<Customer>> => {
    return http.get(`/khach-hang/tai-khoan/${userId}`)
  }
}

export default customerApi
