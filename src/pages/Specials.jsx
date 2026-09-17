import { useState } from 'react';
import MenuItemCard from '../componenets/MenuItemCard';
import DishDetailModal from '../componenets/DishDetailModal';
import specialsData from '../data/specials.json';

function Specials() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="specials-page">
      <h2>⭐ Today's Specials</h2>
      <p className="specials-intro">Chef-picked dishes, featured today only.</p>
      <div className="menu-grid">
        {specialsData.data.map((item) => (
          <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
        ))}
      </div>
      {selectedItem && (
        <DishDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default Specials;