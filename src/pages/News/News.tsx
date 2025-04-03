import { motion } from 'framer-motion'
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaTree,
  FaSubway,
  FaShoppingBag, // Changed from FaShoppingMall
  FaHome,
  FaCheckCircle,
  FaMoneyBillWave
} from 'react-icons/fa'
import grandParkImg from '../../assets/VinhomesBg.jpg'

export default function News() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stats = [
    { icon: <FaBuilding />, value: '271', label: 'Hecta Diện tích' },
    { icon: <FaTree />, value: '36', label: 'Hecta Công viên' },
    { icon: <FaBuilding />, value: '71', label: 'Tòa tháp' },
    { icon: <FaHome />, value: '44K+', label: 'Căn hộ' }
  ]

  const highlights = [
    {
      icon: <FaMapMarkerAlt className='text-yellow-500 text-2xl' />,
      title: 'Vị trí chiến lược',
      content: 'Mặt tiền đường Nguyễn Xiển và Phước Thiện, TP. Thủ Đức'
    },
    {
      icon: <FaSubway className='text-yellow-500 text-2xl' />,
      title: 'Kết nối thuận tiện',
      content: 'Gần Vành Đai 3, cao tốc Long Thành - Dầu Giây, Metro số 1'
    }
    // ... add more highlights as needed
  ]

  const projectZones = [
    {
      name: 'The Rainbow',
      description: 'Phân khu đầu tiên, đã bàn giao từ tháng 7/2020',
      status: 'Đã bàn giao'
    },
    {
      name: 'The Origami',
      description: 'Mang phong cách Nhật Bản',
      status: 'Hoàn thiện'
    },
    {
      name: 'The Beverly',
      description: 'Phân khu cao cấp nhất, view công viên 36ha',
      status: 'Đang hoàn thiện'
    }
    // Add more zones...
  ]

  const amenities = [
    {
      icon: <FaTree className='text-3xl text-green-500' />,
      title: 'Công viên 36ha',
      description: 'Công viên ánh sáng lớn nhất Đông Nam Á'
    },
    {
      icon: <FaShoppingBag className='text-3xl text-blue-500' />, // Changed from FaShoppingMall
      title: 'Vincom Mega Mall',
      description: 'Trung tâm mua sắm lớn nhất miền Nam'
    }
    // Add more amenities...
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='relative h-[60vh] bg-black/50 overflow-hidden'>
        <img
          src={grandParkImg}
          alt='Vinhomes Grand Park'
          className='absolute w-full h-full object-cover mix-blend-overlay'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/70' />
        <div className='container mx-auto relative z-10 h-full flex flex-col justify-center items-center text-white'>
          <motion.h1 {...fadeInUp} className='text-5xl font-bold text-center mb-6'>
            Vinhomes Grand Park
          </motion.h1>
          <motion.p {...fadeInUp} className='text-xl text-center max-w-3xl'>
            Đại đô thị thông minh đẳng cấp quốc tế tại TP. Thủ Đức
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='text-center p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-white shadow-lg hover:shadow-xl transition-all'
              >
                <div className='text-yellow-500 text-3xl mb-4'>{stat.icon}</div>
                <div className='text-4xl font-bold text-gray-800 mb-2'>{stat.value}</div>
                <div className='text-gray-600'>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='prose prose-lg max-w-none'
          >
            <h2 className='text-3xl font-bold text-center mb-8'>Tổng quan dự án</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <p className='text-gray-600'>
                  Vinhomes Grand Park là một đại đô thị thông minh đẳng cấp quốc tế, do Tập đoàn Vingroup phát triển,
                  tọa lạc tại phường Long Thạnh Mỹ và Long Bình, TP. Thủ Đức, TP. Hồ Chí Minh.
                </p>
                {/* Add more content... */}
              </div>
              <div>
                <img src={grandParkImg} alt='Overview' className='rounded-lg shadow-lg' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Apartment Zones */}
      <div className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Các phân khu</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projectZones.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all'
              >
                <h3 className='text-xl font-bold mb-2'>{zone.name}</h3>
                <p className='text-gray-600 mb-4'>{zone.description}</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    zone.status === 'Đã bàn giao' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {zone.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Updates */}
      <div className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Cập nhật mới nhất</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className='bg-yellow-50 rounded-lg p-8'
            >
              <h3 className='text-2xl font-bold mb-4'>Tiến độ xây dựng</h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <FaCheckCircle className='text-green-500 mt-1' />
                  <span>The Rainbow, The Origami đã hoàn thiện và bàn giao, tỷ lệ lấp đầy 80%</span>
                </li>
                {/* Add more updates... */}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className='bg-blue-50 rounded-lg p-8'
            >
              <h3 className='text-2xl font-bold mb-4'>Chính sách bán hàng</h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <FaMoneyBillWave className='text-blue-500 mt-1' />
                  <span>Thanh toán trước 15-20%, hỗ trợ vay 80%</span>
                </li>
                {/* Add more policy items... */}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Content */}
            <div className='lg:col-span-2 space-y-8'>{/* ... Add more sections with motion animations ... */}</div>

            {/* Right Sidebar */}
            <div className='space-y-6'>{/* ... Add sidebar content ... */}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
