import Header from '@components/shared/Header'
import { ArrowLeft, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGetCategories } from '@/lib/queries'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const CategorySection = () => {
  const navigate = useNavigate()


  const { data: Category, isLoading, error } = useGetCategories()
  console.log(Category)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="shadow-2xl shadow-primary-dark/50 bg-primary-dark">
        <div className="wrapper">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Header title="تسوق حسب " target="الاقسام" />
            <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-primary cursor-pointer hover:bg-primary-hover hover:text-white transition-colors duration-300 border-2 border-primary rounded-lg px-4 py-2 hover:shadow-lg hover:shadow-primary-hover/50 text-sm sm:text-base">
              عرض الكل <ArrowLeft />
            </button>
          </div>

          {/* Category grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 sm:mt-10"
            variants={containerVariants}
          >
            {isLoading ? (
            <p>Loading... </p>
            ) : error ? (
              <p className="col-span-full">حدث خطأ: {error.message}</p>
            ) : (
              Category?.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={()=>navigate(`/products`)}
                  className="relative flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <img
                    loading='lazy'
                    src={item.image_url}
                    alt={item.name}
                    className="w-full aspect-square rounded-lg object-cover"
                  />
                  <p className="text-primary w-full text-center bg-background p-1  absolute bottom-4 text-sm sm:text-base">
                    {item.name}
                  </p>
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Search className="text-white" />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CategorySection