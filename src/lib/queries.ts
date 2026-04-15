import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  // Categories
  getCategories,
  getCategoryById,
  // Products
  getAllProductsRandom,
  getProducts,
  getProductCountsByCategory,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getProductsBySearch,
  getProductsByCategoryId,
  // Cart
  addToCart,
  getCartItems,
  removeCartItem,
  clearServerCart,
  // User Profile
  getCurrentUserProfile,
  // Orders
  getMyOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  // Order Items
  getOrderItems,
  createOrderItem,
  deleteOrderItem,
  // Favorites
  getMyFavorites,
  addFavorite,
  isProductFavorited,
  removeFavoriteByProductId,
  // Auth
  getAuthUser,
} from './api'

import type {
  CreateOrderPayload,
  CreateOrderItemPayload,
  CreateFavoritePayload,
  Favorite,
} from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEYS — single source of truth for cache keys
// ─────────────────────────────────────────────────────────────────────────────

export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    detail: (id: string) => ['categories', id] as const,
  },
  products: {
    all: ['products'] as const,
    detail: (id: string) => ['products', id] as const,
    byCategory: (slug: string) => ['products', 'category', slug] as const,
    search: (query: string) => ['products', 'search', query] as const,
  },
  users: {
    all: ['users'] as const,
    current: ['users', 'current'] as const,
    detail: (id: string) => ['users', id] as const,
  },
  orders: {
    mine: ['orders', 'mine'] as const,
    all: ['orders'] as const,
    detail: (id: string) => ['orders', id] as const,
    items: (orderId: string) => ['orders', orderId, 'items'] as const,
  },
  favorites: {
    mine: ['favorites'] as const,
    check: (productId: string) => ['favorites', 'check', productId] as const,
  },
  auth: {
    user: ['auth', 'user'] as const,
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all categories */
export const useGetCategories = () =>
  useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
  })

/** Fetch a single category by ID */
export const useGetCategoryById = (id: string) =>
  useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  })


/** Fetch all products (random, no pagination — for trending section) */
export const useGetAllProductsRandom = () =>
  useQuery({
    queryKey: ['products', 'random'],
    queryFn: getAllProductsRandom,
  })

/** Fetch all products */
export const useGetProducts = (page: number, pageSize: number, sortBy: string, filters?: import('./api').ProductFilters) =>
  useQuery({
    queryKey: ['products', page, pageSize, sortBy, filters],
    queryFn: () => getProducts(page, pageSize, sortBy, filters),
    placeholderData: (previousData) => previousData,
  });
  /**fetch all products by category id */
  export const useGetProductsByCategoryId = (page: number, pageSize: number, sortBy: string, filters?: import('./api').ProductFilters, categoryId?: string, options?: { enabled?: boolean }) =>
    useQuery({
      queryKey: ['products', page, pageSize, sortBy, filters, categoryId],
      queryFn: () => getProductsByCategoryId(page, pageSize, sortBy, filters, categoryId),
      placeholderData: (previousData) => previousData,
      enabled: options?.enabled,
      
    });

/** Fetch product counts per category */
export const useGetProductCountsByCategory = () =>
  useQuery({
    queryKey: ['products', 'counts-by-category'],
    queryFn: getProductCountsByCategory,
  })

/** Fetch a single product by ID */
export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
export const useGetProductsBySearch = (query: string) =>
  useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => getProductsBySearch(query),
    enabled: query.length > 0,
  })
/** Fetch products by category id */
export const useGetProductsByCategory = (id: string) =>
  useQuery({
    queryKey: queryKeys.products.byCategory(id),
    queryFn: () => getProductsByCategory(id),
    enabled: !!id,
  })

/** Search products by name */
export const useSearchProducts = (query: string) =>
  useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  })



/** Fetch the current authenticated user's profile */
export const useGetCurrentUserProfile = () =>
  useQuery({
    queryKey: queryKeys.users.current,
    queryFn: getCurrentUserProfile,
  })


export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }) =>
      addToCart(userId, productId, quantity),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

export const useGetCartItems = (userId: string) =>
  useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId,
  })

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, productId }: { userId: string; productId: string }) =>
      removeCartItem(userId, productId),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}
export const useClearServerCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => clearServerCart(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}
  // ─────────────────────────────────────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all orders for the current user */
export const useGetMyOrders = (userId: string) =>
  useQuery({
    queryKey: [...queryKeys.orders.mine, userId],
    queryFn: () => getMyOrders(userId),
    enabled: !!userId,
  })

/** Fetch a single order by ID */
export const useGetOrderById = (id: string) =>
  useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
  })

/** Create a new order */
export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.mine })
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
    },
  })
}

/** Delete an order */
export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.mine })
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDER ITEMS
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all items for a given order */
export const useGetOrderItems = (orderId: string) =>
  useQuery({
    queryKey: queryKeys.orders.items(orderId),
    queryFn: () => getOrderItems(orderId),
    enabled: !!orderId,
  })

/** Add an item to an order */
export const useCreateOrderItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOrderItemPayload) => createOrderItem(payload),
    onSuccess: (_data, { order_id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.items(order_id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(order_id) })
    },
  })
}

/** Remove an item from an order */
export const useDeleteOrderItem = (orderId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteOrderItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.items(orderId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(orderId) })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES (WISHLIST)
// ─────────────────────────────────────────────────────────────────────────────

export const useGetMyFavorites = (userId: string) =>
  useQuery({
    queryKey: [...queryKeys.favorites.mine, userId], 
    queryFn: () => getMyFavorites(userId),
    enabled: !!userId, 
  })

export const useIsProductFavorited = (productId: string) =>
  useQuery({
    queryKey: queryKeys.favorites.check(productId),
    queryFn: () => isProductFavorited(productId),
    enabled: !!productId,
  })

export const useAddFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateFavoritePayload) => addFavorite(payload),

    // ✅ Optimistic update — heart fills before server responds
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.mine })

      const previous = queryClient.getQueryData<Favorite[]>(
        [...queryKeys.favorites.mine, payload.user_id]
      )

      // Inject a fake favorite into the cache immediately
      queryClient.setQueryData(
        [...queryKeys.favorites.mine, payload.user_id],
        (old: Favorite[] = []) => [
          ...old,
          { id: 'temp', product_id: payload.product_id, user_id: payload.user_id },
        ]
      )

      return { previous, userId: payload.user_id }
    },

    // ✅ Rollback if server fails
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [...queryKeys.favorites.mine, context.userId],
          context.previous
        )
      }
    },

    // ✅ Always sync with real server data after mutation
    onSettled: (_data, _err, payload) => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.favorites.mine, payload.user_id],
      })
    },
  })
}

export const useRemoveFavoriteByProductId = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => removeFavoriteByProductId(productId),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.mine })

      // We need userId — get it from any cached favorites list
      const allKeys = queryClient.getQueriesData<Favorite[]>({
        queryKey: queryKeys.favorites.mine,
      })

      const snapshots: { key: unknown[]; data: Favorite[] }[] = []

      for (const [key, data] of allKeys) {
        snapshots.push({ key: key as unknown[], data: data ?? [] })
        queryClient.setQueryData(key, (old: Favorite[] = []) =>
          old.filter((fav) => fav.product_id !== productId)
        )
      }

      return { snapshots }
    },

    onError: (_err, _productId, context) => {
      context?.snapshots.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data)
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.mine })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

export const useGetAuthUser = () =>
  useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: getAuthUser,
    retry: false,
  })
