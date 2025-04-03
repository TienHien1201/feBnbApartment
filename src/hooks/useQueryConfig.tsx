import { isUndefined, omitBy } from "lodash"
import { ProductListConfig } from "../types/product.type"
import useQueryParam from "./useQueryParam"

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  // Đây là custom hook để lấy ra các query params từ url
  const queryParams = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    //omit la 1 ham cua lodas giup loc ra cac gia tri thoa man dk cua chung ta. Cu the queryConfig se loai bo nhung gia tri undefined
    {
      // page: queryParams.page || '1',
      // limit: queryParams.limit || 10,
      // sort_by: queryParams.sort_by,
      name: queryParams.name,
      // order: queryParams.order,
      // exclude: queryParams.exclude,
      // price_max: queryParams.price_max,
      // price_min: queryParams.price_min,
      // rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  return queryConfig
}
