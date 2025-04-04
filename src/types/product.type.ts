export interface Image {
  id: number
  duong_dan_hinh: string
}

export interface PhanKhu {
  id: number
  ten_phan_khu: string
  dia_chi: string
  quy_mo: string
  tien_ich: string
  loai_hinh_san_pham: string
  created_at: string
}

// Add a new interface for creating products
export interface CreateProduct {
  ten_toa_can_ho: string
  ten_can_ho: string
  loai_can_ho: string
  chu_thich: string
  tinh_trang_can_ho: string
  loai_kinh_doanh: string
  ma_phan_khu: number
  dien_tich: string
  gia_thu_ve: number
  gia_ban: number
  huong: string
  hinh_anh_can_ho: { duong_dan_hinh: string }[]
}

// Keep the existing Product interface for fetched data
export interface ProductType extends CreateProduct {
  id: string
  phan_khu: PhanKhu
}

export interface ProductList {
  data: ProductType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: number | string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
}
