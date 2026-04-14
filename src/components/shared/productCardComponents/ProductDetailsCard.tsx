import { motion, type Variants } from "framer-motion"
import type { Product } from "@/types"
import { useGetCategoryById } from "@/lib/queries"
import useProductLogic from "@/hooks/useProductLogic"
import { Heart } from "lucide-react"
import ProductBuyButtonWithCounter from "./ProductBuyButtonWithCounter"

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
}

const ProductDetailsCard = ({ product }: { product: Product }) => {
    const {count, setCount, added, handleAddToCart,handleFavoriteToggle,liked} = useProductLogic({ product })
    const {data: category} = useGetCategoryById(product.category_id!)
    return (
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-secondary rounded-3xl shadow-sm border border-primary text-white overflow-hidden max-w-4xl flex flex-col md:flex-row-reverse my-auto"
        >
            {/* Right Side: Product Image */}
            <div className="relative w-full max-h-60 md:w-1/2 flex items-center justify-center p-4 ">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-48 object-contain md:max-h-[400px]" 
                />
                           {/* Wishlist button */}
            <button
                onClick={handleFavoriteToggle}
            className={`
                absolute   top-[18px] right-[73px] md:top-[31px] md:right-[46px]
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

            {/* Left Side: Product Info */}
            <div className="w-fit p-8 md:w-1/2 flex flex-col justify-center text-right" dir="rtl">
                <h3 className="text-2xl font-bold text-white leading-tight">
                    {product.name}
                </h3>
                
                <div className="mt-6 ">
                    <span className="text-3xl  font-extrabold text-white">
                        EGP {product.price}
                    </span>
                </div>

                {/* Status Section */}
                <div className="mt-8 space-y-4">


                    {/* Social/Action Buttons */}
                    <div className="flex gap-4">
                        <ProductBuyButtonWithCounter count={count} setCount={setCount} added={added} handleAddToCart={handleAddToCart} />
                    </div>
                </div>

                {/* Category Badge */}
                <div className="mt-10 flex items-center gap-2 text-sm">
                    <span className="text-white">:التصنيف</span>
                    <span className="bg-primary text-black px-4 py-1 rounded-full">
                        {category?.name}
                    </span>
                </div>
            </div>
            </motion.div>
    
    )
}

export default ProductDetailsCard