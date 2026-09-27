import type { Category, Product, Promo, DeliveryZone, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'c1000000-0000-4000-8000-000000000001',
    name: 'Signature Chef Specials',
    slug: 'signature-chef-specials',
    description: 'Hidangan mahakarya persembahan Chef Bintang Lima',
    icon: 'Crown',
    display_order: 1,
    is_active: true
  },
  {
    id: 'c1000000-0000-4000-8000-000000000002',
    name: 'Prime Wagyu & Steaks',
    slug: 'prime-wagyu-steaks',
    description: 'Daging Wagyu A5 Miyazaki dipanggang sempurna',
    icon: 'Flame',
    display_order: 2,
    is_active: true
  },
  {
    id: 'c1000000-0000-4000-8000-000000000003',
    name: 'Seafood Delicacies',
    slug: 'seafood-delicacies',
    description: 'Tangkapan laut segar dengan saus mentega emas',
    icon: 'Fish',
    display_order: 3,
    is_active: true
  },
  {
    id: 'c1000000-0000-4000-8000-000000000004',
    name: 'Royal Desserts',
    slug: 'royal-desserts',
    description: 'Pencuci mulut mewah bertabur edible gold 24K',
    icon: 'Cake',
    display_order: 4,
    is_active: true
  },
  {
    id: 'c1000000-0000-4000-8000-000000000005',
    name: 'Artisanal Drinks',
    slug: 'artisanal-drinks',
    description: 'Minuman racikan ahli miksologi rasa premium',
    icon: 'Wine',
    display_order: 5,
    is_active: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1000000-0000-4000-8000-000000000001',
    name: 'Royal Wagyu A5 Tenderloin with Truffle Glaze',
    slug: 'royal-wagyu-a5-tenderloin',
    description: 'Potongan Wagyu A5 Miyazaki Jepang dipanggang melekat sempurna, disajikan dengan saus Truffle Hitam Alba dan kentang gratin emas masam manis.',
    category_id: 'c1000000-0000-4000-8000-000000000002',
    category_name: 'Prime Wagyu & Steaks',
    price: 485000,
    promo_price: 425000,
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    stock: 35,
    minimum_stock: 5,
    rating: 4.9,
    sold_count: 142,
    is_available: true,
    is_featured: true,
    is_best_seller: true,
    variants: [
      {
        id: 'v1',
        product_id: 'p1000000-0000-4000-8000-000000000001',
        name: 'Tingkat Kematangan (Doneness)',
        options: [
          { name: 'Medium Rare (Rekomendasi Chef)', extra_price: 0 },
          { name: 'Medium', extra_price: 0 },
          { name: 'Medium Well', extra_price: 0 }
        ]
      }
    ]
  },
  {
    id: 'p1000000-0000-4000-8000-000000000002',
    name: 'Golden Lobster Thermidor 24K Leaf',
    slug: 'golden-lobster-thermidor',
    description: 'Lobster utuh samudera ditumis saus krim keju Gruyère & Cognac, ditaburi lembaran emas 24-karat murni yang dapat dimakan.',
    category_id: 'c1000000-0000-4000-8000-000000000003',
    category_name: 'Seafood Delicacies',
    price: 395000,
    promo_price: 350000,
    image_url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1000&q=80',
    stock: 20,
    minimum_stock: 3,
    rating: 4.95,
    sold_count: 98,
    is_available: true,
    is_featured: true,
    is_best_seller: true
  },
  {
    id: 'p1000000-0000-4000-8000-000000000003',
    name: 'Ummu Special Duck Confit & Golden Rice',
    slug: 'ummu-special-duck-confit',
    description: 'Bebek rempah warisan Ummu A4 yang dimasak lambat 12 jam hingga empuk meresap, disandingkan dengan Nasi Rempah Saffron dan Sambal Rias.',
    category_id: 'c1000000-0000-4000-8000-000000000001',
    category_name: 'Signature Chef Specials',
    price: 185000,
    promo_price: 165000,
    image_url: 'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1000&q=80',
    stock: 50,
    minimum_stock: 10,
    rating: 4.85,
    sold_count: 320,
    is_available: true,
    is_featured: true,
    is_best_seller: true
  },
  {
    id: 'p1000000-0000-4000-8000-000000000004',
    name: 'Chilean Sea Bass in Saffron Butter Sauce',
    slug: 'chilean-sea-bass-saffron',
    description: 'Ikan Sea Bass Chile liar panggang lembut bertekstur sutra dalam siraman saus mentega saffron dan kaviar Sevruga.',
    category_id: 'c1000000-0000-4000-8000-000000000003',
    category_name: 'Seafood Delicacies',
    price: 320000,
    promo_price: null,
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    stock: 15,
    minimum_stock: 5,
    rating: 4.8,
    sold_count: 64,
    is_available: true,
    is_featured: false,
    is_best_seller: false
  },
  {
    id: 'p1000000-0000-4000-8000-000000000005',
    name: 'Black Truffle Tagliolini Risotto',
    slug: 'black-truffle-tagliolini-risotto',
    description: 'Risotto beras Carnaroli dipadu keju Parmigiano Reggiano 36 bulan dan serutan segar Truffle Hitam dari Perigord.',
    category_id: 'c1000000-0000-4000-8000-000000000001',
    category_name: 'Signature Chef Specials',
    price: 240000,
    promo_price: 210000,
    image_url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80',
    stock: 40,
    minimum_stock: 8,
    rating: 4.9,
    sold_count: 180,
    is_available: true,
    is_featured: true,
    is_best_seller: false
  },
  {
    id: 'p1000000-0000-4000-8000-000000000006',
    name: 'Velvet Purple Opera Cake 24K Gold',
    slug: 'velvet-purple-opera-cake',
    description: 'Lapisan biskuit Jaconde rasa Ube Lavender premium, ganache cokelat Valrhona 70%, dan sentuhan hiasan emas murni.',
    category_id: 'c1000000-0000-4000-8000-000000000004',
    category_name: 'Royal Desserts',
    price: 110000,
    promo_price: 95000,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    stock: 30,
    minimum_stock: 5,
    rating: 4.92,
    sold_count: 210,
    is_available: true,
    is_featured: true,
    is_best_seller: true
  },
  {
    id: 'p1000000-0000-4000-8000-000000000007',
    name: 'Royal Saffron Pistachio Soufflé',
    slug: 'royal-saffron-pistachio-souffle',
    description: 'Soufflé hangat mekar sempurna rasa saffron Iran dan renyahnya kacang pistachio Bronte Sicilia disajikan dengan gelato vanilla bourbon.',
    category_id: 'c1000000-0000-4000-8000-000000000004',
    category_name: 'Royal Desserts',
    price: 125000,
    promo_price: null,
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    stock: 25,
    minimum_stock: 5,
    rating: 4.88,
    sold_count: 115,
    is_available: true,
    is_featured: false,
    is_best_seller: false
  },
  {
    id: 'p1000000-0000-4000-8000-000000000008',
    name: 'Imperial Purple Elixir Mocktail',
    slug: 'imperial-purple-elixir',
    description: 'Minuman segar ekstrak teh Butterfly Pea, bunga elderflower organik, yuzu Jepang, dan kilau edible glitter lavender.',
    category_id: 'c1000000-0000-4000-8000-000000000005',
    category_name: 'Artisanal Drinks',
    price: 75000,
    promo_price: 65000,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    stock: 100,
    minimum_stock: 15,
    rating: 4.95,
    sold_count: 450,
    is_available: true,
    is_featured: true,
    is_best_seller: true
  },
  {
    id: 'p1000000-0000-4000-8000-000000000009',
    name: 'Smoked Gold Cold Brew Artisan',
    slug: 'smoked-gold-cold-brew',
    description: 'Cold brew kopi arabika Gayo pilihan yang diasap kayu apel, diperkaya dengan sirup karamel emas artisan.',
    category_id: 'c1000000-0000-4000-8000-000000000005',
    category_name: 'Artisanal Drinks',
    price: 68000,
    promo_price: null,
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80',
    stock: 80,
    minimum_stock: 10,
    rating: 4.75,
    sold_count: 230,
    is_available: true,
    is_featured: false,
    is_best_seller: false
  },
  {
    id: 'p1000000-0000-4000-8000-000000000010',
    name: 'Pan-Seared Foie Gras on Brioche',
    slug: 'pan-seared-foie-gras-brioche',
    description: 'Foie gras Prancis dipanggang garing di luar dan lembut di dalam di atas roti brioche hangat dengan compote buah fig merah.',
    category_id: 'c1000000-0000-4000-8000-000000000001',
    category_name: 'Signature Chef Specials',
    price: 290000,
    promo_price: 265000,
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    stock: 18,
    minimum_stock: 4,
    rating: 4.9,
    sold_count: 77,
    is_available: true,
    is_featured: false,
    is_best_seller: false
  }
];

export const INITIAL_PROMOS: Promo[] = [
  {
    id: 'pr1',
    code: 'ROYAL20',
    title: 'Diskon 20% Sambutan Diraja',
    description: 'Nikmati potongan 20% untuk semua sajian pilihan ICUISENE UMMU A4.',
    discount_type: 'PERCENTAGE',
    discount_amount: 20,
    min_order_amount: 200000,
    is_active: true
  },
  {
    id: 'pr2',
    code: 'UMMU50K',
    title: 'Potongan Rp 50.000 Kuliner Premium',
    description: 'Potongan langsung Rp 50.000 untuk minimal transaksi Rp 300.000.',
    discount_type: 'FIXED',
    discount_amount: 50000,
    min_order_amount: 300000,
    is_active: true
  },
  {
    id: 'pr3',
    code: 'GOLDVIP',
    title: 'VIP Gold Special 25%',
    description: 'Potongan khusus 25% bagi keanggotaan VIP Cuisene Ummu.',
    discount_type: 'PERCENTAGE',
    discount_amount: 25,
    min_order_amount: 500000,
    is_active: true
  },
  {
    id: 'pr4',
    code: 'FREEDELIVERY',
    title: 'Gratis Pengiriman VIP Direct',
    description: 'Bebas biaya pengiriman kilat dengan armada eksklusif restaurant.',
    discount_type: 'FIXED',
    discount_amount: 25000,
    min_order_amount: 150000,
    is_active: true
  },
  {
    id: 'pr5',
    code: 'WEEKENDLUX',
    title: 'End of Week Luxury 15%',
    description: 'Diskon santap akhir pekan istimewa bersama keluarga.',
    discount_type: 'PERCENTAGE',
    discount_amount: 15,
    min_order_amount: 250000,
    is_active: true
  }
];

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'z1',
    zone_name: 'Zona 1: Menteng & Jakarta Pusat (0-5 km)',
    max_distance_km: 5,
    delivery_fee: 15000,
    estimated_minutes: 25
  },
  {
    id: 'z2',
    zone_name: 'Zona 2: Senopati & Jakarta Selatan (5-10 km)',
    max_distance_km: 10,
    delivery_fee: 25000,
    estimated_minutes: 35
  },
  {
    id: 'z3',
    zone_name: 'Zona 3: Jabodetabek Luxury Direct (10-25 km)',
    max_distance_km: 25,
    delivery_fee: 45000,
    estimated_minutes: 50
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    product_id: 'p1000000-0000-4000-8000-000000000001',
    user_name: 'Drs. H. Ananda Kusuma',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Pengalaman santap yang luar biasa! Wagyu A5 sangat empuk dan saus truffle-nya memiliki aroma yang mewah tiada tanding. Kemasan pengiriman sangat rapi dan hangat.',
    created_at: '2026-09-24T14:30:00Z'
  },
  {
    id: 'r2',
    product_id: 'p1000000-0000-4000-8000-000000000002',
    user_name: 'Lady Clarissa Wijaya',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Golden Lobster Thermidor 24K adalah mahakarya! Rasa gurih mentega Cognac berpadu sempurna dengan sentuhan kemewahan lembaran emas.',
    created_at: '2026-09-25T19:15:00Z'
  },
  {
    id: 'r3',
    product_id: 'p1000000-0000-4000-8000-000000000003',
    user_name: 'Raden Mas Rian Septian',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Duck Confit khas Ummu A4 benar-benar autentik dengan standar internasional. Nasi Saffron-nya sangat harum!',
    created_at: '2026-09-26T10:00:00Z'
  }
];
