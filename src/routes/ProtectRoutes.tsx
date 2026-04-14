import { Navigate, Outlet  } from 'react-router-dom'
import { useAppSelector } from '@/store/index'

const ProtectRoutes = () => {
 const user = useAppSelector((state) => state.auth.user)
  const isLoading = useAppSelector((state) => state.auth.isLoading)

  if (isLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/signin" />
  return <Outlet />
}

export default ProtectRoutes