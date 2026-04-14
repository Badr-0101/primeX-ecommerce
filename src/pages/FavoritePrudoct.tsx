import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import ProductCard from '@/components/shared/productCardComponents/ProductCard'
import { useAppSelector } from '@/store/index'
import { useGetMyFavorites } from '@/lib/queries'

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

const FavoritePrudoct = () => {
  const user = useAppSelector((state) => state.auth.user)
  const { data: favorites, isLoading, error } = useGetMyFavorites(user?.id || '')
 if (isLoading) return <div>جاري التحميل... </div>

  if (error) return <div>حدث خطأ</div>
  return (  
    <Layout>
      <div className='wrapper'>
        <div className='my-14'>
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center justify-center gap-4 my-10'
          >
            <h1 className='text-center text-2xl sm:text-3xl lg:text-4xl font-black text-white'>
              قائمة المفضلة
            </h1>
            <p className='text-center text-md font-bold text-gray-300'>
              منتجاتك المفضلة في مكان واحد
            </p>
          </motion.div>

          {/* ── Favorites Grid ── */}
          {favorites && favorites.length > 0 ? (
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10'
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {favorites.map((favorite) => (
                favorite.product && (
                  <motion.div key={favorite.id} variants={itemVariants} layout>
                    <ProductCard product={favorite.product} />
                  </motion.div>
                )
              ))}
            </motion.div>
          ) : (
            /* ── Empty state ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-[rgba(255,80,120,0.1)] border border-[rgba(255,80,120,0.2)] flex items-center justify-center">
                <Heart size={32} className="text-[#ff5078]" />
              </div>
              <p className="text-[rgba(255,255,255,0.4)] text-lg font-bold">
                لا توجد منتجات في المفضلة
              </p>
              <p className="text-[rgba(255,255,255,0.25)] text-sm">
                اضغط على ❤️ في أي منتج لإضافته هنا
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default FavoritePrudoct