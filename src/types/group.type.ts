import { ProductType } from './product.type'

export interface GroupType {
  id: number
  ten_phan_khu: string
  dia_chi: string
  quy_mo: string
  tien_ich: string
  loai_hinh_san_pham: string
  created_at: string
  can_ho: ProductType
}
