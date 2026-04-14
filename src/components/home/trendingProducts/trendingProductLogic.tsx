import {useState, useMemo} from 'react'
import { useGetCategories, useGetProductsByCategory, useGetAllProductsRandom } from 'src/lib/queries'

/** Simple Fisher-Yates shuffle (creates new array) */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const TrendingProductLogic = () => {
    const { data: categories } = useGetCategories()
      
      // Track active category and how many items to show
      const [activeCategoryId, setActiveCategoryId] = useState<string>('')
      const [visibleCount, setVisibleCount] = useState(8)
    
      // Fetch ALL products (for "all" / default view)
      const { data: allProducts, isLoading: isLoadingAll } = useGetAllProductsRandom()
    
      // Fetch by category only when one is selected
      const { data: categoryProducts, isLoading: isLoadingCategory } = useGetProductsByCategory(activeCategoryId)
    
      // Randomize the "all" list, memoized to avoid reshuffling on every render
      const shuffledAll = useMemo(
        () => (allProducts ? shuffleArray(allProducts) : []),
        [allProducts]
      )
    
      // Decide which product list to display
      const products = activeCategoryId ? categoryProducts : shuffledAll
      const isLoading = activeCategoryId ? isLoadingCategory : isLoadingAll
    
      const handleCategoryChange = (id: string) => {
        setActiveCategoryId(id)
        setVisibleCount(8) // Reset count when switching categories
      }
    
      const handleShowAll = () => {
        setActiveCategoryId('')
        setVisibleCount(8)
      }
    
      const showMoreItems = () => {
        setVisibleCount((prev) => prev + 4)
      }
  return {
    categories,
    activeCategoryId,
    visibleCount,
    products,
    isLoading,
    handleCategoryChange,
    handleShowAll,
    showMoreItems
  }
}

export default TrendingProductLogic