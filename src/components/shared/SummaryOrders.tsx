import React from 'react'
import {type CartItemRow } from '@/types'

const SummaryOrders = ({cartItems}: {cartItems: CartItemRow[]}) => {
      const subtotal = cartItems.reduce((sum, item) => sum + item.product?.price * item.quantity, 0)
      const shipping = 0    
      const total = subtotal + shipping
  return (
      <div className="flex flex-col gap-3.5 text-sm">
          <div className="flex justify-between">
                  <span className="text-[rgba(255,255,255,0.5)]">المجموع الفرعي</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
                  <span className="text-[rgba(255,255,255,0.5)]">الشحن</span>
                  <span className="text-primary font-bold">مجاني</span>
          </div>
          {/* Divider */}
                <div className="h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] my-2" />

                <div className="flex justify-between items-baseline">
                  <span className="text-white font-bold text-base">الإجمالي</span>
                  <span className="text-primary font-black text-2xl sm:text-3xl tracking-tight">
                    ${total.toFixed(2)}
                  </span>
                </div>
      </div>
  )
}

export default SummaryOrders