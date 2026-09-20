import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculateTotals, FREE_DELIVERY_THRESHOLD } from '../utils/pricing';
import DishImage from './DishImage';
import './CartView.css';

function CartView() {
  const { cart, removeFromCart, updateQuantity, appliedCoupon, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
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

  const { subtotal, deliveryFee, discount, vat, total } = calculateTotals(cart, appliedCoupon);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    setCouponError(success ? '' : 'Invalid coupon code.');
  };

  return (
    <div className="cart-layout">
      <div className="cart-layout__items">
        <h2>Your Order</h2>
        {cart.map((entry) => {
          const imageSrc = `/images/${encodeURIComponent(entry.item.nameEn)}.jpg`;
          const unitPrice = entry.item.priceETB + (entry.extraPrice || 0);
          return (
            <div key={entry.cartLineId} className="cart-item">
              <DishImage src={imageSrc} alt={entry.item.nameEn} className="cart-item__image" />
              <div className="cart-item__details">
                <h4>{entry.item.nameEn}</h4>
                <p className="cart-item__category">{entry.item.category}</p>
                {entry.customization && (
                  <p className="cart-item__customization">
                    {entry.customization.spiceLevel} · {entry.customization.injera}
                    {entry.customization.sides.length > 0 && ` · ${entry.customization.sides.join(', ')}`}
                  </p>
                )}
                <p className="cart-item__price">ETB {unitPrice} each</p>
              </div>
              <div className="cart-item__actions">
                <div className="cart-view__qty">
                  <button className="cart-view__qty-btn" onClick={() => updateQuantity(entry.cartLineId, -1)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{entry.quantity}</span>
                  <button className="cart-view__qty-btn" onClick={() => updateQuantity(entry.cartLineId, 1)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <p className="cart-item__line-total">ETB {unitPrice * entry.quantity}</p>
                <button className="cart-view__remove-btn" onClick={() => removeFromCart(entry.cartLineId)}>
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

        {appliedCoupon ? (
          <p className="receipt__note">
            <i className="fa-solid fa-circle-check"></i> Coupon "{appliedCoupon}" applied — carries over to checkout.
          </p>
        ) : (
          <form onSubmit={handleApplyCoupon} className="receipt__coupon">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
            />
            <button type="submit">Apply</button>
          </form>
        )}
        {couponError && <p className="auth__error">{couponError}</p>}

        <Link to="/checkout" className="link-button receipt__checkout-btn">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}

export default CartView;