import { useMemo } from "react"
interface FilterProductsProps {
    allProducts: {
        id: number
        name: string
        price: string
        image_url: string
        category: string
        description?: string
        stock_quantity:number
        created_at:string
        
        
    }[] 
    filters: {
        category: string
        priceRange?: [number, number]
    }
    sortBy: "newest" | "price-asc" | "price-desc" | "name"
    currentPage: number
    ITEMS_PER_PAGE: number
}
const useProductFilter = ({allProducts, filters, sortBy, currentPage, ITEMS_PER_PAGE}: FilterProductsProps) => {
    // Filter products
      const filteredProducts = useMemo(() => {
        let result = (allProducts ?? []).filter((p) => {
            const matchCategory = filters.category === 'all' || p.category === filters.category
            if (!filters.priceRange) {
                return matchCategory
            }
          const matchPrice = parseFloat(p.price) <= filters.priceRange[1] 
          return matchCategory && matchPrice
        })
    
        // Sort
        switch (sortBy) {
          case 'price-asc':
            result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            break
          case 'price-desc':
            result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
            break
          case 'name':
            result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ar'))
            break
          default:
            break
        }
    
        return result
      }, [filters, sortBy,allProducts])
    
      const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
      const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    return(
        {
            filteredProducts,
            paginatedProducts,
            totalPages
        }
    )
}
export default useProductFilter