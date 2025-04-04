import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/utils'
import DOMPurify from 'dompurify' //Giup chong loi XSS, loai bo cac ma script doc hai de khong bị lấy access_token
import { isUndefined, omitBy } from 'lodash'
import useQueryParam from '../../hooks/useQueryParam'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Product from '../ProductList/Product'
import cartApi from '../../apis/cart.api'
import { AppContext } from '../../contexts/app.context'
import { queryClient } from '../../main'
import { cartsStatus } from '../../constants/cart'
import { toast } from 'react-toastify'
import {
  FaHome,
  FaCheckCircle,
  FaInfoCircle,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ProductListConfig, ProductType } from '../../types/product.type'

interface Image {
  id?: number
  duong_dan_hinh: string
}

// Define QueryConfig if it doesn't exist elsewhere
type QueryConfig = {
  page?: string
  limit?: number
  sort_by?: string
  name?: string
  order?: string
}

export default function ProductDetail() {
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetails(id as string)
    }
  })
  const productData = productDetailData?.data?.data
  const { profile } = useContext(AppContext)
  const [currenIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [isActiveImg, setIsActiveImg] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImages = useMemo(
    () => (productData ? productData.hinh_anh_can_ho?.slice(...currenIndexImage) : []),
    [productData, currenIndexImage]
  )
  useEffect(() => {
    if (productData && productData.hinh_anh_can_ho && productData.hinh_anh_can_ho.length > 0) {
      setIsActiveImg(productData.hinh_anh_can_ho[0].duong_dan_hinh)
    }
  }, [productData])
  const addToCartMutation = useMutation(cartApi.addToCart)
  const queryParams = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 10,
      sort_by: queryParams.sort_by,
      name: queryParams.name,
      order: queryParams.order
    },
    isUndefined
  )
  const { data: productsData } = useQuery({
    queryKey: ['can-ho', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  if (!productData) return null
  const next = () => {
    if (currenIndexImage[1] < (productData.hinh_anh_can_ho?.length || 0)) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currenIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const chooseActive = (img: string) => {
    setIsActiveImg(img)
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image

    if (naturalWidth > rect.width || naturalHeight > rect.height) {
      const offsetX = event.pageX - (rect.x + window.scrollX)
      const offsetY = event.pageY - (rect.y + window.scrollY)
      const maxZoomWidth = Math.min(naturalWidth * 2, 800)
      const maxZoomHeight = Math.min(naturalHeight * 2, 800)

      const top = offsetY * (1 - maxZoomHeight / rect.height)
      const left = offsetX * (1 - maxZoomWidth / rect.width)
      image.style.width = maxZoomWidth + 'px'
      image.style.height = maxZoomHeight + 'px'
      image.style.maxWidth = 'unset'
      image.style.top = top + 'px'
      image.style.left = left + 'px'
      image.style.position = 'absolute'
    }
  }
  const handleRemove = () => {
    imageRef.current?.removeAttribute('style')
  }

  const addCart = () => {
    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', { autoClose: 2000 })
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      return
    }
    if (!profile) {
      toast.error('Không thể xác định thông tin người dùng. Vui lòng đăng nhập lại.', { autoClose: 2000 })
      return
    }
    addToCartMutation.mutate(
      {
        id_can_ho: parseInt(productData.id),
        id_khach_hang: profile.id,
        ngay_xem_canho: new Date(),
        trang_thai: 0
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 2000 })
          queryClient.invalidateQueries({ queryKey: ['gio-hang', { status: cartsStatus.incart }] })
        },
        onError: (error) => {
          console.error('Add to cart error:', error)
          toast.error('Không thể thêm vào giỏ hàng. Vui lòng thử lại.')
        }
      }
    )
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-6 shadow-lg rounded-lg'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemove}
              >
                <img
                  src={isActiveImg}
                  alt={productData?.ten_can_ho}
                  className='absolute top-0 left-0 w-full h-full object-cover bg-white'
                  ref={imageRef}
                />
              </div>

              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute top-1/2 left-0 z-10 h-9 w-5 -translate-x-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img: Image) => {
                  const isActive = img.duong_dan_hinh === isActiveImg
                  return (
                    <div
                      className='relative w-full pt-[100%] '
                      key={img.duong_dan_hinh}
                      onMouseEnter={() => chooseActive(img.duong_dan_hinh)}
                    >
                      <img
                        src={img.duong_dan_hinh}
                        alt={productData?.ten_can_ho}
                        className='absolute top-0 left-0 w-full h-full cursor-pointer object-cover bg-white'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange-700'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute top-1/2 right-0 z-10 h-9 w-5 -translate-x-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='col-span-7'>
              <div className='bg-gradient-to-r from-yellow-50 to-white p-6 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <FaHome className='text-yellow-600 text-2xl' />
                  {productData && <h1 className='text-2xl font-bold text-gray-800'>{productData.ten_toa_can_ho}</h1>}
                </div>

                <div className='mt-6 flex items-center bg-white p-4 rounded-lg shadow-sm'>
                  <div className='flex items-center gap-2'>
                    <FaCheckCircle className='text-green-500 text-xl' />
                    {productData && <span className='font-medium text-green-600'>{productData.tinh_trang_can_ho}</span>}
                    {productData && (
                      <ProductRating
                        rating={productData.gia_ban}
                        activeClassname='fill-yellow-400 text-yellow-400 h-4 w-4'
                        nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                      />
                    )}
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  <div className='flex items-center gap-2'>
                    <FaInfoCircle className='text-blue-500' />
                    {productData && (
                      <span className='font-medium'>{formatNumberToSocialStyle(productData.gia_thu_ve)}</span>
                    )}
                    <span className='text-gray-500'>Đã bán</span>
                  </div>
                </div>

                <div className='mt-6 bg-gray-50 p-6 rounded-lg shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <FaMoneyBillWave className='text-green-600 text-xl' />
                      {productData && (
                        <span className='text-gray-500 line-through text-lg'>
                          ₫{formatCurrency(productData.gia_thu_ve)}
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-4'>
                      {productData && (
                        <div className='text-3xl font-bold text-red-600'>₫{formatCurrency(productData.gia_ban)}</div>
                      )}
                      {productData && (
                        <div className='bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                          -{rateSale(productData.gia_thu_ve, productData.gia_ban)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-6 grid grid-cols-2 gap-4 bg-white p-4 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-yellow-500' />
                    <span>Vị trí: Quận 9, TP.HCM</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaFileAlt className='text-yellow-500' />
                    {productData && <span>Chú Thích: {productData.chu_thich}</span>}
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaHome className='text-yellow-500' />
                    {productData && <span>Loại căn hộ: {productData.loai_can_ho}</span>}
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaInfoCircle className='text-yellow-500' />
                    {productData && <span>Diện tích: {productData.dien_tich}</span>}
                  </div>
                </div>

                <div className='mt-8 flex items-center gap-4'>
                  <button
                    onClick={addCart}
                    className='flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-yellow-50 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition duration-300'
                  >
                    <FaShoppingCart className='text-xl' />
                    <span className='font-medium'>Thêm vào giỏ hàng</span>
                  </button>
                  <button className='flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300'>
                    <FaCalendarCheck className='text-xl' />
                    <span className='font-medium'>Đặt lịch ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <div className='flex items-center gap-2 border-b border-gray-200 pb-4 mb-6'>
              <FaInfoCircle className='text-yellow-600 text-xl' />
              <h2 className='text-xl font-bold text-gray-800'>Mô tả sản phẩm</h2>
            </div>
            <div className='prose prose-lg max-w-none'>
              {productData && (
                <div
                  className='text-gray-600 leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productData.chu_thich)
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <div className='container'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                  <FaHome className='text-yellow-500 text-xl' />
                  <h2 className='text-xl font-bold text-gray-800'>Căn hộ tương tự</h2>
                </div>
                <div className='flex gap-2'>
                  <button className='custom-prev-button p-2 rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white transition-all'>
                    <FaChevronLeft className='w-5 h-5' />
                  </button>
                  <button className='custom-next-button p-2 rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white transition-all'>
                    <FaChevronRight className='w-5 h-5' />
                  </button>
                </div>
              </div>

              {productsData && productsData.data && (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    prevEl: '.custom-prev-button',
                    nextEl: '.custom-next-button'
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2
                    },
                    768: {
                      slidesPerView: 3
                    },
                    1024: {
                      slidesPerView: 4
                    },
                    1280: {
                      slidesPerView: 5
                    }
                  }}
                  className='related-products-slider'
                >
                  {productsData.data.data &&
                    Array.isArray(productsData.data.data) &&
                    productsData.data.data.map((product: ProductType) => (
                      <SwiperSlide key={product.id} className='pb-10'>
                        <div className='h-full'>
                          <Product product={product} />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
