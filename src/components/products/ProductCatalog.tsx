import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/shared/productCardComponents/ProductCard'
import FilterProducts from './FilterProducts'
import { useGetProducts } from '@/lib/queries'
import type { ProductFilters } from '@/lib/api'

const ITEMS_PER_PAGE = 6

const sortOptions = [
  { value: 'newest', label: 'الأحدث أولاً' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'name', label: 'الاسم (أ - ي)' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const ProductCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [filters, setFilters] = useState<ProductFilters>({})

  const { data, isLoading, isPlaceholderData } = useGetProducts(currentPage, ITEMS_PER_PAGE, sortBy, filters)

  const products = data?.data || []
  const totalCount = data?.count || 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleFilterChange = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }, [])

  return (
    <div className="wrapper py-8 sm:py-12" style={{ direction: 'rtl' }}>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <p className="text-[rgba(255,255,255,0.6)] text-sm">
          عرض{' '}
          <span className="text-primary font-bold">{products.length}</span>{' '}
          من{' '}
          <span className="text-primary font-bold">{totalCount}</span>{' '}
          منتج
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[rgba(255,255,255,0.5)] text-sm">ترتيب حسب:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-[#12131a] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white text-sm outline-none cursor-pointer appearance-none
              hover:border-primary/40 focus:border-primary/60 transition-colors duration-200"
            style={{ direction: 'rtl' }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main layout: filter + grid */}
      <div className="flex gap-6 lg:gap-8">
        {/* Filter sidebar */}
        <FilterProducts filters={filters} onFilterChange={handleFilterChange} />

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-center">
              <p className="text-[rgba(255,255,255,0.4)] text-lg mb-2">جاري التحميل...</p>
            </div>
          ) : products.length > 0 ? (
            <motion.div
              key={`${sortBy}-${currentPage}-${JSON.stringify(filters)}`}
              className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 transition-opacity duration-200 ${
                isPlaceholderData ? 'opacity-50' : 'opacity-100'
              }`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <p className="text-[rgba(255,255,255,0.4)] text-lg mb-2">لا توجد منتجات</p>
              <p className="text-[rgba(255,255,255,0.25)] text-sm">حاول تغيير الفلاتر</p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {/* Previous (ChevronRight in RTL) */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all duration-200
                  ${currentPage === 1
                    ? 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.2)] cursor-not-allowed'
                    : 'bg-[#1a1b23] text-white hover:bg-primary hover:text-black'}`}
              >
                <ChevronRight size={18} />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-none text-sm font-bold transition-all duration-200
                    ${page === currentPage
                      ? 'bg-primary text-black shadow-[0_0_15px_rgba(185,242,13,0.4)]'
                      : 'bg-[#1a1b23] text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white'}`}
                >
                  {page}
                </button>
              ))}

              {/* Next (ChevronLeft in RTL) */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all duration-200
                  ${currentPage === totalPages
                    ? 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.2)] cursor-not-allowed'
                    : 'bg-[#1a1b23] text-white hover:bg-primary hover:text-black'}`}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog