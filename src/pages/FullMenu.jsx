import { useState } from 'react';
import MenuItemCard from '../componenets/MenuItemCard';
import DishDetailModal from '../componenets/DishDetailModal';
import { useFetch } from '../hooks/useFetch';

const MENU_URL = 'https://addis-eats-backend.onrender.com/menu/';

function FullMenu() {
  const { data: menuData, loading, error } = useFetch(MENU_URL);
  const [searchTerm, setSearchTerm] = useState('');
  const [fastingOnly, setFastingOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Dishes');
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) return <p className="status">Loading menu...</p>;
  if (error) return <p className="status status--error">Could not load the menu: {error}</p>;

  const categoryNames = ['All Dishes', ...new Set(menuData.data.map((item) => item.category))];

  const filteredMenu = menuData.data.filter((item) => {
    const matchesSearch = item.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFasting = !fastingOnly || item.isFasting;
    const matchesCategory = activeCategory === 'All Dishes' || item.category === activeCategory;
    return matchesSearch && matchesFasting && matchesCategory;
  });

  return (
    <div className="info-box full-menu__intro-box">
      <p className="full-menu__eyebrow">Handcrafted Addis Spices</p>
      <h2>Our Full Menu</h2>
      <p className="full-menu__intro">
        Every dish is prepared fresh using traditional spice blends, stone-ground legumes,
        and slow-cooked stews — sourced daily from Addis Ababa's local markets.
      </p>

      <div className="filters-bar info-box">
        <input
          type="text"
          className="filters-bar__search"
          placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="filters-bar__fasting">
          <input
            type="checkbox"
            checked={fastingOnly}
            onChange={(e) => setFastingOnly(e.target.checked)}
          />
          <i className="fa-solid fa-leaf"></i> Fasting-friendly only
        </label>
      </div>

      <div className="category-filters">
        {categoryNames.map((name) => {
          const count = name === 'All Dishes'
            ? menuData.data.length
            : menuData.data.filter((item) => item.category === name).length;
          return (
            <button
              key={name}
              className={`category-filters__chip ${activeCategory === name ? 'category-filters__chip--active' : ''}`}
              onClick={() => setActiveCategory(name)}
            >
              {name} <span className="category-filters__count">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
        ))}
      </div>

      {filteredMenu.length === 0 && <p className="no-results">No dishes match your filters.</p>}

      {selectedItem && (
        <DishDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default FullMenu;