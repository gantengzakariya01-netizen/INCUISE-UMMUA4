export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'CUSTOMER';

export interface UserProfile {
  id: string;
  user_id?: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  display_order?: number;
  is_active: boolean;
}

export interface ProductVariantOption {
  name: string;
  extra_price: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  options: ProductVariantOption[];
}

export interface ProductAddon {
  id: string;
  product_id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  category_name?: string;
  price: number;
  promo_price?: number | null;
  image_url: string;
  stock: number;
  minimum_stock?: number;
  rating: number;
  sold_count: number;
  calories?: number;
  spicy_level?: number;
  portion?: string;
  highlight?: string;
  is_available: boolean;
  is_featured?: boolean;
  is_best_seller?: boolean;
  variants?: ProductVariant[];
  addons?: ProductAddon[];
  created_at?: string;
}

export interface StructuredAddress {
  province: string;
  city: string;
  district: string;
  village: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  additionalDetails?: string;
}

export interface CartItem {
  id: string; // Unique item instance key
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedAddons?: string[];
  itemPrice: number;
  subtotal: number;
  notes?: string;
}

export interface Promo {
  id: string;
  code: string;
  title: string;
  description: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_amount: number;
  min_order_amount: number;
  is_active: boolean;
}

export type OrderStatus =
  | 'ORDER RECEIVED'
  | 'PAYMENT CONFIRMED'
  | 'PREPARING INGREDIENTS'
  | 'COOKING ON HIGH HEAT'
  | 'PACKED & READY'
  | 'OUT FOR DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'ON_DELIVERY'
  | 'DELIVERED';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'QRIS' | 'BANK_TRANSFER_BCA' | 'BANK_TRANSFER_MANDIRI' | 'CREDIT_CARD' | 'CASH_ON_DELIVERY';

export interface StatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  note?: string;
  changed_by?: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  variant_name?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  tax: number;
  service_fee: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  delivery_address: string;
  customer_note?: string;
  created_at: string;
  items: OrderItem[];
  status_history: StatusHistory[];
}

export interface DeliveryZone {
  id: string;
  zone_name: string;
  max_distance_km: number;
  delivery_fee: number;
  estimated_minutes: number;
}

export interface Review {
  id: string;
  product_id: string;
  profile_id?: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
}
