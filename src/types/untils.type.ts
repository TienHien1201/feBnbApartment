// File này sẽ chứa các interface tiện ích để các interface khác tái sử dụng
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  message: string
  data: Data
}
