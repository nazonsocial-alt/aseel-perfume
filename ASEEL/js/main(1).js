/* =========================================================
   ASEEL PERFUME — MAIN SITE SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initRevealOnScroll();
  initFaq();
  initNewsletter();
  initQuickView();
  initGlobalProductEvents();
  initTabs();
  initYear();
});

/* -------------------- Navbar shrink on scroll -------------------- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const toggleSolid = () => {
    if (window.scrollY > 40) nav.classList.add('is-solid');
    else nav.classList.remove('is-solid');
  };
  toggleSolid();
  window.addEventListener('scroll', toggleSolid, { passive: true });
}

/* -------------------- Mobile menu -------------------- */
function initMobileMenu() {
  const openBtn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  if (!openBtn || !menu) return;
  openBtn.addEventListener('click', () => menu.classList.add('open'));
  closeBtn && closeBtn.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* -------------------- Reveal on scroll -------------------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(i => observer.observe(i));
}
/* Re-run for dynamically injected product cards */
function refreshReveal() { document.querySelectorAll('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view')); }

/* -------------------- FAQ accordion -------------------- */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* -------------------- Newsletter (front-end only, no real endpoint) -------------------- */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const msg = form.nextElementSibling && form.nextElementSibling.classList.contains('form-msg')
        ? form.nextElementSibling : null;
      if (input && input.value.trim()) {
        if (msg) msg.textContent = 'Thank you — you\u2019re on the list for exclusive ASEEL offers.';
        input.value = '';
      } else if (msg) {
        msg.textContent = 'Please enter a valid email address.';
      }
    });
  });
}

/* -------------------- Tabs (used on product detail page) -------------------- */
function initTabs() {
  document.querySelectorAll('.detail-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.detail-tabs').parentElement;
      group.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.detail-tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      group.querySelector('#' + btn.dataset.tab).classList.add('active');
    });
  });
}

/* -------------------- Footer year -------------------- */
function initYear() {
  document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());
}

/* -------------------- Quick View modal -------------------- */
function initQuickView() {
  const overlay = document.querySelector('#quickview-overlay');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeQuickView(); });
  const closeBtn = overlay.querySelector('.modal-close');
  closeBtn && closeBtn.addEventListener('click', closeQuickView);
}

function openQuickView(id) {
  const overlay = document.querySelector('#quickview-overlay');
  const p = getProductById(id);
  if (!overlay || !p) return;
  overlay.querySelector('.modal-media').innerHTML = bottleSVG(p.art);
  overlay.querySelector('.modal-info').innerHTML = `
    <span class="product-cat">${p.category}</span>
    <h3 class="product-name" style="font-size:1.5rem;margin:10px 0">${p.name}</h3>
    <div class="product-rating"><span class="stars">${starString(p.rating)}</span> (${p.reviews} reviews)</div>
    <div class="product-price" style="margin:16px 0">
      <span class="price-now">${fmtPrice(p.price)}</span>
      ${p.oldPrice ? `<span class="price-old">${fmtPrice(p.oldPrice)}</span>` : ''}
    </div>
    <p style="margin-bottom:20px">${p.short}</p>
    <div style="display:flex;gap:12px">
      <button class="btn btn-primary add-cart-btn" data-id="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</button>
      <a href="product.html?id=${p.id}" class="btn btn-outline">View Details</a>
    </div>`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQuickView() {
  const overlay = document.querySelector('#quickview-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* -------------------- Global delegated events for product cards -------------------- */
/* Works for cards rendered on any page, including ones injected after load */
function initGlobalProductEvents() {
  document.addEventListener('click', e => {
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn && !addBtn.disabled) {
      addToCart(addBtn.dataset.id);
      return;
    }
    const wishBtn = e.target.closest('.wishlist-btn');
    if (wishBtn) {
      toggleWishlist(wishBtn.dataset.id);
      wishBtn.classList.toggle('active');
      return;
    }
    const qvBtn = e.target.closest('.quickview-btn');
    if (qvBtn) {
      openQuickView(qvBtn.dataset.id);
      return;
    }
  });
}
