import logobct from '../../assets/logo-bct.png'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaChevronRight,
  FaShieldAlt,
  FaCreditCard,
  FaTruck,
  FaHandshake
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='bg-gradient-to-b from-white to-gray-50'>
      {/* Top section with key features */}
      <div className='container mx-auto px-4 py-8 border-b border-gray-200'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='flex items-center gap-4 p-4 hover:bg-white rounded-lg transition-all duration-300 cursor-pointer'>
            <FaShieldAlt className='text-3xl text-yellow-500' />
            <div>
              <h4 className='font-semibold'>An toàn & Bảo mật</h4>
              <p className='text-sm text-gray-500'>Thanh toán được mã hóa</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 hover:bg-white rounded-lg transition-all duration-300 cursor-pointer'>
            <FaCreditCard className='text-3xl text-yellow-500' />
            <div>
              <h4 className='font-semibold'>Thanh toán linh hoạt</h4>
              <p className='text-sm text-gray-500'>Nhiều phương thức thanh toán</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 hover:bg-white rounded-lg transition-all duration-300 cursor-pointer'>
            <FaTruck className='text-3xl text-yellow-500' />
            <div>
              <h4 className='font-semibold'>Tư vấn tận nơi</h4>
              <p className='text-sm text-gray-500'>Xem nhà thực tế</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 hover:bg-white rounded-lg transition-all duration-300 cursor-pointer'>
            <FaHandshake className='text-3xl text-yellow-500' />
            <div>
              <h4 className='font-semibold'>Hỗ trợ 24/7</h4>
              <p className='text-sm text-gray-500'>Tư vấn viên chuyên nghiệp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* About Us Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold relative after:content-[""] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-yellow-500'>
              Về chúng tôi
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Vinhomes Market - Nền tảng giao dịch bất động sản hàng đầu, mang đến trải nghiệm mua bán chuyên nghiệp.
            </p>
            <img src={logobct} alt='logo-bct' className='h-16 hover:opacity-80 transition-opacity' />
          </div>

          {/* Contact Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold relative after:content-[""] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-yellow-500'>
              Thông tin liên hệ
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors cursor-pointer group'>
                <div className='bg-gray-100 p-2 rounded-full group-hover:bg-yellow-500/10'>
                  <FaPhone className='text-yellow-500' />
                </div>
                <span>093 123 9080</span>
              </div>
              <div className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors cursor-pointer group'>
                <div className='bg-gray-100 p-2 rounded-full group-hover:bg-yellow-500/10'>
                  <FaEnvelope className='text-yellow-500' />
                </div>
                <span>vanlocBds@gmail.com</span>
              </div>
              <div className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors cursor-pointer group'>
                <div className='bg-gray-100 p-2 rounded-full group-hover:bg-yellow-500/10'>
                  <FaMapMarkerAlt className='text-yellow-500' />
                </div>
                <span>Vinhomes Grand Park, Quận 9, TP.HCM</span>
              </div>
              <div className='flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors cursor-pointer group'>
                <div className='bg-gray-100 p-2 rounded-full group-hover:bg-yellow-500/10'>
                  <FaClock className='text-yellow-500' />
                </div>
                <span>8:30 - 22:00 (Trừ ngày Lễ)</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold relative after:content-[""] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-yellow-500'>
              Kết nối với chúng tôi
            </h3>
            <div className='flex gap-4'>
              <a
                href='#'
                className='bg-gray-100 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300'
              >
                <FaFacebookF className='text-xl' />
              </a>
              <a
                href='#'
                className='bg-gray-100 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300'
              >
                <FaTwitter className='text-xl' />
              </a>
              <a
                href='#'
                className='bg-gray-100 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300'
              >
                <FaInstagram className='text-xl' />
              </a>
              <a
                href='#'
                className='bg-gray-100 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300'
              >
                <FaYoutube className='text-xl' />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold relative after:content-[""] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-yellow-500'>
              Đăng ký nhận tin
            </h3>
            <p className='text-gray-600'>Nhận thông tin mới nhất về dự án và ưu đãi đặc biệt</p>
            <div className='flex flex-col gap-2'>
              <input
                type='email'
                placeholder='Email của bạn'
                className='px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all'
              />
              <button className='bg-yellow-500 px-6 py-3 rounded-lg text-white font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 group'>
                Đăng ký ngay
                <FaChevronRight className='group-hover:translate-x-1 transition-transform' />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-12 pt-8 border-t border-gray-200 text-center text-gray-600'>
          <p>&copy; 2024 Vinhomes Market. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
