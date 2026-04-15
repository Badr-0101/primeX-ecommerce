import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import background from "@assets/background.jpg"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-primary-dark">
      <div className="wrapper">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-lg overflow-hidden w-full h-[280px] sm:h-[380px] md:h-[450px] lg:h-[514px]"
        >
          <img src={background} alt="" className="w-full h-full object-cover " />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 sm:gap-5 text-white px-4">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-black bg-primary p-2 rounded-lg font-bold text-lg sm:text-xl lg:text-2xl"
            >
              Primex
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center"
            >
              مكملات عاليه <span className="text-primary">الجوده</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold"
            >
              اكتشف منتجاتنا
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex gap-3 sm:gap-5 flex-wrap justify-center"
            >
              <button onClick={() => navigate('/products')} className="bg-primary text-black px-3 sm:px-4 py-2 cursor-pointer hover:bg-primary-hover transition-all duration-300 shadow-lg shadow-primary/50 font-bold rounded-lg text-sm sm:text-base">
                تسوق الان
              </button>
              <button onClick={() => navigate('/products')} className="bg-transparent border border-white hover:bg-white cursor-pointer hover:text-black transition-all duration-300 text-white px-3 sm:px-4 py-2 font-bold rounded-lg text-sm sm:text-base">
                اكتشف العروض
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
