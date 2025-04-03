const path = {
  home: '/',
  product: '/products',
  register: '/register',
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  productdetails: ':nameId',
  cart: '/cart',
  groups: '/groups',
  Admin: '/manager',
  booking: '/booking',
  about: '/about',
  news: '/news',
  canvas: '/canvas',
  addForm: '/addform',
  refreshToken: '/refresh-token',
  editProduct: '/edit/:id'
} as const

export default path
