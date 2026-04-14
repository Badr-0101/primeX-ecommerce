import { useGetMyOrders } from '@/lib/queries'
import { motion } from 'framer-motion'
import { stagger, rowVariant } from '@/lib/animations'
import type { OrderItem } from '@/types'
import { useAppSelector } from '@/store'

const UserOrdersHistory = () => {

    const { user } = useAppSelector((state) => state.auth)
    const { data = [] } = useGetMyOrders(user?.id || '')
    const orders = data.flatMap((order) => order.order_items || [])
    
    const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    
    // Returns format: April 13, 2026 (or your local equivalent)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return (
      <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[rgba(255,255,255,0.03)] border-y border-[rgba(255,255,255,0.06)]">
                          <th className="text-right text-[rgba(255,255,255,0.4)] font-medium text-xs px-5 py-3">
                            المنتج
                          </th>
                          <th className="text-right text-[rgba(255,255,255,0.4)] font-medium text-xs px-5 py-3 hidden sm:table-cell">
                            تاريخ الطلب    
                          </ th>
                          <th className="text-right text-[rgba(255,255,255,0.4)] font-medium text-xs px-5 py-3">
                            السعر
                          </th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                      >
                        {orders.map((order: OrderItem) => (
                          <motion.tr
                            key={order.id}
                            variants={rowVariant}
                            className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200"
                          >
                            <td className="px-5 py-4">
                              <p className="text-white font-bold text-sm leading-tight">
                                {order?.product?.name}
                              </p>
                              <p className="text-[rgba(255,255,255,0.3)] text-[11px] mt-0.5">
                                {order?.product?.description}
                              </p>
                            </td>
                            <td className="px-5 py-4 text-[rgba(255,255,255,0.35)] text-xs font-mono hidden sm:table-cell">
                              {formatDate(order?.created_at)}
                            </td>
                            <td className="px-5 py-4 text-white font-black text-sm">
                              {order?.product?.price}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
          </div>
  )
}

export default UserOrdersHistory