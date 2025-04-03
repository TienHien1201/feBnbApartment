import { useState } from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import path from '../../../constants/path'
import { Link } from 'react-router-dom'

interface Props {
  onPhanKhuFilter: (id: number) => void
  onPriceRangeFilter: (min: number, max: number) => void
}

export default function AsideFilter({ onPhanKhuFilter, onPriceRangeFilter }: Props) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>('The RainBow')
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  })
  const [error, setError] = useState<string | null>(null)

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev)
  }

  const categories = [
    { id: 1, name: 'The RainBow' },
    { id: 2, name: 'The Origami' },
    { id: 3, name: 'Glory heights' },
    { id: 4, name: 'The beverly solary' },
    { id: 5, name: 'the beverly' },
    { id: 6, name: 'the opus one' }
  ]

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Chỉ cho phép nhập số và xóa khoảng trắng
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    setPriceRange((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }))
  }

  const handleItemClick = (name: string) => {
    setSelectedItem(name)
  }

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const min = Number(priceRange.min) || 0
    const max = Number(priceRange.max) || 0

    // Kiểm tra điều kiện
    if (min === 0 && max === 0) {
      setError('Vui lòng nhập ít nhất một giá trị cho khoảng giá.')
      return
    }

    if (min < 0 || max < 0) {
      setError('Giá trị không được nhỏ hơn 0.')
      return
    }

    if (max > 0 && min > max) {
      setError('Giá tối thiểu không được lớn hơn giá tối đa.')
      return
    }

    onPriceRangeFilter(min, max)
    setPriceRange({ min: '', max: '' }) // Reset form sau khi submit
  }

  const handlePhanKhuClick = (id: number, name: string) => {
    handleItemClick(name)
    if (id > 0) {
      onPhanKhuFilter(id)
    }
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className='flex items-center font-bold cursor-pointer hover:bg-gray-300'
        onClick={(e) => {
          e.preventDefault()
          toggleCategory()
        }}
      >
        <svg
          className='w-4 h-4 mr-3 fill-current'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul
        className={`transition-max-height duration-300 ease-in-out ${
          isCategoryOpen ? 'max-h-[200px]' : 'max-h-0 overflow-hidden'
        }`}
      >
        {categories.map((category) => (
          <li
            key={category.id}
            className='py-2 pl-2'
            onMouseEnter={() => setHoveredItem(category.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              className={`relative px-2 flex items-center ${
                selectedItem === category.name ? 'text-yellow-600 font-semibold' : ''
              }`}
              onClick={() => handlePhanKhuClick(category.id, category.name)}
            >
              {hoveredItem === category.name && (
                <svg
                  className='fill-yellow-500 h-2 w-2 absolute top-1 left-[-10px]'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              )}
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-3 h-4 fill-current mr-3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
            />
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className='bg-gray-300 h-[1px] my-4' />
        <div className='my-5'>
          <div className='flex'>Khoảng giá</div>
          {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}
          <form onSubmit={handlePriceSubmit} className='mt-2'>
            <div className='flex items-start'>
              <Input
                type='text'
                placeholder='₫ Từ'
                name='min'
                className='grow'
                classNameInput='w-full p-1 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                value={priceRange.min}
                onChange={handlePriceChange}
              />
              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Input
                type='text'
                placeholder='₫ Đến'
                name='max'
                className='grow'
                classNameInput='w-full p-1 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                value={priceRange.max}
                onChange={handlePriceChange}
              />
            </div>
            <Button
              type='submit'
              className='w-full p-2 mt-2 uppercase bg-yellow-500 text-white text-sm hover:bg-yellow-500/80'
              isLoading={false}
            >
              Áp dụng
            </Button>
          </form>
        </div>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm flex items-start'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-6 h-6 fill-current mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-6 h-6 fill-current mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-6 h-6 fill-current mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-6 h-6 fill-current mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='w-full p-2 px-2 uppercase bg-yellow-500 text-white text-sm hover:bg-yellow-500/80 flex justify-center items-center'
        isLoading={false}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
