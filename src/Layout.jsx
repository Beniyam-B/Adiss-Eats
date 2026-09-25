import { Outlet } from 'react-router-dom';
import { useCartStore } from './store/useCartStore';
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import Toast from './componenets/Toast';

function Layout() {
  const cartCount = useCartStore((state) => state.cart.length);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header cartCount={cartCount} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default Layout;