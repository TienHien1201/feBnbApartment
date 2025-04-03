import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaHistory, FaBell, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { profile } = useContext(AppContext)

  return (
    <div className='container mx-auto p-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Sidebar */}
        <div className='lg:col-span-1'>
          <div className='bg-white shadow-md rounded-lg p-6'>
            <div className='flex flex-col items-center'>
              <div className='w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden'>
                <img
                  src={
                    profile?.avatar ||
                    'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg'
                  }
                  alt='Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>{profile?.username || 'User'}</h3>

              <button className='w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors'>
                Chỉnh sửa hồ sơ
              </button>
            </div>

            <div className='mt-6 space-y-4'>
              <Link
                to='/profile/favorites'
                className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors p-2 rounded-md hover:bg-gray-50'
              >
                <FaHeart />
                <span>Căn hộ yêu thích</span>
              </Link>
              <Link
                to='/profile/history'
                className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors p-2 rounded-md hover:bg-gray-50'
              >
                <FaHistory />
                <span>Lịch sử xem</span>
              </Link>
              <Link
                to='/profile/notifications'
                className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors p-2 rounded-md hover:bg-gray-50'
              >
                <FaBell />
                <span>Thông báo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <div className='p-6 border-b'>
              <h2 className='text-2xl font-bold'>Thông tin cá nhân</h2>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <FaUser className='text-xl text-yellow-500' />
                    <div>
                      <p className='text-sm text-gray-500'>Họ tên</p>
                      <p className='font-semibold'>{profile?.username || 'N/A'}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <FaEnvelope className='text-xl text-yellow-500' />
                    <div>
                      <p className='text-sm text-gray-500'>Email</p>
                      <p className='font-semibold'>{profile?.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <FaPhone className='text-xl text-yellow-500' />
                    <div>
                      <p className='text-sm text-gray-500'>Số điện thoại</p>
                      <p className='font-semibold'>{profile?.phone || 'N/A'}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <FaIdCard className='text-xl text-yellow-500' />
                    <div>
                      <p className='text-sm text-gray-500'>Mã tài khoản</p>
                      <p className='font-semibold'>{profile?.id || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className='mt-8'>
                <h3 className='text-lg font-semibold mb-4'>Địa chỉ liên hệ</h3>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <FaMapMarkerAlt className='text-xl text-yellow-500' />
                  <div>
                    <p className='text-sm text-gray-500'>Địa chỉ</p>
                    <p className='font-semibold'>{profile?.address || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
