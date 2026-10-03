import type { Category, Product, Promo, DeliveryZone, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-fried',
    name: 'Fried Chicken',
    slug: 'fried-chicken',
    description: 'Ultra-crispy double-dredged chicken with proprietary spice crust',
    icon: 'Flame',
    display_order: 1,
    is_active: true
  },
  {
    id: 'cat-grilled',
    name: 'Grilled',
    slug: 'grilled',
    description: 'Charcoal-fired premium poultry with deep smokey glazes',
    icon: 'Sparkles',
    display_order: 2,
    is_active: true
  },
  {
    id: 'cat-roasted',
    name: 'Roasted',
    slug: 'roasted',
    description: 'Slow-roasted rotisserie with herb infusions and golden skin',
    icon: 'Crown',
    display_order: 3,
    is_active: true
  },
  {
    id: 'cat-burger',
    name: 'Burger',
    slug: 'burger',
    description: 'Colossal crispy breast fillets on toasted golden brioche',
    icon: 'Utensils',
    display_order: 4,
    is_active: true
  },
  {
    id: 'cat-sides',
    name: 'Sides',
    slug: 'sides',
    description: 'Hand-cut truffle fries, honey butter biscuits & garlic rice',
    icon: 'Soup',
    display_order: 5,
    is_active: true
  },
  {
    id: 'cat-drinks',
    name: 'Drinks',
    slug: 'drinks',
    description: 'Artisanal cold brews, sparkling citrus elixirs & thick shakes',
    icon: 'Wine',
    display_order: 6,
    is_active: true
  },
  {
    id: 'cat-combo',
    name: 'Combo',
    slug: 'combo',
    description: 'High-protein champion feast boxes built for real appetite',
    icon: 'Trophy',
    display_order: 7,
    is_active: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Signature Beast Crispy Chicken',
    slug: 'signature-beast-crispy-chicken',
    description: 'Ayam goreng potongan jumbo dengan 24 jam dry-brine rempah rahasia. Kulit ekstra renyah bertingkat, daging bagian dalam luar biasa juicy dan gurih sampai ke serat tulang.',
    category_id: 'cat-fried',
    category_name: 'Fried Chicken',
    price: 48000,
    promo_price: 39000,
    image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80',
    stock: 85,
    minimum_stock: 10,
    rating: 4.98,
    sold_count: 2450,
    calories: 520,
    spicy_level: 2,
    portion: '2 Potong Jumbo + Sambal Signature',
    highlight: 'CRISPY & JUICY',
    is_available: true,
    is_featured: true,
    is_best_seller: true,
    variants: [
      {
        id: 'var-cut',
        product_id: 'prod-01',
        name: 'Pilihan Bagian Ayam',
        options: [
          { name: 'Paha Atas & Bawah (Thigh & Drumstick)', extra_price: 0 },
          { name: 'Dada Lembut & Sayap (Breast & Wing)', extra_price: 0 },
          { name: 'Double Paha Atas (All Thighs)', extra_price: 4000 }
        ]
      },
      {
        id: 'var-spice',
        product_id: 'prod-01',
        name: 'Tingkat Kepedasan',
        options: [
          { name: 'Original Muscle Golden Herb', extra_price: 0 },
          { name: 'Mild Smokey Pepper (Level 1)', extra_price: 0 },
          { name: 'Nashville Fire Crunch (Level 2)', extra_price: 2000 },
          { name: 'Ghost Pepper Muscle Fury (Level 3)', extra_price: 3000 }
        ]
      }
    ],
    addons: [
      { id: 'add-cheese', product_id: 'prod-01', name: 'Melting Cheddar Sauce', price: 8000 },
      { id: 'add-rice', product_id: 'prod-01', name: 'Aromatic Butter Rice', price: 9000 },
      { id: 'add-egg', product_id: 'prod-01', name: 'Crispy Fried Egg', price: 6000 }
    ]
  },
  {
    id: 'prod-02',
    name: 'Smoked Flame-Grilled Half Chicken',
    slug: 'smoked-flame-grilled-half-chicken',
    description: 'Setengah ekor ayam utuh dipanggang langsung di atas arang kayu keras apel. Dibalur saus glaze smokey karamel pedas manis dengan aroma panggangan berkarakter kuat.',
    category_id: 'cat-grilled',
    category_name: 'Grilled',
    price: 78000,
    promo_price: 68000,
    image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
    stock: 45,
    minimum_stock: 5,
    rating: 4.95,
    sold_count: 1820,
    calories: 640,
    spicy_level: 2,
    portion: 'Half Chicken (500gr)',
    highlight: 'CHARCOAL ROAST',
    is_available: true,
    is_featured: true,
    is_best_seller: true,
    variants: [
      {
        id: 'var-sauce',
        product_id: 'prod-02',
        name: 'Pilihan Glaze Panggangan',
        options: [
          { name: 'Smokey Hickory Texas BBQ', extra_price: 0 },
          { name: 'Honey Garlic Butter Sizzle', extra_price: 0 },
          { name: 'Balinese Sambal Matah Infusion', extra_price: 3000 }
        ]
      }
    ]
  },
  {
    id: 'prod-03',
    name: 'Golden Herb Rotisserie Whole Bird',
    slug: 'golden-herb-rotisserie-whole-bird',
    description: 'Satu ekor ayam utuh dimasak lambat metode rotisserie 3 jam dengan 14 herbal Prancis, mentega bawang putih, dan rosemary segar. Kulit renyah mengkilap, daging super empuk.',
    category_id: 'cat-roasted',
    category_name: 'Roasted',
    price: 135000,
    promo_price: 119000,
    image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80',
    stock: 25,
    minimum_stock: 4,
    rating: 4.92,
    sold_count: 890,
    calories: 1250,
    spicy_level: 1,
    portion: '1 Ekor Utuh (Porsi 3-4 Orang)',
    highlight: 'SLOW ROTISSERIE',
    is_available: true,
    is_featured: true,
    is_best_seller: false
  },
  {
    id: 'prod-04',
    name: 'The Colossal Muscle Tower Burger',
    slug: 'the-colossal-muscle-tower-burger',
    description: 'Double fried boneless chicken thigh dilapisi lelehan keju Red Cheddar, smoked beef bacon renyah, purple coleslaw segar, dan saus truffle mayo dalam roti brioche bakar.',
    category_id: 'cat-burger',
    category_name: 'Burger',
    price: 65000,
    promo_price: 55000,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    stock: 50,
    minimum_stock: 8,
    rating: 4.97,
    sold_count: 3100,
    calories: 780,
    spicy_level: 2,
    portion: 'Colossal Brioche Burger + Curly Fries',
    highlight: 'CHEF SIGNATURE',
    is_available: true,
    is_featured: true,
    is_best_seller: true
  },
  {
    id: 'prod-05',
    name: 'Nashville Hot Fire Tenders Box',
    slug: 'nashville-hot-fire-tenders-box',
    description: '5 potong dada ayam fillet tanpa tulang bertekstur krispi maksimal, dicelup minyak bumbu Nashville cabai rawit merah, disajikan dengan acar timun madu dan saus ranch.',
    category_id: 'cat-fried',
    category_name: 'Fried Chicken',
    price: 45000,
    promo_price: null,
    image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80',
    stock: 60,
    minimum_stock: 10,
    rating: 4.88,
    sold_count: 1420,
    calories: 490,
    spicy_level: 3,
    portion: '5 Pcs Tender Fillet + Ranch Dip',
    highlight: 'HIGH PROTEIN',
    is_available: true,
    is_featured: false,
    is_best_seller: true
  },
  {
    id: 'prod-06',
    name: 'Truffle Parmesan Hand-Cut Fries',
    slug: 'truffle-parmesan-hand-cut-fries',
    description: 'Kentang potong tebal digoreng dua kali hingga garing keemasan, diaduk bersama minyak jamur truffle putih Alba Italia dan taburan keju Grana Padano parut melimpah.',
    category_id: 'cat-sides',
    category_name: 'Sides',
    price: 32000,
    promo_price: 27000,
    image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80',
    stock: 90,
    minimum_stock: 15,
    rating: 4.91,
    sold_count: 4200,
    calories: 380,
    spicy_level: 0,
    portion: 'Porsi Sharing 200gr',
    is_available: true,
    is_featured: false,
    is_best_seller: true
  },
  {
    id: 'prod-07',
    name: 'Artisanal Honey Citrus Sparkler',
    slug: 'artisanal-honey-citrus-sparkler',
    description: 'Minuman dingin menyegarkan dengan sari jeruk Yuzu Jepang, madu murni hutan tropis, soda mata air berkarbonasi tinggi, dan daun mint segar penurun rasa pedas.',
    category_id: 'cat-drinks',
    category_name: 'Drinks',
    price: 28000,
    promo_price: null,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    stock: 120,
    minimum_stock: 20,
    rating: 4.85,
    sold_count: 2800,
    calories: 140,
    spicy_level: 0,
    portion: 'Cup 450ml',
    is_available: true,
    is_featured: false,
    is_best_seller: false
  },
  {
    id: 'prod-08',
    name: 'Beast Champion Feast Box (Family 4)',
    slug: 'beast-champion-feast-box',
    description: 'Paket lengkap juara: 8 potong Signature Beast Crispy, 4 porsi Garlic Butter Rice, 2 Truffle Fries, 4 Saus Signature, dan 4 Es Teh Lemon Madu Dingin.',
    category_id: 'cat-combo',
    category_name: 'Combo',
    price: 210000,
    promo_price: 175000,
    image_url: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=1200&q=80',
    stock: 30,
    minimum_stock: 5,
    rating: 4.99,
    sold_count: 950,
    calories: 2400,
    spicy_level: 2,
    portion: 'Paket Lengkap Porsi 4 Orang',
    highlight: 'BEST VALUE PACK',
    is_available: true,
    is_featured: true,
    is_best_seller: true
  }
];

export const INITIAL_PROMOS: Promo[] = [
  {
    id: 'pr-beast30',
    code: 'BEAST30',
    title: 'WEEKEND CRAVINGS 30% OFF',
    description: 'Diskon 30% untuk semua menu Muscle Chicken pilihan akhir pekan.',
    discount_type: 'PERCENTAGE',
    discount_amount: 30,
    min_order_amount: 100000,
    is_active: true
  },
  {
    id: 'pr-muscle50k',
    code: 'MUSCLE50K',
    title: 'POTONGAN RP 50.000 CHAMPION',
    description: 'Potongan instan Rp 50.000 untuk transaksi minimal Rp 200.000.',
    discount_type: 'FIXED',
    discount_amount: 50000,
    min_order_amount: 200000,
    is_active: true
  },
  {
    id: 'pr-freebox',
    code: 'PROTEINBOOST',
    title: 'GRATIS TRUFFLE FRIES & BUTTER RICE',
    description: 'Bonus Truffle Fries & Butter Rice untuk pesanan Combo Feast.',
    discount_type: 'FIXED',
    discount_amount: 35000,
    min_order_amount: 150000,
    is_active: true
  },
  {
    id: 'pr-freeongkir',
    code: 'FREESHIP',
    title: 'GRATIS PENGIRIMAN VIP EXPRESS',
    description: 'Bebas biaya ongkos kirim armada hangat langsung ke pintu Anda.',
    discount_type: 'FIXED',
    discount_amount: 20000,
    min_order_amount: 90000,
    is_active: true
  }
];

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'dz-1',
    zone_name: 'Zone 1: Senopati, SCBD, Blok M (0-5 km)',
    max_distance_km: 5,
    delivery_fee: 12000,
    estimated_minutes: 20
  },
  {
    id: 'dz-2',
    zone_name: 'Zone 2: Menteng, Kuningan, Kemang (5-10 km)',
    max_distance_km: 10,
    delivery_fee: 20000,
    estimated_minutes: 30
  },
  {
    id: 'dz-3',
    zone_name: 'Zone 3: PIK, BSD, Bintaro, Kelapa Gading (10-25 km)',
    max_distance_km: 25,
    delivery_fee: 35000,
    estimated_minutes: 45
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    product_id: 'prod-01',
    user_name: 'Rendy Pratama — Professional Athlete',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Tekstur krispinya di level yang berbeda! Kulitnya renyah tanpa berminyak berlebih, dan daging paha atasnya juicy luar biasa. Ini standar ayam goreng kelas internasional.',
    created_at: '2026-09-26T18:30:00Z'
  },
  {
    id: 'rev-2',
    product_id: 'prod-02',
    user_name: 'Chef Davin Alexander',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Panggangan arangnya sempurna. Smokey glaze Texas BBQ meresap sampai ke serat terdalam. Kemasan box insulasinya menjaga ayam tetap panas mengepul waktu sampai.',
    created_at: '2026-09-27T12:15:00Z'
  },
  {
    id: 'rev-3',
    product_id: 'prod-04',
    user_name: 'Valerie Santoso — Food Enthusiast',
    user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Colossal Tower Burger-nya gila banget porsinya! Brioche bun lembut dipadu double chicken fillet yang garing dan truffle mayo. Wajib order lagi!',
    created_at: '2026-09-27T19:40:00Z'
  }
];

export const RESTAURANT_SETTINGS = {
  brand_name: 'MUSCLE CHICKEN INDONESIA',
  tagline: 'NOT JUST CHICKEN. THIS IS MUSCLE CHICKEN.',
  subtagline: 'Ayam premium, rasa luar biasa.',
  whatsapp_number: '6281288997766',
  email: 'concierge@musclechicken.id',
  address: 'Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan',
  operating_hours: '10:00 - 23:00 WIB (Daily)',
  flagship_branches: [
    { city: 'Jakarta Selatan', address: 'Jl. Senopati No. 88, Senopati Dining Precinct' },
    { city: 'Jakarta Utara', address: 'Pantai Indah Kapuk 2, Batavia Cove Unit A1' },
    { city: 'Jakarta Pusat', address: 'Jl. H.O.S Cokroaminoto No. 42, Menteng' },
    { city: 'Bandung', address: 'Jl. R.E Martadinata (Riau) No. 102' },
    { city: 'Surabaya', address: 'Jl. Mayjend Sungkono No. 58, Barat' }
  ]
};
