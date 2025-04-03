import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { schema, Schema } from '../../utils/rules'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/untils.type'
import Button from '../../components/Button'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import path from '../../constants/path'

type FormData = Schema

export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body),
    onSuccess: (data) => {
      navigate(path.login)
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<FormData, 'confirm_password'>, {
              message: formError[key as keyof Omit<FormData, 'confirm_password'>]
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body)
  })

  return (
    <div
      className='container'
      style={{
        backgroundImage: "url('https://market.vinhomes.vn/static/19356f032e6/images/background/background-login.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-full px-4 items-center overflow-hidden'>
        <div className='text-left'>
          <h1 className='text-3xl font-bold mb-4'>Giải pháp giao dịch Bất động sản trực tuyến</h1>
          <h2 className='text-4xl font-semibold text-gray-700 mb-6'>Vinhomes Market</h2>
          <p className='text-lg mb-4'>
            Bằng việc bấm vào nút "Đăng ký", bạn đồng ý với Chính sách Quyền Riêng tư và Chính Sách Bảo Mật Thông Tin
            của chúng tôi.
          </p>
          <div className='mb-6'>
            <h3 className='font-semibold text-lg'>Khách đã đăng nhập</h3>
            <ul className='list-disc pl-5'>
              <li>Thông tin, tài liệu chi tiết, chuyên sâu về các dự án và quỹ căn của Vinhomes Market</li>
              <li>Công cụ tính giá, chiết khấu và dòng tiền</li>
              <li>Cập nhật sớm những thông tin về dự án mới</li>
              <li>Cập nhật biến động kinh tế vĩ mô, đề xuất bất động sản phù hợp</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-lg'>Khách chưa đăng nhập</h3>
            <ul className='list-disc pl-5'>
              <li>Xem thông tin về các dự án của Vinhomes</li>
              <li>Chuyến tham quan ảo Vinhomes 360</li>
            </ul>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8'>
          <h3 className='text-2xl font-bold mb-4'>Đăng ký</h3>
          <form onSubmit={onSubmit} noValidate>
            <Input
              type='text'
              name='username'
              className='mb-2'
              placeholder='Nhập tên của bạn'
              register={register}
              errorMessage={errors.username?.message}
            />
            <Input
              type='email'
              name='email'
              className='mb-2'
              placeholder='Nhập email của bạn'
              register={register}
              errorMessage={errors.email?.message}
            />
            <div className='mb-2'>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    international
                    defaultCountry='VN'
                    placeholder='Nhập số điện thoại của bạn'
                    value={field.value}
                    onChange={field.onChange}
                    className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                )}
              />
              {errors.phone && <div className='mt-1 text-sm text-red-500'>{errors.phone.message}</div>}
            </div>
            <Input
              type='password'
              name='password'
              className='mb-2'
              placeholder='Nhập mật khẩu'
              register={register}
              errorMessage={errors.password?.message}
              autoComplete='on'
            />
            <Input
              type='password'
              name='confirm_password'
              className='mb-2'
              placeholder='Nhập lại mật khẩu'
              register={register}
              autoComplete='on'
              errorMessage={errors.confirm_password?.message}
            />
            <Button
              type='submit'
              className='w-full py-4 px-2 uppercase bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex justify-center items-center'
              isLoading={registerAccountMutation.isLoading}
              disabled={registerAccountMutation.isLoading}
            >
              Đăng ký
            </Button>
          </form>
          <p className='text-sm text-gray-600 mt-4'>
            Bạn đã có tài khoản?{' '}
            <Link to='/login' className='text-blue-500'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
