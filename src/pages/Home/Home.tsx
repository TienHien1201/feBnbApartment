import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaBuilding, FaLeaf, FaCar, FaQuoteLeft } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
// Swiper styles

import { useEffect, useRef, useState } from 'react'
import bg from '../../assets/VinhomesBg.jpg'
import { Link } from 'react-router-dom'

interface Feature {
  icon: React.ElementType
  title: string
  description: string
}

interface ApartmentType {
  type: string
  area: string
  price: string
}

const features: Feature[] = [
  {
    icon: FaMapMarkerAlt,
    title: 'Vị trí đắc địa',
    description: 'Tọa lạc tại trung tâm Quận 9, kết nối thuận tiện với các tiện ích xung quanh'
  },
  {
    icon: FaBuilding,
    title: 'Kiến trúc đẳng cấp',
    description: 'Thiết kế hiện đại, sang trọng với các tiện ích cao cấp tích hợp'
  },
  {
    icon: FaLeaf,
    title: 'Không gian xanh',
    description: 'Hệ thống công viên, cảnh quan được quy hoạch chuyên nghiệp'
  },
  {
    icon: FaCar,
    title: 'Tiện ích đa dạng',
    description: 'Đầy đủ tiện ích từ giáo dục, y tế đến mua sắm, giải trí'
  }
]

const apartmentTypes: ApartmentType[] = [
  {
    type: 'Căn hộ 2PN',
    area: 'Trên 78,60 m²',
    price: 'Đang cập nhật'
  },
  {
    type: 'Căn hộ 1PN+',
    area: 'Trên 55,00 m²',
    price: 'Đang cập nhật'
  },
  {
    type: 'Căn hộ Studio',
    area: 'Trên 33,20 m²',
    price: 'Đang cập nhật'
  }
]

const reviews = [
  {
    name: 'An Lê',
    role: 'Khách hàng',
    content:
      'Tôi ấn tượng với thiết kế sang trọng, tinh tế đến từng chi tiết, cùng hệ tiện ích đẳng cấp. Rất háo hức chờ ngày tận hưởng không gian sống đỉnh cao tại đây!'
  }
  // Add more reviews as needed
]

export default function Home() {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true })
  const [rating, setRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  useEffect(() => {
    if (isStatsInView) {
      const ratingInterval = setInterval(() => {
        setRating((prev) => {
          if (prev >= 4.9) {
            clearInterval(ratingInterval)
            return 4.9
          }
          return prev + 0.1
        })
      }, 50)

      const reviewInterval = setInterval(() => {
        setReviewCount((prev) => {
          if (prev >= 469) {
            clearInterval(reviewInterval)
            return 469
          }
          return prev + 1
        })
      }, 10)

      return () => {
        clearInterval(ratingInterval)
        clearInterval(reviewInterval)
      }
    }
  }, [isStatsInView])

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-screen'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`
          }}
        />
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-white px-4'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-5xl md:text-6xl font-bold text-center mb-6'
          >
            The Opus One <br /> Vinhomes Grand Park
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-xl md:text-2xl text-center mb-8 max-w-3xl'
          >
            Kiệt tác xanh giữa lòng thành phố - Định nghĩa mới về cuộc sống thượng lưu
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='w-full max-w-3xl'
          ></motion.div>
        </div>
      </div>

      {/* Apartment Types Section */}
      <div className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Loại hình căn hộ The Opus One</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {apartmentTypes.map((apt, index) => (
              <motion.div
                key={apt.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-all'
              >
                <h3 className='text-xl font-semibold mb-4'>{apt.type}</h3>
                <div className='space-y-3'>
                  <p className='text-gray-600'>Diện tích: {apt.area}</p>
                  <p className='text-gray-600'>Giá bán: {apt.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className='py-16 bg-gray-900 text-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={isStatsInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className='text-6xl font-bold text-yellow-500 mb-4'
            >
              {rating.toFixed(1)}
            </motion.div>
            <p className='text-xl mb-2'>Dựa trên {reviewCount} đánh giá từ khách hàng</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Đánh giá từ khách hàng</h2>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className='max-w-3xl mx-auto'
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className='bg-white p-8 rounded-lg shadow-lg'>
                  <FaQuoteLeft className='text-4xl text-yellow-500 mb-6' />
                  <p className='text-gray-600 text-lg mb-6'>{review.content}</p>
                  <div className='flex items-center'>
                    <div className='ml-4'>
                      <p className='font-semibold'>{review.name}</p>
                      <p className='text-gray-500'>{review.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Features Section */}
      <div className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Tiện ích nổi bật</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow'
                >
                  <Icon className='text-4xl text-yellow-500 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-16 bg-gray-900 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-6'>Bắt đầu hành trình của bạn ngay hôm nay</h2>
          <p className='text-lg mb-8 text-gray-300'>Khám phá không gian sống đẳng cấp tại Vinhomes Grand Park</p>
          <Link
            to='/products'
            className='inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition duration-300'
          >
            Xem căn hộ
          </Link>
        </div>
      </div>
    </div>
  )
}
