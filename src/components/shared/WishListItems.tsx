import React from 'react'
import { useGetProductById } from '@/lib/queries'
import { useNavigate } from 'react-router-dom'
const WishListItems = ({product_id}: {product_id: string}) => {
    const {data:product} = useGetProductById(product_id)
    const navigate = useNavigate()  
  return (
      <>
          <div className="w-[85px] h-[85px] rounded-lg overflow-hidden shrink-0 border border-[rgba(255,255,255,0.06)]"
          onClick={() => navigate(`/product-details//${product?.id}`)}
            >
            <img
                src={product?.image_url}
                alt={product?.name}
                className="w-full h-full object-cover"
            />
        </div>
        <div className=" min-w-0">
            <p className="text-white text-lg font-bold truncate">
                {product?.name}
            </p>
            <p className="text-primary font-black mt-0.5">
                {product?.price}
            </p>
        </div>
      </>
  )
}

export default WishListItems