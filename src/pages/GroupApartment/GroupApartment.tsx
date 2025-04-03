import { useQuery } from '@tanstack/react-query'
import groupAPI from '../../apis/groupApartment.api'
import { GroupType } from '../../types/group.type'
import img from '../../assets/LogoClone.jpg'
import { FaMapMarkerAlt, FaBuilding, FaStar, FaList, FaArrowRight, FaSpinner } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function GroupApartment() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['groupList'],
    queryFn: groupAPI.getGroupList
  })

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className='text-yellow-500 text-4xl'
        >
          <FaSpinner />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='min-h-screen flex items-center justify-center text-red-500'
      >
        <div className='bg-red-50 p-6 rounded-lg shadow-lg'>
          <FaBuilding className='text-4xl mb-4' />
          <p>Error loading data</p>
        </div>
      </motion.div>
    )
  }

  const groupList = data?.data
  console.log(groupList)
  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto p-4'>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3'>
            <FaBuilding className='text-yellow-500' />
            Danh sách Phân Khu
          </h1>
          <div className='w-24 h-1 bg-yellow-500 mx-auto'></div>
        </motion.div>

        <AnimatePresence>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {groupList?.map((group: GroupType, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className='bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100'
              >
                <div className='relative'>
                  <img
                    src={img}
                    alt={group.ten_phan_khu}
                    className='w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                    Phân khu mới
                  </div>
                </div>

                <div className='p-6'>
                  <motion.h2 whileHover={{ color: '#EAB308' }} className='text-2xl font-bold text-gray-800 mb-4'>
                    {group.ten_phan_khu}
                  </motion.h2>

                  <div className='space-y-3'>
                    <div className='flex items-center text-gray-600'>
                      <FaMapMarkerAlt className='text-yellow-500 mr-3' />
                      <span>{group.dia_chi}</span>
                    </div>

                    <div className='flex items-center text-gray-600'>
                      <FaBuilding className='text-yellow-500 mr-3' />
                      <span>{group.quy_mo}</span>
                    </div>

                    <div className='flex items-center text-gray-600'>
                      <FaStar className='text-yellow-500 mr-3' />
                      <span>{group.tien_ich}</span>
                    </div>

                    <div className='flex items-center text-gray-600'>
                      <FaList className='text-yellow-500 mr-3' />
                      <span>{group.loai_hinh_san_pham}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='mt-6 w-full bg-gray-50 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-white transition-all duration-300 group'
                  >
                    Xem chi tiết
                    <FaArrowRight className='group-hover:translate-x-1 transition-transform' />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
