import classNames from 'classnames'

interface PaginateProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const RANGE = 2

export default function Paginate({ currentPage, totalPages, onPageChange }: PaginateProps) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm flex mx-2 cursor-default text-gray-500'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm flex mx-2 cursor-default text-gray-500'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(totalPages)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < totalPages - RANGE + 1) {
          return renderDotAfter(index)
        } else if (
          currentPage > RANGE * 2 + 1 &&
          currentPage < totalPages - RANGE * 2 &&
          pageNumber < currentPage - RANGE &&
          pageNumber > RANGE
        ) {
          return renderDotBefore(index)
        } else if (currentPage >= totalPages - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotBefore(index)
        } else if (
          currentPage > RANGE * 2 + 1 &&
          currentPage < totalPages - RANGE * 2 &&
          pageNumber > currentPage + RANGE &&
          pageNumber < totalPages - RANGE + 1
        ) {
          return renderDotAfter(index)
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className={classNames(
              'min-w-[40px] h-10 rounded-lg transition-colors duration-200 flex items-center justify-center mx-1',
              'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
              {
                'bg-red-50 text-red-600 border-2 border-red-500 font-medium': pageNumber === currentPage,
                'bg-white text-gray-700 border border-gray-300': pageNumber !== currentPage
              }
            )}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center items-center gap-2'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={classNames(
          'px-4 h-10 rounded-lg transition-colors duration-200 flex items-center gap-2',
          'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
          {
            'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === 1,
            'bg-red-500 text-white hover:bg-red-600 active:bg-red-700': currentPage !== 1
          }
        )}
        aria-label='Previous page'
      >
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
        <span>Previous</span>
      </button>

      {renderPagination()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classNames(
          'px-4 h-10 rounded-lg transition-colors duration-200 flex items-center gap-2',
          'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
          {
            'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === totalPages,
            'bg-red-500 text-white hover:bg-red-600 active:bg-red-700': currentPage !== totalPages
          }
        )}
        aria-label='Next page'
      >
        <span>Next</span>
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </button>
    </div>
  )
}
