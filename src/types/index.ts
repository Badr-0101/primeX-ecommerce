// ─── Supabase Table Types ────────────────────────────────────────────────────

export interface Category {
  id: string
  created_at: string
  name: string
  slug: string | null
  image_url: string
}

export interface Product {
  id: string
  name: string
  description?: string 
  price: number
  image_url: string
  stock_quantity?: number 
  // joined
  category_id?: string
}
export interface CartItemRow {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product // joined
}

export interface UserProfile {
  id: string
  created_at: string
  username: string
  role: 'customer' | 'admin' | string
}

export interface Order {
  id: string
  created_at: string
  user_id: string
  total_amount: number
  // joined
  user?: UserProfile
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  created_at: string
  order_id: string
  prodcut_id: string   
  quantity: number
  unit_price: number
  // joined
  product?: Product
}

export interface Favorite {
  id: string
  created_at: string
  user_id: string
  product_id: string
  // joined
  product?: Product
  user?: UserProfile
}

// ─── Payload / Input Types ───────────────────────────────────────────────────




export type CreateOrderPayload = Pick<Order, 'total_amount'>

export type CreateOrderItemPayload = Pick<
  OrderItem,
  'order_id' | 'prodcut_id' | 'quantity' | 'unit_price'
>

export type CreateFavoritePayload = Pick<Favorite, 'product_id' | 'user_id'>


// ─── Legacy types (kept for backward compatibility) ──────────────────────────
export interface WishlistItem {
  name: string
  price: string
  image: string
}
