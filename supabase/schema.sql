-- ====================================================================
-- DATABASE SCHEMA: CUISENE UMMU A4 (PURPLE ELEGANT LUXURY RESTAURANT)
-- Timezone: Asia/Jakarta
-- Standard: PostgreSQL 14+ / Supabase Production Ready
-- ====================================================================

-- Set Timezone
SET timezone TO 'Asia/Jakarta';

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. ENUMS
-- --------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'STAFF', 'CUSTOMER');
CREATE TYPE order_status_enum AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'ON_DELIVERY', 'DELIVERED', 'CANCELLED');
CREATE TYPE payment_status_enum AS ENUM ('UNPAID', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE payment_method_enum AS ENUM ('QRIS', 'BANK_TRANSFER_BCA', 'BANK_TRANSFER_MANDIRI', 'CREDIT_CARD', 'CASH_ON_DELIVERY');

-- --------------------------------------------------------------------
-- 2. TABLES
-- --------------------------------------------------------------------

-- PROFILES (Customer & Base Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  role user_role DEFAULT 'CUSTOMER',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ROLES & PERMISSIONS LOOKUP
CREATE TABLE IF NOT EXISTS public.roles (
  id SERIAL PRIMARY KEY,
  name user_role UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ADMINS (Extended metadata for system admins)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'STAFF')),
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- BRANCHES
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(100),
  is_main BOOLEAN DEFAULT FALSE,
  is_open BOOLEAN DEFAULT TRUE,
  opening_hours VARCHAR(100) DEFAULT '10:00 - 22:00 WIB',
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  promo_price NUMERIC(12, 2) DEFAULT NULL CHECK (promo_price IS NULL OR promo_price >= 0),
  image_url TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 50 CHECK (stock >= 0),
  minimum_stock INT DEFAULT 5,
  rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
  sold_count INT DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCT VARIANTS
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- e.g. "Level Pedas", "Porsi"
  options JSONB NOT NULL, -- e.g. [{"name": "Sedang", "extra_price": 0}, {"name": "Extra Pedas", "extra_price": 5000}]
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCT ADDONS
CREATE TABLE IF NOT EXISTS public.product_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- e.g. "Extra Truffle Oil", "Golden Rice"
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PROMOS
CREATE TABLE IF NOT EXISTS public.promos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) DEFAULT 'PERCENTAGE' CHECK (discount_type IN ('PERCENTAGE', 'FIXED')),
  discount_amount NUMERIC(12, 2) NOT NULL,
  min_order_amount NUMERIC(12, 2) DEFAULT 0,
  max_discount_amount NUMERIC(12, 2) DEFAULT NULL,
  usage_limit INT DEFAULT 100,
  used_count INT DEFAULT 0,
  start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ADDRESSES
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  label VARCHAR(50) DEFAULT 'Rumah',
  recipient_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  full_address TEXT NOT NULL,
  district VARCHAR(100),
  city VARCHAR(100) DEFAULT 'Jakarta',
  postal_code VARCHAR(10),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- DELIVERY ZONES
CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  zone_name VARCHAR(100) NOT NULL,
  max_distance_km NUMERIC(5, 2) NOT NULL,
  delivery_fee NUMERIC(12, 2) NOT NULL,
  estimated_minutes INT DEFAULT 30,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  discount NUMERIC(12, 2) DEFAULT 0,
  delivery_fee NUMERIC(12, 2) DEFAULT 0,
  tax NUMERIC(12, 2) DEFAULT 0,
  service_fee NUMERIC(12, 2) DEFAULT 0,
  total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
  payment_method payment_method_enum DEFAULT 'QRIS',
  payment_status payment_status_enum DEFAULT 'UNPAID',
  order_status order_status_enum DEFAULT 'PENDING',
  delivery_address TEXT NOT NULL,
  customer_name VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_note TEXT,
  promo_id UUID REFERENCES public.promos(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name VARCHAR(200) NOT NULL,
  variant_name VARCHAR(100),
  addons JSONB,
  quantity INT NOT NULL CHECK (quantity > 0),
  price NUMERIC(12, 2) NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ORDER STATUS HISTORY
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  status order_status_enum NOT NULL,
  note TEXT,
  changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
  transaction_id VARCHAR(100),
  payment_method payment_method_enum NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  status payment_status_enum DEFAULT 'UNPAID',
  paid_at TIMESTAMPTZ,
  raw_response JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PROMO USAGE
CREATE TABLE IF NOT EXISTS public.promo_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  promo_id UUID REFERENCES public.promos(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  discount_applied NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'INFO',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- FAVORITES
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(profile_id, product_id)
);

-- RESTAURANT SETTINGS
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_name VARCHAR(150) DEFAULT 'CUISENE UMMU A4',
  tagline VARCHAR(200) DEFAULT 'Premium Taste. Exceptional Experience.',
  tax_percentage NUMERIC(5, 2) DEFAULT 10.00,
  service_fee_percentage NUMERIC(5, 2) DEFAULT 5.00,
  is_accepting_orders BOOLEAN DEFAULT TRUE,
  contact_phone VARCHAR(30) DEFAULT '+62 812-3456-7890',
  contact_email VARCHAR(100) DEFAULT 'vip@cuisene-ummua4.id',
  instagram_handle VARCHAR(50) DEFAULT '@cuisene.ummua4',
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  target_table VARCHAR(100),
  target_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 3. INDEXES FOR HIGH PERFORMANCE
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON public.products(is_available);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_favorites_profile_id ON public.favorites(profile_id);

-- --------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;

-- CUSTOMER PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by owner and admin" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN', 'STAFF')
  ));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- PRODUCTS POLICIES (Public read, Admin edit)
CREATE POLICY "Public products are viewable by everyone" ON public.products
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN')
  ));

-- CATEGORIES POLICIES
CREATE POLICY "Public categories viewable by everyone" ON public.categories
  FOR SELECT USING (TRUE);

-- ORDERS POLICIES (Customer sees own order, Admins see all)
CREATE POLICY "Customers view own orders" ON public.orders
  FOR SELECT USING (
    customer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN', 'STAFF'))
  );

CREATE POLICY "Customers create own order" ON public.orders
  FOR INSERT WITH CHECK (TRUE);

-- ORDER ITEMS POLICIES
CREATE POLICY "View order items linked to visible orders" ON public.order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM public.orders WHERE customer_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    ) OR EXISTS (
      SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN', 'STAFF')
    )
  );

-- REVIEWS POLICIES
CREATE POLICY "Public reviews viewable" ON public.reviews
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
