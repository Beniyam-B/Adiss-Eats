import { useCart } from '../context/CartContext';

function MenuItemCard({ item, onViewDetails }) {
  const { addToCart } = useCart();
  const { nameEn, description, priceETB, category, isSpecial, isFasting } = item;
  const imageSrc = `/images/${encodeURIComponent(nameEn)}.jpg`;

  return (
    <article className="menu-card">
      <img
        src={imageSrc}
        alt={nameEn}
        className="menu-card-image"
        onClick={() => onViewDetails(item)}
      />
      <p className="menu-card-category">{category}</p>
      <h3>{nameEn}</h3>
      {isSpecial && <p>⭐ Chef's Special</p>}
      {isFasting && <p>🌱 Fasting-Friendly</p>}
      <p>{description}</p>
      <p className="menu-card-price">ETB {priceETB}</p>
      <div className="menu-card-actions">
        <button onClick={() => onViewDetails(item)}>View Details</button>
        <button onClick={() => addToCart(item)}>Add to Cart</button>
      </div>
    </article>
  );
}

export default MenuItemCard;