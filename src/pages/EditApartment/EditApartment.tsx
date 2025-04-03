import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../../types/product.type'
import productApi from '../../apis/product.api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  FaSave,
  FaArrowLeft,
  FaBuilding,
  FaHome,
  FaRuler,
  FaCompass,
  FaMoneyBillWave,
  FaInfoCircle,
  FaCouch
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import path from '../../constants/path'

export default function EditApartment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Product | null>(null)

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetails(id as string)
  })

  useEffect(() => {
    if (productData?.data) {
      setFormData(productData.data as unknown as Product)
    }
  }, [productData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => prev && { ...prev, [name]: value })
  }

  const updateProductMutation = useMutation({
    mutationFn: (body: Partial<Product>) => productApi.updateProduct(id as string, body),
    onSuccess: () => {
      toast.success('Cập nhật thành công!')
      navigate(path.Admin)
    },
    onError: () => {
      toast.error('Cập nhật thất bại!')
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData) {
      updateProductMutation.mutate({
        ten_toa_can_ho: formData.ten_toa_can_ho,
        ten_can_ho: formData.ten_can_ho,
        loai_can_ho: formData.loai_can_ho,
        chu_thich: formData.chu_thich,
        tinh_trang_can_ho: formData.tinh_trang_can_ho,
        loai_kinh_doanh: formData.loai_kinh_doanh,
        dien_tich: formData.dien_tich,
        gia_thu_ve: formData.gia_thu_ve,
        gia_ban: formData.gia_ban,
        huong: formData.huong
      })
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden'
        >
          <div className='p-8'>
            <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className='flex items-center justify-between mb-8'>
              <button
                onClick={() => navigate('/manager')}
                className='flex items-center text-gray-600 hover:text-yellow-500 transition-all duration-300'
              >
                <FaArrowLeft className='mr-2' />
                Quay lại
              </button>
              <h2 className='text-3xl font-bold text-gray-800'>Chỉnh sửa thông tin căn hộ</h2>
            </motion.div>

            {formData && (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {/* Thông tin cơ bản */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className='space-y-4'
                  >
                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaBuilding className='mr-2 text-yellow-500' />
                        Tên tòa căn hộ
                      </label>
                      <input
                        type='text'
                        name='ten_toa_can_ho'
                        value={formData.ten_toa_can_ho}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaHome className='mr-2 text-yellow-500' />
                        Tên căn hộ
                      </label>
                      <input
                        type='text'
                        name='ten_can_ho'
                        value={formData.ten_can_ho}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaInfoCircle className='mr-2 text-yellow-500' />
                        Loại căn hộ
                      </label>
                      <input
                        type='text'
                        name='loai_can_ho'
                        value={formData.loai_can_ho}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaCouch className='mr-2 text-yellow-500' />
                        Tình trạng nội thất
                      </label>
                      <select
                        name='tinh_trang_can_ho'
                        value={formData.tinh_trang_can_ho}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      >
                        <option value='full'>Full nội thất</option>
                        <option value='basic'>Bếp & rèm</option>
                        <option value='empty'>Trống</option>
                      </select>
                    </div>
                  </motion.div>

                  {/* Thông tin giá và diện tích */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className='space-y-4'
                  >
                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaMoneyBillWave className='mr-2 text-yellow-500' />
                        Giá bán
                      </label>
                      <input
                        type='number'
                        name='gia_ban'
                        value={formData.gia_ban}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaMoneyBillWave className='mr-2 text-yellow-500' />
                        Giá thu về
                      </label>
                      <input
                        type='number'
                        name='gia_thu_ve'
                        value={formData.gia_thu_ve}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaRuler className='mr-2 text-yellow-500' />
                        Diện tích
                      </label>
                      <input
                        type='text'
                        name='dien_tich'
                        value={formData.dien_tich}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                        <FaCompass className='mr-2 text-yellow-500' />
                        Hướng
                      </label>
                      <input
                        type='text'
                        name='huong'
                        value={formData.huong}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Thông tin bổ sung */}
                <div className='space-y-4'>
                  <div className='form-group'>
                    <label className='flex items-center text-sm font-medium text-gray-700 mb-1'>
                      <FaInfoCircle className='mr-2 text-yellow-500' />
                      Chú thích
                    </label>
                    <textarea
                      name='chu_thich'
                      value={formData.chu_thich}
                      onChange={handleChange}
                      rows={4}
                      className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-300'
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className='flex justify-end space-x-4 mt-8'
                >
                  <button
                    type='button'
                    onClick={() => navigate('/manager')}
                    className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300'
                  >
                    Hủy
                  </button>
                  <button
                    type='submit'
                    className='flex items-center justify-center px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300'
                  >
                    <FaSave className='mr-2' />
                    Lưu thay đổi
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
