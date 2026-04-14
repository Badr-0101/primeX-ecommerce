import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@components/layout/Layout'
import { useAppSelector } from '@/store/index'
import { useGetCartItems, useClearServerCart } from '@/lib/queries'
import { createOrder, createOrderItem } from '@/lib/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import SummaryOrders from '@/components/shared/SummaryOrders'
import { BUSINESS_WHATSAPP, EGYPT_GOVERNORATES, VALIDATORS, ERROR_MESSAGES } from './inedex'
import type { CartItemRow } from '@/types'

// ─── WHATSAPP MESSAGE BUILDER ─────────────────────────────────────────────────
function buildWhatsAppMessage(
  fields: Record<string, string>,
  cartItems: CartItemRow[]
) {
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  )

  const itemLines = cartItems
    .map(
      (i) =>
        `• ${i.product?.name} x${i.quantity} — EGP ${((i.product?.price ?? 0) * i.quantity).toLocaleString()}`
    )
    .join('\n')

  return [
    '🛒 *طلب جديد*',
    '',
    '*بيانات العميل*',
    `الاسم: ${fields.name.trim()}`,
    `الهاتف: ${fields.phone.trim()}`,
    '',
    '*عنوان التوصيل*',
    `${fields.street.trim()}, ${fields.area.trim()}`,
    `${fields.gov}, مصر`,
    '',
    '*ملخص الطلب*',
    itemLines,
    '',
    `*الإجمالي: EGP ${total.toLocaleString()}*`,
  ].join('\n')
}

// ─── WHATSAPP ICON ────────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── FIELD COMPONENT ──────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string | false
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase mb-2 block">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const { data: cartItems = [] } = useGetCartItems(user?.id || '')
  const { mutate: clearServerCartMutation } = useClearServerCart()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [fields, setFields] = useState({
    name: '',
    phone: '',
    street: '',
    gov: '',
    area: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    Object.keys(VALIDATORS).forEach((key) => {
      if (!VALIDATORS[key as keyof typeof VALIDATORS](fields[key as keyof typeof fields])) {
        newErrors[key] = true
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setIsSubmitting(true)

    try {
      if (user) {
        // Calculate total
        const total = cartItems.reduce(
          (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
          0
        )

        // 1. Create order
        const orderPayload = { total_amount: total, user_id: user.id }
        const finalOrder = await createOrder(orderPayload)

        // 2. Create order items
        await Promise.all(
          cartItems.map((item) =>
            createOrderItem({
              order_id: finalOrder.id,
              prodcut_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.product?.price ?? 0,
            })
          )
        )

        // 3. Clear cart
        clearServerCartMutation(user.id)
      }


      const message = buildWhatsAppMessage(fields, cartItems)
      const url = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`
      window.open(url, '_blank')

      toast.success('تم ارسال الطلب بنجاح')
      navigate('/')
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('حدث خطأ أثناء إتمام الطلب')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: string) =>
    `w-full h-[48px] bg-[rgba(255,255,255,0.04)] border rounded-lg px-4 text-white text-sm outline-none placeholder:text-[rgba(255,255,255,0.2)] transition-colors duration-200 ${
      errors[fieldName]
        ? 'border-red-400 focus:border-red-400'
        : 'border-[rgba(255,255,255,0.1)] focus:border-primary/50'
    }`

  return (
    <Layout>
      <div className="wrapper py-8 sm:py-12 lg:py-16" style={{ direction: 'rtl' }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">
            إتمام الطلب
          </h1>
          <p className="text-[rgba(255,255,255,0.4)] text-sm">
            أكمل بياناتك لتأكيد الطلب عبر واتساب
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ── Left: Form ── */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 sm:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {/* Customer Info Section */}
              <h2 className="text-white font-black text-lg sm:text-xl mb-6">
                بيانات العميل
              </h2>

              <Field
                label="الاسم بالكامل"
                error={errors.name && ERROR_MESSAGES.name}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="أحمد محمد"
                  value={fields.name}
                  onChange={handleChange}
                  className={inputClasses('name')}
                  style={{ direction: 'rtl' }}
                />
              </Field>

              <Field
                label="رقم الهاتف"
                error={errors.phone && ERROR_MESSAGES.phone}
              >
                <input
                  name="phone"
                  type="tel"
                  placeholder="01012345678"
                  maxLength={11}
                  value={fields.phone}
                  onChange={handleChange}
                  className={inputClasses('phone')}
                  style={{ direction: 'ltr', textAlign: 'right' }}
                />
              </Field>

              {/* Divider */}
              <div className="h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] my-6" />

              {/* Address Section */}
              <h2 className="text-white font-black text-lg sm:text-xl mb-6">
                عنوان التوصيل
              </h2>

              <Field
                label="عنوان الشارع"
                error={errors.street && ERROR_MESSAGES.street}
              >
                <input
                  name="street"
                  type="text"
                  placeholder="12 شارع التحرير، شقة 4"
                  value={fields.street}
                  onChange={handleChange}
                  className={inputClasses('street')}
                  style={{ direction: 'rtl' }}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="المحافظة"
                  error={errors.gov && ERROR_MESSAGES.gov}
                >
                  <select
                    name="gov"
                    value={fields.gov}
                    onChange={handleChange}
                    className={`${inputClasses('gov')} cursor-pointer appearance-none`}
                  >
                    <option value="">اختر المحافظة...</option>
                    {EGYPT_GOVERNORATES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="المنطقة / الحي"
                  error={errors.area && ERROR_MESSAGES.area}
                >
                  <input
                    name="area"
                    type="text"
                    placeholder="المعادي، مصر الجديدة..."
                    value={fields.area}
                    onChange={handleChange}
                    className={inputClasses('area')}
                    style={{ direction: 'rtl' }}
                  />
                </Field>
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={cartItems.length === 0 || isSubmitting}
                className="w-full h-[52px] rounded-xl bg-[#25D366] text-white font-black text-sm sm:text-base tracking-wide cursor-pointer border-none mt-6 shadow-[0_4px_24px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <WhatsAppIcon />
                {isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب عبر واتساب'}
              </motion.button>
            </div>
          </motion.div>

          {/* ── Right: Order Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[380px] shrink-0"
          >
            <div className="sticky top-24 flex flex-col gap-5">
              {/* Summary Card */}
              <div className="relative bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                {/* Glow bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)] rounded-b" />

                <h2 className="text-white font-black text-lg sm:text-xl mb-6">
                  ملخص الطلب
                </h2>

                <SummaryOrders cartItems={cartItems} />
              </div>

              {/* Cart Items Preview */}
              <div className="bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <h3 className="text-white font-bold text-sm mb-4">
                  المنتجات ({cartItems.length})
                </h3>

                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]"
                    >
                      <div className="w-[50px] h-[50px] rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.product?.image_url}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-bold truncate">
                          {item.product?.name}
                        </p>
                        <p className="text-[rgba(255,255,255,0.35)] text-xs">
                          x{item.quantity}
                        </p>
                      </div>
                      <p className="text-primary font-black text-sm whitespace-nowrap">
                        EGP{' '}
                        {((item.product?.price ?? 0) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}

                  {cartItems.length === 0 && (
                    <p className="text-[rgba(255,255,255,0.3)] text-sm text-center py-4">
                      سلة التسوق فارغة
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
