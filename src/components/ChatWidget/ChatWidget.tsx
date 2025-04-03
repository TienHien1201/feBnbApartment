import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { askGemini } from '../../apis/geminiApi'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: number
  text: string
  isUser: boolean
  isMarkdown?: boolean
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        isUser: true,
        isMarkdown: false
      }
      setMessages((prev) => [...prev, userMessage])
      setNewMessage('')
      setIsLoading(true)

      try {
        const response = await askGemini(newMessage)
        const aiMessage = {
          id: Date.now() + 1,
          text: response.response,
          isUser: false,
          isMarkdown: true
        }
        setMessages((prev) => [...prev, aiMessage])
      } catch (error) {
        console.error('Error getting response from Gemini:', error)
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Sorry, I had trouble processing your request.',
          isUser: false,
          isMarkdown: false
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDelete = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className='bg-white rounded-lg shadow-lg w-96 mb-4'
          >
            <div className='bg-yellow-500 text-white p-4 rounded-t-lg'>
              <h3 className='text-lg font-semibold'>Chat với chúng tôi</h3>
            </div>
            <div className='h-80 overflow-y-auto p-4 bg-gray-50'>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.isUser ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: msg.isUser ? -50 : 50 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`rounded-lg p-2 mb-2 shadow group relative ${
                      msg.isUser ? 'bg-yellow-100 ml-auto' : 'bg-white'
                    } max-w-[85%] ${msg.isUser ? 'ml-auto' : 'mr-auto'}`}
                  >
                    {msg.isMarkdown ? (
                      <div className='markdown-content prose prose-sm max-w-none'>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className='absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className='text-center text-gray-500'>
                    <span className='animate-pulse'>AI Đã trả lời...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit} className='p-4 border-t'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder='Nhập tin nhắn...'
                  className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                />
                <button
                  type='submit'
                  className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors'
                >
                  Gửi
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 0 : [0, -10, 10, -10, 10, 0]
        }}
        transition={{
          duration: isOpen ? 0.2 : 2,
          repeat: isOpen ? 0 : Infinity,
          repeatDelay: 3
        }}
        className='bg-yellow-500 hover:bg-yellow-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors'
      >
        {isOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
            />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
