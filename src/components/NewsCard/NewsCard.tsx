import { motion } from 'framer-motion'

interface NewsCardProps {
  title: string
  date: string
  image: string
  excerpt: string
  link: string
}

export default function NewsCard({ title, date, image, excerpt, link }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all'
    >
      <img src={image} alt={title} className='w-full h-48 object-cover' />
      <div className='p-6'>
        <p className='text-yellow-500 text-sm mb-2'>{date}</p>
        <h3 className='text-xl font-bold mb-2 hover:text-yellow-500 transition-colors'>{title}</h3>
        <p className='text-gray-600 mb-4 line-clamp-3'>{excerpt}</p>
        <a href={link} className='text-yellow-500 font-medium hover:text-yellow-600 transition-colors'>
          Đọc thêm →
        </a>
      </div>
    </motion.div>
  )
}
