import { Layout } from "@/components/layout/Layout"
import { useParams } from "react-router-dom"
import ProductCatalog from "@/components/products/ProductCatalog"
const ProductsByCategory = () => {
    const { id } = useParams()
    
  return (
    <Layout>
        <ProductCatalog categoryId={id} />
    </Layout>
  )
}

export default ProductsByCategory