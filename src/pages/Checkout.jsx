import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { checkoutSchema } from '../schemas/formSchemas';
import { calculateTotals } from '../utils/pricing';
import Field from '../componenets/Field';

function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const user = useAuthStore((state) => state.user);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: { fulfillment: 'delivery', address: '', phone: user?.phone || '', notes: '' },
  });

  const fulfillment = watch('fulfillment');
  const isPickup = fulfillment === 'pickup';
  const { deliveryFee, discount, vat, total } = calculateTotals(cart, appliedCoupon, isPickup);

  const onSubmit = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout">
        <div className="info-box info-box--success">
          <h2><i className="fa-solid fa-circle-check"></i> Order Placed!</h2>
          <p>
            Thanks{user ? `, ${user.name}` : ''} — your order is
            {isPickup ? ' ready for pickup soon.' : ' on its way.'}
          </p>
          <div className="checkout__confirmation-actions">
            <Link to="/menu" className="link-button">Continue Shopping</Link>
            <Link to="/" className="link-button link-button--outline">Back to Home</Link>
          </div>
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
        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form" noValidate>
          <fieldset className="checkout__fulfillment">
            <legend>How would you like your order?</legend>
            <label className="checkout__fulfillment-option">
              <input type="radio" id="delivery" value="delivery" {...register('fulfillment')} />
              <span><i className="fa-solid fa-motorcycle"></i> Delivery</span>
            </label>
            <label className="checkout__fulfillment-option">
              <input type="radio" id="pickup" value="pickup" {...register('fulfillment')} />
              <span><i className="fa-solid fa-store"></i> Pickup</span>
            </label>
          </fieldset>

          {isPickup ? (
            <div className="info-box checkout__pickup-info">
              <p><i className="fa-solid fa-location-dot"></i> Pick up from: <strong>Addis Eats, Bole, Addis Ababa</strong></p>
              <p className="checkout__pickup-note">Ready in about 25–35 minutes after ordering.</p>
            </div>
          ) : (
            <Field
              label="Delivery Address"
              as="textarea"
              placeholder="e.g. Bole, near Edna Mall"
              {...register('address')}
              error={errors.address?.message}
            />
          )}

          <Field label="Phone Number" type="tel" {...register('phone')} error={errors.phone?.message} />
          <Field
            label="Notes (optional)"
            placeholder="e.g. no onions"
            {...register('notes')}
            error={errors.notes?.message}
          />
          <button type="submit" className="checkout__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>

      <aside className="receipt">
        <h2>Order Summary</h2>
        {cart.map((entry) => {
          const unitPrice = entry.item.priceETB + (entry.extraPrice || 0);
          return (
            <div key={entry.cartLineId} className="receipt__row">
              <span>
                {entry.item.nameEn} × {entry.quantity}
                {entry.customization && (
                  <><br /><small>{entry.customization.spiceLevel} · {entry.customization.injera}</small></>
                )}
              </span>
              <span>ETB {unitPrice * entry.quantity}</span>
            </div>
          );
        })}
        {discount > 0 && (
          <div className="receipt__row receipt__row--discount">
            <span>Coupon ({appliedCoupon})</span>
            <span>-ETB {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="receipt__row">
          <span>{isPickup ? 'Pickup' : 'Delivery Fee'}</span>
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
