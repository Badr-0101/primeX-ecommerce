import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import signUpBg from '@assets/signupbackground.png'
import { signUp } from '@/lib/api'

type SignUpFormValues = {
  userName: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
  subscribe: boolean
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',

    },
    mode: 'onBlur',
  })

  const passwordValue = watch('password')

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { userName, email, password } = data
      await signUp(email.trim(), password, userName)
      toast.success('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.')
      setTimeout(() => navigate('/'), 2000)
    } catch (error: any) {

      toast.error(error.message || 'حدث خطأ أثناء إنشاء الحساب')
    }
  }

  const inputClass =
    'w-full h-[46px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-lg pr-10 pl-4 text-white text-sm outline-none placeholder:text-[rgba(255,255,255,0.2)] focus:border-primary/50 transition-colors duration-200'

  const inputPasswordClass =
    'w-full h-[46px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-lg pr-10 pl-10 text-white text-sm outline-none placeholder:text-[rgba(255,255,255,0.2)] focus:border-primary/50 transition-colors duration-200'

  const errorClass = 'text-red-400 text-[11px] mt-1'

  return (
    <div className="min-h-screen relative flex flex-col" style={{ direction: 'rtl' }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={signUpBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(185,242,13,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[480px] bg-[rgba(13,14,20,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-[0_16px_64px_rgba(0,0,0,0.6)]"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2
              className="text-white text-xl sm:text-2xl font-black mb-1"
              style={{ fontStyle: 'italic' }}
            >
              تخطى حدودك
            </h2>
            <p className="text-[rgba(255,255,255,0.35)] text-sm mb-6">
              سجل الآن وابدأ رحلتك مع PrimeX.
            </p>
          </motion.div>

          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase mb-2 block">
                اسم المستخدم
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]"
                />
                
                <input
                  type="text"
                  placeholder="ادخل اسم المستخدم"
                  className={inputClass}
                  {...register('userName', {
                    required: 'اسم المستخدم مطلوب',
                    minLength: { value: 3, message: 'يجب أن يكون 3 أحرف على الأقل' },
                  })}
                />
              </div>
              {errors.userName && <p className={errorClass}>{errors.userName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase mb-2 block">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]"
                />
                <input
                  type="email"
                  placeholder="name@domain.com"
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

            {/* Password row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase mb-2 block">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={inputPasswordClass}
                    style={{ direction: 'ltr', textAlign: 'right' }}
                    {...register('password', {
                      required: 'كلمة المرور مطلوبة',
                      minLength: { value: 8, message: 'يجب أن تكون 8 أحرف على الأقل' },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)] hover:text-white cursor-pointer bg-transparent border-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.password && <p className={errorClass}>{errors.password.message}</p>}
              </div>

              <div className="flex-1">
                <label className="text-[rgba(255,255,255,0.4)] text-xs font-bold tracking-widest uppercase mb-2 block">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <ShieldCheck
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]"
                  />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={inputPasswordClass}
                    style={{ direction: 'ltr', textAlign: 'right' }}
                    {...register('confirmPassword', {
                      required: 'تأكيد كلمة المرور مطلوب',
                      validate: (value) =>
                        value === passwordValue || 'كلمتا المرور غير متطابقتين',
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)] hover:text-white cursor-pointer bg-transparent border-none transition-colors duration-200"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className={errorClass}>{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>



            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
              className="w-full h-[50px] rounded-xl bg-primary text-black font-black text-sm sm:text-base uppercase tracking-widest cursor-pointer border-none shadow-[0_4px_24px_rgba(185,242,13,0.3)] hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء حساب ⚡'}
            </motion.button>
          </form>

      

          {/* Bottom link */}
          <div className="text-center mt-6">
            <p className="text-[rgba(255,255,255,0.35)] text-sm">
              لديك حساب بالفعل في PrimeX؟
            </p>
            <Link
              to="/signin"
              className="text-primary font-bold text-sm uppercase tracking-wider hover:underline no-underline"
            >
              تسجيل الدخول
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm border-t border-[rgba(255,255,255,0.05)] py-6 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-primary font-bold text-sm mb-2" style={{ fontStyle: 'italic' }}>
            PrimeX
          </p>
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



export default SignUp