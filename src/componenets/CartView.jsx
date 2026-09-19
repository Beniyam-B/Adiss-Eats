import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;
const VAT_RATE = 0.15;
const VALID_COUPONS = { ADDIS10: 0.10 };

function CartView() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <i className="fa-solid fa-basket-shopping cart-empty__icon"></i>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="link-button">Browse the Menu</Link>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, entry) => sum + entry.item.priceETB * entry.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon] : 0;
  const vat = (subtotal - discount) * VAT_RATE;
  const total = subtotal - discount + deliveryFee + vat;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code.');
    }
  };

  return (
    <div className="cart-layout">
      <div className="cart-layout__items">
        <h2>Your Order</h2>
        {cart.map((entry) => {
          const imageSrc = `/images/${encodeURIComponent(entry.item.nameEn)}.jpg`;
          return (
            <div key={entry.item.id} className="cart-item">
              <img src={imageSrc} alt={entry.item.nameEn} className="cart-item__image" />
              <div className="cart-item__details">
                <h4>{entry.item.nameEn}</h4>
                <p className="cart-item__category">{entry.item.category}</p>
                <p className="cart-item__price">ETB {entry.item.priceETB} each</p>
              </div>
              <div className="cart-item__actions">
                <div className="cart-view__qty">
                  <button className="cart-view__qty-btn" onClick={() => updateQuantity(entry.item.id, -1)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{entry.quantity}</span>
                  <button className="cart-view__qty-btn" onClick={() => updateQuantity(entry.item.id, 1)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <p className="cart-item__line-total">ETB {entry.item.priceETB * entry.quantity}</p>
                <button className="cart-view__remove-btn" onClick={() => removeFromCart(entry.item.id)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="receipt">
        <h2>Receipt</h2>
        <div className="receipt__row">
          <span>Subtotal</span>
          <span>ETB {subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="receipt__row receipt__row--discount">
            <span>Coupon ({appliedCoupon})</span>
            <span>-ETB {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="receipt__row">
          <span>Delivery Fee</span>
          <span>{deliveryFee === 0 ? 'Free' : `ETB ${deliveryFee.toFixed(2)}`}</span>
        </div>
        <div className="receipt__row">
          <span>VAT (15%)</span>
          <span>ETB {vat.toFixed(2)}</span>
        </div>
        <div className="receipt__row receipt__row--total">
          <span>Total</span>
          <span>ETB {total.toFixed(2)}</span>
        </div>

        {subtotal < FREE_DELIVERY_THRESHOLD && (
          <p className="receipt__note">
            Add ETB {(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for free delivery.
          </p>
        )}

        <form onSubmit={handleApplyCoupon} className="receipt__coupon">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Coupon code"
          />
          <button type="submit">Apply</button>
        </form>
        {couponError && <p className="auth__error">{couponError}</p>}

        <Link to="/checkout" className="link-button receipt__checkout-btn">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}

export default CartView;