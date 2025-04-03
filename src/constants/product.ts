export const sortBy = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const // as const là kiểu của TypeScript, nó giúp TypeScript nhận biết được kiểu của các thuộc tính trong object này tức khi gọi tới sortBy ngoài gọi các thuộc tính trong object sortBy ra thì nó không cho phép gọi các thuộc tính khác

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const
