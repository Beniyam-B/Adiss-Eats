import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ cartCount }) {
  const { user, logout } = useAuth();
  const navClass = ({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <h1>Addis Eats</h1>
      </Link>
      <nav className="header__nav">
        <NavLink to="/" end className={navClass}>Today's Specials</NavLink>
        <NavLink to="/menu" className={navClass}>Full Menu</NavLink>
        {!user && <NavLink to="/login" className={navClass}>Login</NavLink>}
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
        <NavLink to="/cart" className="header__cart">
          <i className="fa-solid fa-cart-shopping"></i> {cartCount}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;