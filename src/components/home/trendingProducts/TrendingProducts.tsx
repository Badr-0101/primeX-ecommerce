import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/shared/productCardComponents/ProductCard'
import TrendingProductLogic from "./trendingProductLogic"
import type { Product } from "@/types"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const TrendingProducts = () => {
  const {categories, activeCategoryId, visibleCount, products, isLoading, handleCategoryChange, handleShowAll, showMoreItems} = TrendingProductLogic()
  

  return (
    <div className="bg-secondary py-12 shadow-2xl shadow-primary-dark/50">
      <div className="wrapper">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl text-white"
        >
          منتجات <span className="text-primary">مميزه</span>
        </motion.h3>

        {/* --- Categories List --- */}
        <div className='flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-10'>
          {/* "All" reset button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowAll}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all border cursor-pointer
              ${!activeCategoryId 
                ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(185,242,13,0.3)]' 
                : 'bg-primary-dark/20 text-white border-white/10 hover:border-primary/50'}`}
          >
            الكل
          </motion.button>

          {categories?.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all border cursor-pointer
                ${activeCategoryId === cat.id 
                  ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(185,242,13,0.3)]' 
                  : 'bg-primary-dark/20 text-white border-white/10 hover:border-primary/50'}`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* --- Products Grid --- */}
        <motion.div
          key={activeCategoryId || 'all'} // Key forces animation reset on category change
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence mode='popLayout'>
            {products?.slice(0, visibleCount).map((item: Product) => (
              <motion.div key={item.id} variants={itemVariants} layout>
                <ProductCard product={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- "Show More" Button --- */}
        {products && products.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showMoreItems}
              className="px-10 py-3 bg-transparent border-2 border-primary text-primary rounded-2xl font-black text-lg hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer"
            >
              إظهار المزيد
            </motion.button>
          </div>
        )}

        {isLoading && (
          <p className="text-center text-white/50 mt-10">جاري التحميل...</p>
        )}
      </div>
    </div>
  )
}

export default TrendingProducts