import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AccountLayout from '@pages/Account/AccountLayout'
const Home = lazy(() => import('@pages/Home'))
const Products = lazy(() => import('@pages/Products'))
const ShoppingCart = lazy(() => import('@pages/ShoppingCart'))
const SignIn = lazy(() => import('@components/auth/SignIn'))
const SignUp = lazy(() => import('@components/auth/SignUp'))
const FavoritePrudoct = lazy(() => import('@pages/FavoritePrudoct'))
const OrdarsInformation = lazy(() => import('@/pages/Account/OrdarsInformation'))
const ProductDetails = lazy(() => import('@/pages/ProductDetails'))
const ProtectRoutes = lazy(() => import('@/routes/ProtectRoutes'))
const CheckOut = lazy(() => import('@/pages/checkout/CheckOut'))
const UserOrdersHistory = lazy(() => import('@/pages/UserOrdersHistory'))
const LoadngSpinner = lazy(() => import('@/components/shared/LoadngSpinner'))
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<LoadngSpinner />}><Home /></Suspense>} />
      <Route path="/products" element={<Suspense fallback={<LoadngSpinner />}><Products /></Suspense>} />
      <Route path="/cart" element={<Suspense fallback={<LoadngSpinner />}><ShoppingCart /></Suspense>} />
      <Route path="/signin" element={<Suspense fallback={<LoadngSpinner />}><SignIn /></Suspense>} />
      <Route path="/signup" element={<Suspense fallback={<LoadngSpinner />}><SignUp /></Suspense>} />
      <Route path="/product-details/:id" element={<Suspense fallback={<LoadngSpinner />}><ProductDetails /></Suspense>} />
      <Route element={<ProtectRoutes />} >
        <Route path="/favorite" element={<Suspense fallback={<LoadngSpinner />}><FavoritePrudoct /></Suspense>} />
        <Route path="/checkout" element={<Suspense fallback={<LoadngSpinner />}><CheckOut /></Suspense>} />
        <Route   path="/my-account" element={<Suspense fallback={<LoadngSpinner />}><AccountLayout /></Suspense>} >
          <Route index element={<Suspense fallback={<LoadngSpinner />}><OrdarsInformation /></Suspense>} />
          <Route path="orders-history" element={<Suspense fallback={<LoadngSpinner />}><UserOrdersHistory /></Suspense>} />
        </Route>
      </Route>
    </Routes>  
  )
}

export default AppRoutes