import http from '../utils/http'
import { Cart, CartList, cartList } from '../types/cart.type'
import { SuccessResponse } from '../types/untils.type'
const URL = 'gio-hang/'
const cartApi = {
  addToCart(body: { id_can_ho: number; id_khach_hang: number; ngay_xem_canho: Date; trang_thai: number }) {
    return http.post<SuccessResponse<Cart>>(`${URL}add-to-cart`, body)
  },
  getALlCartByStatus(params: { status: cartList }) {
    return http.get<SuccessResponse<CartList>>(`${URL}`, {
      params
    })
  },
  updateCart(
    id: number,
    body: { id_can_ho: number; id_khach_hang: number; ngay_xem_canho: string; trang_thai: number }
  ) {
    return http.put<SuccessResponse<Cart>>(`${URL}${id}`, body)
  },

  deleteCart(id: number) {
    return http.delete<SuccessResponse<Cart>>(`${URL}${id}`)
  },

  getCartByIdKhachHang(idKhachHang: number) {
    return http.get<SuccessResponse<CartList>>(`${URL}khach-hang/${idKhachHang}`)
  }
}

export default cartApi
