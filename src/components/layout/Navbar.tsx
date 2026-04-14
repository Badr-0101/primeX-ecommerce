import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, User, Menu, X, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react'
import logo from "@assets/logo.jpg"
import { useAppSelector } from '@/store/index'
import useSearch from '@/hooks/useSearch' 
import { signOut } from '@/lib/api'
import { useGetMyFavorites } from '@/lib/queries'
import { useGetCartItems } from '@/lib/queries'
const Navbar = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLogin = useAppSelector((state) => state.auth.user)
  const userId = isLogin?.id || ""
  const { data: favorites } = useGetMyFavorites(userId)
  const favoritesCount = favorites?.length || 0
  // ✅ Single hook call — one source of truth for search state
  const { SearchUI } = useSearch()
  const { data: cartItems = [] } = useGetCartItems(userId)
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary-dark sticky top-0 z-50"
      >
        <div className="flex flex-row-reverse w-full bg-primary-dark p-4 sm:py-5 sm:px-36 justify-between items-center text-white">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" width={35} height={35} />
            <h3 className="font-bold text-lg sm:text-xl">PrimeX</h3>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-5 items-center">

              {/* User Dropdown */}
              <li className="cursor-pointer relative hover:text-primary group transition-all duration-300">
                <User />
                <ul className="flex-col items-start gap-3 absolute top-full left-0 bg-white text-black w-40 h-fit hidden group-hover:flex rounded-md text-sm p-2 transition-all duration-300">
                  {isLogin ? (
                    <>
                      <li className="w-full hover:text-primary transition-all duration-300">
                        <button
                          className="flex items-center gap-2"
                          onClick={() => navigate("/my-account")}
                        >
                          <LayoutDashboard size={20} />
                          لوحه التحكم
                        </button>
                      </li>
                      <li className="w-full hover:text-primary transition-all duration-300">
                        <button
                          className="flex items-center gap-2"
                          onClick={() => navigate("/my-account/orders-history")}
                        >
                          <ShoppingBag />
                          طلباتي
                        </button>
                      </li>
                      <li className="w-full hover:text-primary transition-all duration-300">
                        <button
                          className="flex items-center gap-2"
                          onClick={() => {signOut(); navigate("/")}}
                        >
                          <LogOut />
                          تسجيل الخروج
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button
                          className="flex items-center gap-2 hover:text-primary transition-all duration-300"
                          onClick={() => navigate("/signin")}
                        >
                          تسجيل الدخول <LogIn />
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 hover:text-primary transition-all duration-300"
                          onClick={() => navigate("/signup")}
                        >
                          تسجيل حساب جديد <UserPlus />
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              {/* Favorites */}
              <button onClick={() => navigate("/favorite")}>
                <li className="relative cursor-pointer hover:text-primary transition-all duration-300">
                  <Heart />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2.5 left-2.5 bg-[#ff5078] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </li>
              </button>

              {/* Cart */}
              <button onClick={() => navigate("/cart")}>
                <li className="relative cursor-pointer hover:text-primary transition-all duration-300">
                  <ShoppingBag />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-2.5 left-2.5 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartQuantity}
                    </span>
                  )}
                </li>
              </button>

              {/* ✅ Desktop Search */}
              <li>
                <SearchUI />
              </li>

            </ul>
          </nav>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => navigate("/favorite")}
              className="relative cursor-pointer hover:text-primary transition-all duration-300 bg-transparent border-none text-white"
            >
              <Heart size={22} />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#ff5078] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer hover:text-primary transition-all duration-300 bg-transparent border-none text-white"
            >
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-1 bg-primary text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartQuantity}
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="cursor-pointer text-white hover:text-primary transition-colors duration-300 bg-transparent border-none"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.08)]"
            >
              {/* ✅ Clean flat structure — no mismatched divs */}
              <div className="p-4 flex flex-col gap-4">

                {/* ✅ Mobile Search — same hook, same state */}
                <SearchUI />

                <button
                  onClick={() => { navigate("/favorite"); setMobileOpen(false) }}
                  className="flex items-center justify-end gap-2 text-white hover:text-primary transition-all duration-300 cursor-pointer bg-transparent border-none text-base"
                >
                  المفضلة <Heart size={18} />
                </button>

                <button
                  onClick={() => { navigate("/my-account"); setMobileOpen(false) }}
                  className="flex items-center justify-end gap-2 text-white hover:text-primary transition-all duration-300 cursor-pointer bg-transparent border-none text-base"
                >
                  حسابي <User size={18} />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default Navbar