import AppRoutes from '@routes/AppRoutes';
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useDispatch } from 'react-redux'
import { setUser, clearUser, setLoading } from '@/store/authSlice'
import ScrollToTop from '@/components/shared/ScrollToTop';

function App() {
  const dispatch = useDispatch()

// App.tsx
  useEffect(() => {
   supabase.auth.getSession().then(async ({ data: { session } }) => {
    if (session?.user) {
      dispatch(setUser(session.user))
      console.log(session.user)
    }
     dispatch(setLoading(false))
  })
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      dispatch(setUser(session.user))
    } else {
      dispatch(clearUser())
    }
  })

  return () => subscription.unsubscribe()
}, [])

  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
