import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import productApi from '../../apis/product.api'
import Paginate from '../../components/Pagination'
import { ProductListConfig, Product as ProductType } from '../../types/product.type'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaBuilding, FaSpinner } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import ProductManager from './ProductManager/ProductManager'
import { toast } from 'react-toastify'

export default function ManagerApartment() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts({} as ProductListConfig),
    onError: (error) => {
      setError('Failed to fetch products')
      console.error('Fetch error:', error)
    }
  })

  const products = productsData?.data || []

  const itemsPerPage = 12
  const totalItems = products?.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products?.slice(startIndex, endIndex) || []

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => productApi.deleteProduct(productId),
    onSuccess: () => {
      toast.success('Xóa căn hộ thành công')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      toast.error('Xóa căn hộ thất bại')
      console.error('Delete error:', error)
    }
  })

  const handleEdit = (product: ProductType) => {
    navigate(`/edit/${product.id}`)
  }

  const handleDelete = (productId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa căn hộ này?')) {
      deleteMutation.mutate(productId)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between'
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center gap-3 mb-4 md:mb-0'
          >
            <FaBuilding className='text-3xl text-yellow-500' />
            <h1 className='text-2xl font-bold text-gray-800'>Quản Lý Căn Hộ</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex gap-3'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-xl'
            >
              <FaPlus />
              <Link to={path.addForm}>Thêm mới</Link>
            </motion.button>
          </motion.div>
        </motion.div>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex justify-center py-8'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className='text-yellow-500 text-4xl'
            >
              <FaSpinner />
            </motion.div>
          </motion.div>
        )}

        {error && (
          <div className='text-center py-8 text-red-500 bg-red-50 rounded-lg'>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='transform transition-all duration-200 hover:shadow-xl rounded-lg'
                >
                  <ProductManager product={product} onEdit={handleEdit} onDelete={handleDelete} />
                </motion.div>
              ))}
            </div>

            {totalItems > itemsPerPage && (
              <div className='mt-8'>
                <Paginate currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
