import React from "react";
import Logo from "./components/Logo.jsx";
import Nav from "./components/Nav.jsx";
import CartButton from "./components/CartButton.jsx";

function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <Logo />
        <Nav />
        <CartButton />
      </div>
    </header>
  );
}

export default Header;