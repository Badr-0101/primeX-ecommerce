import React from 'react'
import Counter from './Counter'
import { ShoppingCart } from 'lucide-react'
type  Props = {
    count: number
    setCount: (count: number) => void
    added: boolean
    handleAddToCart: () => void
}
const ProductBuyButtonWithCounter = ({count, setCount, added, handleAddToCart}: Props) => {
  return (
         <div className="flex items-center gap-[8px] sm:gap-[10px]">
            <Counter value={count} onChange={setCount} />


          <button 
                 onClick={handleAddToCart}
            className={`
              flex-1 h-[40px] sm:h-[44px] rounded-[12px] border-none
              text-black text-[12px] sm:text-[13px] font-extrabold tracking-[0.4px]
              cursor-pointer flex items-center justify-center gap-[7px]
              transition-all duration-[250ms] ease-in-out
              shadow-[0_4px_20px_rgba(185,242,13,0.3)]
              ${added
                ? 'scale-[0.97] bg-primary-hover'
                : 'scale-100 bg-primary'}
            `}
          >
            {added ? (
              <>
                <span className="text-[15px]">✓</span>
                تمت الإضافة
              </>
            ) : (
              <>
                <ShoppingCart size={15} strokeWidth={2.5} />
                أضف للسلة
              </>
            )}
          </button>
        </div>
  )
}

export default ProductBuyButtonWithCounter