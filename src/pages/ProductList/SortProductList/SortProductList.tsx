// import classNames from 'classnames'
// import { sortBy, order as orderConstant } from '../../../constants/product'
// import { QueryConfig } from '../ProductList'
// import { ProductListConfig } from '../../../types/product.type'
// import { createSearchParams, Link, useNavigate } from 'react-router-dom'
// import path from '../../../constants/path'
// import { omit } from 'lodash'

interface Props {
  page_size: number
  onSort: (order: 'asc' | 'desc') => void
  onFilter: (type: 'popular' | 'newest' | 'hot') => void
}

export default function SortProductList({ page_size, onSort, onFilter }: Props) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'asc' | 'desc'
    if (value) {
      onSort(value)
    }
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo </div>
          <button
            className='h-8 px-4 capitalize text-center text-sm bg-white text-black hover:bg-slate-100'
            onClick={() => onFilter('popular')}
          >
            Phổ biến
          </button>
          <button
            className='h-8 px-4 capitalize text-sm text-center bg-white text-black hover:bg-slate-100'
            onClick={() => onFilter('newest')}
          >
            Mới nhất
          </button>
          <button
            className='h-8 px-4 capitalize text-center text-sm bg-white text-black hover:bg-slate-100'
            onClick={() => onFilter('hot')}
          >
            Deal Hot 🔥
          </button>
          <select
            className='h-8 px-4 capitalize text-sm text-center outline-none bg-white text-black hover:bg-slate-100'
            onChange={handleSortChange}
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='asc'>Giá: Thấp đến cao</option>
            <option value='desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>
    </div>
  )
}
