import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart} from 'lucide-react' 
import WelcomeBanner from '@/components/shared/WelcomeBanner'
import StateCards from '@/components/shared/StateCards'
import RecentOrderTable from '@/components/shared/RecentOrderTable'
import WishListItems from '@/components/shared/WishListItems'
import { fadeUp, stagger, rowVariant } from '@/lib/animations'
import { useGetMyOrders,useGetMyFavorites, } from '@/lib/queries'
import { useAppSelector } from '@/store'




/* ── component ── */
const OrdarsInformation = () => {
  const navigate = useNavigate()
  const {user} = useAppSelector(state => state.auth)
  const { data: wishlistItems = [] } = useGetMyFavorites(user?.id || '')
  const { data:allOrders = [] } = useGetMyOrders(user?.id || '')
  const orders = allOrders.slice(0, 3).flatMap(order => order.order_items || [])
  const lastWishlistItems = wishlistItems.slice(0, 3)

  return (
  
      <div
        className="bg-background text-[#e1e4d0] min-h-screen flex-1"
        style={{ direction: 'rtl' }}
      >
        <div className="flex">

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col xl:flex-row">
              {/* ── Center column ── */}
              <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
                {/* Welcome Banner */}
                <motion.section
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[260px]"
                >
                  <WelcomeBanner />
                </motion.section>

                {/* ── Stat Cards ── */}
                <StateCards />

                {/* ── Recent Orders Table ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <motion.section
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                >
                    <RecentOrderTable orders={orders} />
                </motion.section>
                {/* ── Wishlist Panel (left side) ── */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full  shrink-0 "
              >
                <div className="bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Heart size={16} className="text-primary" />
                      قائمة الامنيات
                    </h3>
                  </div>

                  <motion.div
                    className="flex flex-col gap-3"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    {lastWishlistItems.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={rowVariant}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-around gap-3 p-2 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-200 cursor-pointer"
                      >
                        <WishListItems product_id={item.product_id} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* View all */}
                    <motion.button
                    onClick={() => navigate('/favorite')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-4 h-[38px] rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] text-xs font-bold cursor-pointer  cursor-pointer hover:bg-primary-hover hover:text-white transition-colors duration-300  px-4 py-2 hover:shadow-lg hover:shadow-primary-hover/50 text-sm sm:text-base"
                  >
                    عرض جميع المفضلات
                  </motion.button>
                </div>
              </motion.aside>
                </div>

              </div>

         
            </div>
          </main>
        </div>
      </div>

  )
}

export default OrdarsInformation