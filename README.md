# Trubite Restaurant Website

A static, client-ready website for **Trubite Restaurant** (Kumasi, Ghana).  
Customers can discover the restaurant, browse a verified menu, build an order, and send it via WhatsApp.

**Technology:** HTML5 · CSS3 · Vanilla JavaScript  
**Hosting:** Any static host (designed for Netlify, no build step)

---

## 1. Purpose

- Present the restaurant brand clearly and truthfully.
- Let customers browse dishes and prices once the menu is verified.
- Provide a reliable cart and WhatsApp order flow.
- Remain fully usable as a static site with no backend or paid services required for core features.

This is an **ordering interface**, not a full restaurant management system. It does **not** process payments, auto-confirm orders, or guarantee availability.

---

## 2. Required files

| File            | Role                                      |
|-----------------|-------------------------------------------|
| `index.html`    | Semantic structure, metadata, content     |
| `style.css`     | Complete responsive design system         |
| `script.js`     | Config, cart, validation, WhatsApp logic  |
| `menu-data.js`  | Menu array and schema documentation       |
| `README.md`     | This documentation                        |

All five files live in the same directory. Scripts load in this order:

```html
<script src="menu-data.js"></script>
<script src="script.js"></script>
```

---

## 3. How the files work together

1. `menu-data.js` exposes `MENU_DATA` (an array of dish objects).
2. `script.js` reads `CONFIG` (business details) and `MENU_DATA`, validates them, and renders the page.
3. `index.html` provides the semantic shell and empty containers that JavaScript fills.
4. `style.css` styles everything with a mobile-first, editorial design system.

There is **no build step**. Open `index.html` in a browser or deploy the folder as-is.

---

## 4. Editing business details (CONFIG)

Open `script.js` and locate the `CONFIG` object near the top.

```js
const CONFIG = {
  name: "Trubite Restaurant",
  tagline: "Authentic West African & Continental Dishes",
  // ...
  phone: null,          // set verified number, e.g. "+233XXXXXXXXX"
  whatsapp: null,       // same – required for ordering
  // ...
};
```

**Rules**

- `CONFIG` is the single source of truth. Do not hard-code the same values elsewhere.
- Use `null` (or `verified: false`) for anything not yet confirmed by the owner.
- The UI hides unverified phone, WhatsApp, rating, hours detail, and price-range claims automatically.
- After changing `CONFIG`, refresh the page. No rebuild is needed.

---

## 5. Configuring the WhatsApp number

1. Obtain a verified WhatsApp Business (or personal) number from the restaurant owner.
2. In `CONFIG`, set:

```js
whatsapp: "+233XXXXXXXXX",  // international format preferred
```

3. The code normalises the number for `wa.me` (digits only, no `+`).
4. Once set, the “Order on WhatsApp” buttons and floating shortcut appear.
5. Until a valid number is present, the ordering UI stays in an “being configured” state and never generates a misleading link.

**Test carefully** before launch: open the site, add items, fill the form, and confirm the correct chat opens with a correctly encoded message.

---

## 6. Adding, editing, and removing menu items

Edit `menu-data.js` only.

```js
const MENU_DATA = [
  {
    id: "jollof-rice-1",           // unique, stable string
    category: "Mains",
    name: "Jollof Rice with Chicken",
    description: "Smoky Ghanaian jollof rice served with grilled chicken.",
    price: 65.00,                  // number, ≥ 0
    image: null                    // optional approved URL/path
  }
  // more items…
];
```

- **Add** – push a new object that follows the schema.
- **Edit** – change name, description, price, etc. Keep the same `id` if you want existing carts to continue recognising the dish.
- **Remove** – delete the object. Any cart entries for that `id` are discarded on next load.

Category filters are generated automatically from the data. Invalid entries (missing name, non-numeric price, duplicate id, etc.) are filtered out at runtime.

---

## 7. Price format

- Store prices as numbers in Ghanaian cedis (e.g. `65` or `65.00`).
- The site formats them with `Intl.NumberFormat` using the locale in `CONFIG.currency` (default `en-GH`).
- Display example: **GH₵65.00**.

Never store or trust prices from LocalStorage; totals are always recalculated from the current `MENU_DATA`.

---

## 8. Adding approved photographs

1. Obtain images approved by the restaurant (do not use unrelated stock photos as if they depict Trubite dishes).
2. For a menu item, set the `image` field to a relative path or absolute URL:

```js
image: "images/jollof.jpg"
```

3. For a hero image, set `CONFIG.images.hero` (and optionally update the HTML if you prefer a static `<img>`).
4. Prefer optimised dimensions and use `loading="lazy"` (already applied to menu images).

If no image is supplied, the card simply omits the media area.

---

## 9. Testing the cart and WhatsApp message

1. Temporarily add at least one valid item to `MENU_DATA`.
2. Open the site, add items, change quantities, remove items.
3. Confirm the floating bar (mobile) and header badge update.
4. Open the cart panel, fill name, choose Pickup or Delivery, add notes if desired.
5. Click **Send order on WhatsApp**.
6. Verify:
   - Form validation works (name required; delivery location required only for delivery).
   - The correct `wa.me` URL opens.
   - The message contains restaurant name, items, quantities, unit prices, line totals, grand total, customer details, and notes.
   - Special characters and Ghanaian text encode correctly.
7. Confirm the UI never claims “order submitted” – only that WhatsApp opened and the customer must send the message.

Reload the page and confirm the cart restores (when LocalStorage is available). Manually corrupt LocalStorage and confirm the page still loads cleanly.

---

## 10. Testing locally

**Option A – Double-click**  
Open `index.html` directly in a modern browser. Most features work; some browsers restrict `localStorage` on `file://`.

**Option B – Simple local server (recommended)**

```bash
# Python 3
python3 -m http.server 8080

# or Node (if available)
npx serve .
```

Then visit `http://localhost:8080`.

Check at approximately:

- 360 px width (small mobile)
- 390 px
- Tablet (~768 px)
- Desktop (≥ 960 px)

Confirm no horizontal overflow, readable touch targets, and working keyboard navigation.

---

## 11. Deploying to Netlify (no build step)

1. Push the five files (and any image assets) to a Git repository, **or** drag the folder onto Netlify’s deploy UI.
2. In Netlify:
   - **Build command:** leave empty.
   - **Publish directory:** the folder that contains `index.html` (usually the root of the repo or the project folder).
3. Deploy.
4. After the first deploy, set `CONFIG.websiteUrl` to the live URL if you want a canonical link and more complete Open Graph data, then redeploy.

The site is pure static files; any static host (GitHub Pages, Cloudflare Pages, Vercel static, etc.) works the same way.

---

## 12. Information that must be verified before public launch

| Item                        | Status in current code      | Action required                          |
|----------------------------|-----------------------------|------------------------------------------|
| Exact address / entrance   | Proposed location used      | Owner confirms pin and wording           |
| Opening hours              | Summary present, not verified | Owner supplies exact daily hours       |
| Phone number               | `null`                      | Owner supplies verified number           |
| WhatsApp number            | `null`                      | Owner supplies verified number           |
| Menu items & prices        | Empty array                 | Owner supplies full verified menu        |
| Food / restaurant photos   | None                        | Owner supplies approved images           |
| Price-range claim          | Not shown (`verified: false`) | Confirm before enabling                |
| Rating & review count      | Not shown                   | Confirm current Google (or other) figures|
| Website URL                | `null`                      | Set when domain is live                  |
| Map exactness              | Note shown that pin is approximate | Confirm before removing note        |

Until these are confirmed, the site deliberately hides or soft-pedals the corresponding claims.

---

## 13. Features intentionally not implemented

- Payment processing of any kind
- Automatic order confirmation or kitchen notifications
- Live stock / availability management
- User accounts or order history
- Delivery fee calculation or driver tracking
- Admin dashboard or CMS
- Frameworks, bundlers, or server-side code

WhatsApp ordering works by preparing a message and opening the chat. The customer must still press Send, and the restaurant must confirm the order.

---

## Quick start checklist for the restaurant owner

1. Supply verified WhatsApp (and optional phone) numbers.
2. Supply the full menu with prices and short descriptions.
3. Confirm address, hours, and map pin.
4. Optionally supply approved photographs.
5. Developer updates `CONFIG` and `MENU_DATA`, tests the WhatsApp flow, then deploys.

---

**Website by Quincy Aku-Boye**
