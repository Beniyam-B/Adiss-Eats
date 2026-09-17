import { Outlet } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Header from './componenets/Header';
import Footer from './componenets/Footer';

function Layout() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="app">
      <Header cartCount={totalItems} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;