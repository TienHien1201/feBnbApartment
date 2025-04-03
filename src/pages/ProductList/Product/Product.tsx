import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../types/product.type' //Vi ten Product qua nhieu lam cho react k nhan biet dc Product nao la cai nao nen dung Product as ProductType de phan biet
import { formatCurrency, formatNumberToSocialStyle, generateNameID } from '../../../utils/utils'
import path from '../../../constants/path'
interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    // Vi ta set productDetails la :id nen khi click vao se chuyen sang trang productDetails voi id cua product do
    <Link to={`${path.product}${generateNameID({name: product.ten_toa_can_ho, id: product.id})}`}>

      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.1rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            // src='https://vinhome.com.vn/wp-content/uploads/2023/04/mat-abng.jpg'
            alt='productImg'
            // src={product.image}
            src={product.hinh_anh_can_ho.length > 0 ? product.hinh_anh_can_ho[0].duong_dan_hinh : '/placeholder.jpg'}
            // alt={product.name}
            className='absolute left-0 top-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            {/* {product.name}𝟮𝗣𝗡𝟮𝗪𝗖 Phân khu GLORY HEIGHTS Thanh toán theo tiến độ Diện tích: 59m2 Hướng ĐB, tầng */}
            {product.ten_toa_can_ho}
          </div>
          <div className='flex items-start mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              {/* <span>{formatCurrency(product.price_before_discount)}</span> */}
              <span>{formatCurrency(product.gia_ban)}</span>
            </div>
            <div className='text-orange-700 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.gia_thu_ve)}</span>
              {/* <span>{formatCurrency(product.price)}</span> */}
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  )
}
