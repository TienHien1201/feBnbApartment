import { Link, useMatch } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img src={logo} alt='Logo' className='h-12 lg:h-30' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'> {isRegister ? 'Đăng Ký' : 'Đăng nhập'} </div>
        </nav>
      </div>
    </header>
  )
}
