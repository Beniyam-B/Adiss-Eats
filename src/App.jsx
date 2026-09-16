import { useState, useEffect } from 'react';
import './App.css';
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import MenuItemCard from './componenets/MenuItemCard';
import CartView from './componenets/CartView';
import DishDetailModal from './componenets/DishDetailModal';
import rawMenuData from './data/menu.json';
import { useCart } from './context/CartContext';

function App() {
  const { cart } = useCart();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fastingOnly, setFastingOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setMenuData(rawMenuData);
        setLoading(false);
      } catch {
        setError('Could not load the menu. Please try again.');
        setLoading(false);
      }
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="app">
        <Header cartCount={totalItems} onCartClick={() => setShowCart(!showCart)} />
        <p className="status-message">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header cartCount={totalItems} onCartClick={() => setShowCart(!showCart)} />
        <p className="status-message status-error">{error}</p>
      </div>
    );
  }

  const filteredMenu = menuData.data.filter((item) => {
    const matchesSearch = item.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFasting = !fastingOnly || item.isFasting;
    return matchesSearch && matchesFasting;
  });

  const categories = [...new Set(filteredMenu.map((item) => item.category))];

  return (
    <div className="app">
      <Header cartCount={totalItems} onCartClick={() => setShowCart(!showCart)} />
      {showCart && <CartView />}

      <div className="filters-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="fasting-toggle">
          <input
            type="checkbox"
            checked={fastingOnly}
            onChange={(e) => setFastingOnly(e.target.checked)}
          />
          🌱 Fasting-friendly only
        </label>
      </div>

      {categories.map((category) => (
        <section key={category} className="menu-section">
          <h2>{category}</h2>
          <div className="menu-grid">
            {filteredMenu
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
              ))}
          </div>
        </section>
      ))}

      {categories.length === 0 && <p className="no-results">No dishes match your filters.</p>}

      {selectedItem && (
        <DishDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      <Footer />
    </div>
  );
}

export default App;