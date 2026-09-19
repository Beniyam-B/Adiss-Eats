import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PHONE_REGEX = /^(?:\+251|0)?[79]\d{8}$/;
const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;
const VAT_RATE = 0.15;

function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((sum, entry) => sum + entry.item.priceETB * entry.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + deliveryFee + vat;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!address.trim()) newErrors.address = 'Delivery address is required.';
    if (!PHONE_REGEX.test(phone)) newErrors.phone = 'Enter a valid Ethiopian phone number.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      clearCart();
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout">
        <div className="info-box info-box--success">
          <h2><i className="fa-solid fa-circle-check"></i> Order Placed!</h2>
          <p>Thanks{user ? `, ${user.name}` : ''} — your order is on its way.</p>
          <Link to="/" className="link-button">Back to Menu</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout">
        <h2>Checkout</h2>
        <p>Your cart is empty — add something from the menu first.</p>
        <Link to="/menu" className="link-button">Browse the Menu</Link>
      </div>
    );
  }

  return (
    <div className="checkout checkout--layout">
      <div className="checkout__form-col">
        <h2>Delivery Details</h2>
        <form onSubmit={handleSubmit} className="checkout__form">
          <label className="checkout__label">
            Delivery Address
            <textarea
              className="checkout__input checkout__textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Bole, near Edna Mall"
            />
          </label>
          {errors.address && <p className="checkout__error">{errors.address}</p>}
          <label className="checkout__label">
            Phone Number
            <input className="checkout__input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          {errors.phone && <p className="checkout__error">{errors.phone}</p>}
          <label className="checkout__label">
            Notes (optional)
            <input className="checkout__input" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. no onions" />
          </label>
          <button type="submit" className="checkout__submit">Place Order</button>
        </form>
      </div>

      <aside className="receipt">
        <h2>Order Summary</h2>
        {cart.map((entry) => (
          <div key={entry.item.id} className="receipt__row">
            <span>{entry.item.nameEn} × {entry.quantity}</span>
            <span>ETB {entry.item.priceETB * entry.quantity}</span>
          </div>
        ))}
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
      </aside>
    </div>
  );
}

export default Checkout;