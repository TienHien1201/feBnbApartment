import bg from '../../assets/VinhomesBg.jpg'
import Popover from '../Popover'
import { useMutation, useQuery } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { useContext, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import path from '../../constants/path'
import { cartsStatus } from '../../constants/cart'
import cartApi from '../../apis/cart.api'
import noProductImg from '../../../src/assets/no-product.png'
import { formatCurrency } from '../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { queryClient } from '../../main'
import { clearLS } from '../../utils/auth'
import {
  FaHome,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaGlobe,
  FaCaretDown,
  FaBuilding,
  FaCalendarAlt,
  FaInfoCircle,
  FaNewspaper,
  FaTimes,
  FaCompass,
  FaTools
} from 'react-icons/fa'

const MAX_PRODUCTS_IN_CART = 5

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const navigate = useNavigate()

  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  // Xử lý đăng xuất
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      clearLS()
      queryClient.removeQueries({ queryKey: ['gio-hang', { status: cartsStatus.incart }] })
      navigate(path.login)
    },
    onError: (error) => {
      console.error('Logout error:', error)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const { data: productInCartData, error } = useQuery({
    queryKey: ['carts', { idKhachHang: profile?.id }],
    queryFn: () => cartApi.getCartByIdKhachHang(profile?.id as number),
    enabled: isAuthenticated && Boolean(profile?.id),
    staleTime: 1000
  })

  const productInCart = productInCartData?.data

  return (
    <div
      className='pb-10 h-72 pt-2 text-gray-100 font-bold relative bg-gradient-to-r from-gray-900/90 to-gray-800/90'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='container relative'>
        <nav className='flex justify-between items-center py-4 px-6'>
          <div className='flex space-x-6 items-center translate-x-16'>
            <Link
              to={path.home}
              className='flex items-center gap-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105'
            >
              <FaHome className='text-xl' />
              <span>Tổng quan</span>
            </Link>
            <Link
              to={path.canvas}
              className='flex items-center gap-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105'
            >
              <FaCompass className='text-xl' />
              <span>Link 360</span>
            </Link>
            <Link
              to={path.product}
              className='flex items-center gap-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105'
            >
              <FaBuilding className='text-xl' />
              <span>Căn hộ</span>
            </Link>
            <Link
              to={path.groups}
              className='flex items-center gap-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105'
            >
              Phân khu
            </Link>
            <Link
              to={path.about}
              className='flex items-center gap-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105'
            >
              <FaInfoCircle className='text-xl' />
              <span>Giới thiệu</span>
            </Link>
            <Link
              to={path.news}
              className='flex items-center gap-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105'
            >
              <FaNewspaper className='text-xl' />
              <span>Tin tức</span>
            </Link>
          </div>
          <div className='flex items-center space-x-6'>
            <button onClick={toggleSearch} className='hover:text-yellow-400 transition-all duration-300'>
              {showSearch ? <FaTimes className='text-2xl' /> : <FaSearch className='text-2xl' />}
            </button>
            <Popover
              className='flex items-center gap-2 hover:text-white transition-all duration-300'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                  <div className='flex flex-col py-2 px-3'>
                    <button className='py-2 px-3 hover:text-yellow-500 transition duration-300'>Tiếng Việt</button>
                    <button className='py-2 px-3 hover:text-yellow-500 mt-2 transition duration-300'>English</button>
                  </div>
                </div>
              }
            >
              <FaGlobe className='text-xl' />
              <span>Ngôn ngữ</span>
              <FaCaretDown />
            </Popover>
            {isAuthenticated && profile ? (
              <Popover
                className='flex items-center gap-2 hover:text-white transition-all duration-300'
                renderPopover={
                  <div className='bg-white shadow-lg rounded-lg border border-gray-100 w-48'>
                    <Link to={path.profile} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50'>
                      <FaUser className='text-gray-600' />
                      <span>Tài khoản của tôi</span>
                    </Link>
                    <Link to={path.booking} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50'>
                      <FaCalendarAlt className='text-gray-600' />
                      <span>Đặt lịch</span>
                    </Link>
                    {profile.quyen === 'admin' && (
                      <Link to={path.Admin} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50'>
                        <FaTools className='text-gray-600' />
                        <span>Quản lý căn hộ</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full'
                    >
                      <FaSignOutAlt className='text-gray-600' />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                }
              >
                <div className='w-6 h-6 mr-2 flex-shrink-0'>
                  <img
                    src='https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg'
                    alt='avatar'
                    className='w-6 h-6 object-cover rounded-full'
                  />
                </div>
                <div>{profile.username}</div>
              </Popover>
            ) : (
              <div className='flex items-center'>
                <Link to={path.register} className='mx-3 capitalize hover:text-white'>
                  Đăng Ký
                </Link>
                <div className='border-r-[2px] border-r-black h-4' />
                <Link to={path.login} className='mx-3 capitalize hover:text-white'>
                  Đăng Nhập
                </Link>
              </div>
            )}
            <Popover
              initialOpen
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm'>
                  {productInCartData?.data && productInCartData.data.length > 0 ? (
                    <div className='p-2'>
                      <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {productInCart.slice(0, MAX_PRODUCTS_IN_CART).map((prCart) => (
                          <div className='mt-2 py-2 hover:bg-gray-100 flex' key={prCart.id}>
                            <div className='flex-shrink-0'>
                              <img
                                className='w-11 h-11 object-cover'
                                src={prCart.can_ho?.hinh_anh_can_ho?.[0]?.duong_dan_hinh || noProductImg}
                                alt='pro-in-cart'
                              />
                            </div>
                            <div className='flex-grow ml-2 overflow-hidden'>
                              <div className='truncate'>{prCart.can_ho?.ten_toa_can_ho || 'Không có tên'}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-green-500'>₫{formatCurrency(prCart.can_ho?.gia_ban || 0)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='flex mt-4 items-center justify-between'>
                        <div className='mr-4 capitalize text-xs text-gray-500'>
                          {productInCart.length > MAX_PRODUCTS_IN_CART
                            ? `${productInCart.length - MAX_PRODUCTS_IN_CART} Thêm vào giỏ hàng`
                            : 'Thêm vào giỏ hàng'}
                        </div>
                        <Link
                          to={path.cart}
                          className='capitalize bg-yellow-500 hover:bg-opacity-80 px-4 py-2 rounded-sm text-white'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='p-2 flex flex-col items-center'>
                      <div className='mt-3 capitalize text-gray-400'>Giỏ hàng trống</div>
                      <img src={noProductImg} alt='no-product' className='w-24 h-24 opacity-50' />
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8 hover:text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                  />
                </svg>
                {productInCartData?.data && productInCartData.data.length > 0 && (
                  <span className='absolute left-[10px] top-[-5px] rounded-full px-[9px] py-[1px] bg-white text-yellow-500'>
                    {productInCartData.data.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </nav>

        {/* Search Form */}
        {showSearch && (
          <div className='absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50 px-4'>
            <div className='bg-white rounded-lg shadow-2xl p-4'>
              <div className='flex items-center border-b border-gray-200'>
                <FaSearch className='text-gray-400 mr-3' />
                <input
                  type='text'
                  placeholder='Tìm kiếm căn hộ...'
                  className='w-full py-2 outline-none text-gray-700'
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-gray-500 text-sm mb-2'>Tìm kiếm phổ biến:</h3>
                <div className='flex flex-wrap gap-2'>
                  {['Căn hộ 2PN', 'Vinhomes Ocean Park', 'Căn góc', 'Penthouse'].map((tag) => (
                    <span
                      key={tag}
                      className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-gray-200'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
