-- ====================================================================
-- SEED DATA: CUISENE UMMU A4 (DEVELOPMENT DEMO DATA)
-- NOTE: FOR DEVELOPMENT AND TESTING ONLY. DO NOT USE IN PRODUCTION.
-- ====================================================================

-- 1. RESTAURANT SETTINGS
INSERT INTO public.restaurant_settings (id, restaurant_name, tagline, tax_percentage, service_fee_percentage, is_accepting_orders, contact_phone, contact_email)
VALUES (
  'e2d4d9a2-1111-4000-8000-000000000001',
  'CUISENE UMMU A4',
  'Premium Taste. Exceptional Experience.',
  10.00,
  5.00,
  TRUE,
  '+62 812-3456-7890',
  'vip@cuisene-ummua4.id'
) ON CONFLICT (id) DO NOTHING;

-- 2. BRANCHES
INSERT INTO public.branches (id, name, slug, address, phone, email, is_main, opening_hours)
VALUES
(
  'b1111111-1111-4000-8000-000000000001',
  'CUISENE UMMU A4 — Menteng Flagship',
  'menteng-flagship',
  'Jl. H.O.S. Cokroaminoto No. 42, Menteng, Jakarta Pusat',
  '+62 21-3190-8888',
  'menteng@cuisene-ummua4.id',
  TRUE,
  '10:00 - 22:30 WIB'
),
(
  'b2222222-2222-4000-8000-000000000002',
  'CUISENE UMMU A4 — Senopati Lounge',
  'senopati-lounge',
  'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan',
  '+62 21-5270-9999',
  'senopati@cuisene-ummua4.id',
  FALSE,
  '11:00 - 23:00 WIB'
) ON CONFLICT (slug) DO NOTHING;

-- 3. CATEGORIES
INSERT INTO public.categories (id, name, slug, description, icon, display_order)
VALUES
('c1000000-0000-4000-8000-000000000001', 'Signature Chef Specials', 'signature-chef-specials', 'Hidangan mahakarya olahan Chef Bintang Lima', 'Crown', 1),
('c1000000-0000-4000-8000-000000000002', 'Prime Wagyu & Steaks', 'prime-wagyu-steaks', 'Potongan daging Wagyu A5 pilihan dipanggang sempurna', 'Flame', 2),
('c1000000-0000-4000-8000-000000000003', 'Seafood Delicacies', 'seafood-delicacies', 'Tangkapan laut segar dengan saus mentega emas & rempah', 'Fish', 3),
('c1000000-0000-4000-8000-000000000004', 'Royal Desserts', 'royal-desserts', 'Pencuci mulut mewah dengan balutan edible gold 24K', 'Cake', 4),
('c1000000-0000-4000-8000-000000000005', 'Artisanal Drinks', 'artisanal-drinks', 'Minuman racikan ahli miksologi dengan rasa premium', 'Wine', 5)
ON CONFLICT (slug) DO NOTHING;

-- 4. PRODUCTS (12 Luxury Dishes)
INSERT INTO public.products (id, name, slug, description, category_id, price, promo_price, image_url, stock, rating, sold_count, is_featured, is_best_seller)
VALUES
(
  'p1000000-0000-4000-8000-000000000001',
  'Royal Wagyu A5 Tenderloin with Truffle Glaze',
  'royal-wagyu-a5-tenderloin',
  'Potongan Wagyu A5 Miyazaki Jepang dipanggang melekat sempurna, disajikan dengan saus Truffle Hitam Alba dan kentang gratin masam manis mas.',
  'c1000000-0000-4000-8000-000000000002',
  485000.00,
  425000.00,
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
  35,
  4.9,
  142,
  TRUE,
  TRUE
),
(
  'p1000000-0000-4000-8000-000000000002',
  'Golden Lobster Thermidor 24K Leaf',
  'golden-lobster-thermidor',
  'Lobster utuh samudera ditumis saus krim keju Gruyère & Cognac, ditaburi lembaran emas 24-karat murni yang dapat dimakan.',
  'c1000000-0000-4000-8000-000000000003',
  395000.00,
  350000.00,
  'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1000&q=80',
  20,
  4.95,
  98,
  TRUE,
  TRUE
),
(
  'p1000000-0000-4000-8000-000000000003',
  'Ummu Special Duck Confit & Golden Rice',
  'ummu-special-duck-confit',
  'Bebek rempah warisan Ummu A4 yang dimasak lambat 12 jam hingga empuk meresap, disandingkan dengan Nasi Rempah Saffron dan Sambal Rias.',
  'c1000000-0000-4000-8000-000000000001',
  185000.00,
  165000.00,
  'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1000&q=80',
  50,
  4.85,
  320,
  TRUE,
  TRUE
),
(
  'p1000000-0000-4000-8000-000000000004',
  'Chilean Sea Bass in Saffron Butter Sauce',
  'chilean-sea-bass-saffron',
  'Ikan Sea Bass Chile liar panggang lembut bertekstur sutra dalam siraman saus mentega saffron dan kaviar Sevruga.',
  'c1000000-0000-4000-8000-000000000003',
  320000.00,
  NULL,
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
  15,
  4.8,
  64,
  FALSE,
  FALSE
),
(
  'p1000000-0000-4000-8000-000000000005',
  'Black Truffle Tagliolini Risotto',
  'black-truffle-tagliolini-risotto',
  'Risotto beras Carnaroli dipadu keju Parmigiano Reggiano 36 bulan dan serutan segar Truffle Hitam dari Perigord.',
  'c1000000-0000-4000-8000-000000000001',
  240000.00,
  210000.00,
  'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80',
  40,
  4.9,
  180,
  TRUE,
  FALSE
),
(
  'p1000000-0000-4000-8000-000000000006',
  'Velvet Purple Opera Cake 24K Gold',
  'velvet-purple-opera-cake',
  'Lapisan biskuit Jaconde rasa Ube Lavender premium, ganache cokelat Valrhona 70%, dan sentuhan hiasan emas murni.',
  'c1000000-0000-4000-8000-000000000004',
  110000.00,
  95000.00,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
  30,
  4.92,
  210,
  TRUE,
  TRUE
),
(
  'p1000000-0000-4000-8000-000000000007',
  'Royal Saffron Pistachio Soufflé',
  'royal-saffron-pistachio-souffle',
  'Soufflé hangat mekar sempurna rasa saffron Iran dan renyahnya kacang pistachio Bronte Sicilia disajikan dengan gelato vanilla bourbon.',
  'c1000000-0000-4000-8000-000000000004',
  125000.00,
  NULL,
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
  25,
  4.88,
  115,
  FALSE,
  FALSE
),
(
  'p1000000-0000-4000-8000-000000000008',
  'Imperial Purple Elixir Mocktail',
  'imperial-purple-elixir',
  'Minuman segar ekstrak teh Butterfly Pea, bunga elderflower organik, yuzu Jepang, dan kilau edible glitter lavender.',
  'c1000000-0000-4000-8000-000000000005',
  75000.00,
  65000.00,
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
  100,
  4.95,
  450,
  TRUE,
  TRUE
),
(
  'p1000000-0000-4000-8000-000000000009',
  'Smoked Gold Cold Brew Artisan',
  'smoked-gold-cold-brew',
  'Cold brew kopi arabika Gayo pilihan yang diasap kayu apel, diperkaya dengan sirup karamel emas artisan.',
  'c1000000-0000-4000-8000-000000000005',
  68000.00,
  NULL,
  'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80',
  80,
  4.75,
  230,
  FALSE,
  FALSE
),
(
  'p1000000-0000-4000-8000-000000000010',
  'Pan-Seared Foie Gras on Brioche',
  'pan-seared-foie-gras-brioche',
  'Foie gras Prancis dipanggang garing di luar dan lembut di dalam di atas rotinya brioche hangat dengan compote buah fig merah.',
  'c1000000-0000-4000-8000-000000000001',
  290000.00,
  265000.00,
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  18,
  4.9,
  77,
  FALSE,
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- 5. PROMOS (5 Luxury Discount Vouchers)
INSERT INTO public.promos (id, code, title, description, discount_type, discount_amount, min_order_amount, usage_limit, used_count)
VALUES
(
  'pr000000-0000-4000-8000-000000000001',
  'ROYAL20',
  'Diskon 20% Sambutan Diraja',
  'Nikmati potongan 20% untuk semua sajian pilihan CUISENE UMMU A4.',
  'PERCENTAGE',
  20.00,
  200000.00,
  500,
  42
),
(
  'pr000000-0000-4000-8000-000000000002',
  'UMMU50K',
  'Potongan Rp 50.000 Kuliner Premium',
  'Potongan langsung Rp 50.000 untuk minimal transaksi Rp 300.000.',
  'FIXED',
  50000.00,
  300000.00,
  200,
  18
),
(
  'pr000000-0000-4000-8000-000000000003',
  'GOLDVIP',
  'VIP Gold Special 25%',
  'Potongan khusus 25% bagi pemegang keanggotaan VIP Cuisene Ummu.',
  'PERCENTAGE',
  25.00,
  50000.00,
  100,
  9
),
(
  'pr000000-0000-4000-8000-000000000004',
  'FREEDELIVERY',
  'Gratis Ongkir Antar Antar-Kota',
  'Bebas biaya antar kilat dengan armada eksklusif restaurant.',
  'FIXED',
  25000.00,
  150000.00,
  1000,
  120
),
(
  'pr000000-0000-4000-8000-000000000005',
  'WEEKENDLUX',
  'End of Week Luxury 15%',
  'Diskon santap akhir pekan istimewa bersama keluarga.',
  'PERCENTAGE',
  15.00,
  250000.00,
  300,
  34
)
ON CONFLICT (code) DO NOTHING;

-- 6. DELIVERY ZONES
INSERT INTO public.delivery_zones (id, branch_id, zone_name, max_distance_km, delivery_fee, estimated_minutes)
VALUES
('z1000000-0000-4000-8000-000000000001', 'b1111111-1111-4000-8000-000000000001', 'Zona 1: Jakarta Pusat & Menteng (0-5 km)', 5.00, 15000.00, 25),
('z1000000-0000-4000-8000-000000000002', 'b1111111-1111-4000-8000-000000000001', 'Zona 2: Jakarta Selatan & Senopati (5-10 km)', 10.00, 25000.00, 35),
('z1000000-0000-4000-8000-000000000003', 'b1111111-1111-4000-8000-000000000001', 'Zona 3: Jabodetabek Luxury Direct (10-25 km)', 25.00, 45000.00, 50)
ON CONFLICT (id) DO NOTHING;
