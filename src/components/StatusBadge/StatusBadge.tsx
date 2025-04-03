import { FaHome, FaUtensils, FaWindowMaximize, FaDoorOpen } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'full nội thất':
        return {
          icon: <FaHome />,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        }
      case 'bếp rèm':
        return {
          icon: <FaUtensils />,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        }
      case 'trống':
        return {
          icon: <FaDoorOpen />,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        }
      default:
        return {
          icon: <FaWindowMaximize />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor} text-sm font-medium gap-1.5`}
    >
      {config.icon}
      <span>{status}</span>
    </motion.div>
  )
}
