const path = {
  home: '/',
  product: '/products',
  register: '/register',
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  productdetails: ':nameId',
  cart: '/cart',
  booking: '/booking',
  groups: '/groups',
  canvas: '360',
  about: '/about',
  news: '/news',
  addForm: '/addForm',
  Admin: '/ManagerApartment',
  editProduct: '/edit/:id'
} as const

export default path
