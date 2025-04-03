// Trạng thái
// -1 : căn hộ đang trong giỏ hàng
// 0 : tất cả căn hộ
// 1: đã cọc chờ thanh toán
// 2: đã thanh toán
// 3: đã xem
export type cartStatus = -1 | 1 | 2 | 3
export type cartList = cartStatus | 0

export interface Cart {
  id: number
  id_can_ho: number
  id_khach_hang: number
  ngay_xem_canho: Date
  trang_thai: cartList
  khach_hang?: {
    id: number
    ma_tai_khoan: number
    ho_ten: string
    so_dien_thoai: string
    email: string | null
    dia_chi: string | null
  }
  can_ho?: {
    id: number
    ten_toa_can_ho: string
    hinh_anh_can_ho?: Array<{ duong_dan_hinh: string }>
    gia_ban?: string | number
  }
}

export default Cart
