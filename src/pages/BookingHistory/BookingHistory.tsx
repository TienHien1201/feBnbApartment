import { useQuery } from '@tanstack/react-query'
import bookingApi from '../../apis/historybooking.api'
import { useState } from 'react'
import Paginate from '../../components/Pagination'
import { format } from 'date-fns'
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaHeadset,
  FaClock,
  FaBuilding,
  FaClipboardList
} from 'react-icons/fa'
import bgImage from '../../assets/VinhomesBg.jpg'
import { getProfileFromLS } from '../../utils/auth'
import { bookingType } from '../../types/booking.type'

export default function BookingHistory() {
  const profileData = getProfileFromLS()
  const userId = profileData?.id
  console.log(userId)
  const { data: historyBookingData } = useQuery({
    queryKey: ['booking', userId],
    queryFn: () => bookingApi.getBookingByIdKhachHang(userId || 0),
    enabled: Boolean(userId) // Chỉ gọi API khi có userId
  })

  // Đảm bảo bookingsData luôn là một mảng và chỉ định rõ kiểu dữ liệu
  const bookingsData = (
    Array.isArray(historyBookingData?.data) ? historyBookingData?.data : historyBookingData?.data?.data || []
  ) as bookingType[]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Bây giờ chúng ta có thể an toàn sử dụng các phương thức mảng
  const totalItems = bookingsData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = bookingsData.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div
      className='min-h-screen bg-cover bg-center text-black flex items-center justify-center p-4'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='w-full bg-white bg-opacity-80 p-6 rounded-lg'>
        <div className='flex flex-col items-center mb-12 text-center'>
          <div className='flex items-center gap-3 mb-2'>
            <FaClipboardList className='text-4xl text-yellow-500' />
            <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent'>
              Danh Sách Đặt Lịch
            </h1>
          </div>
          <p className='text-gray-600 text-lg'>Theo dõi và quản lý lịch xem căn hộ của bạn</p>
        </div>

        <div className='space-y-6'>
          {currentItems.length > 0 ? (
            currentItems.map((item: any) => (
              <div
                key={item.id}
                className='p-6 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-xl transition-all duration-300'
              >
                <div className='flex items-center mb-4'>
                  <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4'>
                    <span className='text-2xl font-bold text-black'>{item.khach_hang?.ho_ten.charAt(0)}</span>
                  </div>
                  <div className='flex-1'>
                    <h2 className='text-2xl font-semibold'>{item.khach_hang?.ho_ten}</h2>
                    <p className='text-sm opacity-90'>{item.can_ho?.ten_toa_can_ho}</p>
                  </div>
                  <div className='hidden sm:flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full'>
                    <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></div>
                    <span className='text-sm font-medium'>Đã xác nhận</span>
                  </div>
                </div>
                <hr className='border-t border-white opacity-50 mb-4' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='space-y-3'>
                    <p className='text-sm flex items-center'>
                      <FaMapMarkerAlt className='mr-2 text-yellow-300' />
                      <span className='opacity-75'>Căn hộ:</span>
                      <span className='ml-2 font-medium'>{item.can_ho?.ten_can_ho}</span>
                    </p>
                    <p className='text-sm flex items-center'>
                      <FaCheckCircle className='mr-2 text-green-300' />
                      <span className='opacity-75'>Trạng thái:</span>
                      <span className='ml-2 font-medium'>{item.can_ho?.tinh_trang_can_ho}</span>
                    </p>
                    <p className='text-sm flex items-center'>
                      <FaCalendarAlt className='mr-2 text-blue-300' />
                      <span className='opacity-75'>Thời gian:</span>
                      <span className='ml-2 font-medium'>
                        {item.ngay_xem_canho
                          ? format(new Date(item.ngay_xem_canho.replace(' ', 'T')), 'dd-MM-yyyy HH:mm')
                          : 'N/A'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-8'>
              <div className='text-6xl mb-4'>📅</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Chưa có lịch đặt xem căn hộ nào</h3>
              <p className='text-gray-600'>Hãy đặt lịch xem căn hộ để trải nghiệm dịch vụ của chúng tôi</p>
            </div>
          )}
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center mt-8'>
          <div className='text-center sm:text-left mb-4 sm:mb-0'>
            <p className='text-xl font-semibold flex items-center gap-2'>
              <FaHeadset className='text-2xl text-blue-600' /> TƯ VẤN 24/24
            </p>
            <p className='text-lg flex items-center gap-2'>
              <FaClock className='text-xl text-green-600' /> Đi xem nhà từ 09AM - 10PM
            </p>
            <p className='text-sm flex items-center gap-2'>
              <FaBuilding className='text-xl text-orange-600' /> VinHomes Grandpark, quận 9, TP. Thủ Đức, TP. Hồ Chí
              Minh
            </p>
          </div>

          {totalItems > itemsPerPage && (
            <Paginate currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </div>
  )
}
