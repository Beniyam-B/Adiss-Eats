import Modal from './Modal';
import { useCart } from '../context/CartContext';

function DishDetailModal({ item, onClose }) {
  const { addToCart } = useCart();
  const { nameEn, nameAm, description, priceETB, spiceLevel, servings, ingredients, isFasting, isSpecial } = item;
  const imageSrc = `/images/${encodeURIComponent(nameEn)}.jpg`;

  return (
    <Modal onClose={onClose}>
      <img src={imageSrc} alt={nameEn} className="modal-image" />
      <h2>{nameEn}</h2>
      <p className="modal-amharic">{nameAm}</p>
      {isSpecial && <p>⭐ Chef's Special</p>}
      {isFasting && <p>🌱 Fasting-Friendly</p>}
      <p>{description}</p>
      <p><strong>Spice level:</strong> {spiceLevel}</p>
      <p><strong>Servings:</strong> {servings}</p>
      <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      <p className="modal-price">ETB {priceETB}</p>
      <button onClick={() => { addToCart(item); onClose(); }}>Add to Cart</button>
    </Modal>
  );
}

export default DishDetailModal;