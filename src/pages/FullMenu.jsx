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
  const [sortBy, setSortBy] = useState('default');
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

  const sortedMenu = [...filteredMenu];
  if (sortBy === 'price-asc') {
    sortedMenu.sort((a, b) => a.priceETB - b.priceETB);
  } else if (sortBy === 'price-desc') {
    sortedMenu.sort((a, b) => b.priceETB - a.priceETB);
  } else if (sortBy === 'name-asc') {
    sortedMenu.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
  }

    const handleClearFilters = () => {
    setSearchTerm('');
    setFastingOnly(false);
    setActiveCategory('All Dishes');
  };
  return (
    <div className="full-menu">
      <div className="info-box full-menu__intro-box">
        <p className="full-menu__eyebrow">Handcrafted Addis Spices</p>
        <h2>Our Full Menu</h2>
        <p className="full-menu__intro">
          Every dish is prepared fresh using traditional spice blends, stone-ground legumes,
          and slow-cooked stews — sourced daily from Addis Ababa's local markets.
        </p>
        <p className="full-menu__intro">
          Addis Eats started as a small family kitchen in Bole, cooking recipes passed down
          for three generations. We now deliver across the city, but every dish still goes
          through the same hours-long process it always has — nothing rushed, nothing
          shortcut.
        </p>
      </div>

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
        <select
          className="filters-bar__sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
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
        {sortedMenu.map((item) => (
          <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
        ))}
      </div>

          {sortedMenu.length === 0 && (
        <div className="no-results">
          <p>No dishes match your filters.</p>
          <button className="link-button" onClick={handleClearFilters}>Clear Filters</button>
        </div>
      )}

      {selectedItem && (
        <DishDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default FullMenu;