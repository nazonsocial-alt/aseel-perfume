/* =========================================================
   ASEEL PERFUME — CART, WISHLIST & WHATSAPP CHECKOUT
   ========================================================= */

const CART_KEY = 'aseel_cart';
const WISHLIST_KEY = 'aseel_wishlist';
const WHATSAPP_NUMBER = '8801XXXXXXXXX'; // TODO: replace with real ASEEL WhatsApp business number

/* -------------------- Storage helpers -------------------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch (e) { return []; }
}
function saveWishlist(list) { localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); }
function isInWishlist(id) { return getWishlist().includes(id); }

/* -------------------- Cart actions -------------------- */
function addToCart(id, size, qty) {
  size = size || (getProductById(id) ? getProductById(id).sizes[1] : '50ml');
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id, size, qty }); }
  saveCart(cart);
  showToast('Added to your bag');
}

function removeFromCart(id, size) {
  let cart = getCart().filter(item => !(item.id === id && item.size === size));
  saveCart(cart);
}

function updateCartQty(id, size, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.size === size);
  if (item) { item.qty = Math.max(1, qty); saveCart(cart); }
}

function cartTotalItems() { return getCart().reduce((sum, i) => sum + i.qty, 0); }

function cartSubtotal() {
  return getCart().reduce((sum, i) => {
    const p = getProductById(i.id);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => { el.textContent = cartTotalItems(); });
}

/* -------------------- Wishlist actions -------------------- */
function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) { list = list.filter(x => x !== id); showToast('Removed from wishlist'); }
  else { list.push(id); showToast('Added to wishlist'); }
  saveWishlist(list);
}

/* -------------------- Toast -------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="dot"></span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* -------------------- Coupon (front-end demo only) -------------------- */
const VALID_COUPONS = { 'ASEEL10': 0.10, 'WELCOME15': 0.15 };
function applyCoupon(code) {
  const rate = VALID_COUPONS[code.trim().toUpperCase()];
  return rate || 0;
}

/* -------------------- Render: Cart page -------------------- */
function renderCartPage() {
  const cart = getCart();
  const bodyEl = document.querySelector('#cart-items-body');
  const emptyEl = document.querySelector('#empty-cart');
  const layoutEl = document.querySelector('#cart-layout');
  if (!bodyEl) return;

  if (!cart.length) {
    if (layoutEl) layoutEl.classList.add('hidden');
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');
  if (layoutEl) layoutEl.classList.remove('hidden');

  bodyEl.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if (!p) return '';
    return `
    <tr data-id="${p.id}" data-size="${item.size}">
      <td>
        <div class="cart-product">
          <div class="cart-thumb">${bottleSVG(p.art)}</div>
          <div>
            <div class="cart-product-name">${p.name}</div>
            <div class="cart-product-size">Size: ${item.size}</div>
            <button class="remove-item" data-id="${p.id}" data-size="${item.size}">Remove</button>
          </div>
        </div>
      </td>
      <td>${fmtPrice(p.price)}</td>
      <td>
        <div class="qty-control">
          <button class="qty-minus" data-id="${p.id}" data-size="${item.size}">&minus;</button>
          <span>${item.qty}</span>
          <button class="qty-plus" data-id="${p.id}" data-size="${item.size}">+</button>
        </div>
      </td>
      <td>${fmtPrice(p.price * item.qty)}</td>
    </tr>`;
  }).join('');

  updateOrderSummary();

  bodyEl.querySelectorAll('.qty-minus').forEach(btn => btn.addEventListener('click', () => {
    const cart = getCart();
    const item = cart.find(i => i.id === btn.dataset.id && i.size === btn.dataset.size);
    if (item && item.qty > 1) updateCartQty(btn.dataset.id, btn.dataset.size, item.qty - 1);
    else if (item) removeFromCart(btn.dataset.id, btn.dataset.size);
    renderCartPage();
  }));
  bodyEl.querySelectorAll('.qty-plus').forEach(btn => btn.addEventListener('click', () => {
    const cart = getCart();
    const item = cart.find(i => i.id === btn.dataset.id && i.size === btn.dataset.size);
    if (item) updateCartQty(btn.dataset.id, btn.dataset.size, item.qty + 1);
    renderCartPage();
  }));
  bodyEl.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', () => {
    removeFromCart(btn.dataset.id, btn.dataset.size);
    renderCartPage();
  }));
}

let appliedDiscountRate = 0;
function updateOrderSummary() {
  const subtotal = cartSubtotal();
  const shipping = subtotal > 0 && subtotal < 5000 ? 120 : 0;
  const discount = subtotal * appliedDiscountRate;
  const total = Math.max(0, subtotal - discount + shipping);

  const subEl = document.querySelector('#summary-subtotal');
  const shipEl = document.querySelector('#summary-shipping');
  const discEl = document.querySelector('#summary-discount');
  const totalEl = document.querySelector('#summary-total');
  if (subEl) subEl.textContent = fmtPrice(subtotal);
  if (shipEl) shipEl.textContent = shipping === 0 ? 'Free' : fmtPrice(shipping);
  if (discEl) discEl.textContent = '-' + fmtPrice(Math.round(discount));
  if (totalEl) totalEl.textContent = fmtPrice(Math.round(total));
}

function initCouponForm() {
  const form = document.querySelector('#coupon-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const rate = applyCoupon(input.value);
    const msg = document.querySelector('#coupon-msg');
    if (rate > 0) {
      appliedDiscountRate = rate;
      if (msg) { msg.textContent = `Coupon applied — ${rate * 100}% off`; msg.style.color = 'var(--color-success)'; }
    } else {
      appliedDiscountRate = 0;
      if (msg) { msg.textContent = 'Invalid or expired coupon code'; msg.style.color = 'var(--color-danger)'; }
    }
    updateOrderSummary();
  });
}

/* -------------------- Render: Checkout mini cart -------------------- */
function renderCheckoutSummary() {
  const cart = getCart();
  const el = document.querySelector('#checkout-items');
  if (!el) return;
  if (!cart.length) {
    el.innerHTML = `<p>Your bag is empty. <a href="shop.html" style="color:var(--color-secondary)">Continue shopping &rarr;</a></p>`;
  } else {
    el.innerHTML = cart.map(item => {
      const p = getProductById(item.id);
      if (!p) return '';
      return `
      <div class="mini-cart-item">
        <div class="cart-thumb">${bottleSVG(p.art)}</div>
        <div class="info">
          <p>${p.name}</p>
          <span>${item.size} &times; ${item.qty}</span>
        </div>
        <strong>${fmtPrice(p.price * item.qty)}</strong>
      </div>`;
    }).join('');
  }
  const subtotal = cartSubtotal();
  const shipping = subtotal > 0 && subtotal < 5000 ? 120 : 0;
  const total = subtotal + shipping;
  const subEl = document.querySelector('#checkout-subtotal');
  const shipEl = document.querySelector('#checkout-shipping');
  const totalEl = document.querySelector('#checkout-total');
  if (subEl) subEl.textContent = fmtPrice(subtotal);
  if (shipEl) shipEl.textContent = shipping === 0 ? 'Free' : fmtPrice(shipping);
  if (totalEl) totalEl.textContent = fmtPrice(total);
}

/* -------------------- Checkout form -> WhatsApp -------------------- */
function initCheckoutForm() {
  const form = document.querySelector('#checkout-form');
  if (!form) return;
  renderCheckoutSummary();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const cart = getCart();
    if (!cart.length) { showToast('Your bag is empty'); return; }

    const fields = {
      name: form.querySelector('#cust-name'),
      phone: form.querySelector('#cust-phone'),
      address: form.querySelector('#cust-address'),
      city: form.querySelector('#cust-city'),
      note: form.querySelector('#cust-note')
    };

    let valid = true;
    [fields.name, fields.phone, fields.address, fields.city].forEach(input => {
      const group = input.closest('.form-group');
      if (!input.value.trim()) { group.classList.add('error'); valid = false; }
      else { group.classList.remove('error'); }
    });
    const phonePattern = /^[0-9+ -]{8,15}$/;
    if (fields.phone.value.trim() && !phonePattern.test(fields.phone.value.trim())) {
      fields.phone.closest('.form-group').classList.add('error');
      valid = false;
    }
    if (!valid) { showToast('Please complete the required fields'); return; }

    const subtotal = cartSubtotal();
    const shipping = subtotal > 0 && subtotal < 5000 ? 120 : 0;
    const total = subtotal + shipping;

    let message = `*New Order — ASEEL Perfume*\n\n`;
    message += `*Name:* ${fields.name.value.trim()}\n`;
    message += `*Phone:* ${fields.phone.value.trim()}\n`;
    message += `*Address:* ${fields.address.value.trim()}, ${fields.city.value.trim()}\n\n`;
    message += `*Order Details:*\n`;
    cart.forEach(item => {
      const p = getProductById(item.id);
      if (!p) return;
      message += `- ${p.name} (${item.size}) x${item.qty} — ${fmtPrice(p.price * item.qty)}\n`;
    });
    message += `\n*Subtotal:* ${fmtPrice(subtotal)}\n`;
    message += `*Shipping:* ${shipping === 0 ? 'Free' : fmtPrice(shipping)}\n`;
    message += `*Total:* ${fmtPrice(total)}\n`;
    if (fields.note.value.trim()) message += `\n*Note:* ${fields.note.value.trim()}\n`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    saveCart([]);
    window.open(url, '_blank');
    showToast('Redirecting to WhatsApp…');
    setTimeout(() => { window.location.href = 'index.html'; }, 1200);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
