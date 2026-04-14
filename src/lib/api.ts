import { supabase } from './supabase'
import type {
  Category,
  Product,
  UserProfile,
  Order,
  OrderItem,
  Favorite,
  CreateOrderPayload,
  CreateOrderItemPayload,
  CreateFavoritePayload,
  CartItemRow
} from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────

function handleError(error: unknown, context: string): never {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message)
      : 'Unknown error'
  throw new Error(`[API:${context}] ${message}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all categories */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) handleError(error, 'getCategories')
  return data as Category[]
}

/** Fetch a single category by ID */
export async function getCategoryById(id: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) handleError(error, 'getCategoryById')
  return data as Category
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

/** Filter parameters for product queries */
export interface ProductFilters {
  categoryId?: string
  priceMin?: number
  priceMax?: number
}

/** Fetch all products (no pagination, for trending/random display) */
export async function getAllProductsRandom(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*)`)
    .order('created_at', { ascending: false })

  if (error) handleError(error, 'getAllProductsRandom')
  return data as Product[]
}

/** Fetch all products (with joined category) */
export async function getProducts(
  page: number,
  pageSize: number,
  sortBy: string,
  filters?: ProductFilters
): Promise<{ data: Product[], count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('products')
    .select(`*, category:categories(*)`, { count: 'exact' });

  // Apply filters
  if (filters?.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }
  if (filters?.priceMin !== undefined) {
    query = query.gte('price', filters.priceMin);
  }
  if (filters?.priceMax !== undefined) {
    query = query.lte('price', filters.priceMax);
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'name':
      query = query.order('name', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error('getProducts error:', error);
    return { data: [], count: 0 };
  }

  return { 
    data: data as Product[], 
    count: count || 0 
  };
}

/** Fetch product counts per category */
export async function getProductCountsByCategory(): Promise<{ category_id: string; count: number }[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category_id')

  if (error) {
    console.error('getProductCountsByCategory error:', error)
    return []
  }

  // Count products per category_id
  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    const cid = row.category_id
    if (cid) counts[cid] = (counts[cid] || 0) + 1
  }

  return Object.entries(counts).map(([category_id, count]) => ({ category_id, count }))
}

/** Fetch a single product by ID */
export async function getProductById(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*)`)
    .eq('id', id)
    .single()

  if (error) handleError(error, 'getProductById')
  return data as Product
}
export async function getProductsBySearch(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*)`)  
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false })

  if (error) handleError(error, 'getProductsBySearch')
  return data as Product[]
}
/** Fetch products by category slug */
export async function getProductsByCategory(id: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*)`)
    .eq('category_id', id)
    .order('created_at', { ascending: false })

  if (error) handleError(error, 'getProductsByCategory')
  return data as Product[]
}

/** Search products by name */
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*)`)
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false })

  if (error) handleError(error, 'searchProducts')
  return data as Product[]
}




// ─────────────────────────────────────────────────────────────────────────────
// USER PROFILE
// ─────────────────────────────────────────────────────────────────────────────



/** Fetch the currently authenticated user's profile */
export async function getCurrentUserProfile(): Promise<UserProfile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) handleError(authError ?? new Error('Not authenticated'), 'getCurrentUserProfile')

  const { data, error } = await supabase
    .from('userProfile')
    .select('*')
    .eq('id', user!.id)
    .single()

  if (error) handleError(error, 'getCurrentUserProfile')
  return data as UserProfile
}



/** Create a user profile (called after sign-up) */
export async function createUserProfile(
  userId: string,
  username: string
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('userProfile')
    .insert({ id: userId, username })
    .select()
    .single()

  if (error) handleError(error, 'createUserProfile')
  return data as UserProfile
}



// ─────────────────────────────────────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all orders for the current authenticated user */
export async function getMyOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*, product:products(*))`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) handleError(error, 'getMyOrders')
  return data as Order[]
}



/** Fetch a single order by ID */
export async function getOrderById(id: string): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, user:userProfile(*), order_items(*, product:products(*))`)
    .eq('id', id)
    .single()

  if (error) handleError(error, 'getOrderById')
  return data as Order
}

/** Create a new order */
export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert(payload)
    .select()
    .single()

  if (error) handleError(error, 'createOrder')
  return data as Order
}

/** Delete an order */
export async function deleteOrder(id: string): Promise<void> {
  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) handleError(error, 'deleteOrder')
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDER ITEMS
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all items for a given order */
export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select(`*, product:products(*)`)
    .eq('order_id', orderId)
    .order('created_at', { ascending: true })

  if (error) handleError(error, 'getOrderItems')
  return data as OrderItem[]
}

/** Add an item to an order */
export async function createOrderItem(payload: CreateOrderItemPayload): Promise<OrderItem> {
  const { data, error } = await supabase
    .from('order_items')
    .insert(payload)
    .select()
    .single()

  if (error) handleError(error, 'createOrderItem')
  return data as OrderItem
}

/** Remove an item from an order */
export async function deleteOrderItem(id: string): Promise<void> {
  const { error } = await supabase.from('order_items').delete().eq('id', id)
  if (error) handleError(error, 'deleteOrderItem')
}

// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES (WISHLIST)
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all favorites for the current authenticated user */
export async function getMyFavorites(userId: string): Promise<Favorite[]> {
  if (!userId) return []; // تجنب الخطأ إذا لم يتوفر ID

  const { data, error } = await supabase
    .from('favorites')
    .select(`*, product:products(*)`)
    .eq('user_id', userId) 
    .order('created_at', { ascending: false });

  if (error) handleError(error, 'getMyFavorites');
  return data as Favorite[];
}

/** Add a product to favorites */
export async function addFavorite(payload: CreateFavoritePayload): Promise<Favorite> {
  const { data, error } = await supabase
    .from('favorites')
    .insert(payload)
    .select()
    .single()

  if (error) handleError(error, 'addFavorite')
  return data as Favorite
}

/** Remove a product from favorites by favorite record ID */
export async function removeFavorite(id: string): Promise<void> {
  const { error } = await supabase.from('favorites').delete().eq('id', id)
  if (error) handleError(error, 'removeFavorite')
}

/** Remove a product from favorites by product ID (for current user) */
export async function removeFavoriteByProductId(productId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) handleError(new Error('Not authenticated'), 'removeFavoriteByProductId')

  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ product_id: productId, user_id: user.id })
    
  if (error) handleError(error, 'removeFavoriteByProductId')
}

/** Check if a product is already in the current user's favorites */
export async function isProductFavorited(productId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('product_id', productId)
    .maybeSingle()

  if (error) handleError(error, 'isProductFavorited')
  return data !== null
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Sign up a new user and create their profile */
export async function signUp(
  email: string,
  password: string,
  username: string
): Promise<UserProfile> {
  const normalizedEmail = email.trim().toLowerCase()
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
  })

  if (authError || !authData.user) {
    if (authError) {
      console.error('[API:signUp] Supabase Auth Error:', authError)
      handleError(authError, 'signUp')
    }
    handleError(new Error('Signup failed: No user returned'), 'signUp')
  }

  return createUserProfile(authData.user!.id, username)
}

/** Sign in an existing user */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) handleError(error, 'signIn')
  return data
}

/** Sign out the current user */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) handleError(error, 'signOut')
}

/** Get the currently authenticated Supabase user */
export async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) handleError(error, 'getAuthUser')
  return data.user
}
// ─────────────────────────────────────────────────────────────────────────────
// CART (Server-side persistence)
// ─────────────────────────────────────────────────────────────────────────────



/** Fetch all cart items for a user (with product details) */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItemRow> {
  const { data, error } = await supabase
    .from('cart')
    .upsert(
      {
        user_id: userId,
        product_id: productId,
        quantity,
      },
      {
        onConflict: 'user_id,product_id',
      }
    )
    .select()
    .single()

  if (error) handleError(error, 'addToCart')

  return data as CartItemRow
}
export async function getCartItems(userId: string): Promise<CartItemRow[]> {
  const { data, error } = await supabase
    .from('cart')
    .select('*, product:products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) handleError(error, 'getCartItems')
  return data as CartItemRow[]
}

/** Add or update a cart item (single network call using Supabase upsert) */
export async function upsertCartItem(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItemRow> {
  const { data, error } = await supabase
    .from('cart')
    .upsert(
      { user_id: userId, product_id: productId, quantity },
      { onConflict: 'user_id,product_id' }
    )
    .select()
    .single()

  if (error) handleError(error, 'upsertCartItem')
  return data as CartItemRow
}

/** Update the quantity of an existing cart item */
export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', cartItemId)

  if (error) handleError(error, 'updateCartItemQuantity')
}

/** Remove a single item from the cart */
export async function removeCartItem(
  userId: string,
  productId: string
): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) handleError(error, 'removeCartItem')
}

/** Delete ALL cart items for a user (called after checkout) */
export async function clearServerCart(userId: string): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)

  if (error) handleError(error, 'clearServerCart')
}

