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

const sections = [
  {
    title: 'Tổng quan dự án',
    content: [
      { type: 'info', label: 'Chủ đầu tư', value: 'Tập đoàn Vingroup' },
      { type: 'info', label: 'Vị trí', value: 'Mặt tiền đường Nguyễn Xiển và Phước Thiện, TP. Thủ Đức' },
      { type: 'info', label: 'Diện tích', value: '271 ha' },
      { type: 'info', label: 'Quy mô', value: '71 tòa tháp căn hộ cao tầng, hơn 44.000 căn hộ' },
      { type: 'info', label: 'Khởi công', value: 'Năm 2018' }
    ]
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
    ]
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
              {sections[0].content.map((item: { type: string; label: string; value: string }, index: number) => (
                <motion.div
                  key={item.label}
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
              {sections[1].content.map((category: { type: string; options: string[] }, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className='bg-white p-6 rounded-lg shadow-lg'
                >
                  <h3 className='text-xl font-semibold mb-4'>{category.type}</h3>
                  <div className='flex flex-wrap gap-2'>
                    {category.options.map((option: string) => (
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
      <p>
        Vinhomes Grand Park là một đại đô thị thông minh đẳng cấp quốc tế, được phát triển bởi Tập đoàn Vingroup – đơn
        vị bất động sản hàng đầu Việt Nam. Dự án tọa lạc tại phường Long Thạnh Mỹ và Long Bình, TP. Thủ Đức, TP. Hồ Chí
        Minh, với mục tiêu kiến tạo một không gian sống hiện đại, xanh, và tích hợp công nghệ tiên tiến, hướng tới mô
        hình đô thị kiểu mẫu như Singapore. Được mệnh danh là “Thành phố thông minh - Công viên”, Vinhomes Grand Park
        không chỉ là nơi an cư lý tưởng mà còn là điểm đến đầu tư hấp dẫn tại khu vực phía Đông TP. HCM. Thông tin cơ
        bản Chủ đầu tư: Tập đoàn Vingroup. Vị trí: Mặt tiền đường Nguyễn Xiển và Phước Thiện, TP. Thủ Đức, TP. Hồ Chí
        Minh. Diện tích: 271 ha. Quy mô: Gồm 71 tòa tháp căn hộ cao tầng, hơn 44.000 căn hộ, cùng các khu thấp tầng như
        nhà phố, shophouse, và biệt thự. Thời gian khởi công: Năm 2018, với các phân khu được bàn giao dần từ năm 2020.
        Phong cách thiết kế: Hiện đại, kết hợp không gian xanh và công nghệ 4.0. Đặc điểm nổi bật Vị trí chiến lược: Nằm
        tại trung tâm TP. Thủ Đức, khu vực được định hướng trở thành thành phố sáng tạo phía Đông của TP. HCM. Giáp hai
        con sông lớn: sông Đồng Nai và sông Tắc, tạo nên môi trường sống thoáng đãng, phong thủy hài hòa. Kết nối thuận
        tiện với các tuyến giao thông huyết mạch như Vành Đai 3 (dự kiến hoàn thành 2025), cao tốc Long Thành - Dầu
        Giây, và tuyến Metro số 1 Bến Thành - Suối Tiên. Quy hoạch thông minh: Mật độ xây dựng thấp: Chỉ khoảng 25%,
        phần còn lại dành cho công viên, cây xanh, mặt nước và tiện ích công cộng. Phân khu đa dạng: Căn hộ cao tầng:
        Bao gồm các dòng sản phẩm Vinhomes Sapphire (bình dân), Ruby (trung cấp), và Diamond (cao cấp). Các phân khu
        tiêu biểu: The Rainbow, The Origami, The Beverly, The Beverly Solari, Glory Heights, The Opus One. Khu thấp
        tầng: The Manhattan và Manhattan Glory với nhà phố thương mại (shophouse), biệt thự ven sông. Công nghệ 4.0: Ứng
        dụng quản lý thông minh qua app cư dân, hệ thống an ninh 24/7, camera AI, và radar giao thông. Hệ thống tiện ích
        đẳng cấp: Công viên 36 ha: Lớn nhất Đông Nam Á, được gọi là “Công viên ánh sáng”, tích hợp 15 công viên chủ đề
        như công viên nước, khu BBQ, sân thể thao, đường dạo bộ ven sông. Hệ sinh thái Vingroup: Trung tâm thương mại
        Vincom Mega Mall (dự kiến khai trương quý 2/2025), bệnh viện Vinmec, trường học Vinschool, xe buýt điện VinBus.
        Không gian sống xanh: Hơn 50% diện tích dành cho cây xanh và mặt nước, mang lại bầu không khí trong lành hiếm có
        giữa lòng đô thị. Tầm nhìn và giá trị Tầm nhìn: Vinhomes Grand Park hướng tới trở thành biểu tượng đô thị mới
        của TP. HCM, kết hợp hài hòa giữa không gian sống, làm việc, và giải trí trong một hệ sinh thái khép kín. Giá
        trị cốt lõi: Tiện nghi: Mọi nhu cầu từ giáo dục, y tế, mua sắm đến vui chơi đều được đáp ứng trong nội khu. Bền
        vững: Thiết kế chú trọng môi trường, tiết kiệm năng lượng và bảo vệ hệ sinh thái tự nhiên. Cộng đồng: Thu hút cư
        dân đa dạng từ gia đình trẻ, người nước ngoài, đến giới đầu tư, tạo nên một cộng đồng văn minh, hiện đại. Tiến
        độ và thành tựu Đã hoàn thiện: Các phân khu như The Rainbow (bàn giao 2020), The Origami (bàn giao 2021-2022) đã
        đi vào hoạt động với tỷ lệ cư dân lấp đầy cao. Đang triển khai: The Beverly, The Beverly Solari, và The Opus One
        dự kiến bàn giao trong năm 2025-2026. Thành tựu: Vinhomes Grand Park được vinh danh là “Dự án bất động sản tốt
        nhất” tại nhiều giải thưởng uy tín trong nước và quốc tế, nhờ quy hoạch đột phá và chất lượng sống vượt trội.
      </p>
      {/* You can add more sections like Timeline, Gallery, etc. */}
    </div>
  )
}
