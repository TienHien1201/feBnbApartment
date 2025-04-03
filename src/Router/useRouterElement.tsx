import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Registerlayout from '../layouts/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import Profile from '../pages/Profile'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import path from '../constants/path'
import ProductDetail from '../pages/ProductDetail'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import BookingHistory from '../pages/BookingHistory'
import GroupApartment from '../pages/GroupApartment'
import Canvas3D from '../components/Canvas3D'
import ApartmentAdd from '../pages/Admin/ApartmentAdd'
import News from '../pages/News/News'
import About from '../pages/About'
import ManagerApartment from '../pages/ManagerApartment'
import EditApartment from '../pages/EditApartment'

//  Outlet là nơi hiển thị nội dung của route con trong bố cục của route cha.
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  //Khi các router nào truy cập vào hàm này mà nó đã isAuthenticate tức đã login rồi thì cho router đến(tức cái Outlet) còn không thì navigate đến trang login
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  //Khi người dùng đã login r thì ko cho login nữa
  //Khi các router nào truy cập vào hàm này mà nó đã isAuthenticate tức đã login rồi thì cho router đến(tức cái Outlet) còn không thì navigate đến trang login
  return !isAuthenticated ? <Outlet /> : <Navigate to='/products' />
}

export default function useRouterElement() {
  const routerElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <Registerlayout>
              <Login />
            </Registerlayout>
          )
        },
        {
          path: path.register,
          element: (
            <Registerlayout>
              <Register />
            </Registerlayout>
          )
        }
      ]
    },
    {
      path: path.productdetails,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },

    {
      path: path.booking,
      element: (
        <MainLayout>
          <BookingHistory />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: path.product,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.groups,
      index: true,
      element: (
        <MainLayout>
          <GroupApartment />
        </MainLayout>
      )
    },
    {
      path: path.canvas,
      index: true,
      element: (
        <MainLayout>
          <Canvas3D />
        </MainLayout>
      )
    },
    {
      path: path.addForm,
      index: true,
      element: (
        <MainLayout>
          <ApartmentAdd />
        </MainLayout>
      )
    },
    {
      path: path.news,
      index: true,
      element: (
        <MainLayout>
          <News />
        </MainLayout>
      )
    },
    {
      path: path.about,
      index: true,
      element: (
        <MainLayout>
          <About />
        </MainLayout>
      )
    },
    {
      path: path.Admin,
      index: true,
      element: (
        <MainLayout>
          <ManagerApartment />
        </MainLayout>
      )
    },
    {
      path: path.editProduct,
      element: (
        <MainLayout>
          <EditApartment />
        </MainLayout>
      )
    }
  ])
  return routerElements
}
