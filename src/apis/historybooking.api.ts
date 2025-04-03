import { bookingType } from '../types/booking.type'
import { SuccessResponse } from '../types/untils.type'
import http from '../utils/http'

const URL = 'booking/'
const bookingApi = {
  getAllBooking() {
    return http.get<SuccessResponse<bookingType>>(URL)
  },
  addbooking(body: { id_khach_hang: number; id_can_ho: number; ngay_xem_canho: string }) {
    return http.post<SuccessResponse<bookingType>>(URL, body)
  },
  updateHistory(id: number, body: { ngay_xem_canho: string }) {
    return http.put<SuccessResponse<bookingType>>(`${URL}/${id}`, body)
  },
  getBookingByIdKhachHang(idKhachHang: number) {
    return http.get<SuccessResponse<bookingType>>(`${URL}customer/${idKhachHang}`)
  }
}
export default bookingApi
