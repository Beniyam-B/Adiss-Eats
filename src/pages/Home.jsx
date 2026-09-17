import { useState, useEffect } from 'react';
import MenuItemCard from '../componenets/MenuItemCard';
import DishDetailModal from '../componenets/DishDetailModal';
import rawMenuData from '../data/menu.json';
import specialsData from '../data/specials.json';
import { Link } from 'react-router-dom';

function Home() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fastingOnly, setFastingOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  if (loading) return <p className="status-message">Loading menu...</p>;
  if (error) return <p className="status-message status-error">{error}</p>;

  const filteredMenu = menuData.data.filter((item) => {
    const matchesSearch = item.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFasting = !fastingOnly || item.isFasting;
    return matchesSearch && matchesFasting;
  });

  const categories = [...new Set(filteredMenu.map((item) => item.category))];

  return (
    <>
    <section className="specials-section">
  <div className="specials-section-header">
    <h2>⭐ Today's Specials</h2>
    <Link to="/specials">View All →</Link>
  </div>
  <div className="specials-grid">
    {specialsData.data.map((item) => (
      <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
    ))}
  </div>
</section>

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
    </>
  );
}

export default Home;