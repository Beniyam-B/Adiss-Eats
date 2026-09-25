import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItemCard from '../componenets/MenuItemCard';
import DishDetailModal from '../componenets/DishDetailModal';
import SkeletonCard from '../componenets/SkeletonCard';
import { useFetch } from '../hooks/useFetch';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

const SPECIALS_URL = 'https://addis-eats-backend.onrender.com/menu/specials';
const MENU_URL = 'https://addis-eats-backend.onrender.com/menu/';

const TESTIMONIALS = [
  { initials: 'AM', name: 'Amanuel Mengistu', role: 'Bole Resident', quote: 'The Doro Wat tastes exactly like my grandmother\u2019s — slow, patient, full of berbere depth.' },
  { initials: 'ST', name: 'Sara Tesfaye', role: 'Plant-Based Diner', quote: 'Their fasting Beyaynetu is unbeatable on Wednesdays. Everything arrives hot, even after delivery.' },
  { initials: 'DK', name: 'Dr. Kebede Wolde', role: 'Diaspora Homecoming Guest', quote: 'Ordered for a 10-person family gathering. Everyone said it tasted like home.' },
];

function Home() {
  // throw new Error('test')
  const user = useAuthStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);
  const { recentlyViewed } = useRecentlyViewed();
  const { data: specialsData, loading, error } = useFetch(SPECIALS_URL);
  const { data: menuData } = useFetch(MENU_URL);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const centerpiece = specialsData
    ? specialsData.data.find((item) => item.nameEn === 'Classic Doro Wat')
      || specialsData.data.reduce((top, item) => (item.priceETB > top.priceETB ? item : top), specialsData.data[0])
    : null;

  const restOfSpecials = specialsData && centerpiece
    ? specialsData.data.filter((item) => item.id !== centerpiece.id)
    : [];

  const specialCategories = ['All', ...new Set(restOfSpecials.map((item) => item.category))];

  const filteredSpecials = restOfSpecials.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  const drinks = menuData ? menuData.data.filter((item) => item.category === 'Beverages & Tej') : [];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__main">
            <p className="hero__eyebrow">Traditional Habesha Kitchen</p>
            <h2 className="hero__heading">Slow-Cooked Heritage, Delivered Fresh</h2>
            <p className="hero__text">
              Hand-ground berbere, stone-milled teff injera, and stews simmered for hours —
              the flavors of Addis Ababa, brought straight to your door.
            </p>
            <div className="hero__actions">
              <a href="#specials" className="hero__btn hero__btn--primary">Explore Today's Specials</a>
              <Link to="/menu" className="hero__btn hero__btn--secondary">View Full Menu</Link>
            </div>
            <div className="hero__stats">
              <span><i className="fa-solid fa-wheat-awn"></i> 100% Stone-Ground Teff</span>
              <span><i className="fa-solid fa-clock"></i> 6+ Hour Slow Stews</span>
              <span><i className="fa-solid fa-mug-hot"></i> Daily Coffee Ceremony</span>
            </div>
          </div>

          {centerpiece && (
            <div className="hero__centerpiece">
              <p className="hero__centerpiece-label"><i className="fa-solid fa-crown"></i> Today's Centerpiece</p>
              <Link to={`/dish/${centerpiece.id}`} className="hero__centerpiece-card">
                <img
                  src={`/images/${encodeURIComponent(centerpiece.nameEn)}.jpg`}
                  alt={centerpiece.nameEn}
                  className="hero__centerpiece-image"
                />
                <p className="hero__centerpiece-price">ETB {centerpiece.priceETB}</p>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section id="specials" className="specials">
        <div className="specials__header">
          <div>
            <h2><i className="fa-solid fa-star"></i> Today's Specials</h2>
            <p className="specials__intro">Hand-picked by our chefs, featured today only.</p>
          </div>
          <Link to="/menu">View All →</Link>
        </div>

        {loading && (
          <div className="specials__grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {error && <p className="status status--error">Could not load specials: {error}</p>}

        {specialsData && (
          <>
            <div className="category-filters">
              {specialCategories.map((name) => (
                <button
                  key={name}
                  className={`category-filters__chip ${activeFilter === name ? 'category-filters__chip--active' : ''}`}
                  onClick={() => setActiveFilter(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="specials__grid">
              {filteredSpecials.map((item) => (
                <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="story">
        <div className="story__content">
          <h2>The Spirit of Sharing</h2>
          <p>
            In Habesha tradition, a meal is never eaten alone — hands meet over one plate,
            and injera is torn and shared as a gesture of trust and hospitality. We prepare
            every order the same way it would be served at a family table.
          </p>
          <p className="story__highlight">
            <i className="fa-solid fa-mug-hot"></i> Coffee ceremony brewed fresh, daily at 4:00 PM.
          </p>
        </div>
      </section>

      {drinks.length > 0 && (
        <section className="extras">
          <h2>Round Out Your Order</h2>
          <div className="extras__row">
            {drinks.map((item) => (
              <div key={item.id} className="extras__card">
                <div>
                  <h4>{item.nameEn}</h4>
                  <p className="extras__price">ETB {item.priceETB}</p>
                </div>
                <button className="extras__add-btn" onClick={() => addToCart(item)}>+ Add</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="extras">
          <h2>Recently Viewed</h2>
          <div className="extras__row">
            {recentlyViewed.map((item) => (
              <Link key={item.id} to={`/dish/${item.id}`} className="extras__card extras__card--link">
                <div>
                  <h4>{item.nameEn}</h4>
                  <p className="extras__price">ETB {item.priceETB}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="testimonials">
        <h2>What Our Guests Say</h2>
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonials__card">
              <p className="testimonials__quote">"{t.quote}"</p>
              <div className="testimonials__author">
                <span className="testimonials__avatar">{t.initials}</span>
                <div>
                  <p className="testimonials__name">{t.name}</p>
                  <p className="testimonials__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Taste Addis?</h2>
        <p>Fresh stews, hand-rolled injera, and house-brewed tej — order in a couple of taps.</p>
        <div className="cta__actions">
          <Link to="/menu" className="hero__btn hero__btn--primary">Browse Full Menu</Link>
          {!user && <Link to="/register" className="hero__btn hero__btn--secondary">Create an Account</Link>}
        </div>
      </section>

      {selectedItem && (
        <DishDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default Home;