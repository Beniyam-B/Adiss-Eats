import { useCart } from '../context/CartContext';
import { getSpiceLevel } from '../utils/spice';

function MenuItemCard({ item, onViewDetails }) {
  const { addToCart } = useCart();
  const { nameEn, description, priceETB, category, isSpecial, isFasting, spiceLevel } = item;
  const imageSrc = `/images/${encodeURIComponent(nameEn)}.jpg`;
  const spiceRating = getSpiceLevel(spiceLevel);

  return (
    <article className="menu-card">
      <img
        src={imageSrc}
        alt={nameEn}
        className="menu-card__image"
        onClick={() => onViewDetails(item)}
      />
      <p className="menu-card__category">{category}</p>
      <h3>{nameEn}</h3>
      {isSpecial && (
        <p className="menu-card__badge menu-card__badge--special">
          <i className="fa-solid fa-star"></i> Chef's Special
        </p>
      )}
      {isFasting && (
        <p className="menu-card__badge menu-card__badge--fasting">
          <i className="fa-solid fa-leaf"></i> Fasting-Friendly
        </p>
      )}
      <p>{description}</p>
      <p className="spice-rating">
        {[1, 2, 3].map((n) => (
          <i
            key={n}
            className={`fa-solid fa-pepper-hot spice-rating__pepper ${n <= spiceRating ? 'spice-rating__pepper--active' : ''}`}
          ></i>
        ))}
      </p>
      <p className="menu-card__price">ETB {priceETB}</p>
      <div className="menu-card__actions">
        <button className="menu-card__view-details" onClick={() => onViewDetails(item)}>
          View Details
        </button>
        <button className="menu-card__add-btn" onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default MenuItemCard;