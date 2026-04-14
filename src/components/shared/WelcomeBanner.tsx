import { motion } from 'framer-motion'
import background from '@assets/welcome.png'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserProfile } from '@/lib/queries'
const WelcomeBanner = () => {
    const navigate = useNavigate()
  const { data: profile } = useGetCurrentUserProfile()
  console.log(profile)
  return (
      <>
                {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${background})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  {/* Content */}
                  <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-center h-full">

                    <motion.h1
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-white leading-tight mb-3"
                    >
                      أهلاً بعودتك،{' '}
                      <span className="text-primary">{profile?.username}</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="text-[rgba(255,255,255,0.45)] text-sm sm:text-base max-w-[480px] leading-relaxed mb-5"
                    >
                      من لوحة التحكم الخاصة بك يمكنك معرفه كل شي  عن طلباتك 

                    </motion.p> 
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.4 }}
                      className="flex gap-3 flex-wrap"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/products')}
                        className="bg-primary hover:bg-primary-hover text-black px-5 py-2.5 rounded-lg font-bold text-sm cursor-pointer border-none shadow-[0_4px_20px_rgba(185,242,13,0.3)] transition-colors duration-200"
                      >
                        تصفح القائمة
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/cart')} 
                        className="bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] text-white px-5 py-2.5 rounded-lg font-bold text-sm cursor-pointer border border-[rgba(255,255,255,0.12)] transition-colors duration-200"
                      >
                        عربة التسوق
                      </motion.button>
                    </motion.div>
                  </div>
      
      </>
  )
}

export default WelcomeBanner