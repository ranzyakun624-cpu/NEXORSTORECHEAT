let cart = [];
let allProducts = [];
const STORE_WHATSAPP = '6281213768262';
let activeCategory = 'All';
let activeTier = 'All';
let revealObserver;
let activeDetailProductId = null;
const selectedAccessOptions = new Map();
const fallbackProducts = [
  { id: 1, name: 'LEGIT AIM DNS V1', platform: 'iOS', categories: ['iOS'], badge: 'ENTRY VERSION', tier: 'ENTRY', rate: '25%', cta: 'BUY NOW', price: 25000, description: 'Versi pertama dari LEGIT AIM DNS untuk pengguna iOS.', features: [] },
  { id: 2, name: 'LEGIT AIM DNS V2', platform: 'iOS', categories: ['iOS'], badge: 'ADVANCED', tier: 'ADVANCED', rate: '50%', cta: 'BUY NOW', price: 50000, description: 'Versi lanjutan LEGIT AIM DNS dengan fitur Screen Touch Pixel.', features: ['Screen Touch Pixel'] },
  { id: 3, name: 'LEGIT AIM DNS V3', platform: 'iOS', categories: ['iOS'], badge: 'PREMIUM', tier: 'PREMIUM', rate: '75%', cta: 'BUY PREMIUM', price: 75000, description: 'Versi premium dengan fitur tambahan EasyDrag dan AimDrag.', features: ['EasyDrag', 'AimDrag'] },
  { id: 4, name: 'PRIVATE LEGIT AIM DNS', platform: 'iOS', categories: ['iOS'], badge: 'PRIVATE', tier: 'PRIVATE', cta: 'GET PRIVATE ACCESS', price: 99000, description: 'Paket khusus iOS dengan konfigurasi private.', features: ['Private Access', 'Full Set System iOS', 'Exclusive Configuration', 'Competitive Package'] },
  { id: 5, name: 'AIMVX V2 — APPS iOS', platform: 'iOS', categories: ['iOS', 'Tools'], badge: 'ULTIMATE TOOL', cta: 'BUY AIMVX V2', price: 150000, description: 'Tools iOS versi V2 dengan kumpulan fitur optimisasi dan konfigurasi.', features: ['Cleaner Cache & Junk Files', 'Low Latency Touch', 'Change Pixel iOS', 'Network Optimization', 'FPS Booster V2', 'AimDrag AI', 'Reduce Recoil Aim', 'Reduce Jitter Aim', 'Max Sensitivity Touch', 'Max Sensitivity Pixel', 'HeadLock Aim NEW'] },
  { id: 6, name: 'XPRO TOOLS iOS', platform: 'iOS', categories: ['iOS', 'Tools'], badge: 'iOS TOOL', cta: 'BUY XPRO TOOLS', price: 50000, description: 'Tools iOS dengan fitur konfigurasi dan optimisasi.', features: ['AimDrag', 'Fix Recoil', 'DragBoost', 'Cleaner', 'FPS Boost', 'Reduce System Lag iOS', 'Network Speed Connection'] },
  { id: 7, name: 'SETT iOS NEW OB55', platform: 'iOS', categories: ['iOS', 'Settings'], badge: 'NEW OB55', cta: 'BUY SETTING', price: 15000, description: 'Paket setting iOS terbaru.', features: [] },
  { id: 8, name: 'PRIVATE SET iOS FULLSET SYSTEM', platform: 'iOS', categories: ['iOS', 'Settings'], badge: 'PRIVATE', tier: 'PRIVATE', cta: 'BUY PRIVATE SET', price: 20000, description: 'Paket setting iOS private dengan konfigurasi fullset system.', features: [] },
  { id: 9, name: 'LEGIT AIM V1', platform: 'Android', categories: ['Android'], badge: 'ENTRY VERSION', tier: 'ENTRY', rate: '25%', cta: 'BUY NOW', price: 25000, description: 'Versi awal LEGIT AIM untuk Android.', features: [] },
  { id: 10, name: 'LEGIT AIM V2', platform: 'Android', categories: ['Android'], badge: 'ADVANCED', tier: 'ADVANCED', rate: '50%', cta: 'BUY NOW', price: 50000, description: 'Versi lanjutan LEGIT AIM untuk Android.', features: [] },
  { id: 11, name: 'LEGIT AIM V3', platform: 'Android', categories: ['Android'], badge: 'PREMIUM', tier: 'PREMIUM', rate: '75%', cta: 'BUY PREMIUM', price: 75000, description: 'Versi premium LEGIT AIM untuk Android.', features: [] },
  { id: 12, name: 'PRIVATE LEGIT AIM ANDROID', platform: 'Android', categories: ['Android'], badge: 'PRIVATE', tier: 'PRIVATE', cta: 'GET PRIVATE ACCESS', price: 99000, description: 'Paket private Android dengan konfigurasi eksklusif.', features: ['Private Access', 'Full Set System Android', 'Exclusive Configuration', 'Competitive Package'] },
  { id: 13, name: 'XPRO EXT ANDROID', platform: 'Android', categories: ['Android', 'Tools'], badge: 'EXTENDED', cta: 'BUY XPRO EXT', price: 180000, description: 'Tools Android versi extended.', features: [] },
  { id: 14, name: 'CLOUD NXR', platform: 'Android', categories: ['Android', 'Tools'], badge: 'CLOUD TOOL', cta: 'BUY CLOUD NXR', price: 50000, description: 'Tools Android CLOUD NXR dengan konfigurasi dalam satu paket.', features: [] },
  { id: 15, name: 'INTERNAL STREAMER PANEL BASIC', platform: 'PC', categories: ['PC'], badge: 'STREAMER PANEL', cta: 'GET PANEL', description: 'Panel PC dengan opsi akses fleksibel.', features: [], featureGroups: [{ title: 'FEATURES', features: ['Aim features', 'Visual features', 'Windows 10/11 support'] }], accessOptions: [{ id: '1-day', label: '1 DAY', accessType: '1 DAY', price: 10000 }, { id: '7-days', label: '7 DAYS', accessType: '7 DAYS', price: 50000 }, { id: '15-days', label: '15 DAYS', accessType: '15 DAYS', price: 100000 }, { id: '31-days', label: '31 DAYS', accessType: '31 DAYS', price: 155000 }, { id: 'lifetime', label: 'LIFETIME', accessType: 'LIFETIME', price: 550000 }] },
  { id: 16, name: 'HIDDEN PANEL NXRPLOIT CHEATS', platform: 'PC', categories: ['PC'], badge: 'NXRPLOIT PRIVATE', cta: 'GET NXRPLOIT ACCESS', description: 'Panel PC dengan opsi akses bulanan dan lifetime.', features: [], featureGroups: [{ title: 'FEATURES', features: ['Aim features', 'Emulator support', 'Windows support'] }], accessOptions: [{ id: '1-month', label: '1 MONTH', accessType: '1 MONTH', price: 350000 }, { id: 'lifetime', label: 'LIFETIME', accessType: 'LIFETIME', price: 999000 }] },
  { id: 17, name: 'SENS X IOS PRO APPS', platform: 'iOS', categories: ['iOS', 'Tools'], badge: 'PRO TOOL', cta: 'GET SENS X PRO', price: 30000, description: 'SENS X IOS PRO APPS dengan fitur aim, system, dan gameboost. Lifetime access tersedia dengan harga promo Rp250.000 dari harga normal Rp389.000, untuk jumlah pembeli terbatas.', features: [], featureGroups: [{ title: 'FITUR AIM', features: ['Aimbot Drag AI', 'Fix Recoil', 'Reduce Jitter Aim', 'New Headlock'] }, { title: 'FITUR SYSTEM', features: ['Max Touch Sensitivity', 'Boost FPS', 'Up Sens X and Y', 'Max Screen Pixel', 'Cleaner All Junks File', 'RAM Cleaner', 'Optimisasi jaringan Wi-Fi dan data'] }, { title: 'FITUR GAMEBOOST', features: ['Support all FF app dari App Store', 'Full FPS Booster', 'Max Performance Mode'] }], accessOptions: [{ id: '1-day', label: '1 HARI', accessType: '1 HARI', price: 30000 }, { id: '7-days', label: '7 HARI', accessType: '7 HARI', price: 100000 }, { id: '15-days', label: '15 HARI', accessType: '15 HARI', price: 155000 }, { id: '31-days', label: '31 HARI', accessType: '31 HARI', price: 235000 }, { id: 'lifetime', label: 'LIFETIME — PROMO', accessType: 'LIFETIME', price: 250000, originalPrice: 389000, promotion: 'PROMO UNTUK JUMLAH PEMBELI TERBATAS' }] }
];

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  setupMotionToggle();
  setupSplashScreen();
  fetchProducts();
  setupEventListeners();
  setupStarfield();
  setupPointerGlow();
  setupCustomCursor();
  setupScrollProgress();
  setupCosmicScene();
  setupRevealObserver();
});

function setupMotionToggle() {
  const toggle = document.getElementById('motionToggle');
  const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const setMotion = (enabled) => {
    document.documentElement.classList.toggle('motion-enabled', enabled);
    document.documentElement.classList.toggle('motion-disabled', !enabled);
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Turn galaxy motion off' : 'Turn galaxy motion on');
    toggle.title = enabled ? 'Turn galaxy motion off' : 'Turn galaxy motion on';
    toggle.innerHTML = `<i class="fa-solid ${enabled ? 'fa-circle-pause' : 'fa-circle-play'}" aria-hidden="true"></i><span>MOTION ${enabled ? 'ON' : 'OFF'}</span>`;
    window.dispatchEvent(new CustomEvent('nxrploit-motion-change', { detail: { enabled } }));
  };

  setMotion(true);
  toggle.addEventListener('click', () => {
    setMotion(toggle.getAttribute('aria-pressed') !== 'true');
  });
  reducedMotionPreference.addEventListener?.('change', (event) => {
    setMotion(!event.matches);
  });
}

function setupSplashScreen() {
  const splash = document.getElementById('splashScreen');
  const percent = document.getElementById('splashPercent');
  const minimumDisplayTime = 3200;
  const startedAt = performance.now();
  let animationFrame;

  function updateProgress(now) {
    const progress = Math.min(100, Math.floor(((now - startedAt) / minimumDisplayTime) * 100));
    percent.textContent = `${String(progress).padStart(2, '0')}%`;
    if (progress < 100) animationFrame = window.requestAnimationFrame(updateProgress);
  }

  animationFrame = window.requestAnimationFrame(updateProgress);
  window.setTimeout(() => {
    window.cancelAnimationFrame(animationFrame);
    percent.textContent = '100%';
    splash.classList.add('is-leaving');
    window.setTimeout(() => {
      splash.hidden = true;
      document.documentElement.classList.add('splash-complete');
    }, 650);
  }, minimumDisplayTime);
}

// Fetch products from backend API
async function fetchProducts(category = activeCategory, search = '', tier = activeTier) {
  try {
    let url = '/api/products';
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (tier && tier !== 'All') params.append('tier', tier);
    if (search) params.append('search', search);
    
    if (params.toString()) {
      url += '?' + params.toString();
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const products = await response.json();
    if (!Array.isArray(products)) throw new Error('Respons API katalog tidak valid');
    allProducts = products;
    renderProducts(allProducts);
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    const query = search.trim().toLowerCase();
    allProducts = fallbackProducts.filter((product) => {
      const normalizedCategory = category.toLowerCase();
      const matchesCategory = !category || category === 'All'
        || (normalizedCategory === 'ios-tools' && product.platform.toLowerCase() === 'ios' && product.categories.includes('Tools'))
        || (normalizedCategory === 'android-tools' && product.platform.toLowerCase() === 'android' && product.categories.includes('Tools'))
        || product.categories.some(item => item.toLowerCase() === normalizedCategory);
      const matchesTier = !tier || tier === 'All' || (product.tier && product.tier.toLowerCase() === tier.toLowerCase());
      const searchableText = [product.name, product.description, product.platform, product.badge, ...product.categories, ...product.features, ...(product.featureGroups || []).flatMap(group => [group.title, ...group.features])].join(' ').toLowerCase();
      return matchesCategory && matchesTier && (!query || searchableText.includes(query));
    });
    renderProducts(allProducts);
  }
}

// Render product list to DOM
function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  if (products.length === 0) {
    grid.innerHTML = `<div class="no-results reveal"><i class="fa-solid fa-satellite"></i><h3>Belum ada sinyal di area ini</h3><p>Coba kata kunci atau kategori lain.</p></div>`;
    observeRevealElements(grid);
    return;
  }

  grid.innerHTML = products.map(product => {
    const access = getSelectedAccess(product);
    const price = access ? access.price : product.price;
    const accessType = access ? access.accessType : 'PERMANENT • LIFETIME ACCESS KEY';
    const isLifetime = access ? access.accessType === 'LIFETIME' : true;
    const featureContent = product.featureGroups
      ? product.featureGroups.map(group => `<section class="product-feature-group"><h4>${group.title}</h4><ul class="product-feature-list">${group.features.map(feature => `<li>${feature}</li>`).join('')}</ul></section>`).join('')
      : product.features.length ? `<section class="product-feature-group"><h4>FEATURES</h4><ul class="product-feature-list">${product.features.map(feature => `<li>${feature}</li>`).join('')}</ul></section>` : '';
    const pricingContent = product.accessOptions
      ? `<div class="access-selector"><span class="feature-label">ACCESS PERIOD</span><div class="access-option-list">${product.accessOptions.map(option => `<button type="button" class="access-option-btn ${option.id === access.id ? 'active' : ''}" data-product-id="${product.id}" data-access-id="${option.id}" aria-pressed="${option.id === access.id}">${option.label}</button>`).join('')}</div></div>`
      : '';
    const platformIcon = product.platform === 'iOS'
      ? '<i class="fa-brands fa-apple"></i>'
      : product.platform === 'PC' ? '<i class="fa-solid fa-desktop"></i>' : '<i class="fa-brands fa-android"></i>';

    return `<div class="product-card" data-product-card="${product.id}">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-badges"><span class="platform-badge ${product.platform.toLowerCase()}">${platformIcon} ${product.platform}</span><span class="product-badge ${product.badge.toLowerCase().replace(/[^a-z]+/g, '-')}">${product.badge}</span></div>
        <p class="product-description">${product.description}</p>
        ${product.rate ? `<p class="product-rate">RATE <strong>${product.rate}</strong></p>` : ''}
        ${featureContent}
        ${pricingContent}
        <div class="product-price-row"><span class="product-price" data-product-price="${product.id}">Rp${price.toLocaleString('id-ID')}</span><del class="price-original" data-original-price="${product.id}" ${access?.originalPrice ? '' : 'hidden'}>Rp${access?.originalPrice?.toLocaleString('id-ID') || ''}</del><span class="lifetime-badge" data-lifetime-badge="${product.id}" ${isLifetime ? '' : 'hidden'}>LIFETIME ACCESS</span></div>
        <p class="product-access-copy"><span class="access-type-label">ACCESS TYPE</span><strong data-access-type="${product.id}">${accessType}</strong></p>
        <div class="product-actions">
          <button class="product-detail-trigger" type="button" data-product-detail="${product.id}">DETAILS <i class="fa-solid fa-arrow-right"></i></button>
          <button class="add-to-cart-btn" type="button" onclick="addToCart(${product.id})">${product.cta}</button>
        </div>
      </div>
    </div>`;
  }).join('');
  observeRevealElements(grid);
}

function getSelectedAccess(product) {
  if (!product.accessOptions) return null;
  const selectedId = selectedAccessOptions.get(product.id);
  return product.accessOptions.find(option => option.id === selectedId) || product.accessOptions[0];
}

function updateCardAccess(card, product, access) {
  selectedAccessOptions.set(product.id, access.id);
  card.querySelectorAll('.access-option-btn').forEach((button) => {
    const selected = button.dataset.accessId === access.id;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  card.querySelector(`[data-product-price="${product.id}"]`).textContent = `Rp${access.price.toLocaleString('id-ID')}`;
  const originalPrice = card.querySelector(`[data-original-price="${product.id}"]`);
  originalPrice.hidden = !access.originalPrice;
  originalPrice.textContent = access.originalPrice ? `Rp${access.originalPrice.toLocaleString('id-ID')}` : '';
  card.querySelector(`[data-access-type="${product.id}"]`).textContent = access.accessType;
  card.querySelector(`[data-lifetime-badge="${product.id}"]`).hidden = access.accessType !== 'LIFETIME';
}

// Add item to cart
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const access = getSelectedAccess(product);
  const cartKey = `${productId}:${access ? access.id : 'permanent'}`;
  const existingItem = cart.find(item => item.cartKey === cartKey);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, price: access ? access.price : product.price, accessType: access ? access.accessType : 'PERMANENT • LIFETIME ACCESS KEY', cartKey, qty: 1 });
  }

  updateCartUI();
  openCartDrawer();
}

// Remove item from cart
function removeFromCart(cartKey) {
  cart = cart.filter(item => item.cartKey !== cartKey);
  updateCartUI();
}

// Update Cart UI Drawer
function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart" style="text-align: center; color: var(--text-muted); margin-top: 20px;">Keranjangmu masih kosong.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-orb" aria-hidden="true"><i class="fa-solid fa-key"></i></span>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${item.accessType} · ${item.qty}x Rp ${item.price.toLocaleString('id-ID')}</div>
      </div>
      <button class="remove-item" onclick="removeFromCart('${item.cartKey}')">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

// Event Listeners
function setupEventListeners() {
  const cartToggle = document.getElementById('cartToggle');
  const closeCart = document.getElementById('closeCart');
  const overlay = document.getElementById('overlay');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categoriesFilter = document.getElementById('categoriesFilter');
  const tierFilter = document.getElementById('tierFilter');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const productDialog = document.getElementById('productDialog');
  const closeProductDialog = document.getElementById('closeProductDialog');
  const detailAddToCart = document.getElementById('detailAddToCart');
  const detailAccessOptions = document.getElementById('detailAccessOptions');
  const pcCollectionIntro = document.getElementById('pcCollectionIntro');

  cartToggle.addEventListener('click', openCartDrawer);
  closeCart.addEventListener('click', closeCartDrawer);
  overlay.addEventListener('click', closeCartDrawer);
  closeProductDialog.addEventListener('click', () => productDialog.close());
  productDialog.addEventListener('click', (event) => {
    if (event.target === productDialog) productDialog.close();
  });
  detailAddToCart.addEventListener('click', () => {
    if (activeDetailProductId !== null) addToCart(activeDetailProductId);
    productDialog.close();
  });
  detailAccessOptions.addEventListener('click', (event) => {
    const button = event.target.closest('.access-option-btn');
    if (!button) return;
    const product = allProducts.find(item => item.id === activeDetailProductId);
    const access = product?.accessOptions?.find(option => option.id === button.dataset.accessId);
    if (!product || !access) return;
    selectedAccessOptions.set(product.id, access.id);
    detailAccessOptions.querySelectorAll('.access-option-btn').forEach(optionButton => {
      const selected = optionButton.dataset.accessId === access.id;
      optionButton.classList.toggle('active', selected);
      optionButton.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('detailPrice').textContent = `Rp${access.price.toLocaleString('id-ID')}`;
    const detailOriginalPrice = document.getElementById('detailOriginalPrice');
    detailOriginalPrice.hidden = !access.originalPrice;
    detailOriginalPrice.textContent = access.originalPrice ? `Rp${access.originalPrice.toLocaleString('id-ID')}` : '';
    document.getElementById('detailAccessCopy').textContent = access.accessType;
    document.getElementById('detailAccessBadge').hidden = access.accessType !== 'LIFETIME';
    const card = document.querySelector(`[data-product-card="${product.id}"]`);
    if (card) updateCardAccess(card, product, access);
  });

  searchBtn.addEventListener('click', () => fetchProducts(activeCategory, searchInput.value, activeTier));

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchProducts(activeCategory, searchInput.value, activeTier);
  });

  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchProducts(activeCategory, searchInput.value, activeTier), 220);
  });

  categoriesFilter.addEventListener('click', (e) => {
    const filterButton = e.target.closest('.filter-btn');
    if (filterButton) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      filterButton.classList.add('active');
      activeCategory = filterButton.dataset.category;
      pcCollectionIntro.hidden = activeCategory !== 'PC';
      if (activeCategory === 'PC') {
        activeTier = 'All';
        tierFilter.querySelectorAll('.tier-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tier === 'All'));
      }
      fetchProducts(activeCategory, searchInput.value, activeTier);
    }
  });

  tierFilter.addEventListener('click', (e) => {
    const filterButton = e.target.closest('.tier-btn');
    if (!filterButton) return;
    tierFilter.querySelectorAll('.tier-btn').forEach(btn => btn.classList.remove('active'));
    filterButton.classList.add('active');
    activeTier = filterButton.dataset.tier;
    fetchProducts(activeCategory, searchInput.value, activeTier);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCartDrawer();
  });

  const productGrid = document.getElementById('productGrid');
  productGrid.addEventListener('click', (event) => {
    const accessButton = event.target.closest('.access-option-btn');
    if (!accessButton) return;
    const product = allProducts.find(item => item.id === Number(accessButton.dataset.productId));
    const access = product?.accessOptions?.find(option => option.id === accessButton.dataset.accessId);
    const card = accessButton.closest('.product-card');
    if (product && access && card) updateCardAccess(card, product, access);
  });
  productGrid.addEventListener('click', (event) => {
    const detailButton = event.target.closest('[data-product-detail]');
    if (!detailButton) return;
    const product = allProducts.find(item => item.id === Number(detailButton.dataset.productDetail));
    if (product) openProductDetails(product);
  });
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Keranjang belanja kamu masih kosong!");
      return;
    }
    
    let text = "Halo Admin NEXOR STORE, saya ingin membeli produk berikut:\n\n";
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.name} — ${item.accessType} (${item.qty}x) - Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
    });
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    text += `\n*Total Belanja:* Rp ${totalPrice.toLocaleString('id-ID')}`;

    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  });
}

function openProductDetails(product) {
  activeDetailProductId = product.id;
  const dialog = document.getElementById('productDialog');
  document.getElementById('detailPlatform').textContent = product.platform;
  document.getElementById('detailType').textContent = product.categories.filter(category => category !== product.platform).join(' · ');
  const detailBadge = document.getElementById('detailBadge');
  detailBadge.textContent = product.badge;
  detailBadge.className = `product-badge ${product.badge.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailDescription').textContent = product.description;
  const access = getSelectedAccess(product);
  document.getElementById('detailPrice').textContent = `Rp${(access ? access.price : product.price).toLocaleString('id-ID')}`;
  const detailOriginalPrice = document.getElementById('detailOriginalPrice');
  detailOriginalPrice.hidden = !access?.originalPrice;
  detailOriginalPrice.textContent = access?.originalPrice ? `Rp${access.originalPrice.toLocaleString('id-ID')}` : '';
  document.getElementById('detailAccessBadge').textContent = 'LIFETIME ACCESS';
  document.getElementById('detailAccessBadge').hidden = access ? access.accessType !== 'LIFETIME' : false;
  document.getElementById('detailAccessCopy').textContent = access ? access.accessType : 'PERMANENT • LIFETIME ACCESS KEY';
  document.getElementById('detailRate').textContent = product.rate ? `RATE ${product.rate}` : '';
  document.getElementById('detailAddToCart').textContent = product.cta;

  const detailAccessSelector = document.getElementById('detailAccessSelector');
  const detailAccessOptions = document.getElementById('detailAccessOptions');
  detailAccessSelector.hidden = !product.accessOptions;
  detailAccessOptions.replaceChildren(...(product.accessOptions || []).map((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `access-option-btn ${option.id === access.id ? 'active' : ''}`;
    button.dataset.accessId = option.id;
    button.setAttribute('aria-pressed', String(option.id === access.id));
    button.textContent = option.label;
    return button;
  }));

  const featureList = document.getElementById('detailFeatures');
  featureList.hidden = product.features.length === 0;
  document.getElementById('detailFeatureLabel').hidden = product.features.length === 0;
  featureList.replaceChildren(...product.features.map((feature) => {
    const item = document.createElement('li');
    item.textContent = feature;
    return item;
  }));
  if (product.featureGroups) {
    featureList.replaceChildren(...product.featureGroups.flatMap(group => {
      const heading = document.createElement('li');
      heading.className = 'detail-feature-group-title';
      heading.textContent = group.title;
      return [heading, ...group.features.map(feature => {
        const item = document.createElement('li');
        item.textContent = feature;
        return item;
      })];
    }));
    featureList.hidden = false;
    document.getElementById('detailFeatureLabel').hidden = true;
  }

  dialog.showModal();
}

function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

function setupStarfield() {
  const canvas = document.getElementById('starfield');
  const context = canvas.getContext('2d');
  const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = reducedMotionPreference.matches && !document.documentElement.classList.contains('motion-enabled');
  const pointer = { x: -1000, y: -1000 };
  let stars = [];
  let shootingStars = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let animationId;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(110, Math.max(32, Math.floor(width * height / 13500)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.35 + .25,
      alpha: Math.random() * .55 + .25,
      phase: Math.random() * Math.PI * 2,
      drift: Math.random() * .22 + .035,
      tint: Math.random() > .84 ? '112, 224, 255' : '227, 234, 255'
    }));
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    frame += reducedMotion ? 0 : .018;

    stars.forEach((star) => {
      if (!reducedMotion) {
        star.y += star.drift;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }
      }
      const shimmer = reducedMotion ? 1 : .55 + Math.sin(frame + star.phase) * .35;
      const alpha = star.alpha * shimmer;
      context.beginPath();
      context.fillStyle = `rgba(${star.tint}, ${alpha})`;
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();

      const dx = pointer.x - star.x;
      const dy = pointer.y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 125) {
        context.beginPath();
        context.fillStyle = `rgba(158, 197, 255, ${(1 - distance / 125) * .55})`;
        context.arc(star.x, star.y, star.radius + (1 - distance / 125) * 1.1, 0, Math.PI * 2);
        context.fill();
      }
    });

    if (!reducedMotion && Math.random() < .007 && shootingStars.length < 2) {
      shootingStars.push({ x: Math.random() * width, y: Math.random() * height * .55, life: 0, length: Math.random() * 90 + 60, speed: Math.random() * 7 + 6 });
    }
    shootingStars = shootingStars.filter((meteor) => meteor.life < 1);
    shootingStars.forEach((meteor) => {
      meteor.x += meteor.speed;
      meteor.y += meteor.speed * .32;
      meteor.life += .022;
      const gradient = context.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.length, meteor.y - meteor.length * .32);
      gradient.addColorStop(0, 'rgba(138, 232, 255, .85)');
      gradient.addColorStop(1, 'rgba(138, 232, 255, 0)');
      context.beginPath();
      context.strokeStyle = gradient;
      context.lineWidth = 1.4;
      context.moveTo(meteor.x, meteor.y);
      context.lineTo(meteor.x - meteor.length, meteor.y - meteor.length * .32);
      context.stroke();
    });

    if (!reducedMotion && !document.hidden) animationId = window.requestAnimationFrame(draw);
  }

  function updateMotion(event) {
    reducedMotion = !event.detail.enabled;
    if (reducedMotion || document.hidden) {
      window.cancelAnimationFrame(animationId);
    } else {
      window.cancelAnimationFrame(animationId);
      draw();
    }
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('nxrploit-motion-change', updateMotion);
  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.cancelAnimationFrame(animationId);
    else if (!reducedMotion) draw();
  });
  resize();
}

function setupPointerGlow() {
  const glow = document.getElementById('pointerGlow');
  if (window.matchMedia('(pointer: coarse)').matches) return;
  window.addEventListener('pointermove', (event) => {
    glow.style.transform = `translate(${event.clientX - 160}px, ${event.clientY - 160}px)`;
  }, { passive: true });
}

function setupCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  window.addEventListener('pointermove', (event) => {
    dot.style.transform = `translate3d(${event.clientX - 2}px, ${event.clientY - 2}px, 0)`;
    ring.style.transform = `translate3d(${event.clientX - 15}px, ${event.clientY - 15}px, 0)`;
  }, { passive: true });
  document.addEventListener('pointerover', (event) => {
    if (event.target.closest('a, button, input, [data-product-detail]')) ring.classList.add('is-hovering');
  });
  document.addEventListener('pointerout', (event) => {
    if (event.target.closest('a, button, input, [data-product-detail]')) ring.classList.remove('is-hovering');
  });
}

function setupScrollProgress() {
  const progress = document.getElementById('scrollProgress');
  let scheduled = false;
  const update = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? window.scrollY / available : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    scheduled = false;
  };
  progress.style.transformOrigin = 'left center';
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      window.requestAnimationFrame(update);
      scheduled = true;
    }
  }, { passive: true });
  update();
}

function setupCosmicScene() {
  const scene = document.getElementById('cosmicScene');
  if (window.matchMedia('(pointer: coarse)').matches) return;
  scene.addEventListener('pointermove', (event) => {
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    scene.style.transform = `rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
  });
  scene.addEventListener('pointerleave', () => { scene.style.transform = ''; });
}

function setupRevealObserver() {
  if (!('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.hero-text, .hero-banner, .section-header, .feature-item').forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

function observeRevealElements(container) {
  if (!revealObserver) return;
  container.querySelectorAll('.product-card, .no-results').forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
