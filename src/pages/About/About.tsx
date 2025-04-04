import { motion } from 'framer-motion'
import { FaBuilding, FaMapMarkerAlt, FaRuler, FaLeaf, FaCogs, FaUsers } from 'react-icons/fa'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stats = [
  { icon: <FaBuilding />, value: '71', label: 'Tòa tháp' },
  { icon: <FaRuler />, value: '271', label: 'Hecta diện tích' },
  { icon: <FaUsers />, value: '44K+', label: 'Căn hộ' },
  { icon: <FaLeaf />, value: '36', label: 'Ha công viên' }
]

const additionalStats = [
  { icon: <FaBuilding />, value: '15+', label: 'Công viên chủ đề' },
  { icon: <FaRuler />, value: '50%', label: 'Diện tích xanh' }
]

const features = [
  {
    icon: <FaMapMarkerAlt />,
    title: 'Vị trí chiến lược',
    description: 'Tọa lạc tại trung tâm TP. Thủ Đức, kết nối thuận tiện với các tuyến giao thông huyết mạch.'
  },
  {
    icon: <FaCogs />,
    title: 'Công nghệ thông minh',
    description: 'Ứng dụng công nghệ 4.0 trong quản lý và vận hành, từ an ninh đến tiện ích.'
  },
  {
    icon: <FaLeaf />,
    title: 'Không gian xanh',
    description: 'Hơn 50% diện tích dành cho cây xanh và mặt nước, tạo môi trường sống trong lành.'
  }
]

// Define explicit types for your section content items
type InfoItem = { type: 'info'; label: string; value: string }
type CategoryItem = { type: 'category'; options: string[] }

// Sử dụng kiểu dữ liệu cụ thể cho sections
const sections = [
  {
    title: 'Tổng quan dự án',
    content: [
      { type: 'info', label: 'Chủ đầu tư', value: 'Tập đoàn Vingroup' },
      { type: 'info', label: 'Vị trí', value: 'Mặt tiền đường Nguyễn Xiển và Phước Thiện, TP. Thủ Đức' },
      { type: 'info', label: 'Diện tích', value: '271 ha' },
      { type: 'info', label: 'Quy mô', value: '71 tòa tháp căn hộ cao tầng, hơn 44.000 căn hộ' },
      { type: 'info', label: 'Khởi công', value: 'Năm 2018' }
    ] as InfoItem[]
  },
  {
    title: 'Phân khu đa dạng',
    content: [
      { type: 'category', options: ['Vinhomes Sapphire', 'Ruby', 'Diamond'] },
      {
        type: 'category',
        options: ['The Rainbow', 'The Origami', 'The Beverly', 'Glory Heights', 'The Opus One']
      },
      { type: 'category', options: ['The Manhattan', 'Manhattan Glory'] }
    ] as CategoryItem[]
  }
]

export default function About() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div
        className='relative h-[60vh] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
        url('https://vinhomescity.com/wp-content/uploads/2021/05/phoi-canh-vinhomes-grand-park.jpg')`
        }}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white p-8'>
            <motion.h1 {...fadeInUp} className='text-5xl font-bold mb-6'>
              Vinhomes Grand Park
            </motion.h1>
            <motion.p {...fadeInUp} className='text-xl max-w-3xl mx-auto'>
              Đại đô thị thông minh đẳng cấp quốc tế tại TP. Thủ Đức
            </motion.p>
          </div>
        </div>
      </div>
      {/* Overview Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>Giới thiệu tổng quan</h2>
            <div className='grid gap-8'>
              {(sections[0].content as InfoItem[]).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='flex items-start p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900'>{item.label}</h3>
                    <p className='text-gray-600 mt-1'>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Zones Section */}
      <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>Phân khu đa dạng</h2>
            <div className='grid gap-8'>
              {(sections[1].content as CategoryItem[]).map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className='bg-white p-6 rounded-lg shadow-lg'
                >
                  <h3 className='text-xl font-semibold mb-4'>{category.type}</h3>
                  <div className='flex flex-wrap gap-2'>
                    {category.options.map((option) => (
                      <span key={option} className='px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm'>
                        {option}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Ecosystem Section */}
      <section className='py-16 bg-gray-900 text-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Hệ sinh thái Vingroup</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {['Vincom Mega Mall', 'Vinmec', 'Vinschool', 'VinBus'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className='bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors'
              >
                <h3 className='text-xl font-semibold mb-2'>{item}</h3>
                <div className='w-16 h-1 bg-yellow-500 mx-auto'></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Vision Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>Tầm nhìn & Giá trị</h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='prose prose-lg max-w-none'>
              <div className='bg-gray-50 p-8 rounded-lg'>
                <h3 className='text-2xl font-semibold mb-4'>Tầm nhìn</h3>
                <p className='text-gray-600'>
                  Vinhomes Grand Park hướng tới trở thành biểu tượng đô thị mới của TP. HCM, kết hợp hài hòa giữa không
                  gian sống, làm việc, và giải trí trong một hệ sinh thái khép kín.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <div className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
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
            {additionalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
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
      {/* Features Grid */}
      <div className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className='text-3xl font-bold text-center mb-12'
          >
            Đặc điểm nổi bật
          </motion.h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all'
              >
                <div className='text-yellow-500 text-3xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* More sections following the same pattern... */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className='text-3xl font-bold text-center mb-12'
          >
            Thông tin chi tiết dự án
          </motion.h2>

          {/* Introduction Section */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='max-w-4xl mx-auto mb-16'>
            <div className='bg-yellow-50 rounded-lg p-8 shadow-sm'>
              <h3 className='text-2xl font-bold mb-4 text-gray-800'>Tổng quan</h3>
              <p className='text-gray-700 leading-relaxed'>
                Vinhomes Grand Park là một đại đô thị thông minh đẳng cấp quốc tế, được phát triển bởi Tập đoàn Vingroup
                – đơn vị bất động sản hàng đầu Việt Nam. Dự án tọa lạc tại phường Long Thạnh Mỹ và Long Bình, TP. Thủ
                Đức, TP. Hồ Chí Minh, với mục tiêu kiến tạo một không gian sống hiện đại, xanh, và tích hợp công nghệ
                tiên tiến, hướng tới mô hình đô thị kiểu mẫu như Singapore.
              </p>
              <div className='mt-4 py-3 px-4 bg-yellow-100 rounded-md'>
                <p className='italic text-yellow-800'>
                  "Thành phố thông minh - Công viên", Vinhomes Grand Park không chỉ là nơi an cư lý tưởng mà còn là điểm
                  đến đầu tư hấp dẫn tại khu vực phía Đông TP. HCM.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Strategic Location Section */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='max-w-4xl mx-auto mb-16'>
            <h3 className='text-2xl font-bold mb-6 text-center text-gray-800'>Vị trí chiến lược</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className='bg-white rounded-lg p-6 shadow-md'
              >
                <div className='text-yellow-500 text-3xl mb-4'>
                  <FaMapMarkerAlt />
                </div>
                <h4 className='font-semibold mb-2'>Khu vực phát triển</h4>
                <p className='text-gray-600'>
                  Nằm tại trung tâm TP. Thủ Đức, khu vực được định hướng trở thành thành phố sáng tạo phía Đông của TP.
                  HCM.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className='bg-white rounded-lg p-6 shadow-md'
              >
                <div className='text-yellow-500 text-3xl mb-4'>
                  <FaLeaf />
                </div>
                <h4 className='font-semibold mb-2'>Môi trường tự nhiên</h4>
                <p className='text-gray-600'>
                  Giáp hai con sông lớn: sông Đồng Nai và sông Tắc, tạo nên môi trường sống thoáng đãng, phong thủy hài
                  hòa.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='bg-white rounded-lg p-6 shadow-md md:col-span-2'
              >
                <h4 className='font-semibold mb-2'>Kết nối giao thông</h4>
                <p className='text-gray-600'>
                  Kết nối thuận tiện với các tuyến giao thông huyết mạch như Vành Đai 3 (dự kiến hoàn thành 2025), cao
                  tốc Long Thành - Dầu Giây, và tuyến Metro số 1 Bến Thành - Suối Tiên.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Smart Planning & Zoning */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='max-w-4xl mx-auto mb-16'>
            <h3 className='text-2xl font-bold mb-6 text-center text-gray-800'>Quy hoạch thông minh</h3>

            <div className='mb-8 bg-white p-6 rounded-lg shadow-md'>
              <h4 className='text-xl font-semibold mb-4 text-gray-700'>Mật độ xây dựng</h4>
              <div className='flex items-center mb-6'>
                <div className='w-1/4 h-4 bg-yellow-500 rounded-l'></div>
                <div className='w-3/4 h-4 bg-green-500 rounded-r'></div>
              </div>
              <div className='grid grid-cols-2 text-center'>
                <div>
                  <p className='font-bold text-yellow-600'>25%</p>
                  <p className='text-sm text-gray-600'>Mật độ xây dựng</p>
                </div>
                <div>
                  <p className='font-bold text-green-600'>75%</p>
                  <p className='text-sm text-gray-600'>Công viên, cây xanh, mặt nước và tiện ích</p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className='bg-white rounded-lg p-6 shadow-md'
              >
                <h4 className='text-lg font-semibold mb-3'>Căn hộ cao tầng</h4>
                <ul className='list-disc list-inside space-y-2 text-gray-600'>
                  <li>Vinhomes Sapphire (bình dân)</li>
                  <li>Ruby (trung cấp)</li>
                  <li>Diamond (cao cấp)</li>
                </ul>
                <h5 className='text-sm font-medium mt-3 mb-1 text-gray-500'>Các phân khu tiêu biểu:</h5>
                <div className='flex flex-wrap gap-2'>
                  {['The Rainbow', 'The Origami', 'The Beverly', 'Glory Heights', 'The Opus One'].map((zone) => (
                    <span key={zone} className='px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs'>
                      {zone}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='bg-white rounded-lg p-6 shadow-md'
              >
                <h4 className='text-lg font-semibold mb-3'>Khu thấp tầng</h4>
                <ul className='list-disc list-inside space-y-2 text-gray-600'>
                  <li>The Manhattan</li>
                  <li>Manhattan Glory</li>
                </ul>
                <h5 className='text-sm font-medium mt-3 mb-1 text-gray-500'>Loại hình:</h5>
                <div className='flex flex-wrap gap-2'>
                  {['Shophouse', 'Biệt thự ven sông'].map((type) => (
                    <span key={type} className='px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs'>
                      {type}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Tech & Amenities Section */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='max-w-4xl mx-auto mb-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <h3 className='text-2xl font-bold mb-6 text-gray-800'>Công nghệ 4.0</h3>
                <div className='bg-white rounded-lg p-6 shadow-md h-full'>
                  <ul className='space-y-4'>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className='flex items-start'
                    >
                      <div className='text-yellow-500 mr-3 mt-1'>
                        <FaCogs />
                      </div>
                      <p className='text-gray-600'>Ứng dụng quản lý thông minh qua app cư dân</p>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className='flex items-start'
                    >
                      <div className='text-yellow-500 mr-3 mt-1'>
                        <FaCogs />
                      </div>
                      <p className='text-gray-600'>Hệ thống an ninh 24/7</p>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className='flex items-start'
                    >
                      <div className='text-yellow-500 mr-3 mt-1'>
                        <FaCogs />
                      </div>
                      <p className='text-gray-600'>Camera AI và radar giao thông</p>
                    </motion.li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className='text-2xl font-bold mb-6 text-gray-800'>Tiện ích đẳng cấp</h3>
                <div className='bg-white rounded-lg p-6 shadow-md h-full'>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className='mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Công viên 36 ha</h4>
                    <p className='text-gray-600 text-sm mb-2'>Lớn nhất Đông Nam Á, được gọi là "Công viên ánh sáng"</p>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {['Công viên nước', 'Khu BBQ', 'Sân thể thao', 'Đường dạo bộ ven sông'].map((amenity) => (
                        <span key={amenity} className='px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs'>
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className='font-semibold text-lg mb-2'>Hệ sinh thái Vingroup</h4>
                    <ul className='list-disc list-inside space-y-1 text-gray-600 text-sm'>
                      <li>Vincom Mega Mall (dự kiến khai trương quý 2/2025)</li>
                      <li>Bệnh viện Vinmec</li>
                      <li>Trường học Vinschool</li>
                      <li>Xe buýt điện VinBus</li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision and Progress */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className='bg-white rounded-lg p-6 shadow-md'
            >
              <h3 className='text-2xl font-bold mb-4 text-gray-800'>Tầm nhìn & Giá trị</h3>
              <div className='space-y-4'>
                <div>
                  <h4 className='font-semibold text-gray-700'>Tầm nhìn:</h4>
                  <p className='text-gray-600 text-sm'>
                    Vinhomes Grand Park hướng tới trở thành biểu tượng đô thị mới của TP. HCM, kết hợp hài hòa giữa
                    không gian sống, làm việc, và giải trí trong một hệ sinh thái khép kín.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-700'>Giá trị cốt lõi:</h4>
                  <ul className='list-disc list-inside space-y-1 text-gray-600 text-sm'>
                    <li>
                      <span className='font-medium'>Tiện nghi:</span> Mọi nhu cầu từ giáo dục, y tế, mua sắm đến vui
                      chơi đều được đáp ứng trong nội khu.
                    </li>
                    <li>
                      <span className='font-medium'>Bền vững:</span> Thiết kế chú trọng môi trường, tiết kiệm năng lượng
                      và bảo vệ hệ sinh thái tự nhiên.
                    </li>
                    <li>
                      <span className='font-medium'>Cộng đồng:</span> Tạo nên một cộng đồng văn minh, hiện đại từ gia
                      đình trẻ đến người nước ngoài và giới đầu tư.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-white rounded-lg p-6 shadow-md'
            >
              <h3 className='text-2xl font-bold mb-4 text-gray-800'>Tiến độ & Thành tựu</h3>
              <div className='space-y-4'>
                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='font-semibold text-green-700'>Đã hoàn thiện</h4>
                  <p className='text-gray-600 text-sm'>
                    Các phân khu như The Rainbow (bàn giao 2020), The Origami (bàn giao 2021-2022) đã đi vào hoạt động
                    với tỷ lệ cư dân lấp đầy cao.
                  </p>
                </div>
                <div className='border-l-4 border-yellow-500 pl-4'>
                  <h4 className='font-semibold text-yellow-700'>Đang triển khai</h4>
                  <p className='text-gray-600 text-sm'>
                    The Beverly, The Beverly Solari, và The Opus One dự kiến bàn giao trong năm 2025-2026.
                  </p>
                </div>
                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='font-semibold text-blue-700'>Thành tựu</h4>
                  <p className='text-gray-600 text-sm'>
                    Vinhomes Grand Park được vinh danh là "Dự án bất động sản tốt nhất" tại nhiều giải thưởng uy tín
                    trong nước và quốc tế, nhờ quy hoạch đột phá và chất lượng sống vượt trội.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* You can add more sections like Timeline, Gallery, etc. */}
    </div>
  )
}
