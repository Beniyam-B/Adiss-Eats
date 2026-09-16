function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <h1>Addis Eats</h1>
      <button className="cart-button" onClick={onCartClick}>
        🛒 {cartCount}
      </button>
    </header>
);
}

export default Header;