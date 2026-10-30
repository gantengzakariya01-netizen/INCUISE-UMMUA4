// Centralized Asset Repository for CHICKENLINE
// Authentic high-quality food photography, brand assets, and product reels

export interface ChickenReelProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  promoPrice?: number;
  rating: number;
  calories: number;
  proteinGrams: number;
  cookingMethod: string;
  spiciness: number; // 0 to 5
  image: string;
  reelVideo?: string;
  badge: string;
  prepTime: string;
  portion: string;
}

export const CHICKEN_REEL_PRODUCTS: ChickenReelProduct[] = [
  {
    id: 'reel-01',
    name: 'Crispy Fried Chicken',
    slug: 'crispy-fried-chicken',
    tagline: 'Triple-dredged golden crunch with tender bone-in juiciness',
    description: 'Our signature whole-muscle chicken cuts, marinated in 12 proprietary herbs for 24 hours, double-dredged in seasoned flour, and pressure-fried to golden, shatteringly crisp perfection.',
    price: 48000,
    promoPrice: 42000,
    rating: 4.98,
    calories: 520,
    proteinGrams: 42,
    cookingMethod: '24H Herb Brine & High-Heat Pressure Fry',
    spiciness: 1,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85',
    badge: 'CHEF SIGNATURE',
    prepTime: '12-15 Mins',
    portion: '2 Jumbo Cuts (Thigh & Drumstick)'
  },
  {
    id: 'reel-02',
    name: 'Spicy Chicken Wings',
    slug: 'spicy-chicken-wings',
    tagline: 'Glazed in fiery habanero honey with blistering aroma',
    description: 'Crisp-skin wings tossed immediately from the fryer in our artisanal chili-garlic and wildflower honey glaze. Tangy, fiery, and completely addictive.',
    price: 45000,
    rating: 4.95,
    calories: 460,
    proteinGrams: 36,
    cookingMethod: 'Double Wok Tossed in Artisan Chili Glaze',
    spiciness: 4,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=85',
    badge: 'HOT SELLER',
    prepTime: '10-12 Mins',
    portion: '6 Pieces Wings & Drumettes'
  },
  {
    id: 'reel-03',
    name: 'Chicken Burger',
    slug: 'chicken-burger',
    tagline: 'Colossal crispy breast fillet on buttered toasted brioche',
    description: 'A towering thick-cut breast fillet with molten spiced butter, house-made dill pickles, red cabbage slaw, and roasted garlic aioli between toasted brioche buns.',
    price: 52000,
    promoPrice: 46000,
    rating: 4.97,
    calories: 640,
    proteinGrams: 48,
    cookingMethod: 'Cast Iron Seared Brioche & Crispy Fillet',
    spiciness: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    badge: 'CROWD FAVORITE',
    prepTime: '10 Mins',
    portion: 'Single Colossal Burger'
  },
  {
    id: 'reel-04',
    name: 'Grilled Chicken',
    slug: 'grilled-chicken',
    tagline: 'Charcoal-kissed smoky skin with melting collagen juices',
    description: 'Half-chicken spatchcocked and slow-grilled over coconut husk and rambutan wood charcoal, basted in lemongrass and sweet dark soy emulsion.',
    price: 58000,
    rating: 4.94,
    calories: 440,
    proteinGrams: 52,
    cookingMethod: 'Slow Wood Charcoal Open Grill (250°C)',
    spiciness: 2,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=85',
    badge: 'HEALTHY CHOICE',
    prepTime: '18-20 Mins',
    portion: 'Half Chicken with Grilled Lime'
  },
  {
    id: 'reel-05',
    name: 'Chicken Rice Bowl',
    slug: 'chicken-rice-bowl',
    tagline: 'Fragrant chicken schmaltz jasmine rice with glazed tenders',
    description: 'Savory jasmine rice cooked in rich chicken stock and pandan leaves, topped with sliced grilled chicken breast, soft-poached onsen egg, and scallion ginger oil.',
    price: 42000,
    rating: 4.91,
    calories: 510,
    proteinGrams: 38,
    cookingMethod: 'Slow Braised & Schmaltz Infusion',
    spiciness: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    badge: 'COMFORT CLASSIC',
    prepTime: '8 Mins',
    portion: 'Warm Artisan Bowl + House Broth'
  },
  {
    id: 'reel-06',
    name: 'Honey Glazed Chicken',
    slug: 'honey-glazed-chicken',
    tagline: 'Sticky wild blossom honey with toasted sesame seed crust',
    description: 'Tender chicken drumsticks caramelized under high heat with Forest Wild Honey, toasted garlic chips, and white sesame, yielding a sweet and savory lacquer.',
    price: 49000,
    rating: 4.93,
    calories: 480,
    proteinGrams: 40,
    cookingMethod: 'Oven Roasted & Honey Caramelization',
    spiciness: 1,
    image: 'https://images.unsplash.com/photo-1527477245801-b66432a5a510?auto=format&fit=crop&w=1200&q=85',
    badge: 'SWEET & SAVORY',
    prepTime: '14 Mins',
    portion: '3 Large Drumsticks'
  },
  {
    id: 'reel-07',
    name: 'Korean Spicy Chicken',
    slug: 'korean-spicy-chicken',
    tagline: 'Authentic Gochujang glaze with fermented garlic depth',
    description: 'Double-fried extra crunchy boneless chicken thighs coated in authentic red Gochujang sauce, crushed roasted peanuts, and spring onions. Bold, sweet, and fiery.',
    price: 54000,
    promoPrice: 48000,
    rating: 4.99,
    calories: 580,
    proteinGrams: 44,
    cookingMethod: 'Double Fried & Sticky Wok Glaze',
    spiciness: 5,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=85',
    badge: 'BESTSELLER',
    prepTime: '12 Mins',
    portion: '300g Boneless Chunks'
  },
  {
    id: 'reel-08',
    name: 'Chicken Nuggets',
    slug: 'chicken-nuggets',
    tagline: '100% whole breast meat with golden panko tempura crust',
    description: 'No processed fillings. Made exclusively with ground chicken breast fillet, sea salt, black pepper, and coated in airy panko crumbs. Served with truffle mayo.',
    price: 36000,
    rating: 4.89,
    calories: 380,
    proteinGrams: 32,
    cookingMethod: 'Flash Fried in Pure Sunflower Oil',
    spiciness: 0,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=85',
    badge: 'ALL-TIME SNACK',
    prepTime: '8 Mins',
    portion: '8 Handmade Pieces + Dip'
  },
  {
    id: 'reel-09',
    name: 'BBQ Chicken',
    slug: 'bbq-chicken',
    tagline: 'Smothered in hickory smoked molasses barbecue glaze',
    description: 'Slow-charred chicken quarters glazed layer by layer with our dark hickory barbecue sauce, bringing deep caramelization, gentle tang, and woodsmoke aroma.',
    price: 52000,
    rating: 4.92,
    calories: 490,
    proteinGrams: 46,
    cookingMethod: 'Hickory Wood Smoker & Basting',
    spiciness: 2,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85',
    badge: 'SMOKY DELIGHT',
    prepTime: '16 Mins',
    portion: 'Quarter Chicken with Pickled Slaw'
  },
  {
    id: 'reel-10',
    name: 'Signature Chicken Platter',
    slug: 'signature-chicken-platter',
    tagline: 'The ultimate culinary feast featuring all master cuts',
    description: 'The crowning centerpiece: 2 Crispy Fried Cuts, 4 Spicy Wings, Honey Glazed Tenders, Truffle Fries, Garlic Herb Brioche, and 3 signature artisanal dipping sauces.',
    price: 135000,
    promoPrice: 119000,
    rating: 5.0,
    calories: 1250,
    proteinGrams: 98,
    cookingMethod: 'Full Brigade Master Preparation',
    spiciness: 3,
    image: 'https://images.unsplash.com/photo-1524182576066-1be9613770ec?auto=format&fit=crop&w=1200&q=85',
    badge: 'FEAST FOR 3-4',
    prepTime: '20 Mins',
    portion: 'Grand Feast Platter (3-4 Persons)'
  }
];

export const BRAND_ASSETS = {
  name: 'CHICKENLINE',
  tagline: "More Than Just Chicken. It's an Experience.",
  subheadline: 'Discover delicious chicken creations, perfectly prepared with bold flavors, premium ingredients and unforgettable taste.',
  badgeText: 'FRESHLY PREPARED • PREMIUM CHICKEN',
  primaryCta: 'Explore Our Menu',
  secondaryCta: 'Discover Our Story',
  carouselCta: 'ORDER YOUR FAVORITE CHICKEN',
  stickers: [
    { text: '100% Delicious', icon: '🍗', bg: 'bg-[#FF7A36]' },
    { text: 'Fresh Every Day', icon: '🌿', bg: 'bg-[#FFB347]' },
    { text: 'Made With Passion', icon: '🔥', bg: 'bg-[#151A2E]' }
  ],
  bottomSticker: 'Taste the Difference'
};
