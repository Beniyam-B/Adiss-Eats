import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { getSpiceLevel, cleanSpiceLabel } from '../utils/spice';

const MENU_URL = 'https://addis-eats-backend.onrender.com/menu/';

const HERITAGE_BLURBS = {
  'Traditional Stews & Wat': 'Slow-simmered for hours the way it has been in Ethiopian highland kitchens for generations — patience is the real ingredient here.',
  'Tibs & Grills': 'Pan-seared fast and hot, the way street vendors and family kitchens across Addis Ababa have perfected for decades.',
  'Raw & Cured Delicacies / Kitfo': 'A dish of trust — traditionally prepared fresh to order, seasoned the same way it has been for generations.',
  'Fasting & Vegan / Tsom': 'Rooted in Ethiopian Orthodox fasting tradition, built entirely without meat or dairy, yet never short on flavor.',
  'Beverages & Tej': 'Brewed and served the traditional way, meant to be shared slowly, not rushed.',
};

function DishHighlight() {
  const { dishId } = useParams();
  const { data: menuData, loading, error } = useFetch(MENU_URL);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p className="status">Loading dish...</p>;
  if (error) return <p className="status status--error">Could not load this dish: {error}</p>;

  const item = menuData.data.find((d) => d.id === dishId);

  if (!item) {
    return (
      <div className="dish-highlight">
        <p className="status status--error">We couldn't find that dish.</p>
        <Link to="/menu" className="link-button">Back to Full Menu</Link>
      </div>
    );
  }

  const { nameEn, nameAm, description, priceETB, category, spiceLevel, servings, ingredients, isFasting, isSpecial } = item;
  const imageSrc = `/images/${encodeURIComponent(nameEn)}.jpg`;
  const spiceRating = getSpiceLevel(spiceLevel);
  const heritageBlurb = HERITAGE_BLURBS[category] || 'Prepared fresh, the traditional way, every single day.';

  const pairings = menuData.data
    .filter((d) => d.category === 'Beverages & Tej' && d.id !== item.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
  };

  return (
    <div className="dish-highlight">
      <p className="dish-highlight__breadcrumb">
        <Link to="/">Home</Link> / <Link to="/menu">Full Menu</Link> / {category} / {nameEn}
      </p>

      <div className="dish-highlight__layout">
        <img src={imageSrc} alt={nameEn} className="dish-highlight__image" />

        <div className="dish-highlight__info">
          <div className="dish-highlight__badges">
            {isSpecial && (
              <span className="menu-card__badge menu-card__badge--special">
                <i className="fa-solid fa-star"></i> Chef's Special
              </span>
            )}
            {isFasting && (
              <span className="menu-card__badge menu-card__badge--fasting">
                <i className="fa-solid fa-leaf"></i> Fasting-Friendly
              </span>
            )}
            <span className="menu-card__badge">House Recipe</span>
          </div>

          <h2>{nameEn}</h2>
          <p className="dish-highlight__amharic">{nameAm}</p>
          <p className="dish-highlight__price">ETB {priceETB}</p>
          <p>{description}</p>

          <div className="info-box dish-highlight__facts">
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Servings:</strong> {servings}</p>
            <p className="spice-rating">
              <strong>Spice level:</strong> {cleanSpiceLabel(spiceLevel)}{' '}
              {[1, 2, 3].map((n) => (
                <i
                  key={n}
                  className={`fa-solid fa-pepper-hot spice-rating__pepper ${n <= spiceRating ? 'spice-rating__pepper--active' : ''}`}
                ></i>
              ))}
            </p>
            <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
          </div>

          <div className="dish-highlight__add-row">
            <div className="dish-highlight__qty">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button className="modal__add-btn" onClick={handleAddToCart}>
              Add to Cart • ETB {priceETB * quantity}
            </button>
          </div>
        </div>
      </div>

      <section className="story">
        <div className="story__content">
          <p className="full-menu__eyebrow">Heritage & Lineage</p>
          <h2>The Story Behind {nameEn}</h2>
          <p>{heritageBlurb}</p>
        </div>
      </section>

      {pairings.length > 0 && (
        <section className="extras">
          <h2>Pairs Well With</h2>
          <div className="extras__row">
            {pairings.map((pair) => (
              <div key={pair.id} className="extras__card">
                <div>
                  <h4>{pair.nameEn}</h4>
                  <p className="extras__price">ETB {pair.priceETB}</p>
                </div>
                <button className="extras__add-btn" onClick={() => addToCart(pair)}>+ Add</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <Link to="/menu" className="link-button">Explore Full Menu</Link>
    </div>
  );
}

export default DishHighlight;