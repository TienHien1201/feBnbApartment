import { Link, useNavigate } from 'react-router-dom'
import { LoginSchema, loginSchema } from '../../utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import Input from '../../components/Input'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

import path from '../../constants/path'
import { setProfileToLS, setTokensToLS } from '../../utils/auth'

type FormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.loginAccount(body),
    onSuccess: (data) => {
      setIsAuthenticated(true)
      setProfile(data.data.user)
      setProfileToLS(data.data.user)
      setTokensToLS(data.data.access_token, data.data.refresh_token || '')
      navigate(path.home)
    },
    onError: (error: any) => {
      if (error.response?.status === 422) {
        const formError = error.response?.data?.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Pick<FormData, 'username' | 'password'>, {
              message: formError[key as keyof Pick<FormData, 'username' | 'password'>]
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    const dataToSend = {
      email: data.email,
      password: data.password
    }
    loginMutation.mutate(dataToSend)
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
            Đăng nhập ngay để khám phá toàn bộ thông tin và tận hưởng mọi tính năng tuyệt vời trên Vinhomes Market!
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
          <h3 className='text-2xl font-bold mb-4'>Đăng nhập qua email</h3>
          <form onSubmit={onSubmit} noValidate>
            <Input
              type='text'
              name='username'
              className='mb-2'
              placeholder='Nhập username của bạn'
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
            <Input
              type='password'
              name='password'
              className='mb-2'
              placeholder='Nhập mật khẩu'
              register={register}
              errorMessage={errors.password?.message}
              autoComplete='on'
            />
            <div className='flex items-center justify-between mb-4'>
              <a href='#' className='text-blue-500 text-sm'>
                Quên mật khẩu
              </a>
            </div>
            <Button
              type='submit'
              className='w-full py-4 px-2 uppercase bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex justify-center items-center'
              isLoading={loginMutation.isLoading}
              disabled={loginMutation.isLoading}
            >
              Đăng nhập
            </Button>
          </form>
          <p className='text-sm text-gray-600 mt-4'>
            Bạn chưa có tài khoản?{' '}
            <Link to='/register' className='text-blue-500'>
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
