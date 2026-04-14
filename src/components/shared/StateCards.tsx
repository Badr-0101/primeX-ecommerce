import { motion } from 'framer-motion'
import { Wallet, ShoppingCart } from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { useGetMyOrders } from "@/lib/queries"
import { useAppSelector } from '@/store'

const StateCards = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { data: orders } = useGetMyOrders(user?.id || '')
  const totalPaid = orders?.reduce((acc, order) => acc + order.total_amount, 0) || 0  
  const totalOrders = orders?.length || 0
  return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  {[
                    {
                      icon: <Wallet size={30} />,
                      title: 'إجمالي المدفوعات',
                      value: totalPaid,
                      
                    },
                    {
                      icon: <ShoppingCart size={30} />,
                      title: 'إجمالي الطلبات',
                      value: totalOrders,

                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.title}
                      custom={i + 1}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-hidden"
                    >
                      {/* Glow bar */}
                      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)] rounded-b" /> */}

                      <div className="flex flex-row-reverse items-center justify-end gap-4  ">
                        <div>
                        <p className="text-[#E1E4D0] text-xl font-semibold">
                            {stat.title}
                        </p>
                      
                        <h3 className="text-white text-2xl sm:text-3xl font-black tracking-tight mb-1">
                          {stat.value}
                        </h3>
                        </div>
                        <span className="text-[#E1E4D0] w-12 h-12 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)]">
                          {stat.icon}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
      </>
  )
}

export default StateCards