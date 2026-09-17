import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PHONE_REGEX = /^(?:\+251|0)?[79]\d{8}$/;

function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, entry) => sum + entry.item.priceETB * entry.quantity, 0);

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
      <div className="checkout-page">
        <h2>Order Placed!</h2>
        <p>Thanks{user ? `, ${user.name}` : ''} — your order is on its way.</p>
        <Link to="/" className="checkout-link">Back to Menu</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Checkout</h2>
        <p>Your cart is empty — add something from the menu first.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.map((entry) => (
        <div key={entry.item.id} className="cart-row">
          <span>{entry.item.nameEn} × {entry.quantity}</span>
          <span>ETB {entry.item.priceETB * entry.quantity}</span>
        </div>
      ))}
      <p className="cart-total">Total: ETB {total}</p>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Delivery Address
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Bole, near Edna Mall"
          />
        </label>
        {errors.address && <p className="field-error">{errors.address}</p>}
        <label>
          Phone Number
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        {errors.phone && <p className="field-error">{errors.phone}</p>}
        <label>
          Notes (optional)
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. no onions" />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;