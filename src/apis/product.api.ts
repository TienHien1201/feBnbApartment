import { Product, ProductList, ProductListConfig, CreateProduct } from '../types/product.type'
import { SuccessResponse } from '../types/untils.type'
import http from '../utils/http'

const URL = 'can-ho/anh'
const Base_URL_Product = 'can-ho'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetails(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },
  getProductByName(name: string) {
    return http.get<SuccessResponse<ProductList>>(`${Base_URL_Product}/name/${name}`)
  },
  addProduct(body: CreateProduct) {
    return http.post<SuccessResponse<Product>>(Base_URL_Product, body)
  },
  getCanHoByPhanKhu(id: number) {
    return http.get<SuccessResponse<ProductList>>(`${Base_URL_Product}/phan-khu/${id}`)
  },
  getCanHoByPriceRange(minPrice: number, maxPrice: number) {
    return http.post<SuccessResponse<ProductList>>(`${Base_URL_Product}/price-range`, {
      minPrice,
      maxPrice
    })
  },
  getCanHoSorted(order: 'asc' | 'desc') {
    return http.get<SuccessResponse<ProductList>>(`${Base_URL_Product}/sort`, {
      params: { order }
    })
  },
  getCanHoByFilter(filter: 'popular' | 'newest' | 'hot') {
    return http.get<SuccessResponse<ProductList>>(`${Base_URL_Product}/filter`, {
      params: { filter }
    })
  },
  getAllCanHoWithImagesByName(name: string) {
    return http.get<SuccessResponse<ProductList>>(`${Base_URL_Product}/name/${name}`)
  },
  updateProduct(id: string, body: Partial<Product>) {
    return http.put<SuccessResponse<Product>>(`${Base_URL_Product}/${id}`, body)
  },
  deleteProduct(id: string) {
    return http.delete<SuccessResponse<Product>>(`${Base_URL_Product}/${id}`)
  }
}

export default productApi
