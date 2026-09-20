import { Outlet } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import Toast from './componenets/Toast';

function Layout() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header cartCount={totalItems} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default Layout;