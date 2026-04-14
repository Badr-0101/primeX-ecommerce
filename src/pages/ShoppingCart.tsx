import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@components/layout/Layout'
import Counter from '@/components/shared/productCardComponents/Counter'
import {useGetCartItems,useAddToCart,useRemoveCartItem} from "@/lib/queries"
import { useAppSelector } from '@/store/index'  
import SummaryOrders from '@/components/shared/SummaryOrders'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -60, height: 0, marginBottom: 0, transition: { duration: 0.3 } },
}

const ShoppingCart = () => {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const { data: cartItems = [] } = useGetCartItems(user?.id || '')
  const { mutate: addToCartMutation } = useAddToCart()
  const { mutate: removeCartItemMutation } = useRemoveCartItem()

  const updateQuantity = (productId: string, quantity: number) => {
  if (!user?.id) return

  addToCartMutation({
    userId: user.id,
    productId,
    quantity,
  })
}

  const deleteItem = (id: string) => {
    removeCartItemMutation({ userId: user?.id || '', productId: id })
  }

  return (
    <Layout>
      <div className="wrapper py-8 sm:py-12 lg:py-16" style={{ direction: 'rtl' }}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── Cart Items Column ── */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">
                سلة التسوق
              </h1>
              <p className="text-[rgba(255,255,255,0.4)] text-sm mb-8">
                لديك <span className="text-primary font-bold">{cartItems.length}</span> منتجات في سلتك
              </p>
            </motion.div>

            {/* Items list */}
            <motion.div
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={itemVariants}
                    exit="exit"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-[100px] h-[180px] sm:h-[100px] rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.product?.image_url}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                            {item.product?.name}
                          </h3>

                        </div>
                        <button
                          onClick={() => item.product?.id && deleteItem(item.product.id)}
                          className="text-[rgba(255,255,255,0.25)] hover:text-red-400 transition-colors duration-200 cursor-pointer bg-transparent border-none shrink-0 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Counter + Price row */}
                      <div className="flex items-center justify-between mt-4">
                        <Counter
                          value={item.quantity}
                          onChange={(n) => item.product?.id && updateQuantity(item.product.id, n)}
                        />
                        <span className="text-primary font-black text-lg sm:text-xl tracking-tight">
                          ${((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty state */}
              {cartItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-[rgba(255,255,255,0.3)] text-lg mb-2">سلتك فارغة</p>
                  <p className="text-[rgba(255,255,255,0.2)] text-sm">ابدأ التسوق واضف منتجات الى سلتك</p>
                </motion.div>
              )}
            </motion.div>

            {/* Continue shopping */}
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-primary text-sm font-bold mt-8 hover:gap-3 transition-all duration-300 no-underline"
            >
              <ArrowRight size={16} />
              متابعة التسوق
            </motion.a>
          </div>

          {/* ── Order Summary Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[360px] shrink-0"
          >
            <div className="sticky top-24 bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {/* Glow bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)] rounded-b" />

              <h2 className="text-white font-black text-lg sm:text-xl mb-6">
                ملخص الطلب
              </h2>

              {/* Summary rows */}
            
              <SummaryOrders cartItems={cartItems} />

              {/* Checkout button */}
              <motion.button
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full h-[48px] sm:h-[52px] rounded-xl bg-primary text-black font-black text-sm sm:text-base tracking-wide cursor-pointer border-none mt-6 shadow-[0_4px_24px_rgba(185,242,13,0.3)] hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إتمام الشراء الآن 🛒
              </motion.button>

              <p className="text-[rgba(255,255,255,0.25)] text-[11px] text-center mt-3">
                دفع آمن ومحمي
              </p>


              {/* Trust badges */}
              <div className="flex justify-center gap-6 mt-6 pt-5 border-t border-[rgba(255,255,255,0.05)]">
                {[
                  { icon: <ShieldCheck size={18} />, label: 'آمن' },
                  { icon: <Truck size={18} />, label: 'شحن سريع' },
                  { icon: <RotateCcw size={18} />, label: 'إرجاع 30 يوم' },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span className="text-[rgba(255,255,255,0.3)]">{badge.icon}</span>
                    <span className="text-[rgba(255,255,255,0.35)] text-[10px] font-bold uppercase tracking-wider">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default ShoppingCart
