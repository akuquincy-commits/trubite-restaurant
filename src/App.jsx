import React from "react";

function App() {
  return (
    <>
      {/* Header */}
      <header className="site-header" role="banner">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="Trubite Restaurant home">
            <img src="images/logo.png" alt="TruBite" className="logo-img" width="44" height="44" />
            <span className="logo-text">TruBite</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            id="nav-toggle"
            aria-controls="primary-nav"
            aria-expanded="false"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <nav className="primary-nav" id="primary-nav" aria-label="Primary">
            <a href="#menu" className="nav-link">Menu</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#location" className="nav-link">Location</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="cart-btn" id="header-cart-btn" aria-label="Open cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
                <path d="M6 6L5 3H2" />
              </svg>
              <span className="cart-badge" data-cart-count hidden>0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero hero--photo" aria-labelledby="hero-name">
        <div className="hero-bg" aria-hidden="true">
          <img src="images/hero-food.jpg" alt="" width="1600" height="900" loading="eager" />
        </div>
        <div className="container hero-inner">
          <div className="hero-content">
            <img src="images/logo.png" alt="" className="hero-brand-mark" width="72" height="72" />
            <h1 className="hero-name" id="hero-name">Trubite Restaurant</h1>
            <p className="hero-tagline" id="hero-tagline">Authentic West African &amp; Continental Dishes</p>
            <div className="hero-actions">
              <button type="button" className="btn btn--hero-primary" id="hero-menu-btn">View Menu</button>
              <a className="btn btn--hero-secondary" id="btn-directions-hero" href="#location">Directions</a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section menu-section" id="menu" aria-labelledby="menu-heading">
        <div className="container">
          <header className="section__header">
            <h2 className="section__title" id="menu-heading">Menu</h2>
            <p className="section__lead">
              Jollof, fried rice, Acheke, pizza, local favourites and more – all prepared fresh. Prices in Ghanaian cedis.
            </p>
          </header>
          <div className="menu-controls" id="menu-controls" hidden>
            {/* Search and filters could be added here */}
          </div>
          {/* Menu content will be injected by script.js */}
          <div className="menu-grid" id="menu-grid"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section" id="about" aria-labelledby="about-heading">
        <div className="container">
          <header className="section__header">
            <h2 className="section__title" id="about-heading">About Us</h2>
          </header>
          <div className="about-grid">
            <div className="about-details">
              <p>Trubite Restaurant offers a blend of West African flavors and contemporary dishes.</p>
            </div>
            <div className="about-image">
              <img src="images/logo.png" alt="Trubite" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section location-section" id="location" aria-labelledby="location-heading">
        <div className="container">
          <header className="section__header">
            <h2 className="section__title" id="location-heading">Location</h2>
          </header>
          <div className="map-wrap">
            {/* Placeholder for map iframe */}
          </div>
          <p className="map-note">Find us easily with the map above.</p>
          <div className="location-actions">
            <p className="location-address">123 Example Street, Kumasi, Ghana</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
