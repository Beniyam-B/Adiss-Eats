import { useCart } from '../context/CartContext';

function CartView() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, entry) => sum + entry.item.priceETB * entry.quantity, 0);

  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((entry) => (
        <div key={entry.item.id} className="cart-row">
          <span>{entry.item.nameEn}</span>
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(entry.item.id, -1)}>−</button>
            <span>{entry.quantity}</span>
            <button onClick={() => updateQuantity(entry.item.id, 1)}>+</button>
          </div>
          <span>ETB {entry.item.priceETB * entry.quantity}</span>
          <button onClick={() => removeFromCart(entry.item.id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && <p className="cart-total">Total: ETB {total}</p>}
    </div>
  );
}

export default CartView;