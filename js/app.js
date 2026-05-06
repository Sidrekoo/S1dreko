/**
 * SIDREKO Gaming Store — app.js (2026 Final Edition)
 * Loading screen · Logo navbar · Placeholder images · All features intact
 */

/* ── STATE ──────────────────────────────────────────────── */
let cart           = [];
let wishlist       = [];
let currentProductId = null;
let currentQty     = 1;
let activeCategory = 'all';
let activeBrand    = 'all';
let currentSort    = 'featured';
let isLoggedIn     = false;
let currentUser    = null;

/* ════════════════════════════════════════════════════════
   LOADING SCREEN
   Animates a progress bar 0→100%, then fades out.
════════════════════════════════════════════════════════ */
(function initLoader() {
  let progress = 0;
  const fill    = document.getElementById('loader-fill');
  const percent = document.getElementById('loader-percent');
  const screen  = document.getElementById('loading-screen');

  // Simulate loading — fast at first, slows near end
  const interval = setInterval(() => {
    const step = progress < 70 ? Math.random() * 8 + 3 : Math.random() * 2 + 0.5;
    progress = Math.min(progress + step, 100);

    if (fill)   fill.style.width   = progress + '%';
    if (percent) percent.textContent = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (screen) screen.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => { if (screen) screen.remove(); }, 700);
      }, 400);
    }
  }, 60);
})();

/* ── AUTH ───────────────────────────────────────────────── */

function handleLogin() {
  const email = (document.getElementById('login-email')?.value || '').trim();
  const pass  =  document.getElementById('login-pass')?.value  || '';
  if (!email || !pass)         { showToast('Please fill in all fields.', 'error'); return; }
  if (!email.includes('@'))    { showToast('Invalid email address.', 'error'); return; }
  if (pass.length < 6)         { showToast('Password must be at least 6 characters.', 'error'); return; }
  isLoggedIn  = true;
  currentUser = { email, name: email.split('@')[0] };
  showToast(`Welcome back, ${currentUser.name}! 🎮`, 'success');
  setTimeout(() => { document.getElementById('navbar').style.display = 'flex'; showPage('home'); }, 600);
}

function handleRegister() {
  const fname = (document.getElementById('reg-fname')?.value || '').trim();
  const lname = (document.getElementById('reg-lname')?.value || '').trim();
  const email = (document.getElementById('reg-email')?.value || '').trim();
  const pass  =  document.getElementById('reg-pass')?.value  || '';
  if (!fname || !lname || !email || !pass) { showToast('Please fill in all required fields.', 'error'); return; }
  if (!email.includes('@'))  { showToast('Invalid email address.', 'error'); return; }
  if (pass.length < 6)       { showToast('Password must be at least 6 characters.', 'error'); return; }
  isLoggedIn  = true;
  currentUser = { email, name: fname };
  showToast(`Account created! Welcome to SIDREKO, ${fname}! 🚀`, 'success');
  setTimeout(() => { document.getElementById('navbar').style.display = 'flex'; showPage('home'); }, 800);
}

function handleSocialLogin(provider) {
  isLoggedIn  = true;
  currentUser = { email: `user@${provider.toLowerCase()}.com`, name: `${provider} User` };
  showToast(`Signed in with ${provider}! Welcome to SIDREKO 🎮`, 'success');
  setTimeout(() => { document.getElementById('navbar').style.display = 'flex'; showPage('home'); }, 600);
}

function handleLogout() {
  isLoggedIn = false; currentUser = null; cart = []; wishlist = [];
  updateCartCount(); updateWishlistCount();
  document.getElementById('navbar').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-auth').classList.add('active');
  showToast('Logged out. See you next time! 👋', 'info');
}

/* ── PAGE NAVIGATION ────────────────────────────────────── */

function showPage(pageId) {
  if (pageId !== 'auth' && !isLoggedIn) { showToast('Please log in first.', 'error'); return; }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + pageId);
  if (el) { el.classList.add('active'); window.scrollTo({ top:0, behavior:'smooth' }); setTimeout(initReveal, 80); }
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-link'));
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active-link');
  if (pageId === 'home') renderHomeFeatured();
  if (pageId === 'shop') renderShopGrid();
  if (pageId === 'cart') renderCart();
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:'smooth' });
}

function filterShop(category) {
  activeCategory = category;
  showPage('shop');
  setTimeout(() => {
    document.querySelectorAll('#page-shop .filter-option').forEach(opt => {
      if (opt.querySelector('.filter-label')?.textContent?.trim() === category) {
        opt.closest('.filter-group')?.querySelectorAll('.filter-option').forEach(o => {
          o.classList.remove('active'); o.querySelector('.filter-checkbox').textContent = '';
        });
        opt.classList.add('active');
        opt.querySelector('.filter-checkbox').textContent = '✓';
      }
    });
    applyFiltersAndSort();
  }, 150);
}

/* ── PRODUCT CARD ───────────────────────────────────────── */

/**
 * Render a product card.
 * Product images are loaded from:  assets/products/<filename>
 * If the image file doesn't exist, a styled placeholder is shown instead.
 *
 * IMAGE FILE NAMING CONVENTION:
 *   assets/products/product-<id>.jpg   (or .png / .webp)
 *   Example: assets/products/product-1.jpg  (Basilisk V3 Pro)
 *            assets/products/product-9.jpg  (BlackShark V2 Pro)
 * You can also use the fallbackImgFile property set in data.js.
 */
function renderProductCard(p) {
  const badgeLabel = p.badge === 'hot' ? '🔥 Hot' : p.badge === 'new' ? '✨ New' : p.badge === 'sale' ? '% Sale' : '';
  const badgeHTML  = p.badge ? `<span class="product-card-badge badge-${p.badge}">${badgeLabel}</span>` : '';
  const isWished   = wishlist.some(w => w.id === p.id);
  const stars      = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
  const oldHTML    = p.oldPrice ? `<span class="product-price-old">${formatPHP(p.oldPrice)}</span>` : '';

  // Image element — tries assets/products/product-{id}.jpg first
  const imgHTML = `
    <img
      src="assets/products/product-${p.id}.jpg"
      alt="${p.name}"
      loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      style="width:85%;height:85%;object-fit:contain;filter:drop-shadow(0 6px 18px rgba(41,121,255,0.25));border-radius:8px;"
    />
    <div class="product-img-placeholder" style="display:none;">
      <div class="ph-icon">${p.fallbackIcon}</div>
      <div class="ph-text">assets/products/product-${p.id}.jpg</div>
    </div>`;

  return `
    <div class="product-card reveal-up" onclick="showProductDetail(${p.id})">
      ${badgeHTML}
      <span class="product-wishlist" style="${isWished?'color:var(--neon-pink);':''}"
            onclick="event.stopPropagation(); toggleWishlistItem(${p.id},this)">
        ${isWished ? '♥' : '♡'}
      </span>
      <div class="product-card-img">${imgHTML}</div>
      <div class="product-card-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price-row">
          <div>
            <span class="product-price">${formatPHP(p.price)}</span>
            ${oldHTML}
          </div>
          <button class="btn btn-primary btn-sm"
                  onclick="event.stopPropagation(); addToCartById(${p.id})">+ Cart</button>
        </div>
      </div>
      <div class="product-card-overlay">
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openQuickView(${p.id})">Quick View</button>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); addToCartById(${p.id})">Add to Cart</button>
      </div>
    </div>`;
}

/* ── HOME ───────────────────────────────────────────────── */

function renderHomeFeatured() {
  const grid = document.getElementById('home-products-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.filter(p => p.badge).slice(0,4).map(renderProductCard).join('');
  setTimeout(initReveal, 50);
}

/* ── SHOP ───────────────────────────────────────────────── */

function renderShopGrid() { applyFiltersAndSort(); }

function applyFiltersAndSort() {
  let list = [...PRODUCTS];
  if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
  if (activeBrand    !== 'all') list = list.filter(p => p.brand    === activeBrand);
  const priceEl  = document.getElementById('price-max');
  const maxPrice = priceEl ? parseInt(priceEl.textContent.replace(/[₱,]/g,'')) : 99999;
  list = list.filter(p => p.price <= maxPrice);
  if (currentSort === 'price-asc')  list.sort((a,b) => a.price-b.price);
  if (currentSort === 'price-desc') list.sort((a,b) => b.price-a.price);
  if (currentSort === 'rating')     list.sort((a,b) => b.rating-a.rating);

  const grid    = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-count-text');
  if (!grid) return;
  grid.innerHTML = list.length
    ? list.map(renderProductCard).join('')
    : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><h3>No products found</h3><p>Try adjusting your filters.</p><button class="btn btn-outline" onclick="resetFilters()">Reset Filters</button></div>`;
  if (countEl) countEl.innerHTML = `Showing <strong>${list.length}</strong> of ${PRODUCTS.length} products`;
  setTimeout(initReveal, 50);
}

function toggleFilter(el, value) {
  const group = el.closest('.filter-group');
  const title = group?.querySelector('.filter-title')?.textContent?.trim().toLowerCase() || '';
  group?.querySelectorAll('.filter-option').forEach(o => { o.classList.remove('active'); o.querySelector('.filter-checkbox').textContent=''; });
  el.classList.add('active'); el.querySelector('.filter-checkbox').textContent = '✓';
  if (title === 'category') activeCategory = value;
  if (title === 'brand')    activeBrand    = value;
  applyFiltersAndSort();
}

function sortProducts(val) { currentSort=val; applyFiltersAndSort(); }

function updatePrice(el) {
  const val = parseInt(el.value);
  const d = document.getElementById('price-max');
  if (d) d.textContent = '₱' + val.toLocaleString('en-PH');
  applyFiltersAndSort();
}

function resetFilters() {
  activeCategory='all'; activeBrand='all'; currentSort='featured';
  document.querySelectorAll('.filter-option').forEach(o => { o.classList.remove('active'); o.querySelector('.filter-checkbox').textContent=''; });
  document.querySelectorAll('.filter-option:first-child').forEach(o => { o.classList.add('active'); o.querySelector('.filter-checkbox').textContent='✓'; });
  applyFiltersAndSort();
}

/* ── PRODUCT DETAIL ─────────────────────────────────────── */

function showProductDetail(id) {
  currentProductId=id; currentQty=1;
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;

  const specsHTML = p.specs.map(([k,v])=>`<div class="spec-row"><span class="spec-key">${k}</span><span class="spec-val">${v}</span></div>`).join('');
  const saveHTML  = p.oldPrice ? `<span class="product-detail-price-old">${formatPHP(p.oldPrice)}</span><span class="product-detail-save">Save ${formatPHP(p.oldPrice-p.price)}</span>` : '';
  const stars     = '★'.repeat(Math.floor(p.rating))+(p.rating%1>=0.5?'½':'');

  document.getElementById('product-detail-content').innerHTML = `
    <div class="product-detail-gallery">
      <div class="product-main-img">
        <img src="assets/products/product-${p.id}.jpg" alt="${p.name}"
             onerror="this.style.display='none'; this.parentElement.innerHTML+='<span style=\'font-size:140px;animation:heroFloat 4s ease-in-out infinite;\'>${p.fallbackIcon}</span>'"/>
      </div>
      <div class="product-thumbs">
        <div class="product-thumb active"><img src="assets/products/product-${p.id}.jpg" onerror="this.outerHTML='<span style=font-size:24px>${p.fallbackIcon}</span>'"/></div>
        <div class="product-thumb"><span style="font-size:24px;">📦</span></div>
        <div class="product-thumb"><span style="font-size:24px;">🔧</span></div>
        <div class="product-thumb"><span style="font-size:24px;">✨</span></div>
      </div>
    </div>
    <div class="product-detail-info">
      <div class="product-detail-brand">${p.brand}</div>
      <h1 class="product-detail-name">${p.name}</h1>
      <div class="product-detail-rating">
        <span class="stars" style="font-size:15px;color:var(--neon-gold);">${stars}</span>
        <span style="font-size:13px;">${p.rating}/5</span>
        <span style="font-size:13px;color:var(--text-dim);">(${p.reviews.toLocaleString()} reviews)</span>
      </div>
      <div class="product-detail-price-block">
        <span class="product-detail-price">${formatPHP(p.price)}</span>
        ${saveHTML}
      </div>
      <p class="product-detail-desc">${p.desc}</p>
      <div class="product-specs"><div class="specs-title">Specifications</div>${specsHTML}</div>
      <div class="product-actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <span class="qty-val" id="qty-val">1</span>
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
        <button class="btn btn-primary" onclick="addToCartById(${p.id})" style="flex:1;justify-content:center;">🛒 Add to Cart</button>
        <div class="icon-btn" onclick="toggleWishlistItem(${p.id},this)" style="width:46px;height:46px;">${wishlist.some(w=>w.id===p.id)?'♥':'♡'}</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;padding:14px;background:rgba(0,0,0,0.2);border-radius:10px;border:1px solid rgba(41,121,255,0.09);">
        <span style="font-size:13px;color:var(--text-secondary);">✅ In Stock</span>
        <span style="font-size:13px;color:var(--text-secondary);">🚀 Free Shipping over ₱1,500</span>
        <span style="font-size:13px;color:var(--text-secondary);">🔄 30-Day Returns</span>
        <span style="font-size:13px;color:var(--text-secondary);">🛡️ 2-Year Warranty</span>
      </div>
    </div>`;

  document.querySelectorAll('.page').forEach(pg=>pg.classList.remove('active'));
  document.getElementById('page-product').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty+delta);
  const el = document.getElementById('qty-val');
  if (el) el.textContent = currentQty;
}

/* ── QUICK VIEW ─────────────────────────────────────────── */

function openQuickView(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;
  const stars    = '★'.repeat(Math.floor(p.rating))+(p.rating%1>=0.5?'½':'');
  const specsHTML= p.specs.slice(0,4).map(([k,v])=>`<div class="qv-spec-row"><span class="qv-spec-key">${k}</span><span class="qv-spec-val">${v}</span></div>`).join('');

  document.getElementById('quickview-content').innerHTML = `
    <div class="qv-inner">
      <div class="qv-img-wrap">
        <img src="assets/products/product-${p.id}.jpg" alt="${p.name}"
             onerror="this.outerHTML='<span style=font-size:110px>${p.fallbackIcon}</span>'"/>
      </div>
      <div>
        <div class="qv-brand">${p.brand}</div>
        <h2 class="qv-name">${p.name}</h2>
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:14px;">
          <span style="color:var(--neon-gold);font-size:15px;">${stars}</span>
          <span style="font-size:12px;color:var(--text-dim);">${p.rating}/5 · ${p.reviews.toLocaleString()} reviews</span>
        </div>
        <div class="qv-price">${formatPHP(p.price)}</div>
        ${p.oldPrice?`<div class="qv-price-old">${formatPHP(p.oldPrice)}</div><div class="qv-save">Save ${formatPHP(p.oldPrice-p.price)}</div>`:'<div style="height:8px;"></div>'}
        <p class="qv-desc">${p.desc}</p>
        <div class="qv-specs"><div class="qv-specs-title">Key Specs</div>${specsHTML}</div>
        <div class="qv-actions">
          <button class="btn btn-primary" onclick="addToCartById(${p.id});closeQuickView();">🛒 Add to Cart</button>
          <button class="btn btn-outline"  onclick="closeQuickView();showProductDetail(${p.id});">View Full Details</button>
        </div>
      </div>
    </div>`;
  document.getElementById('quickview-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('quickview-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key==='Escape') { closeQuickView(); closeCheckout(); } });

/* ── CHECKOUT ───────────────────────────────────────────── */

function openCheckout() {
  if (!cart.length) { showToast('Your cart is empty!','error'); return; }
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping = subtotal>1500 ? 0 : 150;
  const tax      = subtotal*0.12;
  const total    = subtotal+shipping+tax;

  document.getElementById('checkout-content').innerHTML = `
    <div class="checkout-success-icon">✅</div>
    <h2 class="checkout-title">Order Placed Successfully!</h2>
    <p class="checkout-subtitle">Thank you for shopping at SIDREKO. Your order is being processed.</p>
    <div class="checkout-order-box">
      <div class="checkout-order-title">Order Summary</div>
      ${cart.map(i=>`<div class="checkout-order-item"><span class="item-name">${i.name} × ${i.qty}</span><span class="item-price">${formatPHP(i.price*i.qty)}</span></div>`).join('')}
      <div class="checkout-order-item"><span class="item-name">Shipping</span><span class="item-price">${shipping===0?'<span style="color:var(--neon-cyan)">FREE</span>':formatPHP(shipping)}</span></div>
      <div class="checkout-order-item"><span class="item-name">VAT (12%)</span><span class="item-price">${formatPHP(tax)}</span></div>
      <div class="checkout-total-row"><span class="total-label">Total</span><span class="total-amount">${formatPHP(total)}</span></div>
    </div>
    <p style="font-family:'Exo 2',sans-serif;font-size:13px;color:var(--text-secondary);margin-bottom:16px;">Select payment method:</p>
    <div class="checkout-payment-row">
      <div class="checkout-payment-badge cpb-gcash" onclick="selectPayment('GCash',this)">💙 GCash</div>
      <div class="checkout-payment-badge cpb-paypal" onclick="selectPayment('PayPal',this)">🅿️ PayPal</div>
      <div class="checkout-payment-badge cpb-maya"   onclick="selectPayment('Maya',this)">💚 Maya</div>
      <div class="checkout-payment-badge cpb-cod"    onclick="selectPayment('COD',this)">💳 COD</div>
    </div>
    <button class="btn btn-primary checkout-close-btn" onclick="confirmOrder()">Confirm Order ✔</button>`;

  document.getElementById('checkout-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectPayment(method, el) {
  document.querySelectorAll('.checkout-payment-badge').forEach(b => { b.style.outline='none'; });
  el.style.outline = '2px solid var(--neon-cyan)';
  el.style.outlineOffset = '2px';
  showToast(`Payment: ${method} selected`, 'info');
}

function confirmOrder() {
  cart = []; updateCartCount();
  document.getElementById('checkout-overlay').classList.remove('open');
  document.body.style.overflow = '';
  showToast('Order confirmed! Your gear is on the way. 🎮', 'success');
  setTimeout(() => showPage('home'), 800);
}

function closeCheckout() {
  document.getElementById('checkout-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── CART ───────────────────────────────────────────────── */

function addToCartById(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;
  const ex = cart.find(i=>i.id===id);
  if (ex) ex.qty++; else cart.push({...p,qty:1});
  updateCartCount();
  showToast(`${p.fallbackIcon} ${p.name} added to cart!`, 'success');
}
function updateCartCount() { document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0); }
function removeFromCart(id) { cart=cart.filter(i=>i.id!==id); updateCartCount(); renderCart(); }
function updateCartQty(id,delta) { const i=cart.find(x=>x.id===id); if(i) i.qty=Math.max(1,i.qty+delta); renderCart(); }

function renderCart() {
  const el = document.getElementById('cart-content');
  if (!el) return;
  if (!cart.length) {
    el.innerHTML=`<div class="empty-state"><div class="empty-state-icon">🛒</div><h3>Your cart is empty</h3><p>You haven't added any gear yet. Time to level up!</p><button class="btn btn-primary" onclick="showPage('shop')">Browse Products</button></div>`;
    return;
  }
  const sub  = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const ship = sub>1500?0:150;
  const tax  = sub*0.12;
  const tot  = sub+ship+tax;
  const qty  = cart.reduce((s,i)=>s+i.qty,0);

  el.innerHTML=`
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(item=>`
          <div class="cart-item">
            <div class="cart-item-img">
              <img src="assets/products/product-${item.id}.jpg" alt="${item.name}"
                   onerror="this.outerHTML='<span style=font-size:32px>${item.fallbackIcon}</span>'"/>
            </div>
            <div class="cart-item-details">
              <div class="cart-item-brand">${item.brand}</div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${formatPHP(item.price*item.qty)}</div>
            </div>
            <div style="display:flex;align-items:center;gap:9px;">
              <div class="qty-control">
                <button class="qty-btn" onclick="updateCartQty(${item.id},-1)">−</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id},1)">+</button>
              </div>
              <div class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="cart-summary">
        <div class="cart-summary-title">Order Summary</div>
        <div class="summary-row"><span>Subtotal (${qty} items)</span><span>${formatPHP(sub)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${ship===0?'<span style="color:var(--neon-cyan)">FREE</span>':formatPHP(ship)}</span></div>
        <div class="summary-row"><span>VAT (12%)</span><span>${formatPHP(tax)}</span></div>
        <div class="summary-total"><span>Total</span><span class="amount">${formatPHP(tot)}</span></div>
        <div class="promo-input">
          <input type="text" placeholder="Promo code" id="promo-code-input"/>
          <button class="btn btn-outline btn-sm" onclick="applyPromo()">Apply</button>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:9px;" onclick="openCheckout()">Proceed to Checkout →</button>
        <button class="btn btn-outline" style="width:100%;justify-content:center;" onclick="showPage('shop')">Continue Shopping</button>
        <div style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-dim);">🔒 GCash · PayPal · Maya · COD</div>
      </div>
    </div>`;
}

function applyPromo() {
  const code = (document.getElementById('promo-code-input')?.value||'').toUpperCase().trim();
  if (code==='SIDREKO20') showToast('Promo SIDREKO20 applied! −20% 🎉','success');
  else if (code==='GAMER10') showToast('Promo GAMER10 applied! −10% 🎉','success');
  else showToast('Invalid promo code. Try SIDREKO20 😉','error');
}

/* ── WISHLIST ───────────────────────────────────────────── */

function toggleWishlistItem(id,el) {
  const p=PRODUCTS.find(x=>x.id===id);
  const i=wishlist.findIndex(w=>w.id===id);
  if (i===-1) { wishlist.push(p); if(el){el.style.color='var(--neon-pink)';el.textContent='♥';} showToast(`${p.fallbackIcon} ${p.name} added to wishlist! ♥`,'success'); }
  else { wishlist.splice(i,1); if(el){el.style.color='';el.textContent='♡';} showToast(`${p.name} removed from wishlist.`,'info'); }
  updateWishlistCount();
}
function updateWishlistCount() { const el=document.getElementById('wishlist-count'); if(el) el.textContent=wishlist.length; }
function toggleWishlistPage() { showToast(`${wishlist.length} item${wishlist.length!==1?'s':''} in your wishlist ♥`,'info'); }

/* ── TOAST ──────────────────────────────────────────────── */

function showToast(msg, type='success') {
  const c=document.getElementById('toast-container');
  const t=document.createElement('div');
  const tc={success:'toast-success',error:'toast-error',info:'toast-info'}[type]||'toast-success';
  const ic={success:'✅',error:'❌',info:'ℹ️'}[type]||'✅';
  t.className=`toast ${tc}`;
  t.innerHTML=`<span class="toast-icon">${ic}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{ t.style.animation='toastOut 0.32s ease forwards'; setTimeout(()=>t.remove(),350); },3500);
}

/* ── CONTACT FORM ───────────────────────────────────────── */

function submitContact() {
  const fname=(document.getElementById('contact-fname')?.value||'').trim();
  const lname=(document.getElementById('contact-lname')?.value||'').trim();
  const email=(document.getElementById('contact-email')?.value||'').trim();
  const msg  =(document.getElementById('contact-message')?.value||'').trim();
  if (!fname||!lname||!email||!msg) { showToast('Please fill in all required fields.','error'); return; }
  if (!email.includes('@')) { showToast('Invalid email address.','error'); return; }
  showToast(`Message sent, ${fname}! We'll reply within 2 hours. 📬`,'success');
  ['contact-fname','contact-lname','contact-email','contact-subject','contact-message'].forEach(id=>{ const e=document.getElementById(id); if(e) e.value=''; });
}

/* ── AUTH TABS ──────────────────────────────────────────── */

function switchAuthTab(tab,el) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('auth-login-form').style.display    = tab==='login'    ? 'block' : 'none';
  document.getElementById('auth-register-form').style.display = tab==='register' ? 'block' : 'none';
}

/* ── COUNTDOWN ──────────────────────────────────────────── */

let cdH=8, cdM=47, cdS=32;
setInterval(()=>{
  cdS--; if(cdS<0){cdS=59;cdM--;} if(cdM<0){cdM=59;cdH--;} if(cdH<0){cdH=23;cdM=59;cdS=59;}
  const f=n=>String(n).padStart(2,'0');
  ['cd-h','cd-m','cd-s'].forEach((id,i)=>{ const el=document.getElementById(id); if(el) el.textContent=f([cdH,cdM,cdS][i]); });
},1000);

/* ── NAVBAR SCROLL ──────────────────────────────────────── */

window.addEventListener('scroll', ()=>{ document.getElementById('navbar')?.classList.toggle('scrolled',window.scrollY>50); });

/* ── SCROLL REVEAL ──────────────────────────────────────── */

function initReveal() {
  const targets = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right');
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
  },{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>obs.observe(el));
}

/* ── SEARCH ─────────────────────────────────────────────── */

function handleSearch(query) {
  if (!isLoggedIn||!query.trim()) return;
  const q=query.toLowerCase();
  const results=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-shop').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  const grid=document.getElementById('shop-products-grid');
  const countEl=document.getElementById('shop-count-text');
  if (grid) grid.innerHTML=results.length?results.map(renderProductCard).join(''):`<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><h3>No results for "${query}"</h3><button class="btn btn-outline" onclick="resetFilters();showPage('shop')">Browse All</button></div>`;
  if (countEl) countEl.innerHTML=`Search: <strong>${results.length}</strong> results for "${query}"`;
  setTimeout(initReveal,50);
}

/* ── INIT ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('navbar').style.display = 'none';
  initReveal();
  ['login-pass','login-email'].forEach(id=>{
    document.getElementById(id)?.addEventListener('keydown',e=>{ if(e.key==='Enter') handleLogin(); });
  });
});
