// File này sẽ chứa các interface tiện ích để các interface khác tái sử dụng
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  map(arg0: (product: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
  message: string
  data: Data
}
