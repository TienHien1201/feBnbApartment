import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import useRouterElement from './Router/useRouterElement'
import ChatWidget from './components/ChatWidget'

function App() {
  const routes = useRouterElement()
  return (
    <div>
      {routes}
      <ChatWidget />
      <ToastContainer />
    </div>
  )
}

export default App
