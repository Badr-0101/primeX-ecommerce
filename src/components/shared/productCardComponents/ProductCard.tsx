import { useNavigate } from 'react-router-dom'

import { Heart } from 'lucide-react'
import useProductLogic from '@/hooks/useProductLogic'
import ProductBuyButtonWithCounter from './ProductBuyButtonWithCounter'
import type { Product } from '@/types'


const ProductCard = ({ product }: { product: Product }) => {
  const {count, setCount, added, hovered, setHovered, liked, handleAddToCart, handleFavoriteToggle} = useProductLogic({ product })
  const navigate = useNavigate()

  return (
    <div className="product-card max-w-2xs  ">

      {/* ── Top glow bar (defined in index.css) ── */}
      <div className="product-card-glowBar" />

      {/* ── Image section ── */}
      <div className="relative overflow-hidden h-[200px] sm:h-[250px] lg:h-[300px]">
        <img
          onClick={() => navigate(`/product-details/${product.id}`)}
          loading='lazy'  
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover block transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />

        {/* Gradient fade to card body */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(13,14,20,0.9)_100%)] pointer-events-none" />

        {/* Wishlist button */}
        <button
            onClick={handleFavoriteToggle}
          className={`
            absolute top-[14px] right-[14px]
            w-[38px] h-[38px] rounded-full
            flex items-center justify-center
            cursor-pointer backdrop-blur-[8px]
            transition-all duration-250 ease-in-out
            ${liked
              ? 'border border-[rgba(255,80,120,0.4)] bg-[rgba(255,80,120,0.15)] shadow-[0_0_16px_rgba(255,80,120,0.3)]'
              : 'border border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.4)]'}
          `}
        
        >
          <Heart
            size={16}
            fill={liked ? '#ff5078' : 'none'}
            color={liked ? '#ff5078' : 'rgba(255,255,255,0.7)'}
            className="transition-all duration-250 ease-in-out"
          />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="p-3 sm:p-[18px]">

        {/* Name + Price */}
        <div className="flex justify-between items-start mb-[8px]" style={{ direction: 'rtl' }}>
          <h3 className="m-0 text-[15px] sm:text-[17px] font-extrabold text-white tracking-[-0.4px] leading-[1.2]">
            {product.name}
          </h3>
          <span className="text-[18px] sm:text-[20px] font-black tracking-[-1px] shrink-0 text-[color:var(--color-primary)]">
          {product.price}   <span className='text-[14px] sm:text-[16px] font-semibold'>EGP</span>
          </span>
        </div>

        {/* Description */}
        <p
          className="text-[11px] sm:text-[12px] text-[rgba(255,255,255,0.38)] leading-[1.7] mb-[12px] sm:mb-[16px] text-right"
          style={{ direction: 'rtl' }}
        >
          لوريم ايبسوم دولار سيت أميت كونسيكتيتور أديبيسنج أليت
        </p>

        {/* Divider */}
        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] mb-[12px] sm:mb-[16px]" />

        {/* Counter + CTA */}
  
        <ProductBuyButtonWithCounter count={count} setCount={setCount} added={added} handleAddToCart={handleAddToCart} />
      </div>
    </div>
  )
}

export default ProductCard