/**
 * menu-data.js
 * --------------------------------------------------------------------------
 * Single source of truth for Trubite Restaurant menu items.
 *
 * SCHEMA (each item):
 * {
 *   id:          string   – stable unique identifier
 *   category:    string   – display category
 *   name:        string   – dish name
 *   description: string   – short description
 *   price:       number   – price in Ghanaian cedis
 *   image:       string|null – optional approved image
 * }
 *
 * SOURCE NOTES (Oct 2026):
 * Prices and items taken from Trubite Restaurant menu boards published
 * on their Google / social presence (more recent board ≈ 3 months old,
 * plus supporting older board for local dishes).
 * Combo sizes (S/M/L) use the Medium price where shown.
 * Owner should re-confirm current prices before public launch.
 */

const MENU_DATA = [
  /* ---------- Appetizers ---------- */
  { id: "app-beef-spring-rolls", category: "Appetizers", name: "Beef Spring Rolls", description: "Crispy spring rolls filled with seasoned beef.", price: 25, image: "images/cat-wings.jpg" },
  { id: "app-veg-spring-rolls", category: "Appetizers", name: "Vegetable Spring Rolls", description: "Crispy vegetable spring rolls.", price: 20, image: "images/cat-wings.jpg" },
  { id: "app-beef-samosa", category: "Appetizers", name: "Beef Samosa", description: "Spiced beef samosas.", price: 35, image: "images/cat-wings.jpg" },
  { id: "app-veg-samosa", category: "Appetizers", name: "Vegetable Samosa", description: "Spiced vegetable samosas.", price: 20, image: "images/cat-wings.jpg" },
  { id: "app-trubite-special-wings", category: "Appetizers", name: "TruBite Special Chicken Wings", description: "House special chicken wings.", price: 100, image: "images/cat-wings.jpg" },
  { id: "app-spicy-chicken-wings", category: "Appetizers", name: "Spicy Chicken Wings", description: "Well-seasoned spicy chicken wings.", price: 70, image: "images/cat-wings.jpg" },
  { id: "app-spicy-turkey-wings", category: "Appetizers", name: "Spicy Turkey Wings", description: "Spicy turkey wings.", price: 100, image: "images/cat-wings.jpg" },
  { id: "app-spicy-chicken-pcs", category: "Appetizers", name: "Spicy Chicken Pieces", description: "Spicy chicken pieces.", price: 60, image: "images/cat-wings.jpg" },
  { id: "app-spicy-pork-chops", category: "Appetizers", name: "Spicy Pork Chops", description: "Spicy pork chops.", price: 80, image: "images/cat-wings.jpg" },
  { id: "app-spicy-lamb-chops", category: "Appetizers", name: "Spicy Lamb Chops", description: "Spicy lamb chops.", price: 100, image: "images/cat-wings.jpg" },
  { id: "app-spicy-goat-chops", category: "Appetizers", name: "Spicy Goat Chops", description: "Spicy goat chops.", price: 100, image: "images/cat-wings.jpg" },

  /* ---------- Salads ---------- */
  { id: "sal-vegetable", category: "Salads", name: "Vegetable Salad", description: "Fresh mixed vegetable salad.", price: 50, image: "images/cat-salad.jpg" },
  { id: "sal-tuna", category: "Salads", name: "Tuna Salad", description: "Tuna salad.", price: 50, image: "images/cat-salad.jpg" },
  { id: "sal-garden", category: "Salads", name: "Garden Salad", description: "Garden salad.", price: 50, image: "images/cat-salad.jpg" },
  { id: "sal-potato", category: "Salads", name: "Potato Salad", description: "Potato salad.", price: 50, image: "images/cat-salad.jpg" },
  { id: "sal-chicken", category: "Salads", name: "Chicken Salad", description: "Chicken salad.", price: 60, image: "images/cat-salad.jpg" },
  { id: "sal-egg", category: "Salads", name: "Egg Salad", description: "Egg salad.", price: 70, image: "images/cat-salad.jpg" },
  { id: "sal-pasta", category: "Salads", name: "Pasta Salad", description: "Pasta salad.", price: 50, image: "images/cat-salad.jpg" },
  { id: "sal-chicken-caesar", category: "Salads", name: "Chicken Caesar Salad", description: "Chicken Caesar salad.", price: 60, image: "images/cat-salad.jpg" },
  { id: "sal-shrimp", category: "Salads", name: "Shrimp Salad", description: "Shrimp salad.", price: 80, image: "images/cat-salad.jpg" },
  { id: "sal-cucumber-egg", category: "Salads", name: "Cucumber Egg Salad", description: "Cucumber and egg salad.", price: 100, image: "images/cat-salad.jpg" },
  { id: "sal-italian", category: "Salads", name: "Italian Cucumber/Tomato Salad", description: "Italian-style cucumber and tomato salad.", price: 50, image: "images/cat-salad.jpg" },
  { id: "sal-stirfry", category: "Salads", name: "Stir-Fry Salad", description: "Stir-fry salad.", price: 50, image: "images/cat-salad.jpg" },

  /* ---------- Sandwiches ---------- */
  { id: "snd-tuna", category: "Sandwiches", name: "Tuna Sandwich", description: "Tuna sandwich.", price: 50, image: "images/cat-sandwich.jpg" },
  { id: "snd-chicken", category: "Sandwiches", name: "Chicken Sandwich", description: "Chicken sandwich.", price: 50, image: "images/cat-sandwich.jpg" },
  { id: "snd-vegetable", category: "Sandwiches", name: "Vegetable Sandwich", description: "Vegetable sandwich.", price: 40, image: "images/cat-sandwich.jpg" },
  { id: "snd-club", category: "Sandwiches", name: "Club Sandwich", description: "Club sandwich.", price: 60, image: "images/cat-sandwich.jpg" },

  /* ---------- Snacks ---------- */
  { id: "snk-meat-pie", category: "Snacks", name: "Meat Pie (Beef)", description: "Beef meat pie.", price: 15, image: "images/cat-snacks.jpg" },
  { id: "snk-garlic-cheese-bread", category: "Snacks", name: "Garlic Cheese Bread", description: "Grilled garlic cheese bread.", price: 30, image: "images/cat-snacks.jpg" },
  { id: "snk-fish-pie", category: "Snacks", name: "Fish Pie", description: "Fish pie.", price: 15, image: "images/cat-snacks.jpg" },
  { id: "snk-sausage-roll", category: "Snacks", name: "Sausage Roll", description: "Sausage roll.", price: 10, image: "images/cat-snacks.jpg" },
  { id: "snk-chicken-pie", category: "Snacks", name: "Chicken Pie", description: "Chicken pie.", price: 15, image: "images/cat-snacks.jpg" },

  /* ---------- Fried Rice (Medium where S/M/L) ---------- */
  { id: "fr-grilled-chicken", category: "Fried Rice", name: "Fried Rice with Grilled Chicken", description: "Fried rice with grilled chicken (Medium).", price: 70, image: "images/cat-fried-rice.jpg" },
  { id: "fr-wings", category: "Fried Rice", name: "Fried Rice with Wings", description: "Fried rice with chicken wings (Medium).", price: 100, image: "images/cat-fried-rice.jpg" },
  { id: "fr-turkey-wings", category: "Fried Rice", name: "Fried Rice with Turkey Wings", description: "Fried rice with turkey wings (Medium).", price: 110, image: "images/cat-fried-rice.jpg" },
  { id: "fr-spicy-lamb", category: "Fried Rice", name: "Fried Rice with Spicy Lamb", description: "Fried rice with spicy lamb (Medium).", price: 100, image: "images/cat-fried-rice.jpg" },
  { id: "fr-spicy-goat", category: "Fried Rice", name: "Fried Rice with Spicy Goat", description: "Fried rice with spicy goat (Medium).", price: 100, image: "images/cat-fried-rice.jpg" },
  { id: "fr-pork-ribs", category: "Fried Rice", name: "Fried Rice with Pork Ribs", description: "Fried rice with pork ribs (Medium).", price: 100, image: "images/cat-fried-rice.jpg" },
  { id: "fr-lamb-chops", category: "Fried Rice", name: "Fried Rice with Lamb Chops", description: "Fried rice with lamb chops (Medium).", price: 100, image: "images/cat-fried-rice.jpg" },
  { id: "fr-tilapia", category: "Fried Rice", name: "Fried Rice with Tilapia", description: "Fried rice with tilapia (Medium).", price: 120, image: "images/cat-fried-rice.jpg" },
  { id: "fr-goat", category: "Fried Rice", name: "Goat Fried Rice", description: "Goat fried rice.", price: 80, image: "images/cat-fried-rice.jpg" },
  { id: "fr-pork", category: "Fried Rice", name: "Pork Fried Rice", description: "Pork fried rice.", price: 80, image: "images/cat-fried-rice.jpg" },
  { id: "fr-lamb", category: "Fried Rice", name: "Lamb Fried Rice", description: "Lamb fried rice.", price: 95, image: "images/cat-fried-rice.jpg" },
  { id: "fr-assorted", category: "Fried Rice", name: "Assorted Fried Rice", description: "Assorted fried rice (Medium).", price: 95, image: "images/cat-fried-rice.jpg" },
  { id: "fr-vegetable", category: "Fried Rice", name: "Vegetable Fried Rice", description: "Vegetable fried rice.", price: 50, image: "images/cat-fried-rice.jpg" },
  { id: "fr-beef", category: "Fried Rice", name: "Beef Fried Rice", description: "Beef fried rice.", price: 60, image: "images/cat-fried-rice.jpg" },
  { id: "fr-chicken", category: "Fried Rice", name: "Chicken Fried Rice", description: "Chicken fried rice.", price: 60, image: "images/cat-fried-rice.jpg" },
  { id: "fr-mushroom", category: "Fried Rice", name: "Mushroom Fried Rice", description: "Mushroom fried rice.", price: 70, image: "images/cat-fried-rice.jpg" },
  { id: "fr-egg", category: "Fried Rice", name: "Egg Fried Rice", description: "Egg fried rice.", price: 50, image: "images/cat-fried-rice.jpg" },

  /* ---------- Jollof ---------- */
  { id: "jol-grilled-chicken", category: "Jollof Rice", name: "Jollof Rice with Grilled Chicken", description: "Jollof rice with grilled chicken (Medium).", price: 80, image: "images/cat-jollof.jpg" },
  { id: "jol-turkey-wings", category: "Jollof Rice", name: "Jollof Rice with Turkey Wings", description: "Jollof rice with turkey wings (Medium).", price: 110, image: "images/cat-jollof.jpg" },
  { id: "jol-chicken-wings", category: "Jollof Rice", name: "Jollof Rice with Chicken Wings", description: "Jollof rice with chicken wings (Medium).", price: 100, image: "images/cat-jollof.jpg" },
  { id: "jol-goat", category: "Jollof Rice", name: "Jollof Rice with Goat", description: "Jollof rice with goat (Medium).", price: 100, image: "images/cat-jollof.jpg" },
  { id: "jol-tilapia", category: "Jollof Rice", name: "Jollof Rice with Tilapia", description: "Jollof rice with tilapia (Medium).", price: 120, image: "images/cat-jollof.jpg" },
  { id: "jol-dawadawa", category: "Jollof Rice", name: "Dawadawa Jollof", description: "Dawadawa jollof (Medium).", price: 70, image: "images/cat-jollof.jpg" },
  { id: "jol-vegetable", category: "Jollof Rice", name: "Vegetable Jollof", description: "Vegetable jollof rice.", price: 50, image: "images/cat-jollof.jpg" },

  /* ---------- Noodles ---------- */
  { id: "nod-seafood", category: "Noodles", name: "Seafood Noodles", description: "Seafood noodles.", price: 150, image: "images/cat-noodles.jpg" },
  { id: "nod-shrimp", category: "Noodles", name: "Shrimp Noodles", description: "Shrimp noodles.", price: 100, image: "images/cat-noodles.jpg" },
  { id: "nod-trubite-special", category: "Noodles", name: "TruBite Special Noodles", description: "House special noodles.", price: 100, image: "images/cat-noodles.jpg" },
  { id: "nod-singapore", category: "Noodles", name: "Singapore Noodles", description: "Singapore-style noodles.", price: 60, image: "images/cat-noodles.jpg" },
  { id: "nod-spaghetti-bolognese", category: "Noodles", name: "Spaghetti Bolognese", description: "Spaghetti Bolognese.", price: 60, image: "images/cat-noodles.jpg" },
  { id: "nod-beef", category: "Noodles", name: "Beef Noodles", description: "Beef noodles.", price: 60, image: "images/cat-noodles.jpg" },
  { id: "nod-chicken", category: "Noodles", name: "Chicken Noodles", description: "Chicken noodles.", price: 60, image: "images/cat-noodles.jpg" },
  { id: "nod-mushroom", category: "Noodles", name: "Mushroom Noodles", description: "Mushroom noodles.", price: 70, image: "images/cat-noodles.jpg" },
  { id: "nod-vegetable", category: "Noodles", name: "Vegetable Noodles", description: "Vegetable noodles.", price: 50, image: "images/cat-noodles.jpg" },

  /* ---------- Pizza (Medium) ---------- */
  { id: "piz-all-season", category: "Pizza", name: "All Season Pizza", description: "All season pizza (Medium).", price: 90, image: "images/cat-pizza.jpg" },
  { id: "piz-beef", category: "Pizza", name: "Beef Pizza", description: "Beef pizza (Medium).", price: 80, image: "images/cat-pizza.jpg" },
  { id: "piz-chicken", category: "Pizza", name: "Chicken Pizza", description: "Chicken pizza (Medium).", price: 80, image: "images/cat-pizza.jpg" },
  { id: "piz-sausage", category: "Pizza", name: "Sausage Pizza", description: "Sausage pizza (Medium).", price: 70, image: "images/cat-pizza.jpg" },
  { id: "piz-vegetable", category: "Pizza", name: "Vegetable Pizza", description: "Vegetable pizza (Medium).", price: 70, image: "images/cat-pizza.jpg" },
  { id: "piz-royal", category: "Pizza", name: "Royal Pizza", description: "Royal pizza (Medium).", price: 80, image: "images/cat-pizza.jpg" },
  { id: "piz-hawaiian", category: "Pizza", name: "Hawaiian Pizza", description: "Hawaiian pizza – pineapple, shrimp & chicken (Medium).", price: 100, image: "images/cat-pizza.jpg" },
  { id: "piz-margarita", category: "Pizza", name: "Margarita Pizza", description: "Margarita pizza (Medium).", price: 70, image: "images/cat-pizza.jpg" },
  { id: "piz-loaded-fries", category: "Pizza", name: "Chef's Special Loaded Fries", description: "Chef's special loaded fries.", price: 100, image: "images/cat-pizza.jpg" },

  /* ---------- Local Dishes ---------- */
  { id: "loc-banku-tilapia", category: "Local Dishes", name: "Banku & Grilled Tilapia", description: "Banku served with grilled tilapia.", price: 25, image: "images/cat-local.jpg" },
  { id: "loc-banku-okro", category: "Local Dishes", name: "Banku & Okro Stew", description: "Banku with okro stew (salmon, goat or beef options).", price: 18, image: "images/cat-local.jpg" },
  { id: "loc-palava", category: "Local Dishes", name: "Palava with Yam/Plantain & Red Fish", description: "Palava sauce with boiled yam or plantain and red fish.", price: 35, image: "images/cat-local.jpg" },
  { id: "loc-garden-eggs", category: "Local Dishes", name: "Garden Eggs Stew with Yam, Plantain & Salmon", description: "Garden eggs stew with boiled yam, plantain and salmon.", price: 70, image: "images/cat-local.jpg" },
  { id: "loc-goat-light-soup", category: "Local Dishes", name: "Goat Light Soup with Plain Rice", description: "Goat light soup served with plain rice.", price: 40, image: "images/cat-local.jpg" },
  { id: "loc-groundnut-soup", category: "Local Dishes", name: "Groundnut Soup", description: "Groundnut soup.", price: 40, image: "images/cat-local.jpg" },
  { id: "loc-palm-nut-soup", category: "Local Dishes", name: "Palm Nut Soup", description: "Palm nut soup.", price: 90, image: "images/cat-local.jpg" },
  { id: "loc-acheke", category: "Local Dishes", name: "Acheke", description: "Signature Acheke (popular house special).", price: 40, image: "images/cat-local.jpg" },
  { id: "loc-banku-side", category: "Local Dishes", name: "Banku (side)", description: "Banku portion.", price: 5, image: "images/cat-local.jpg" },
  { id: "loc-boiled-yam", category: "Local Dishes", name: "Boiled Yam", description: "Boiled yam.", price: 35, image: "images/cat-local.jpg" },
  { id: "loc-fried-yam", category: "Local Dishes", name: "Fried Yam", description: "Fried yam.", price: 35, image: "images/cat-local.jpg" },
  { id: "loc-french-fries", category: "Local Dishes", name: "French Fries", description: "French fries.", price: 40, image: "images/cat-local.jpg" },

  /* ---------- Sauces ---------- */
  { id: "sau-black-pepper-beef", category: "Sauces", name: "Black Pepper Beef Sauce", description: "Black pepper beef sauce.", price: 80, image: "images/cat-sauce.jpg" },
  { id: "sau-pepper-steak", category: "Sauces", name: "Pepper Steak Sauce", description: "Pepper steak sauce.", price: 100, image: "images/cat-sauce.jpg" },
  { id: "sau-fish-chilli", category: "Sauces", name: "Fish Fillet in Chilli Sauce", description: "Fish fillet in chilli sauce.", price: 100, image: "images/cat-sauce.jpg" },
  { id: "sau-chicken-chilli-garlic", category: "Sauces", name: "Chicken Fillet in Chilli & Garlic Sauce", description: "Chicken fillet in chilli and garlic sauce.", price: 80, image: "images/cat-sauce.jpg" },
  { id: "sau-assorted-protein", category: "Sauces", name: "Assorted Protein Sauce", description: "Assorted protein sauce.", price: 150, image: "images/cat-sauce.jpg" },
  { id: "sau-shrimp-stirfry", category: "Sauces", name: "Shrimp Stir-Fry Sauce", description: "Shrimp stir-fry sauce.", price: 150, image: "images/cat-sauce.jpg" },
  { id: "sau-assorted-seafood", category: "Sauces", name: "Assorted Seafood Sauce", description: "Assorted seafood sauce.", price: 200, image: "images/cat-sauce.jpg" },
  { id: "sau-stirfry-veg", category: "Sauces", name: "Stir-Fry Vegetable Sauce", description: "Stir-fry vegetable sauce.", price: 70, image: "images/cat-sauce.jpg" }
];
