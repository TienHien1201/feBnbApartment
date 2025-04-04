import { Link } from 'react-router-dom'
import {  ProductType } from '../../../types/product.type'
import { formatCurrency, generateNameID } from '../../../utils/utils'
import path from '../../../constants/path'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface Props {
  product: ProductType
  onEdit: (product: ProductType) => void
  onDelete: (productId: string) => void
}

export default function ProductManager({ product, onEdit, onDelete }: Props) {
  return (
    <div className='relative group'>
      <Link to={`${path.product}${generateNameID({ name: product.ten_toa_can_ho, id: product.id })}`}>
        <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] duration-100 transition-transform overflow-hidden'>
          <div className='w-full pt-[100%] relative'>
            <img
              alt={product.ten_can_ho}
              src={product.hinh_anh_can_ho.length > 0 ? product.hinh_anh_can_ho[0].duong_dan_hinh : '/placeholder.jpg'}
              className='absolute top-0 left-0 bg-white w-full h-full object-cover'
            />

            {/* Overlay with action buttons */}
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  onEdit(product)
                }}
                className='p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200'
              >
                <FaPencilAlt className='w-5 h-5' />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  onDelete(product.id)
                }}
                className='p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200'
              >
                <FaTrash className='w-5 h-5' />
              </motion.button>
            </div>
          </div>

          <div className='p-2 overflow-hidden'>
            <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.ten_toa_can_ho}</div>
            <div className='flex items-center mt-3'>
              <div className='line-through max-w-[50%] text-gray-500 truncate'>
                <span className='text-xs'>₫</span>
                <span>{formatCurrency(product.gia_ban)}</span>
              </div>
              <div className='text-orange-700 truncate ml-1'>
                <span className='text-xs'>₫</span>
                <span>{formatCurrency(product.gia_thu_ve)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
