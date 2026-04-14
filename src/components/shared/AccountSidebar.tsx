import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBasket ,
  LogOut,
  Heart
} from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'
import { signOut } from "@/lib/api"

interface NavItem {
  label: string
  icon: React.ReactNode
  path?: string
  onClick?: () => void
}



const AccountSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems: NavItem[] = [
  { label: 'المفضلة', icon: <Heart size={20} />, path: '/favorite' },
  { label: 'لوحة التحكم', icon: <LayoutDashboard size={20} />, path: '/my-account' },
  { label: 'الطلبات', icon: <ShoppingBasket size={20} />, path: '/my-account/orders-history' },
  { label: 'تسجيل الخروج  ', icon: <LogOut size={20} />, onClick: () => { signOut(); navigate('/signin') } },
]
  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col w-full md:w-[260px]   lg:w-[280px] h-fit md:h-screen  bg-[linear-gradient(180deg,#111214_0%,#0a0b0d_100%)] border-r border-[rgba(255,255,255,0.06)]  shrink-0"
      style={{ direction: 'rtl' }}
    >


      {/* ── Navigation ── */}
      <motion.nav
        className="flex-1 p-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <motion.button
                key={item.label}
                variants={itemVariants}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick()
                  } else if (item.path) {
                    navigate(item.path)
                  }
                }}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  flex items-center gap-3 w-full px-3.5 py-3 rounded-xl
                  text-sm font-semibold cursor-pointer border-none
                  transition-all duration-200
                  ${isActive
                    ? 'bg-[rgba(185,242,13,0.08)] text-primary border-r-[3px] border-r-primary shadow-[inset_0_0_20px_rgba(185,242,13,0.04)]'
                    : 'bg-transparent text-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[rgba(255,255,255,0.7)]'
                  }
                `}
              >
                <span className={`shrink-0 ${isActive ? 'text-primary' : 'text-[rgba(255,255,255,0.3)]'}`}>
                  {item.icon}
                </span>
                {item.label}
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </motion.aside>




  )
}

export default AccountSidebar
