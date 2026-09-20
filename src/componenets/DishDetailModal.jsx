import { useEffect } from 'react';
import Modal from './Modal';
import DishImage from './DishImage';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { getSpiceLevel, cleanSpiceLabel } from '../utils/spice';

function DishDetailModal({ item, onClose }) {
  const { addToCart } = useCart();
  const { addViewed } = useRecentlyViewed();

  useEffect(() => {
    addViewed(item);
  }, [item]);

  const { nameEn, nameAm, description, priceETB, spiceLevel, servings, ingredients, isFasting, isSpecial } = item;
  const imageSrc = `/images/${encodeURIComponent(nameEn)}.jpg`;
  const spiceRating = getSpiceLevel(spiceLevel);

  return (
    <Modal onClose={onClose}>
      <DishImage src={imageSrc} alt={nameEn} className="modal__image" />
      <h2 id="modal-heading">{nameEn}</h2>
      <p className="modal__amharic">{nameAm}</p>
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
      <div className="info-box modal__facts">
        <p className="spice-rating">
          <strong>Spice level:</strong> {cleanSpiceLabel(spiceLevel)}{' '}
          {[1, 2, 3].map((n) => (
            <i
              key={n}
              className={`fa-solid fa-pepper-hot spice-rating__pepper ${n <= spiceRating ? 'spice-rating__pepper--active' : ''}`}
            ></i>
          ))}
        </p>
        <p><strong>Servings:</strong> {servings}</p>
        <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      </div>
      <p className="modal__price">ETB {priceETB}</p>
      <button className="modal__add-btn" onClick={() => { addToCart(item); onClose(); }}>
        Add to Cart
      </button>
    </Modal>
  );
}

export default DishDetailModal;