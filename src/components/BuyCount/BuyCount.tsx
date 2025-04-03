import InputNumber from "../ProductRating/InputNumber";

export default function BuyCount() {
  return (
    <div className='mt-8 flex items-center'>
      <div className='capitalize text-gray-500'>Số lượng</div>

      <div className='ml-10  flex items-center'>
        <button className='flex h-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        <InputNumber
          value={1}
          className=''
          classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
          classNameError='hidden'
        />
        <button className='flex h-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
      <div className='ml-6 text-sm text-gray-500'>{product.id} Sản phẩm có sẳn </div>
    </div>
  )
}
