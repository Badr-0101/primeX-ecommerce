import { useState } from 'react'
import { toast } from 'sonner'
import { useAppSelector } from '@/store/index'
import { useAddFavorite, useRemoveFavoriteByProductId, useGetMyFavorites, useAddToCart } from '@/lib/queries'

import type { Product } from '@/types'

const useProductLogic = ({ product }: { product: Product }) => {
  const [count, setCount] = useState(1)
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const user = useAppSelector((state) => state.auth.user)
  const isLoading = useAppSelector((state) => state.auth.isLoading)

  // ── Single source of truth: React Query ──
  const { data: favorites = [] } = useGetMyFavorites(user?.id || '')

  // Derive liked state directly from server data — no Redux needed
  const liked = favorites.some((fav) => fav.product_id === product.id)

  const { mutate: addFavoriteMutation } = useAddFavorite()
  const { mutate: removeFavoriteMutation } = useRemoveFavoriteByProductId()
   const { mutate: addToCartMutation } = useAddToCart()

  // ── Add to cart ──
  const handleAddToCart = () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول اولاً', {
        description: 'سجل دخولك لإضافة المنتجات إلى السلة',
      })
      return
    }
   
    addToCartMutation({ userId: user.id, productId: product.id, quantity: count })
    setAdded(true)
    setCount(1)
    setTimeout(() => setAdded(false), 1800)
  }

  // ── Favorite toggle with optimistic update via React Query ──
  const handleFavoriteToggle = () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول اولاً', {
        description: 'سجل دخولك لإضافة المنتجات إلى المفضلة',
      })
      return
    }

    if (liked) {
      removeFavoriteMutation(product.id, {
        onError: () => toast.error('حدث خطأ، حاول مرة أخرى'),
      })
    } else {
      addFavoriteMutation(
        { product_id: product.id, user_id: user.id },
        { onError: () => toast.error('حدث خطأ، حاول مرة أخرى') }
      )
    }
  }

  return {
    count, setCount,
    added, setAdded,
    hovered, setHovered,
    liked,        // ← now driven by React Query, always fresh
    user,
    isLoading,
    handleAddToCart,
    handleFavoriteToggle,
  }
}

export default useProductLogic