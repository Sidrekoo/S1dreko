/**
 * SIDREKO Gaming Store — data.js
 * Product catalogue · 20 items · PHP pricing
 *
 * PRODUCT IMAGE GUIDE
 * ════════════════════════════════════════════════════════
 * All product images go in:  assets/products/
 *
 * Naming convention:
 *   assets/products/product-<id>.jpg
 *
 * Examples:
 *   assets/products/product-1.jpg   → Basilisk V3 Pro
 *   assets/products/product-2.jpg   → G Pro X Superlight 2
 *   assets/products/product-9.jpg   → BlackShark V2 Pro
 *   assets/products/product-20.jpg  → Tartarus Pro
 *
 * Supported formats: .jpg  .png  .webp
 * Recommended size : 500×500px minimum, square crop
 *
 * If an image file is missing, the card shows a styled
 * placeholder with the filename hint automatically.
 * ════════════════════════════════════════════════════════
 */

const PRODUCTS = [

  /* ── MOUSE ─────────────────────────────────────────── */
  {
    id: 1, category: 'Mouse', brand: 'Razer',
    name: 'Basilisk V3 Pro',
    badge: 'hot',
    price: 3299, oldPrice: 3999,
    rating: 4.8, reviews: 2847,
    fallbackIcon: '🖱️',
    desc: 'The Razer Basilisk V3 Pro is a wireless ergonomic gaming mouse with HyperScroll Tilt Wheel, 11 programmable buttons, and Chroma RGB lighting. 90-hour battery life.',
    specs: [
      ['Sensor',       'Razer Focus Pro 30K'],
      ['DPI',          '100 – 30,000'],
      ['Connectivity', 'HyperSpeed Wireless / Bluetooth'],
      ['Buttons',      '11 Programmable'],
      ['Battery',      '90 hours'],
      ['Weight',       '112g'],
    ],
  },
  {
    id: 2, category: 'Mouse', brand: 'Logitech G',
    name: 'G Pro X Superlight 2',
    badge: 'new',
    price: 4799, oldPrice: null,
    rating: 4.9, reviews: 3512,
    fallbackIcon: '🖱️',
    desc: 'The lightest pro gaming mouse ever made. Under 60g with HERO 2 sensor delivering 32,000 DPI precision. Used by esports pros worldwide.',
    specs: [
      ['Sensor',       'HERO 2 32K'],
      ['DPI',          '100 – 32,000'],
      ['Connectivity', 'LIGHTSPEED Wireless'],
      ['Buttons',      '5 Programmable'],
      ['Battery',      '95 hours'],
      ['Weight',       '<60g'],
    ],
  },
  {
    id: 3, category: 'Mouse', brand: 'Razer',
    name: 'DeathAdder V3 HyperSpeed',
    badge: null,
    price: 1899, oldPrice: 2299,
    rating: 4.6, reviews: 1204,
    fallbackIcon: '🖱️',
    desc: 'Iconic ergonomic design meets HyperSpeed wireless. Optimized Focus X sensor with 14,000 DPI for responsive, lag-free gameplay.',
    specs: [
      ['Sensor',       'Focus X 14K'],
      ['DPI',          '100 – 14,000'],
      ['Connectivity', 'HyperSpeed Wireless'],
      ['Buttons',      '6 Programmable'],
      ['Battery',      '300 hours'],
      ['Weight',       '75g'],
    ],
  },
  {
    id: 4, category: 'Mouse', brand: 'ASUS ROG',
    name: 'ROG Gladius III Wireless',
    badge: null,
    price: 3499, oldPrice: null,
    rating: 4.7, reviews: 987,
    fallbackIcon: '🖱️',
    desc: 'Tri-mode wireless gaming mouse with 36,000 DPI ROG AimPoint sensor, push-fit switch socket II, and 79-hour battery life.',
    specs: [
      ['Sensor',       'ROG AimPoint 36K'],
      ['DPI',          '50 – 36,000'],
      ['Connectivity', '2.4GHz / Bluetooth / USB'],
      ['Buttons',      '6 Programmable'],
      ['Battery',      '79 hours'],
      ['Weight',       '89g'],
    ],
  },
  {
    id: 5, category: 'Mouse', brand: 'SteelSeries',
    name: 'Rival 650 Wireless',
    badge: 'sale',
    price: 899, oldPrice: 1499,
    rating: 4.4, reviews: 563,
    fallbackIcon: '🖱️',
    desc: 'Dual optical sensors with adjustable lift-off and landing distance. Fast wireless charging — 15 min for full charge.',
    specs: [
      ['Sensor',       'Dual Optical'],
      ['DPI',          '100 – 12,000'],
      ['Connectivity', '2.4GHz Wireless'],
      ['Buttons',      '7 Programmable'],
      ['Battery',      '24 hours'],
      ['Weight',       '121g'],
    ],
  },

  /* ── KEYBOARDS ──────────────────────────────────────── */
  {
    id: 6, category: 'Keyboards', brand: 'Razer',
    name: 'DeathStalker V2 Pro',
    badge: 'new',
    price: 4799, oldPrice: null,
    rating: 4.8, reviews: 1643,
    fallbackIcon: '⌨️',
    desc: 'Ultra-low profile wireless keyboard with optical switches. HyperSpeed wireless and Bluetooth dual connection. Up to 50-hour battery.',
    specs: [
      ['Switches',     'Razer Low Profile Red Optical'],
      ['Layout',       'Full Size'],
      ['Connectivity', 'HyperSpeed + Bluetooth'],
      ['RGB',          'Razer Chroma'],
      ['Battery',      '50 hours'],
      ['Polling Rate', '1000Hz'],
    ],
  },
  {
    id: 7, category: 'Keyboards', brand: 'SteelSeries',
    name: 'Apex Pro TKL Wireless',
    badge: 'hot',
    price: 4299, oldPrice: 4999,
    rating: 4.9, reviews: 2215,
    fallbackIcon: '⌨️',
    desc: 'World\'s first keyboard with adjustable mechanical switches. Tenkeyless form factor with OmniPoint 2.0 magnetic switches — 0.1mm actuation.',
    specs: [
      ['Switches',     'OmniPoint 2.0 (0.1–4mm)'],
      ['Layout',       'Tenkeyless'],
      ['Connectivity', '2.4GHz Wireless'],
      ['RGB',          'Per-Key RGB'],
      ['Battery',      '45 hours'],
      ['Polling Rate', '8000Hz'],
    ],
  },
  {
    id: 8, category: 'Keyboards', brand: 'Corsair',
    name: 'K70 RGB Pro',
    badge: null,
    price: 3299, oldPrice: 3799,
    rating: 4.7, reviews: 1890,
    fallbackIcon: '⌨️',
    desc: 'Premium full-size gaming keyboard with Cherry MX Speed switches, 8,000Hz hyper-polling rate, and per-key RGB backlighting.',
    specs: [
      ['Switches',     'Cherry MX Speed'],
      ['Layout',       'Full Size'],
      ['Connectivity', 'USB-C Wired'],
      ['RGB',          'Per-Key RGB'],
      ['Polling Rate', '8000Hz'],
      ['Macro Keys',   'Dedicated Media'],
    ],
  },
  {
    id: 9, category: 'Keyboards', brand: 'Razer',
    name: 'Huntsman Mini 60%',
    badge: null,
    price: 1999, oldPrice: null,
    rating: 4.6, reviews: 2103,
    fallbackIcon: '⌨️',
    desc: 'Ultra-compact 60% layout with Razer Linear Optical switches. Fastest actuation at 1.0mm with 100M keystroke durability.',
    specs: [
      ['Switches',     'Razer Linear Optical Gen-2'],
      ['Layout',       '60% Compact'],
      ['Connectivity', 'USB-C Detachable'],
      ['RGB',          'Razer Chroma'],
      ['Actuation',    '1.0mm'],
      ['Lifespan',     '100M keystrokes'],
    ],
  },

  /* ── HEADSETS ───────────────────────────────────────── */
  {
    id: 10, category: 'Headsets', brand: 'Razer',
    name: 'BlackShark V2 Pro',
    badge: 'hot',
    price: 3499, oldPrice: 3999,
    rating: 4.8, reviews: 3201,
    fallbackIcon: '🎧',
    desc: 'Wireless esports headset with THX Spatial Audio and TriForce Titanium 50mm drivers. Used by professional esports athletes worldwide.',
    specs: [
      ['Drivers',      '50mm TriForce Titanium'],
      ['Audio',        'THX Spatial Audio'],
      ['Connectivity', 'HyperSpeed 2.4GHz'],
      ['Mic',          'HyperClear Super-Wideband'],
      ['Battery',      '70 hours'],
      ['Weight',       '320g'],
    ],
  },
  {
    id: 11, category: 'Headsets', brand: 'SteelSeries',
    name: 'Arctis Nova Pro Wireless',
    badge: 'new',
    price: 4999, oldPrice: null,
    rating: 4.9, reviews: 1876,
    fallbackIcon: '🎧',
    desc: 'Hi-Fi grade gaming audio with active noise cancellation and dual wireless system. Includes base station with hot-swap battery.',
    specs: [
      ['Drivers',      '40mm Neodymium'],
      ['ANC',          'Active Noise Cancellation'],
      ['Connectivity', '2.4GHz + Bluetooth 5.0'],
      ['Mic',          'Retractable ClearCast Gen 2'],
      ['Battery',      '22h + hot-swap'],
      ['Freq. Response','10–40,000Hz'],
    ],
  },
  {
    id: 12, category: 'Headsets', brand: 'HyperX',
    name: 'Cloud II Wireless',
    badge: 'sale',
    price: 1499, oldPrice: 2299,
    rating: 4.7, reviews: 4502,
    fallbackIcon: '🎧',
    desc: 'Award-winning comfort meets 7.1 virtual surround sound. Memory foam ear cushions and durable aluminum frame. 30-hour battery.',
    specs: [
      ['Drivers',      '53mm with Neodymium'],
      ['Audio',        '7.1 Virtual Surround'],
      ['Connectivity', '2.4GHz Wireless'],
      ['Mic',          'Noise-Cancelling Detachable'],
      ['Battery',      '30 hours'],
      ['Weight',       '309g'],
    ],
  },
  {
    id: 13, category: 'Headsets', brand: 'Razer',
    name: 'Kraken V3 HyperSense',
    badge: null,
    price: 2799, oldPrice: null,
    rating: 4.6, reviews: 1120,
    fallbackIcon: '🎧',
    desc: 'The first Razer headset with HyperSense haptic technology. Feel every in-game sound through intelligent vibration feedback.',
    specs: [
      ['Drivers',      '50mm Razer TriForce'],
      ['Haptics',      'HyperSense Intelligent'],
      ['Connectivity', 'USB Wired'],
      ['Mic',          'Razer HyperClear Cardioid'],
      ['Audio',        'THX 7.1 Spatial'],
      ['Weight',       '322g'],
    ],
  },

  /* ── CONTROLLERS ────────────────────────────────────── */
  {
    id: 14, category: 'Controllers', brand: 'Sony',
    name: 'DualSense Edge',
    badge: 'hot',
    price: 3999, oldPrice: null,
    rating: 4.8, reviews: 2890,
    fallbackIcon: '🎮',
    desc: 'Sony\'s official pro controller for PS5. Customizable stick caps, back buttons, adjustable trigger travel, and replaceable stick modules.',
    specs: [
      ['Platform',     'PlayStation 5'],
      ['Connectivity', 'USB-C / Bluetooth 5.1'],
      ['Battery',      'Rechargeable (12h)'],
      ['Triggers',     'Adjustable Travel'],
      ['Back Buttons', '2 Remappable'],
      ['Stick Caps',   '3 Interchangeable Sets'],
    ],
  },
  {
    id: 15, category: 'Controllers', brand: 'Razer',
    name: 'Wolverine V3 Pro',
    badge: 'new',
    price: 4299, oldPrice: null,
    rating: 4.7, reviews: 843,
    fallbackIcon: '🎮',
    desc: 'Multi-platform pro controller with 6 remappable buttons, hair-trigger mode, and 2.4GHz HyperSpeed wireless for Xbox and PC.',
    specs: [
      ['Platform',     'Xbox / PC'],
      ['Connectivity', 'HyperSpeed 2.4GHz'],
      ['Battery',      '30 hours'],
      ['Extra Buttons','6 Remappable'],
      ['Triggers',     'Hair-Trigger Mode'],
      ['D-Pad',        '8-Way Mechanical'],
    ],
  },
  {
    id: 16, category: 'Controllers', brand: 'Microsoft',
    name: 'Xbox Elite Series 2',
    badge: null,
    price: 4799, oldPrice: null,
    rating: 4.8, reviews: 6201,
    fallbackIcon: '🎮',
    desc: 'The ultimate Xbox controller with adjustable-tension thumbsticks, wrap-around rubberized grip, and 40-hour rechargeable battery.',
    specs: [
      ['Platform',     'Xbox / PC / Mobile'],
      ['Connectivity', 'Bluetooth / USB-C'],
      ['Battery',      '40 hours'],
      ['Paddles',      '4 Interchangeable'],
      ['Thumbsticks',  'Adjustable Tension'],
      ['D-Pad',        'Faceted / Standard'],
    ],
  },
  {
    id: 17, category: 'Controllers', brand: 'Razer',
    name: 'Nacon Revolution 5 Pro',
    badge: 'sale',
    price: 2899, oldPrice: 3799,
    rating: 4.5, reviews: 672,
    fallbackIcon: '🎮',
    desc: 'Professional PS5/PS4 controller with asymmetric weighted sticks, 4 back paddles, and memory foam grips. Official PlayStation licensed.',
    specs: [
      ['Platform',     'PS5 / PS4 / PC'],
      ['Connectivity', 'Wired / 2.4GHz'],
      ['Battery',      '8 hours wireless'],
      ['Paddles',      '4 Back Buttons'],
      ['Thumbsticks',  'Weighted Asymmetric'],
      ['Licensed',     'Official PlayStation'],
    ],
  },

  /* ── ACCESSORIES ────────────────────────────────────── */
  {
    id: 18, category: 'Accessories', brand: 'Razer',
    name: 'Firefly V2 Pro Mousepad',
    badge: 'new',
    price: 2299, oldPrice: null,
    rating: 4.7, reviews: 1102,
    fallbackIcon: '🕹️',
    desc: 'The world\'s first fully lit gaming mousepad. 19 lighting zones with Chroma RGB, USB passthrough, and hard surface for precision.',
    specs: [
      ['Type',         'Hard Surface'],
      ['Size',         '355 × 255 × 4mm'],
      ['RGB Zones',    '19 Lighting Zones'],
      ['USB',          'Passthrough Port'],
      ['Surface',      'Micro-textured'],
      ['Cable',        'Non-slip Rubber Base'],
    ],
  },
  {
    id: 19, category: 'Accessories', brand: 'Razer',
    name: 'Seiren V3 Mini Mic',
    badge: null,
    price: 1999, oldPrice: null,
    rating: 4.6, reviews: 789,
    fallbackIcon: '🎙️',
    desc: 'Compact USB condenser microphone with supercardioid pickup. Tap-to-mute with LED indicator — crystal clear streaming audio in a small footprint.',
    specs: [
      ['Type',         'Condenser (Supercardioid)'],
      ['Connectivity', 'USB-C'],
      ['Sample Rate',  '48kHz / 16-bit'],
      ['Polar Pattern','Supercardioid'],
      ['Mute',         'Tap-to-Mute + LED'],
      ['Weight',       '147g'],
    ],
  },
  {
    id: 20, category: 'Accessories', brand: 'Razer',
    name: 'Tartarus Pro Keypad',
    badge: 'hot',
    price: 2499, oldPrice: 2999,
    rating: 4.5, reviews: 934,
    fallbackIcon: '🕹️',
    desc: 'Analog optical gaming keypad with 32 fully programmable keys. Adjustable actuation for each key from 1.5mm to 3.6mm — infinite customization.',
    specs: [
      ['Keys',         '32 Programmable'],
      ['Switches',     'Analog Optical'],
      ['Actuation',    '1.5mm – 3.6mm Adjustable'],
      ['RGB',          'Razer Chroma Per-Key'],
      ['Wrist Rest',   'Adjustable Ergonomic'],
      ['Connectivity', 'USB-A Wired'],
    ],
  },
];

/* ── HELPER ─────────────────────────────────────────────── */
function formatPHP(amount) {
  return '₱' + Number(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
