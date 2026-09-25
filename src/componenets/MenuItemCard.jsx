import { useCartStore } from '../store/useCartStore';
import DishImage from './DishImage';
import { getSpiceLevel } from '../utils/spice';
import './MenuItemCard.css';

function MenuItemCard({ item, onViewDetails }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const quantity = useCartStore((state) => {
    const entry = state.cart.find((e) => e.item.id === item.id && !e.customization);
    return entry ? entry.quantity : 0;
  });

  const { nameEn, description, priceETB, category, isSpecial, isFasting, spiceLevel } = item;
  const imageSrc = `/images/${encodeURIComponent(nameEn)}.jpg`;
  const spiceRating = getSpiceLevel(spiceLevel);

  return (
    <article className="menu-card">
      <DishImage
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
            {spiceRating ? (
        <p className="spice-rating">
          {[1, 2, 3].map((n) => (
            <i
              key={n}
              className={`fa-solid fa-pepper-hot spice-rating__pepper ${n <= spiceRating ? 'spice-rating__pepper--active' : ''}`}
            ></i>
          ))}
        </p>
      ) : (
        <p className="spice-rating spice-rating--text">{spiceLevel}</p>
      )}
      <p className="menu-card__price">ETB {priceETB}</p>
      <div className="menu-card__actions">
        <button className="menu-card__view-details" onClick={() => onViewDetails(item)}>
          View Details
        </button>
        {quantity === 0 ? (
          <button className="menu-card__add-btn" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        ) : (
          <div className="menu-card__qty">
            <button className="menu-card__qty-btn" onClick={() => updateQuantity(item.id, -1)}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <span>{quantity}</span>
            <button className="menu-card__qty-btn" onClick={() => addToCart(item)}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default MenuItemCard;