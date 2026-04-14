import { Layout } from "@/components/layout/Layout"
import ProductDetailsCard from "@/components/shared/productCardComponents/ProductDetailsCard"
import { useParams } from "react-router-dom"
import { useGetProductById} from "@/lib/queries"
import { motion } from "framer-motion"
const ProductDetails = () => {
    const {id} = useParams()
    const {data: product} = useGetProductById(id!)
    if (!product) {
        return (
            <Layout>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-screen">
                    <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-2xl font-bold text-white">المنتج غير موجود</motion.h1>
                </motion.div>
            </Layout>
        )
    }
  return (
    <Layout>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen">
            <ProductDetailsCard product={product} />
        </motion.div>
    </Layout>
  )
}

export default ProductDetails