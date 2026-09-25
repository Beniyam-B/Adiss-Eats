import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Header.css';

function Header({ cartCount }) {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navClass = ({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`;
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    };

    closeOnDesktop();
    window.addEventListener('resize', closeOnDesktop);

    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

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
        <NavLink to="/legal" className={navClass} onClick={closeMenu}>Legal</NavLink>
        {user ? (
          <>
            <span className="header__greeting">Hi, {user.name}</span>
            <button className="header__logout" onClick={() => { logout(); closeMenu(); }}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </>
        ) : pathname === '/login' ? (
          <NavLink to="/register" className={navClass} onClick={closeMenu}>Register</NavLink>
        ) : (
          <NavLink to="/login" className={navClass} onClick={closeMenu}>Login</NavLink>
        )}
      </nav>

      <NavLink to="/cart" className="header__cart" onClick={closeMenu}>
        <i className="fa-solid fa-cart-shopping"></i> {cartCount}
      </NavLink>
    </header>
  );
}

export default Header;