import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import productApi from '../../apis/product.api'
import Paginate from '../../components/Pagination'
import { ProductListConfig } from '../../types/product.type'
import { useState, useEffect } from 'react'

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFiltered, setIsFiltered] = useState(false)

  const { data: productsData, isLoading: isInitialLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts({} as ProductListConfig),
    onError: (error) => {
      setError('Failed to fetch products')
      console.error('Fetch error:', error)
    }
  })

  const [products, setProducts] = useState(productsData?.data || [])

  useEffect(() => {
    if (productsData?.data && !isFiltered) {
      setProducts(productsData.data)
    }
  }, [productsData, isFiltered])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setIsFiltered(true)
    try {
      const response = await productApi.getAllCanHoWithImagesByName(searchInput)
      setProducts(response.data || [])
    } catch (error) {
      setError('Search failed')
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhanKhuFilter = async (id: number) => {
    setIsLoading(true)
    setError(null)
    setIsFiltered(true)
    try {
      const response = await productApi.getCanHoByPhanKhu(id)
      setProducts(response.data || [])
    } catch (error) {
      setError('Filter failed')
      console.error('Filter error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePriceRangeFilter = async (min: number, max: number) => {
    setIsLoading(true)
    setError(null)
    setIsFiltered(true)

    // Kiểm tra nếu min và max đều là 0
    if (min === 0 && max === 0) {
      setError('Vui lòng nhập ít nhất một giá trị cho khoảng giá.')
      setIsLoading(false)
      return
    }

    try {
      console.log('Calling API getCanHoByPriceRange with:', { min, max })
      const response = await productApi.getCanHoByPriceRange(min, max)
      console.log('Full API response:', response)
      console.log('response.data:', response.data)
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data)
        console.log('Products updated:', response.data)
      } else {
        console.warn('response.data is not an array or is undefined:', response.data)
        setProducts([])
      }
    } catch (error) {
      setError('Price filter failed')
      console.error('Price filter error:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = async (order: 'asc' | 'desc') => {
    setIsLoading(true)
    setError(null)
    setIsFiltered(true)
    try {
      const response = await productApi.getCanHoSorted(order)
      setProducts(response.data || [])
    } catch (error) {
      setError('Sort failed')
      console.error('Sort error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilter = async (type: 'popular' | 'newest' | 'hot') => {
    setIsLoading(true)
    setError(null)
    setIsFiltered(true)
    try {
      const response = await productApi.getCanHoByFilter(type)
      setProducts(response.data || [])
    } catch (error) {
      setError('Filter failed')
      console.error('Filter error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const itemsPerPage = 12
  const totalItems = products?.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products?.slice(startIndex, endIndex) || []

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='bg-white shadow-sm py-4 sticky top-0 z-10'>
        <div className='container mx-auto px-4'>
          <form onSubmit={handleSearch} className='max-w-2xl mx-auto'>
            <div className='flex items-center bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-500 transition'>
              <div className='px-4 text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Tìm kiếm căn hộ theo tên, vị trí...'
                className='w-full py-3 px-2 outline-none bg-transparent text-gray-700'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type='submit'
                className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-r-lg transition duration-300 flex items-center gap-2'
              >
                <span className='hidden sm:inline'>Tìm kiếm</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='lg:w-1/4'>
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <AsideFilter onPhanKhuFilter={handlePhanKhuFilter} onPriceRangeFilter={handlePriceRangeFilter} />
            </div>
          </div>

          <div className='lg:w-3/4'>
            <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
              <SortProductList page_size={totalPages} onSort={handleSort} onFilter={handleFilter} />
            </div>

            {(isLoading || isInitialLoading) && (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto'></div>
              </div>
            )}

            {error && (
              <div className='text-center py-8 text-red-500'>
                <p>{error}</p>
              </div>
            )}

            {!isLoading && !error && (
              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <div key={product.id}>
                      <Product product={product} />
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8 text-gray-500'>
                    <p>Không tìm thấy sản phẩm nào trong khoảng giá này.</p>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !error && totalItems > itemsPerPage && (
              <div className='mt-6'>
                <Paginate currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
