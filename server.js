const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Product catalog content and prices are supplied by NEXOR STORE.
const products = [
  {
    id: 1,
    name: "LEGIT AIM DNS V1",
    platform: "iOS",
    categories: ["iOS"],
    badge: "ENTRY VERSION",
    tier: "ENTRY",
    rate: "25%",
    cta: "BUY NOW",
    price: 25000,
    description: "Versi pertama dari LEGIT AIM DNS untuk membantu meningkatkan kualitas aim dan rasio headshot. Cocok untuk pengguna yang ingin mencoba versi awal dengan sistem yang sederhana.",
    features: []
  },
  {
    id: 2,
    name: "LEGIT AIM DNS V2",
    platform: "iOS",
    categories: ["iOS"],
    badge: "ADVANCED",
    tier: "ADVANCED",
    rate: "50%",
    cta: "BUY NOW",
    price: 50000,
    description: "Versi lanjutan dengan peningkatan dibanding V1. Dilengkapi fitur Screen Touch Pixel untuk pengalaman penggunaan yang lebih lengkap.",
    features: ["Screen Touch Pixel"]
  },
  {
    id: 3,
    name: "LEGIT AIM DNS V3",
    platform: "iOS",
    categories: ["iOS"],
    badge: "PREMIUM",
    tier: "PREMIUM",
    rate: "75%",
    cta: "BUY PREMIUM",
    price: 75000,
    description: "Versi premium dengan peningkatan kualitas aim dan fitur tambahan EasyDrag serta AimDrag yang sudah termasuk dalam paket.",
    features: ["EasyDrag", "AimDrag"]
  },
  {
    id: 4,
    name: "PRIVATE LEGIT AIM DNS",
    platform: "iOS",
    categories: ["iOS"],
    badge: "PRIVATE",
    tier: "PRIVATE",
    cta: "GET PRIVATE ACCESS",
    price: 99000,
    description: "Paket khusus untuk pengguna private yang membutuhkan konfigurasi dan sistem penggunaan yang lebih eksklusif. Dirancang sebagai paket lengkap untuk kebutuhan competitive.",
    features: ["Private Access", "Full Set System iOS", "Exclusive Configuration", "Competitive Package"]
  },
  {
    id: 5,
    name: "AIMVX V2 — APPS iOS",
    platform: "iOS",
    categories: ["iOS", "Tools"],
    badge: "ULTIMATE TOOL",
    cta: "BUY AIMVX V2",
    price: 150000,
    description: "Tools iOS versi V2 dengan kumpulan fitur optimisasi dan konfigurasi dalam satu aplikasi.",
    features: ["Cleaner Cache & Junk Files", "Low Latency Touch", "Change Pixel iOS", "Network Optimization", "FPS Booster V2", "AimDrag AI", "Reduce Recoil Aim", "Reduce Jitter Aim", "Max Sensitivity Touch", "Max Sensitivity Pixel", "HeadLock Aim NEW"]
  },
  {
    id: 6,
    name: "XPRO TOOLS iOS",
    platform: "iOS",
    categories: ["iOS", "Tools"],
    badge: "iOS TOOL",
    cta: "BUY XPRO TOOLS",
    price: 50000,
    description: "Tools iOS dengan berbagai fitur konfigurasi dan optimisasi untuk pengalaman penggunaan yang lebih lengkap.",
    features: ["AimDrag", "Fix Recoil", "DragBoost", "Cleaner", "FPS Boost", "Reduce System Lag iOS", "Network Speed Connection"]
  },
  {
    id: 7,
    name: "SETT iOS NEW OB55",
    platform: "iOS",
    categories: ["iOS", "Settings"],
    badge: "NEW OB55",
    cta: "BUY SETTING",
    price: 15000,
    description: "Paket setting iOS terbaru untuk pengguna yang mencari konfigurasi siap digunakan.",
    features: []
  },
  {
    id: 8,
    name: "PRIVATE SET iOS FULLSET SYSTEM",
    platform: "iOS",
    categories: ["iOS", "Settings"],
    badge: "PRIVATE",
    tier: "PRIVATE",
    cta: "BUY PRIVATE SET",
    price: 20000,
    description: "Paket setting iOS private dengan konfigurasi fullset system dalam satu paket.",
    features: []
  },
  {
    id: 9,
    name: "LEGIT AIM V1",
    platform: "Android",
    categories: ["Android"],
    badge: "ENTRY VERSION",
    tier: "ENTRY",
    rate: "25%",
    cta: "BUY NOW",
    price: 25000,
    description: "Versi awal LEGIT AIM untuk Android dengan konfigurasi sederhana dan fokus pada peningkatan pengalaman aim.",
    features: []
  },
  {
    id: 10,
    name: "LEGIT AIM V2",
    platform: "Android",
    categories: ["Android"],
    badge: "ADVANCED",
    tier: "ADVANCED",
    rate: "50%",
    cta: "BUY NOW",
    price: 50000,
    description: "Versi lanjutan dengan konfigurasi yang lebih lengkap dibanding V1 untuk pengguna Android.",
    features: []
  },
  {
    id: 11,
    name: "LEGIT AIM V3",
    platform: "Android",
    categories: ["Android"],
    badge: "PREMIUM",
    tier: "PREMIUM",
    rate: "75%",
    cta: "BUY PREMIUM",
    price: 75000,
    description: "Versi premium dengan konfigurasi yang lebih lengkap serta fitur tambahan untuk pengguna Android.",
    features: []
  },
  {
    id: 12,
    name: "PRIVATE LEGIT AIM ANDROID",
    platform: "Android",
    categories: ["Android"],
    badge: "PRIVATE",
    tier: "PRIVATE",
    cta: "GET PRIVATE ACCESS",
    price: 99000,
    description: "Paket private Android dengan konfigurasi eksklusif dan fullset untuk pengguna yang membutuhkan paket lebih lengkap.",
    features: ["Private Access", "Full Set System Android", "Exclusive Configuration", "Competitive Package"]
  },
  {
    id: 13,
    name: "XPRO EXT ANDROID",
    platform: "Android",
    categories: ["Android", "Tools"],
    badge: "EXTENDED",
    cta: "BUY XPRO EXT",
    price: 180000,
    description: "Tools Android versi extended dengan paket fitur yang lebih lengkap untuk konfigurasi dan optimisasi perangkat.",
    features: []
  },
  {
    id: 14,
    name: "CLOUD NXR",
    platform: "Android",
    categories: ["Android", "Tools"],
    badge: "CLOUD TOOL",
    cta: "BUY CLOUD NXR",
    price: 50000,
    description: "Tools Android CLOUD NXR dengan konfigurasi lengkap dalam satu paket untuk pengguna yang menginginkan pengalaman penggunaan yang praktis.",
    features: []
  },
  {
    id: 15,
    name: "INTERNAL STREAMER PANEL BASIC",
    platform: "PC",
    categories: ["PC"],
    badge: "STREAMER PANEL",
    cta: "GET PANEL",
    description: "Panel PC untuk kebutuhan gaming dengan fitur aim, visual, dan streamer access dalam satu paket.",
    features: [],
    featureGroups: [
      { title: "AIM FEATURES", features: ["Aimbot Rage Head", "Aimbot Neck", "Aimbot Body", "Aimbot Left Shoulder", "Aimbot Right Shoulder", "Aimbot Chest", "Automatic Drag", "HeadLock"] },
      { title: "VISUAL FEATURES", features: ["ESP Line", "ESP AimTrack", "ESP FOV", "ESP Box", "ESP Skeleton", "ESP Health"] },
      { title: "SYSTEM & COMPATIBILITY", features: ["Stream Access", "Windows 11 Support", "Windows 10 Support", "Custom Windows OS Support"] }
    ],
    accessOptions: [
      { id: "1-day", label: "1 DAY", accessType: "1 DAY", price: 10000 },
      { id: "7-days", label: "7 DAYS", accessType: "7 DAYS", price: 50000 },
      { id: "15-days", label: "15 DAYS", accessType: "15 DAYS", price: 100000 },
      { id: "31-days", label: "31 DAYS", accessType: "31 DAYS", price: 155000 },
      { id: "lifetime", label: "LIFETIME", accessType: "LIFETIME", price: 550000 }
    ]
  },
  {
    id: 16,
    name: "HIDDEN PANEL NXRPLOIT CHEATS",
    platform: "PC",
    categories: ["PC"],
    badge: "NXRPLOIT PRIVATE",
    cta: "GET NXRPLOIT ACCESS",
    description: "Panel premium NXRPLOIT dengan paket fitur aim dan compatibility untuk pengguna PC dan emulator.",
    features: [],
    featureGroups: [
      { title: "FEATURES", features: ["Aimbot Head", "Aimbot Neck", "AimDrag", "Aimbot Drag"] },
      { title: "COMPATIBILITY", features: ["Emulator Support", "Multiple Emulator Versions", "Windows Support"] },
      { title: "ACCESS", features: ["Hidden Access", "Private Panel Access"] }
    ],
    accessOptions: [
      { id: "1-month", label: "1 MONTH", accessType: "1 MONTH", price: 350000 },
      { id: "lifetime", label: "LIFETIME", accessType: "LIFETIME", price: 999000 }
    ]
  },
  {
    id: 17,
    name: "SENS X IOS PRO APPS",
    platform: "iOS",
    categories: ["iOS", "Tools"],
    badge: "PRO TOOL",
    cta: "GET SENS X PRO",
    price: 30000,
    description: "SENS X IOS PRO APPS dengan fitur aim, system, dan gameboost. Lifetime access tersedia dengan harga promo Rp250.000 dari harga normal Rp389.000, untuk jumlah pembeli terbatas.",
    features: [],
    featureGroups: [
      { title: "FITUR AIM", features: ["Aimbot Drag AI", "Fix Recoil", "Reduce Jitter Aim", "New Headlock"] },
      { title: "FITUR SYSTEM", features: ["Max Touch Sensitivity", "Boost FPS", "Up Sens X and Y", "Max Screen Pixel", "Cleaner All Junks File", "RAM Cleaner", "Optimisasi jaringan Wi-Fi dan data"] },
      { title: "FITUR GAMEBOOST", features: ["Support all FF app dari App Store", "Full FPS Booster", "Max Performance Mode"] }
    ],
    accessOptions: [
      { id: "1-day", label: "1 HARI", accessType: "1 HARI", price: 30000 },
      { id: "7-days", label: "7 HARI", accessType: "7 HARI", price: 100000 },
      { id: "15-days", label: "15 HARI", accessType: "15 HARI", price: 155000 },
      { id: "31-days", label: "31 HARI", accessType: "31 HARI", price: 235000 },
      { id: "lifetime", label: "LIFETIME — PROMO", accessType: "LIFETIME", price: 250000, originalPrice: 389000, promotion: "PROMO UNTUK JUMLAH PEMBELI TERBATAS" }
    ]
  }
];

// API Endpoints
app.get('/api/products', (req, res) => {
  const { category, tier, search } = req.query;
  let filtered = [...products];

  if (category && category !== 'All') {
    const normalizedCategory = category.toLowerCase();
    if (normalizedCategory === 'ios-tools' || normalizedCategory === 'android-tools') {
      const platform = normalizedCategory.startsWith('ios-') ? 'ios' : 'android';
      filtered = filtered.filter(p => p.platform.toLowerCase() === platform
        && p.categories.some(item => item.toLowerCase() === 'tools'));
    } else {
      filtered = filtered.filter(p => p.categories.some(item => item.toLowerCase() === normalizedCategory));
    }
  }

  if (tier && tier !== 'All') {
    filtered = filtered.filter(p => p.tier && p.tier.toLowerCase() === tier.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query)
      || p.description.toLowerCase().includes(query)
      || p.platform.toLowerCase().includes(query)
      || p.categories.some(categoryName => categoryName.toLowerCase().includes(query))
      || p.badge.toLowerCase().includes(query)
      || p.features.some(feature => feature.toLowerCase().includes(query))
      || (p.featureGroups || []).some(group => group.title.toLowerCase().includes(query)
        || group.features.some(feature => feature.toLowerCase().includes(query))));
  }

  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
  res.json(product);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NEXOR STORE running at http://localhost:${PORT}`);
  });
}

module.exports = app;
