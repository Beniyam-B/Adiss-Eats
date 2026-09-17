import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ cartCount }) {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <h1>Addis Eats</h1>
      <nav className="main-nav">
        <Link to="/">Menu</Link>
        <Link to="/specials">Specials</Link>
        {user ? (
          <button className="logout-button" onClick={logout}>Hi, {user.name} (Logout)</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Link to="/cart" className="cart-button">🛒 {cartCount}</Link>
    </header>
  );
}

export default Header;