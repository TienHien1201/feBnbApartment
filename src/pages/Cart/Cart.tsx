import { Link } from 'react-router-dom'
import noproduct from '../../assets/no-product.png'
import path from '../../constants/path'
import { useMutation, useQuery } from '@tanstack/react-query'
import cartApi from '../../apis/cart.api'
import { formatCurrency } from '../../utils/utils'
import { useEffect, useState, useContext } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import bookingApi from '../../apis/historybooking.api'
import { bookingType } from '../../types/booking.type'
import { queryClient } from '../../main'
import {
  FaShoppingCart,
  FaCalendar,
  FaTrashAlt,
  FaMoneyBillWave,
  FaClock,
  FaCheckSquare,
  FaBuilding
} from 'react-icons/fa'
import { motion } from 'framer-motion'
// import { getProfileFromLS } from '../../utils/auth'
import { AppContext } from '../../contexts/app.context'

export default function Cart() {
  const { profile } = useContext(AppContext)
  const idKhachHang = profile?.id

  const { data: productIncart, refetch } = useQuery({
    queryKey: ['carts', { idKhachHang }],
    queryFn: () => cartApi.getCartByIdKhachHang(idKhachHang as number),
    enabled: Boolean(idKhachHang),
    staleTime: 1000,
    // Thêm defaultOptions để xử lý mặc định khi không có dữ liệu
    select: (data) => ({
      data: data.data || [] // Trả về mảng rỗng nếu không có dữ liệu
    })
  })

  const productInCartdata = productIncart?.data || []
  console.log(productInCartdata)
  console.log(productInCartdata?.map((product) => product.id))

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body
    }: {
      id: number
      body: { id_can_ho: number; id_khach_hang: number; ngay_xem_canho: string; trang_thai: number }
    }) => cartApi.updateCart(id, body),
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(['carts', { idKhachHang }])
    }
  })

  const deleteMutation = useMutation({
    mutationFn: cartApi.deleteCart,
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({
        queryKey: ['carts']
      })
    }
  })
  const Booking = useMutation(bookingApi.addbooking, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booking'])
    }
  })

  const handleDelete = (IdCart: number) => {
    deleteMutation.mutate(IdCart)
  }
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [selectedDates, setSelectedDates] = useState<{ [key: number]: Date }>({})
  const [showCalendar, setShowCalendar] = useState<number | null>(null)

  const handleAddBooking = async (cart: bookingType) => {
    try {
      const selectedDate = selectedDates[cart.id]

      // Format date to YYYY-MM-DD HH:mm:ss format
      const formatDate = (date: Date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ')
      }

      let ngayXemCanHo
      if (selectedDate) {
        // Set time to noon (12:00:00) of selected date
        const dateWithTime = new Date(selectedDate)
        dateWithTime.setHours(12, 0, 0, 0)
        ngayXemCanHo = formatDate(dateWithTime)
      } else if (cart.ngay_xem_canho) {
        // Format existing date
        const existingDate = new Date(cart.ngay_xem_canho)
        existingDate.setHours(12, 0, 0, 0)
        ngayXemCanHo = formatDate(existingDate)
      } else {
        // Default to current date at noon
        const now = new Date()
        now.setHours(12, 0, 0, 0)
        ngayXemCanHo = formatDate(now)
      }

      // Chờ đặt lịch xong rồi mới xóa
      await Booking.mutateAsync({
        id_khach_hang: cart.id_khach_hang,
        id_can_ho: cart.id_can_ho,
        ngay_xem_canho: ngayXemCanHo
      })

      // Sau khi booking thành công, mới xóa giỏ hàng
      await deleteMutation.mutateAsync(cart.id)
      refetch()
      console.log(`🟢 Đặt lịch thành công và đã xóa giỏ hàng có ID: ${cart.id}`)
    } catch (error) {
      console.error('🔴 Lỗi trong quá trình đặt lịch hoặc xóa giỏ hàng:', error)
    }
  }

  useEffect(() => {
    if (productInCartdata && productInCartdata.length > 0) {
      const total = productInCartdata.reduce((sum, product) => sum + Number(product.can_ho.gia_ban), 0)
      setTotalPrice(total)
    }
  }, [productInCartdata])

  const handleDateChange = (date: Date, cartId: number, idCanHo: number, userId: number, trangThai: number) => {
    setSelectedDates((prev) => ({ ...prev, [cartId]: date }))

    // Format date to YYYY-MM-DD HH:mm:ss
    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 19).replace('T', ' ')
    }

    const dateWithTime = new Date(date)
    dateWithTime.setHours(12, 0, 0, 0)
    const formattedDate = formatDate(dateWithTime)

    updateMutation.mutate({
      id: cartId,
      body: {
        id_can_ho: idCanHo,
        id_khach_hang: userId,
        ngay_xem_canho: formattedDate,
        trang_thai: trangThai
      }
    })
    setShowCalendar(null)
  }

  const toggleCalendar = (index: number) => {
    setShowCalendar((prev) => (prev === index ? null : index))
  }

  const currentDate = new Date()

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 min-h-screen'>
      <div className='container max-w-7xl mx-auto px-4'>
        {/* Header Card */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
            <FaShoppingCart className='text-yellow-500' />
            Giỏ Hàng Của Bạn
          </h1>
          <p className='text-gray-600 mt-2'>Quản lý danh sách căn hộ bạn quan tâm</p>
        </div>

        {productInCartdata && productInCartdata.length > 0 ? (
          <>
            {/* Main Content */}
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                {/* Header */}
                <div className='grid grid-cols-12 rounded-lg bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow-md'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-yellow-500 rounded' />
                      </div>
                      <div className='flex-grow text-gray-700 font-medium flex items-center gap-2'>
                        <FaShoppingCart className='text-yellow-500' />
                        Sản phẩm
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center font-medium'>
                      <div className='col-span-2 flex items-center justify-center gap-2'>
                        <FaMoneyBillWave className='text-green-500' />
                        Đơn giá
                      </div>
                      <div className='col-span-1 flex items-center justify-center gap-2'>
                        <FaCalendar className='text-blue-500' />
                        Ngày xem
                      </div>
                      <div className='col-span-1 flex items-center justify-center gap-2'>
                        <FaMoneyBillWave className='text-yellow-500' />
                        Số tiền
                      </div>
                      <div className='col-span-1 flex items-center justify-center gap-2'>
                        <FaClock className='text-gray-500' />
                        Thao tác
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product List */}
                {productInCartdata?.map((product: any, index: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    key={index}
                    className='my-3 rounded-lg bg-white p-5 shadow-md hover:shadow-lg transition-shadow'
                  >
                    <div className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'>
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input type='checkbox' className='h-5 w-5 accent-orange' />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link className='h-20 w-20 flex-shrink-0' to={path.productdetails}>
                                <img
                                  alt={product.can_ho.ten_toa_can_ho}
                                  src={product.can_ho?.hinh_anh_can_ho?.[0]?.duong_dan_hinh}
                                />
                              </Link>
                              <div className='flex-grow px-2 pt-1 pb-2'>
                                <Link to={path.productdetails} className='text-left line-clamp-2'>
                                  {product.can_ho?.ten_toa_can_ho}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center'>
                              <span className='ml-3 line-through'>₫{formatCurrency(product.can_ho.gia_thu_ve)}</span>
                              <span className='ml-3 '>₫{formatCurrency(product.can_ho.gia_ban)}</span>
                            </div>
                          </div>

                          {/* Ô Ngày Xem Căn Hộ với Calendar */}
                          <div className='col-span-1 relative'>
                            <div
                              className='flex items-center justify-center cursor-pointer border border-gray-200 py-1'
                              onClick={() => toggleCalendar(index)}
                            >
                              <span>
                                {selectedDates[product.id]
                                  ? selectedDates[product.id].toLocaleDateString('vi-VN') // ✅ Lấy từ state nếu có
                                  : product.ngay_xem_canho
                                    ? new Date(product.ngay_xem_canho).toLocaleDateString('vi-VN') // ✅ Lấy từ API nếu có
                                    : 'Chọn ngày'}
                              </span>
                            </div>
                            {showCalendar === index && (
                              <div className='absolute z-10 mt-2'>
                                <Calendar
                                  onChange={(date) =>
                                    handleDateChange(
                                      date as Date,
                                      product.id,
                                      product.id_can_ho,
                                      product.id_khach_hang,
                                      product.trang_thai
                                    )
                                  }
                                  value={selectedDates[product.id_gio_hang] || new Date()}
                                  minDate={currentDate}
                                />
                              </div>
                            )}
                          </div>

                          <div className='col-span-1'>
                            <span className='font-bold text-red-700'>₫{formatCurrency(product.can_ho.gia_ban)}</span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className='bg-none text-black transition-colors hover:text-orange'
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-lg sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input type='checkbox' className='h-5 w-5 accent-yellow-500 rounded' />
                </div>
                <button className='flex items-center gap-2 mx-3 border-none bg-none hover:text-yellow-500 transition-colors'>
                  <FaCheckSquare className='text-yellow-500' />
                  Chọn tất cả ({productInCartdata?.length || 0})
                </button>
                <button className='flex items-center gap-2 mx-3 border-none bg-none hover:text-red-500 transition-colors'>
                  <FaTrashAlt className='text-red-500' />
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div className='text-gray-600'>Tổng thanh toán:</div>
                    <div className='ml-2 text-2xl font-bold text-yellow-500'>₫{formatCurrency(totalPrice)}</div>
                  </div>
                </div>
                <Link
                  to={path.booking}
                  className='mt-5 flex h-12 items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 px-8 text-sm uppercase text-white hover:from-yellow-600 hover:to-yellow-500 transition-all rounded-lg sm:ml-4 sm:mt-0 shadow-md hover:shadow-lg'
                  onClick={() => productInCartdata?.forEach((cart: any) => handleAddBooking(cart))}
                >
                  <FaCalendar className='text-lg' />
                  Đặt lịch ngay
                </Link>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center justify-center space-y-6 bg-white rounded-xl shadow-lg p-8 mt-8'
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={noproduct}
              alt='empty cart'
              className='w-48 h-48 opacity-80'
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-center space-y-4'
            >
              <h3 className='text-2xl font-semibold text-gray-800'>Giỏ hàng của bạn đang trống</h3>
              <p className='text-gray-500'>Hãy khám phá các căn hộ tuyệt vời của chúng tôi</p>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Link
                to={path.product}
                className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 
                hover:from-yellow-600 hover:to-yellow-500 text-white rounded-lg transition-all duration-300 transform 
                hover:scale-105 shadow-md hover:shadow-xl'
              >
                <FaShoppingCart className='text-xl' />
                <span>Khám phá căn hộ</span>
              </Link>
              <Link
                to={path.groups}
                className='flex items-center justify-center gap-2 px-6 py-3 bg-white text-yellow-500 border-2 
                border-yellow-500 rounded-lg hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105'
              >
                <FaBuilding className='text-xl' />
                <span>Xem phân khu</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
