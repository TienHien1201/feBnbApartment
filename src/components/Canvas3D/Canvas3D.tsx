import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface Canvas3DProps {
  className?: string
  title?: string
}

export default function Canvas3D({ className = '', title = '3D View' }: Canvas3DProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Title */}
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>{title}</h2>

      {/* Loading Indicator */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10'>
          <FaSpinner className='animate-spin text-4xl text-yellow-500' />
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          <div className='text-red-500 text-center'>
            <p className='font-bold'>Failed to load 3D view</p>
            <p className='text-sm'>Please try again later</p>
          </div>
        </div>
      )}

      {/* Canvas Iframe */}
      <div className='aspect-video rounded-lg overflow-hidden shadow-lg'>
        <iframe
          src='https://kuula.co/post/n1/collection/7Z0tX'
          className='w-full h-full border-0'
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title='3D Apartment View'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </div>
  )
}
