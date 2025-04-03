import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../types/product.type'
import { formatCurrency, generateNameID } from '../../utils/utils'
import path from '../../constants/path'
import StatusBadge from '../StatusBadge/StatusBadge'
import { motion } from 'framer-motion'
import { FaBed, FaRuler, FaCompass } from 'react-icons/fa'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameID({ name: product.ten_can_ho, id: product.id })}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className='overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'
      >
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.hinh_anh_can_ho?.[0]?.duong_dan_hinh}
            alt={product.ten_can_ho}
            className='absolute top-0 left-0 h-full w-full object-cover'
          />
          <div className='absolute top-2 right-2'>
            <StatusBadge status={product.tinh_trang_can_ho} />
          </div>
        </div>
        <div className='p-4'>
          <h3 className='text-sm font-semibold line-clamp-2 min-h-[2.5rem] mb-2'>{product.ten_can_ho}</h3>
          <div className='mt-3 flex items-center text-gray-500 space-x-4 text-sm'>
            <span className='flex items-center gap-1'>
              <FaBed className='text-yellow-500' />
              {product.loai_can_ho}
            </span>
            <span className='flex items-center gap-1'>
              <FaRuler className='text-yellow-500' />
              {product.dien_tich}
            </span>
            <span className='flex items-center gap-1'>
              <FaCompass className='text-yellow-500' />
              {product.huong}
            </span>
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 line-through'>₫{formatCurrency(product.gia_thu_ve)}</span>
              <span className='text-yellow-600 font-semibold'>₫{formatCurrency(product.gia_ban)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600'
            >
              Chi tiết
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
