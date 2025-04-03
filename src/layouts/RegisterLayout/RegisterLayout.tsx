import Footer from '../../components/Footer/Footer'
import RegisterHeader from '../../components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}
export default function Registerlayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
