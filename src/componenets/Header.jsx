import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header({ cartCount }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navClass = ({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={closeMenu}>
        <h1>Addis Eats</h1>
      </Link>

      <button
        className="header__menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        <NavLink to="/" end className={navClass} onClick={closeMenu}>Today's Specials</NavLink>
        <NavLink to="/menu" className={navClass} onClick={closeMenu}>Full Menu</NavLink>
        {!user && <NavLink to="/login" className={navClass} onClick={closeMenu}>Login</NavLink>}
      </nav>

      <div className="header__account">
        {user && (
          <>
            <span className="header__greeting">Hi, {user.name}</span>
            <button className="header__logout" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </>
        )}
        <NavLink to="/cart" className="header__cart" onClick={closeMenu}>
          <i className="fa-solid fa-cart-shopping"></i> {cartCount}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;