import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import signInBg from '@assets/signInbackgroundImg.png'
import logo from '@assets/logo.jpg'

import { signIn } from '@/lib/api'

// تعريف أنواع البيانات للنموذج
type SignInFormValues = {
  email: string
  password: string
  
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignInFormValues) => {
    try {
      // تنفيذ عملية تسجيل الدخول عبر الـ API
      await signIn(data.email.trim(), data.password)
      
      toast.success('تم تسجيل الدخول بنجاح!')
      
      // توجيه المستخدم للوحة التحكم أو الصفحة الرئيسية
      setTimeout(() => navigate('/'), 1500)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'خطأ في البريد الإلكتروني أو كلمة المرور')
    }
  }

  // Classes الموحدة للتصميم
  const inputClass =
    'w-full h-[48px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-lg pr-10 pl-4 text-white text-sm outline-none placeholder:text-[rgba(255,255,255,0.2)] focus:border-primary/50 transition-colors duration-200'
  
  const errorClass = 'text-red-400 text-[11px] mt-1'

  return (
    <div className="min-h-screen relative flex flex-col" style={{ direction: 'rtl' }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={signInBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,242,13,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <img src={logo} alt="PrimeX" className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-primary/40 shadow-[0_0_20px_rgba(185,242,13,0.2)] mb-3" />
          <h1 className="text-2xl sm:text-3xl font-black text-primary tracking-wider">
            PrimeX
          </h1>
          <p className="text-[rgba(255,255,255,0.4)] text-xs tracking-[3px] uppercase mt-1">
            أطلق قوتك
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[440px] bg-[rgba(13,14,20,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-[0_16px_64px_rgba(0,0,0,0.6)]"
        >
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-6" style={{ fontStyle: 'italic' }}>
            مرحباً بعودتك
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase mb-2 block">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]" />
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className={inputClass}
                  style={{ direction: 'ltr', textAlign: 'right' }}
                  {...register('email', {
                    required: 'البريد الإلكتروني مطلوب',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'صيغة البريد الإلكتروني غير صحيحة',
                    },
                  })}
                />
              </div>
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase">
                  كلمة المرور
                </label>
                <a href="#" className="text-primary text-xs font-bold hover:underline no-underline">
                  نسيت كلمة المرور؟
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={inputClass.replace('pr-10', 'pr-10 pl-10')}
                  style={{ direction: 'ltr', textAlign: 'right' }}
                  {...register('password', {
                    required: 'كلمة المرور مطلوبة',
                    minLength: { value: 6, message: 'يجب أن تكون 6 أحرف على الأقل' }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)] hover:text-white cursor-pointer bg-transparent border-none transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className={errorClass}>{errors.password.message}</p>}
            </div>

       

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
              className="w-full h-[50px] rounded-xl bg-primary text-black font-black text-base uppercase tracking-widest cursor-pointer border-none shadow-[0_4px_24px_rgba(185,242,13,0.3)] hover:bg-primary-hover transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </motion.button>
          </form>

        </motion.div>

        {/* Bottom link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[rgba(255,255,255,0.4)] text-sm mt-8"
        >
          جديد في PrimeX؟{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline no-underline">
            إنشاء حساب
          </Link>
        </motion.p>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm border-t border-[rgba(255,255,255,0.05)] py-6 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-primary font-bold text-sm mb-2">PrimeX Performance</p>
          <div className="flex justify-center gap-4 sm:gap-6 text-[rgba(255,255,255,0.3)] text-xs mb-3">
            <a href="#" className="hover:text-white transition-colors no-underline">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors no-underline">الشروط والأحكام</a>
            <a href="#" className="hover:text-white transition-colors no-underline">مركز المساعدة</a>
          </div>
          <p className="text-[rgba(255,255,255,0.2)] text-[11px]">
            © 2024 <span className="text-primary">PrimeX</span> Performance. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn