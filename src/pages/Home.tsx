import { motion, type Variants } from 'framer-motion'
import CategorySection from '@components/home/CategorySection'
import Hero from '@components/home/Hero'
import { Layout } from '@components/layout/Layout'
import TrendingProducts from '@/components/home/trendingProducts/TrendingProducts'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

const Home = () => {
  return (
    <Layout>
      {/* Hero – no extra spacing on top */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
       
       
      >
        <CategorySection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        
      >
        <TrendingProducts />
      </motion.div>
    </Layout>
  )
}

export default Home