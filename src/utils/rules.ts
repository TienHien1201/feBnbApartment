import * as yup from 'yup'
import { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'phone' | 'username' | 'password' | 'confirm_password']?: RegisterOptions }

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email Không đúng định dạng')
    .min(5, 'Độ dài tư 5 - 160 ký tự')
    .max(160, 'Độ dài tư 5 - 160 ký tự'),
  phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(
      /^\+84\d{9,10}$/, // Bắt buộc bắt đầu bằng +84, theo sau là 9-10 chữ số (tổng 12-13 ký tự)
      'Số điện thoại phải bắt đầu bằng +84 và có 10 hoặc 11 chữ số'
    ),
  username: yup
    .string()
    .required('Username là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài tư 6 - 160 ký tự')
    .max(160, 'Độ dài tư 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('nhập lại password là bắt buộc')
    .min(6, 'Độ dài tư 6 - 160 ký tự')
    .max(160, 'Độ dài tư 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  access_token: yup.string()
})

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  username: {
    required: { value: true, message: 'Bắt buộc phải nhập username !' },
    maxLength: { value: 160, message: 'Username phải nhập từ 5 - 160 ký tự' },
    minLength: { value: 5, message: 'Username phải nhập từ 5 - 160 ký tự' }
  },
  phone: {
    required: { value: true, message: 'Bắt buộc phải nhập số điện thoại !' },
    maxLength: { value: 10, message: 'Số điện thoại phải nhập 10 số' },
    minLength: { value: 10, message: 'Số điện thoại phải nhập 10 số' }
  },
  email: {
    required: { value: true, message: 'Bắt buộc phải nhập email !' },
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Định dạng email không hợp lệ !' },
    maxLength: { value: 160, message: 'Email phải nhập từ 5 - 160 ký tự' },
    minLength: { value: 5, message: 'Email phải nhập từ 5 - 160 ký tự' }
  },
  password: {
    required: { value: true, message: 'Bắt buộc phải nhập mật khẩu !' },
    maxLength: { value: 160, message: 'Mật khẩu phải nhập từ 6 - 160 ký tự' },
    minLength: { value: 6, message: 'Mật khẩu phải nhập từ 6 - 160 ký tự' }
  },
  confirm_password: {
    required: { value: true, message: 'Bắt buộc phải nhập lại mật khẩu !' },
    maxLength: { value: 160, message: 'Mật khẩu phải nhập từ 6 - 160 ký tự' },
    minLength: { value: 6, message: 'Mật khẩu phải nhập từ 6 - 160 ký tự' },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
        : undefined
  }
})

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email Không đúng định dạng')
    .min(5, 'Độ dài tư 5 - 160 ký tự')
    .max(160, 'Độ dài tư 5 - 160 ký tự'),
  username: yup
    .string()
    .required('Username là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài tư 6 - 160 ký tự')
    .max(160, 'Độ dài tư 6 - 160 ký tự')
})

export const SearchNameSchema = yup.object({
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type NameSchema = yup.InferType<typeof SearchNameSchema>
