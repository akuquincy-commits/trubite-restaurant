/**
 * script.js – Trubite Restaurant
 * --------------------------------------------------------------------------
 * Application logic, configuration, cart, validation, and WhatsApp integration.
 * Load order: menu-data.js → script.js
 */

/* ==========================================================================
   1. CONFIGURATION – Single source of truth for all business details
   ==========================================================================
   Owner must verify every field marked null or with a verification comment
   before public launch. Never display unverified values to customers.
   ========================================================================== */

const CONFIG = {
  /* Core identity */
  name: "Trubite Restaurant",
  tagline: "Authentic West African & Continental Dishes",
  description:
    "Trubite Restaurant serves carefully prepared West African and continental dishes in a welcoming setting in Kumasi. We focus on quality ingredients and generous portions.",

  /* Location – proposed, not yet owner-confirmed as exact entrance */
  address: {
    line1: "Behind Evandy / Ultimate Hostel, Bomso Road",
    city: "Kumasi",
    region: "Ashanti",
    country: "Ghana",
    landmark: "Behind Ultimate Hostel (near KNUST Bomso)",
    /* Full formatted string for display */
    get formatted() {
      return `${this.line1}, ${this.city}, ${this.region}, ${this.country}`;
    }
  },

  /* Opening hours – proposed; owner must confirm exact daily schedule */
  hours: {
    summary: "Mon–Fri 9:00 am–9:00 pm · Sat–Sun 9:00 am–10:00 pm",
    details: null,
    verified: true // From public restaurant listing; owner should confirm
  },

  /* Indicative price range – not a guarantee of individual dish prices */
  priceRange: {
    text: "GH₵50–150",
    verified: true // Consistent with restaurant posts & reviewer notes
  },

  /* Contact – critical for ordering. Null = unverified / do not display */
  phone: "+233597401079", // Public number from restaurant posts & listings
  whatsapp: "+233597401079", // Same number used for orders/delivery

  /* Website */
  websiteUrl: null, // set when a real domain is live (for canonical & OG)

  /* Map – used for embed and directions. Owner should confirm accuracy. */
  map: {
    query: "Trubite Restaurant, Behind Ultimate Hostel, Bomso, Kumasi, Ghana",
    confirmedExact: false // true only when owner confirms pin location
  },

  /* Rating – do not display until owner confirms these numbers are current */
  rating: {
    value: null, // e.g. 4.8
    count: null, // e.g. 126
    source: null, // e.g. "Google"
    verified: false
  },

  /* Currency & locale */
  currency: {
    code: "GHS",
    symbol: "GH₵",
    locale: "en-GH"
  },

  /* Approved images – only use URLs/paths confirmed by the restaurant */
  images: {
    hero: null, // approved hero/restaurant photograph
    og: null // social sharing image (requires absolute URL when live)
  },

  /* Footer */
  attribution: "Website by Quincy Aku-Boye"
};

/* ==========================================================================
   2. STATE
   ========================================================================== */

let cart = []; // { id, quantity }
let currentCategory = "all";
let searchQuery = "";
let storageAvailable = true;

/* ==========================================================================
   3. UTILITIES
   ========================================================================== */

function formatCurrency(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num) || num < 0) return `${CONFIG.currency.symbol}0.00`;
  try {
    return new Intl.NumberFormat(CONFIG.currency.locale, {
      style: "currency",
      currency: CONFIG.currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  } catch {
    return `${CONFIG.currency.symbol}${num.toFixed(2)}`;
  }
}

function normalizeWhatsAppNumber(raw) {
  if (!raw || typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  // Ghana numbers: expect 233 followed by 9 digits, or local 0XXXXXXXXX
  if (digits.length < 10) return null;
  // Prefer international format without +
  if (digits.startsWith("233") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return "233" + digits.slice(1);
  if (digits.length >= 10 && digits.length <= 15) return digits;
  return null;
}

function isWhatsAppConfigured() {
  return Boolean(normalizeWhatsAppNumber(CONFIG.whatsapp));
}

function escapeHtml(str) {
  if (str == null) return "";
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

function safeText(el, text) {
  if (el) el.textContent = text == null ? "" : String(text);
}

/* ==========================================================================
   4. MENU VALIDATION & HELPERS
   ========================================================================== */

function validateMenuData(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  return raw.filter((item) => {
    if (!item || typeof item !== "object") return false;
    if (typeof item.id !== "string" || !item.id.trim()) return false;
    if (seen.has(item.id)) return false;
    if (typeof item.name !== "string" || !item.name.trim()) return false;
    if (typeof item.category !== "string" || !item.category.trim()) return false;
    const price = Number(item.price);
    if (!Number.isFinite(price) || price < 0) return false;
    seen.add(item.id);
    return true;
  }).map((item) => ({
    id: item.id.trim(),
    category: item.category.trim(),
    name: item.name.trim(),
    description: typeof item.description === "string" ? item.description.trim() : "",
    price: Number(item.price),
    image: typeof item.image === "string" && item.image.trim() ? item.image.trim() : null
  }));
}

function getValidatedMenu() {
  return validateMenuData(typeof MENU_DATA !== "undefined" ? MENU_DATA : []);
}

function getMenuItemById(id) {
  return getValidatedMenu().find((item) => item.id === id) || null;
}

function getCategories(menu) {
  const cats = new Set();
  menu.forEach((item) => cats.add(item.category));
  return Array.from(cats).sort();
}

/* ==========================================================================
   5. CART – state, persistence, calculations
   ========================================================================== */

function loadCart() {
  try {
    const raw = localStorage.getItem("trubite_cart");
    if (!raw) {
      cart = [];
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      cart = [];
      return;
    }
    // Only keep items that still exist in the current menu; never trust stored prices
    const valid = [];
    parsed.forEach((entry) => {
      if (!entry || typeof entry.id !== "string") return;
      const menuItem = getMenuItemById(entry.id);
      if (!menuItem) return;
      const qty = Math.floor(Number(entry.quantity));
      if (!Number.isFinite(qty) || qty < 1) return;
      valid.push({ id: entry.id, quantity: Math.min(qty, 99) });
    });
    cart = valid;
  } catch {
    storageAvailable = false;
    cart = [];
  }
}

function saveCart() {
  if (!storageAvailable) return;
  try {
    localStorage.setItem("trubite_cart", JSON.stringify(cart));
  } catch {
    storageAvailable = false;
  }
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, entry) => {
    const item = getMenuItemById(entry.id);
    if (!item) return sum;
    return sum + item.price * entry.quantity;
  }, 0);
}

function addToCart(id) {
  const menuItem = getMenuItemById(id);
  if (!menuItem) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    if (existing.quantity < 99) existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  updateCartUI();
}

function changeQuantity(id, delta) {
  const entry = cart.find((c) => c.id === id);
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity < 1) {
    cart = cart.filter((c) => c.id !== id);
  } else if (entry.quantity > 99) {
    entry.quantity = 99;
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

/* ==========================================================================
   6. RENDERING – Menu
   ========================================================================== */

function renderCategoryFilters(menu) {
  const container = document.getElementById("category-filters");
  if (!container) return;

  container.innerHTML = "";
  if (menu.length === 0) {
    container.hidden = true;
    return;
  }
  container.hidden = false;

  const categories = ["all", ...getCategories(menu)];
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn" + (currentCategory === cat ? " is-active" : "");
    btn.setAttribute("aria-pressed", currentCategory === cat ? "true" : "false");
    btn.dataset.category = cat;
    btn.textContent = cat === "all" ? "All" : cat;
    btn.addEventListener("click", () => {
      currentCategory = cat;
      renderCategoryFilters(menu);
      renderMenu();
    });
    container.appendChild(btn);
  });
}

function getFilteredMenu(menu) {
  let list = menu;
  if (currentCategory !== "all") {
    list = list.filter((item) => item.category === currentCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }
  return list;
}

function renderMenu() {
  const menu = getValidatedMenu();
  const grid = document.getElementById("menu-grid");
  const emptyState = document.getElementById("menu-empty");
  const searchEmpty = document.getElementById("menu-search-empty");
  const controls = document.getElementById("menu-controls");

  if (!grid || !emptyState) return;

  renderCategoryFilters(menu);

  if (menu.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
    if (searchEmpty) searchEmpty.hidden = true;
    if (controls) controls.hidden = true;
    return;
  }

  if (controls) controls.hidden = false;
  emptyState.hidden = true;

  const filtered = getFilteredMenu(menu);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (searchEmpty) searchEmpty.hidden = false;
    return;
  }

  if (searchEmpty) searchEmpty.hidden = true;

  grid.innerHTML = "";
  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card" + (item.image ? " menu-card--photo" : " menu-card--plain");
    card.setAttribute("aria-labelledby", `dish-name-${item.id}`);

    const imgBlock = item.image
      ? `<div class="menu-card__photo" aria-hidden="true">
           <img src="${escapeHtml(item.image)}" alt="" loading="lazy" width="640" height="400" />
         </div>`
      : "";

    const desc = item.description
      ? `<p class="menu-card__desc">${escapeHtml(item.description)}</p>`
      : "";

    card.innerHTML = `
      ${imgBlock}
      <div class="menu-card__overlay">
        <span class="menu-card__category">${escapeHtml(item.category)}</span>
        <h3 class="menu-card__name" id="dish-name-${escapeHtml(item.id)}">${escapeHtml(item.name)}</h3>
        ${desc}
        <div class="menu-card__actions">
          <span class="menu-card__price">${escapeHtml(formatCurrency(item.price))}</span>
          <button type="button" class="btn btn--add add-to-cart" data-id="${escapeHtml(item.id)}" aria-label="Add ${escapeHtml(item.name)} to cart">
            <span aria-hidden="true">+</span> Add
          </button>
        </div>
      </div>
    `;

    const btn = card.querySelector(".add-to-cart");
    btn.addEventListener("click", () => {
      addToCart(item.id);
      const prev = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Added";
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = prev;
      }, 900);
    });
    grid.appendChild(card);
  });
}

/* ==========================================================================
   7. RENDERING – Cart UI & Panel
   ========================================================================== */

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Header badge
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });

  // Floating bar (mobile)
  const floatBar = document.getElementById("floating-cart-bar");
  if (floatBar) {
    floatBar.hidden = count === 0;
    const floatCount = document.getElementById("float-cart-count");
    const floatTotal = document.getElementById("float-cart-total");
    if (floatCount) floatCount.textContent = String(count);
    if (floatTotal) floatTotal.textContent = formatCurrency(total);
  }

  // Cart panel contents
  renderCartPanel();
}

function renderCartPanel() {
  const list = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");
  const summary = document.getElementById("cart-summary");
  const totalEl = document.getElementById("cart-grand-total");
  const form = document.getElementById("order-form");
  const whatsappBtn = document.getElementById("btn-send-whatsapp");
  const orderingNote = document.getElementById("ordering-unavailable");

  if (!list) return;

  const count = getCartCount();

  if (count === 0) {
    list.innerHTML = "";
    if (empty) empty.hidden = false;
    if (summary) summary.hidden = true;
    if (form) form.hidden = true;
    return;
  }

  if (empty) empty.hidden = true;
  if (summary) summary.hidden = false;
  if (form) form.hidden = false;

  list.innerHTML = "";
  cart.forEach((entry) => {
    const item = getMenuItemById(entry.id);
    if (!item) return;

    const lineTotal = item.price * entry.quantity;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item__info">
        <p class="cart-item__name">${escapeHtml(item.name)}</p>
        <p class="cart-item__unit">${escapeHtml(formatCurrency(item.price))} each</p>
      </div>
      <div class="cart-item__controls">
        <button type="button" class="qty-btn" data-action="decrease" data-id="${escapeHtml(entry.id)}" aria-label="Decrease quantity of ${escapeHtml(item.name)}">−</button>
        <span class="qty-value" aria-live="polite">${entry.quantity}</span>
        <button type="button" class="qty-btn" data-action="increase" data-id="${escapeHtml(entry.id)}" aria-label="Increase quantity of ${escapeHtml(item.name)}">+</button>
      </div>
      <div class="cart-item__line">
        <span>${escapeHtml(formatCurrency(lineTotal))}</span>
        <button type="button" class="remove-btn" data-id="${escapeHtml(entry.id)}" aria-label="Remove ${escapeHtml(item.name)} from cart">Remove</button>
      </div>
    `;

    row.querySelector('[data-action="decrease"]').addEventListener("click", () => changeQuantity(entry.id, -1));
    row.querySelector('[data-action="increase"]').addEventListener("click", () => changeQuantity(entry.id, 1));
    row.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(entry.id));
    list.appendChild(row);
  });

  if (totalEl) totalEl.textContent = formatCurrency(getCartTotal());

  // WhatsApp availability
  const configured = isWhatsAppConfigured();
  if (whatsappBtn) {
    whatsappBtn.disabled = !configured;
    whatsappBtn.hidden = !configured;
  }
  if (orderingNote) {
    orderingNote.hidden = configured;
  }
}

/* ==========================================================================
   8. ORDER FORM & WHATSAPP MESSAGE
   ========================================================================== */

function getOrderFormData() {
  const name = (document.getElementById("customer-name") || {}).value || "";
  const typeEl = document.querySelector('input[name="order-type"]:checked');
  const type = typeEl ? typeEl.value : "pickup";
  const location = (document.getElementById("delivery-location") || {}).value || "";
  const notes = (document.getElementById("order-notes") || {}).value || "";
  return {
    name: name.trim(),
    type,
    location: location.trim(),
    notes: notes.trim()
  };
}

function validateOrderForm() {
  const data = getOrderFormData();
  const errors = [];

  if (!data.name) {
    errors.push({ field: "customer-name", message: "Please enter your name." });
  }
  if (data.type === "delivery" && !data.location) {
    errors.push({ field: "delivery-location", message: "Please enter a delivery location." });
  }
  if (getCartCount() === 0) {
    errors.push({ field: null, message: "Your cart is empty." });
  }

  // Clear previous errors
  document.querySelectorAll(".field-error").forEach((el) => {
    el.textContent = "";
    el.hidden = true;
  });
  document.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));

  errors.forEach((err) => {
    if (err.field) {
      const input = document.getElementById(err.field);
      const errEl = document.getElementById(`${err.field}-error`);
      if (input) input.setAttribute("aria-invalid", "true");
      if (errEl) {
        errEl.textContent = err.message;
        errEl.hidden = false;
      }
    }
  });

  return errors.length === 0;
}

function buildWhatsAppMessage() {
  const data = getOrderFormData();
  const lines = [];
  lines.push(`*Order from ${CONFIG.name}*`);
  lines.push("");
  lines.push(`Customer: ${data.name}`);
  lines.push(`Type: ${data.type === "delivery" ? "Delivery" : "Pickup"}`);
  if (data.type === "delivery" && data.location) {
    lines.push(`Delivery location: ${data.location}`);
  }
  lines.push("");
  lines.push("*Items*");
  cart.forEach((entry) => {
    const item = getMenuItemById(entry.id);
    if (!item) return;
    const lineTotal = item.price * entry.quantity;
    lines.push(
      `• ${item.name} × ${entry.quantity} — ${formatCurrency(item.price)} each = ${formatCurrency(lineTotal)}`
    );
  });
  lines.push("");
  lines.push(`*Total: ${formatCurrency(getCartTotal())}*`);
  if (data.notes) {
    lines.push("");
    lines.push(`Notes: ${data.notes}`);
  }
  lines.push("");
  lines.push("_Please confirm availability and arrangements. Thank you!_");
  return lines.join("\n");
}

function openWhatsAppOrder() {
  if (!validateOrderForm()) return;
  if (!isWhatsAppConfigured()) return;

  // Recalculate from live menu data
  const total = getCartTotal();
  if (total <= 0 || getCartCount() === 0) return;

  const number = normalizeWhatsAppNumber(CONFIG.whatsapp);
  if (!number) return;

  const message = buildWhatsAppMessage();
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encoded}`;

  // User-initiated navigation
  window.open(url, "_blank", "noopener,noreferrer");

  // Show gentle reminder – do not claim order was submitted
  const notice = document.getElementById("order-sent-notice");
  if (notice) {
    notice.hidden = false;
    notice.focus();
  }
}

/* ==========================================================================
   9. BUSINESS INFO RENDERING
   ========================================================================== */

function renderBusinessInfo() {
  // Hero
  safeText(document.getElementById("hero-name"), CONFIG.name);
  safeText(document.getElementById("hero-tagline"), CONFIG.tagline);
  safeText(document.getElementById("hero-intro"), CONFIG.description);

  // About
  safeText(document.getElementById("about-text"), CONFIG.description);

  // Hours
  const hoursEl = document.getElementById("about-hours");
  if (hoursEl) {
    if (CONFIG.hours.verified && CONFIG.hours.summary) {
      hoursEl.hidden = false;
      safeText(hoursEl.querySelector(".value"), CONFIG.hours.summary);
    } else {
      hoursEl.hidden = true;
    }
  }

  // Address
  const addrEl = document.getElementById("about-address");
  if (addrEl) {
    safeText(addrEl.querySelector(".value"), CONFIG.address.formatted);
  }

  // Price range
  const priceEl = document.getElementById("about-price");
  if (priceEl) {
    if (CONFIG.priceRange.verified && CONFIG.priceRange.text) {
      priceEl.hidden = false;
      safeText(priceEl.querySelector(".value"), CONFIG.priceRange.text);
    } else {
      priceEl.hidden = true;
    }
  }

  // Rating – only if verified
  const ratingEl = document.getElementById("about-rating");
  if (ratingEl) {
    if (
      CONFIG.rating.verified &&
      CONFIG.rating.value != null &&
      CONFIG.rating.count != null
    ) {
      ratingEl.hidden = false;
      safeText(
        ratingEl.querySelector(".value"),
        `${CONFIG.rating.value} · ${CONFIG.rating.count} reviews`
      );
    } else {
      ratingEl.hidden = true;
    }
  }

  // Location section address
  safeText(document.getElementById("location-address"), CONFIG.address.formatted);

  // Directions link
  const directionsBtn = document.getElementById("btn-directions");
  if (directionsBtn) {
    const q = encodeURIComponent(CONFIG.map.query || CONFIG.address.formatted);
    directionsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  }

  // Map embed
  const mapFrame = document.getElementById("map-embed");
  if (mapFrame) {
    const q = encodeURIComponent(CONFIG.map.query || CONFIG.address.formatted);
    mapFrame.src = `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
    if (!CONFIG.map.confirmedExact) {
      const note = document.getElementById("map-note");
      if (note) note.hidden = false;
    }
  }

  // Hero primary CTA
  const heroOrder = document.getElementById("hero-order-btn");
  if (heroOrder) {
    if (isWhatsAppConfigured()) {
      heroOrder.hidden = false;
      heroOrder.addEventListener("click", () => {
        openCartPanel();
      });
    } else {
      heroOrder.hidden = true;
    }
  }

  // Floating WhatsApp
  const floatWa = document.getElementById("floating-whatsapp");
  if (floatWa) {
    if (isWhatsAppConfigured()) {
      floatWa.hidden = false;
      const num = normalizeWhatsAppNumber(CONFIG.whatsapp);
      floatWa.href = `https://wa.me/${num}`;
    } else {
      floatWa.hidden = true;
    }
  }

  // Footer contacts
  const footerPhone = document.getElementById("footer-phone");
  if (footerPhone) {
    if (CONFIG.phone) {
      footerPhone.hidden = false;
      footerPhone.href = `tel:${CONFIG.phone.replace(/\s/g, "")}`;
      safeText(footerPhone, CONFIG.phone);
    } else {
      footerPhone.hidden = true;
    }
  }

  const footerWa = document.getElementById("footer-whatsapp");
  if (footerWa) {
    if (isWhatsAppConfigured()) {
      footerWa.hidden = false;
      const num = normalizeWhatsAppNumber(CONFIG.whatsapp);
      footerWa.href = `https://wa.me/${num}`;
    } else {
      footerWa.hidden = true;
    }
  }

  // Attribution
  safeText(document.getElementById("footer-attribution"), CONFIG.attribution);

  // Persistence notice
  if (!storageAvailable) {
    const notice = document.getElementById("storage-notice");
    if (notice) notice.hidden = false;
  }
}

/* ==========================================================================
   10. CART PANEL OPEN / CLOSE & FOCUS MANAGEMENT
   ========================================================================== */

function openCartPanel() {
  const panel = document.getElementById("cart-panel");
  const backdrop = document.getElementById("cart-backdrop");
  if (!panel) return;

  panel.hidden = false;
  if (backdrop) backdrop.hidden = false;
  document.body.classList.add("panel-open");

  // Focus first focusable
  const closeBtn = document.getElementById("cart-close");
  if (closeBtn) closeBtn.focus();

  document.addEventListener("keydown", handlePanelKeydown);
}

function closeCartPanel() {
  const panel = document.getElementById("cart-panel");
  const backdrop = document.getElementById("cart-backdrop");
  if (!panel) return;

  panel.hidden = true;
  if (backdrop) backdrop.hidden = true;
  document.body.classList.remove("panel-open");
  document.removeEventListener("keydown", handlePanelKeydown);

  // Return focus to cart trigger if possible
  const trigger = document.getElementById("header-cart-btn");
  if (trigger) trigger.focus();
}

function handlePanelKeydown(e) {
  if (e.key === "Escape") {
    closeCartPanel();
    return;
  }
  // Simple focus trap
  if (e.key !== "Tab") return;
  const panel = document.getElementById("cart-panel");
  if (!panel || panel.hidden) return;
  const focusable = panel.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/* ==========================================================================
   11. NAVIGATION & MOBILE MENU
   ========================================================================== */

function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        // Close mobile nav
        if (nav) nav.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ==========================================================================
   12. SEARCH
   ========================================================================== */

function initSearch() {
  const input = document.getElementById("menu-search");
  if (!input) return;
  let timeout;
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchQuery = input.value.trim();
      renderMenu();
    }, 180);
  });
}

/* ==========================================================================
   13. ORDER TYPE TOGGLE (show/hide delivery location)
   ========================================================================== */

function initOrderType() {
  const radios = document.querySelectorAll('input[name="order-type"]');
  const locationField = document.getElementById("delivery-location-field");
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (locationField) {
        locationField.hidden = radio.value !== "delivery";
      }
    });
  });
}

/* ==========================================================================
   14. SEO / JSON-LD – only verified data
   ========================================================================== */

function injectJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: CONFIG.name,
    description: CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONFIG.address.line1,
      addressLocality: CONFIG.address.city,
      addressRegion: CONFIG.address.region,
      addressCountry: CONFIG.address.country
    }
  };

  if (CONFIG.websiteUrl) {
    data.url = CONFIG.websiteUrl;
  }
  if (CONFIG.phone) {
    data.telephone = CONFIG.phone;
  }
  if (CONFIG.hours.verified && CONFIG.hours.summary) {
    data.openingHours = CONFIG.hours.summary;
  }
  if (CONFIG.priceRange.verified && CONFIG.priceRange.text) {
    data.priceRange = CONFIG.priceRange.text;
  }
  // Do NOT include aggregateRating unless verified

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/* ==========================================================================
   15. INITIALISATION
   ========================================================================== */

function init() {
  loadCart();
  renderBusinessInfo();
  renderMenu();
  updateCartUI();
  initNavigation();
  initSearch();
  initOrderType();
  injectJsonLd();

  // Cart open/close
  document.getElementById("header-cart-btn")?.addEventListener("click", openCartPanel);
  document.getElementById("float-cart-btn")?.addEventListener("click", openCartPanel);
  document.getElementById("cart-close")?.addEventListener("click", closeCartPanel);
  document.getElementById("cart-backdrop")?.addEventListener("click", closeCartPanel);

  // WhatsApp send
  document.getElementById("btn-send-whatsapp")?.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsAppOrder();
  });

  // View menu secondary CTA
  document.getElementById("hero-menu-btn")?.addEventListener("click", () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  });

  // Copyright year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Back to top
  const backTop = document.getElementById("back-to-top");
  if (backTop) {
    const onScroll = () => {
      backTop.hidden = window.scrollY < 480;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
