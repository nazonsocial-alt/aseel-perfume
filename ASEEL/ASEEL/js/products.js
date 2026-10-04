/* =========================================================
   ASEEL PERFUME — PRODUCT DATA & RENDER HELPERS
   ========================================================= */

/* Perfume bottle SVGs — used as visual placeholders wherever a
   product photo would normally appear (no stock images are used). */
const BOTTLE_SVGS = {
  gold: `<svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="46" y="10" width="28" height="20" rx="3" fill="#D4AF37"/>
    <rect x="52" y="0" width="16" height="12" rx="2" fill="#0F0F0F"/>
    <path d="M40 30 C40 30 34 44 34 60 L34 176 C34 187 42 196 54 196 L66 196 C78 196 86 187 86 176 L86 60 C86 44 80 30 80 30 Z" fill="#F7F4EC" stroke="#D4AF37" stroke-width="2"/>
    <rect x="34" y="90" width="52" height="60" fill="#D4AF37" opacity="0.85"/>
    <line x1="34" y1="90" x2="86" y2="90" stroke="#0F0F0F" stroke-width="1.5"/>
    <line x1="34" y1="150" x2="86" y2="150" stroke="#0F0F0F" stroke-width="1.5"/>
    <text x="60" y="124" font-family="Playfair Display, serif" font-size="11" fill="#0F0F0F" text-anchor="middle" font-style="italic">ASEEL</text>
  </svg>`,
  noir: `<svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="44" y="8" width="32" height="18" rx="3" fill="#0F0F0F"/>
    <rect x="52" y="0" width="16" height="10" rx="2" fill="#D4AF37"/>
    <path d="M38 28 C38 28 30 46 30 64 L30 178 C30 189 40 198 54 198 L66 198 C80 198 90 189 90 178 L90 64 C90 46 82 28 82 28 Z" fill="#0F0F0F" stroke="#D4AF37" stroke-width="1.5"/>
    <rect x="30" y="96" width="60" height="4" fill="#D4AF37"/>
    <text x="60" y="140" font-family="Playfair Display, serif" font-size="10" fill="#D4AF37" text-anchor="middle" font-style="italic">ASEEL</text>
  </svg>`,
  rose: `<svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="47" y="10" width="26" height="18" rx="3" fill="#D4AF37"/>
    <rect x="53" y="0" width="14" height="12" rx="2" fill="#0F0F0F"/>
    <path d="M42 28 C42 28 36 42 36 58 L36 174 C36 186 44 196 55 196 L65 196 C76 196 84 186 84 174 L84 58 C84 42 78 28 78 28 Z" fill="#fff" stroke="#D4AF37" stroke-width="2"/>
    <circle cx="60" cy="120" r="26" fill="#F1D9C0" opacity="0.6"/>
    <text x="60" y="126" font-family="Playfair Display, serif" font-size="10" fill="#0F0F0F" text-anchor="middle" font-style="italic">ASEEL</text>
  </svg>`,
  ocean: `<svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="46" y="10" width="28" height="18" rx="3" fill="#0F0F0F"/>
    <rect x="52" y="0" width="16" height="12" rx="2" fill="#D4AF37"/>
    <path d="M40 28 C40 28 33 44 33 60 L33 176 C33 187 42 196 54 196 L66 196 C78 196 87 187 87 176 L87 60 C87 44 80 28 80 28 Z" fill="#F7F4EC" stroke="#0F0F0F" stroke-width="1.5"/>
    <path d="M33 140 Q60 128 87 140 L87 176 C87 187 78 196 66 196 L54 196 C42 196 33 187 33 176 Z" fill="#D4AF37" opacity="0.4"/>
    <text x="60" y="118" font-family="Playfair Display, serif" font-size="10" fill="#0F0F0F" text-anchor="middle" font-style="italic">ASEEL</text>
  </svg>`
};

function bottleSVG(key) { return BOTTLE_SVGS[key] || BOTTLE_SVGS.gold; }

/* -------------------- Product catalogue -------------------- */
const PRODUCTS = [
  {
    id: 'p01', name: 'Aseel Noir Intense', category: 'Men', art: 'noir',
    price: 4200, oldPrice: 5200, rating: 4.8, reviews: 132, badge: 'Best Seller',
    isNew: false, stock: 18,
    short: 'A bold, smoky oud composition for the modern man.',
    description: 'Aseel Noir Intense opens with a sharp burst of black pepper and bergamot before settling into a deep heart of oud, leather and dark amber. Built for evening wear, it leaves a commanding, long-lasting trail.',
    notes: { top: 'Black Pepper, Bergamot, Cardamom', middle: 'Oud, Leather, Saffron', base: 'Amber, Musk, Sandalwood' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Coumarin.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p02', name: 'Aseel Golden Oud', category: 'Men', art: 'gold',
    price: 5500, oldPrice: null, rating: 4.9, reviews: 201, badge: 'Best Seller',
    isNew: false, stock: 24,
    short: 'Rich oud wrapped in warm amber and honeyed spice.',
    description: 'A rare blend of aged oud and golden honey, layered over warm spice and soft woods. Golden Oud is designed for those who want to be remembered — elegant, opulent, unforgettable.',
    notes: { top: 'Saffron, Cinnamon', middle: 'Rose, Oud', base: 'Amber, Vanilla, Sandalwood' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Benzoate, Citral.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p03', name: 'Aseel Rose Elixir', category: 'Women', art: 'rose',
    price: 3900, oldPrice: 4600, rating: 4.7, reviews: 98, badge: 'Sale',
    isNew: false, stock: 15,
    short: 'A delicate, romantic rose with soft powdery musk.',
    description: 'Rose Elixir captures a Turkish rose absolute at its peak, softened with white musk and a whisper of vanilla. Feminine, timeless, and effortlessly elegant for day or evening.',
    notes: { top: 'Pink Pepper, Litchi', middle: 'Turkish Rose, Peony', base: 'White Musk, Vanilla' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Geraniol, Citronellol.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p04', name: 'Aseel Velvet Jasmine', category: 'Women', art: 'rose',
    price: 4400, oldPrice: null, rating: 4.6, reviews: 74, badge: 'New',
    isNew: true, stock: 20,
    short: 'Lush jasmine draped in creamy sandalwood.',
    description: 'An indulgent floral built around night-blooming jasmine, softened with tonka bean and creamy sandalwood. Velvet Jasmine feels like silk on skin.',
    notes: { top: 'Bergamot, Mandarin', middle: 'Jasmine Sambac, Ylang-Ylang', base: 'Sandalwood, Tonka Bean' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Alcohol.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p05', name: 'Aseel Ocean Breeze', category: 'Unisex', art: 'ocean',
    price: 3600, oldPrice: null, rating: 4.5, reviews: 61, badge: 'New',
    isNew: true, stock: 30,
    short: 'Crisp aquatic freshness with a mineral edge.',
    description: 'Inspired by sea air and sun-warmed driftwood, Ocean Breeze combines citrus and marine notes with a soft musk base. Clean, versatile, and effortless for daily wear.',
    notes: { top: 'Sea Salt, Bergamot', middle: 'Marine Accord, Lavender', base: 'Driftwood, White Musk' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p06', name: 'Aseel Royal Amber', category: 'Men', art: 'gold',
    price: 6200, oldPrice: 7000, rating: 4.9, reviews: 156, badge: 'Best Seller',
    isNew: false, stock: 12,
    short: 'Opulent amber and spice for the confident man.',
    description: 'Royal Amber is a statement fragrance — warm amber resin layered with clove, cedar and a touch of dark chocolate. Rich, dense, and built to last from morning to midnight.',
    notes: { top: 'Clove, Bergamot', middle: 'Cedar, Nutmeg', base: 'Amber, Dark Chocolate, Musk' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Eugenol.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p07', name: 'Aseel Blanc Musc', category: 'Women', art: 'rose',
    price: 3300, oldPrice: null, rating: 4.4, reviews: 45, badge: null,
    isNew: false, stock: 26,
    short: 'A soft, skin-like musk for everyday elegance.',
    description: 'Blanc Musc is a quiet luxury — clean cotton, soft musk and a hint of iris that reads like your own skin, only better. Understated and endlessly wearable.',
    notes: { top: 'Iris, Pear', middle: 'Cotton Flower, Violet', base: 'White Musk, Cashmere Wood' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Hexyl Cinnamal.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p08', name: 'Aseel Dark Leather', category: 'Men', art: 'noir',
    price: 4800, oldPrice: null, rating: 4.7, reviews: 89, badge: null,
    isNew: false, stock: 17,
    short: 'A smoky leather accord with a tobacco finish.',
    description: 'Dark Leather is rugged and refined — supple leather, dry tobacco leaf and smoked birch wrapped around a warm amber core. For the man who leaves a mark.',
    notes: { top: 'Birch, Bergamot', middle: 'Leather, Tobacco Leaf', base: 'Amber, Vetiver' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Isoeugenol.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p09', name: 'Aseel Citrus Vert', category: 'Unisex', art: 'ocean',
    price: 3100, oldPrice: 3600, rating: 4.3, reviews: 52, badge: 'Sale',
    isNew: false, stock: 22,
    short: 'Sparkling citrus with a green, herbal edge.',
    description: 'A bright burst of Sicilian citrus over green tea and crushed mint, grounded with light musk. Citrus Vert is the fragrance equivalent of a fresh start.',
    notes: { top: 'Sicilian Lemon, Grapefruit', middle: 'Green Tea, Mint', base: 'White Musk, Light Woods' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Citral.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p10', name: 'Aseel Imperial Saffron', category: 'Unisex', art: 'gold',
    price: 5800, oldPrice: null, rating: 4.8, reviews: 67, badge: 'New',
    isNew: true, stock: 9,
    short: 'Rare saffron and rose over a bed of soft woods.',
    description: 'Imperial Saffron pairs precious saffron threads with Bulgarian rose and creamy sandalwood — an heirloom fragrance built for those who appreciate rarity.',
    notes: { top: 'Saffron, Pink Pepper', middle: 'Rose, Violet', base: 'Sandalwood, Amber' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Farnesol.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p11', name: 'Aseel Midnight Vetiver', category: 'Men', art: 'noir',
    price: 4500, oldPrice: null, rating: 4.6, reviews: 58, badge: null,
    isNew: false, stock: 0,
    short: 'Earthy vetiver with a cool, smoky finish.',
    description: 'Midnight Vetiver is dry, green and smoky — a sophisticated fragrance built around Haitian vetiver, cedar and a trace of dark spice. Sold out — back in stock soon.',
    notes: { top: 'Grapefruit, Black Pepper', middle: 'Vetiver, Cedar', base: 'Smoked Woods, Musk' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Coumarin.',
    sizes: ['30ml', '50ml', '100ml']
  },
  {
    id: 'p12', name: 'Aseel Sweet Vanilla Orchid', category: 'Women', art: 'rose',
    price: 3700, oldPrice: null, rating: 4.5, reviews: 40, badge: null,
    isNew: false, stock: 19,
    short: 'Gourmand vanilla with a soft orchid heart.',
    description: 'A cozy, addictive gourmand — Madagascar vanilla, creamy orchid and a touch of caramel over warm musk. Sweet Vanilla Orchid is comfort in a bottle.',
    notes: { top: 'Bergamot, Pear', middle: 'Orchid, Caramel', base: 'Vanilla, Musk' },
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Vanillin.',
    sizes: ['30ml', '50ml', '100ml']
  }
];

function fmtPrice(n) { return '\u09F3' + n.toLocaleString('en-IN'); }

function starString(rating) {
  const full = Math.round(rating);
  return '\u2605'.repeat(full) + '\u2606'.repeat(5 - full);
}

function getProductById(id) { return PRODUCTS.find(p => p.id === id); }

/* Renders a single product card (used on home, shop, related products) */
function renderProductCard(p) {
  const badge = p.stock === 0
    ? `<span class="badge badge-out">Out of Stock</span>`
    : p.badge ? `<span class="badge ${p.badge === 'Sale' ? '' : 'badge-gold'}">${p.badge}</span>` : '';
  const priceHTML = p.oldPrice
    ? `<span class="price-now">${fmtPrice(p.price)}</span><span class="price-old">${fmtPrice(p.oldPrice)}</span>`
    : `<span class="price-now">${fmtPrice(p.price)}</span>`;
  const wished = isInWishlist(p.id) ? 'active' : '';
  return `
  <div class="product-card reveal in-view" data-id="${p.id}">
    ${badge}
    <div class="product-actions">
      <button class="icon-circle wishlist-btn ${wished}" data-id="${p.id}" aria-label="Add to wishlist">&#9825;</button>
      <button class="icon-circle quickview-btn" data-id="${p.id}" aria-label="Quick view">&#128065;</button>
    </div>
    <a href="product.html?id=${p.id}" class="product-media">${bottleSVG(p.art)}</a>
    <div class="product-info">
      <span class="product-cat">${p.category}</span>
      <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-rating"><span class="stars">${starString(p.rating)}</span> (${p.reviews})</div>
      <div class="product-price">${priceHTML}</div>
      <button class="add-cart-btn" data-id="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</button>
    </div>
  </div>`;
}

function renderProductGrid(list, targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="no-results"><h3>No products found</h3><p>Try adjusting your search or filters.</p></div>`;
    return;
  }
  el.innerHTML = list.map(renderProductCard).join('');
}
