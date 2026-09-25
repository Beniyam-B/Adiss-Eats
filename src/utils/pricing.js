export const DELIVERY_FEE = 60;
export const FREE_DELIVERY_THRESHOLD = 1000;
export const VAT_RATE = 0.15;
export const VALID_COUPONS = { ADDIS10: 0.10 , NEPO:1.00};

export function calculateTotals(cart, appliedCoupon, isPickup = false) {
  const subtotal = cart.reduce(
    (sum, entry) => sum + (entry.item.priceETB + (entry.extraPrice || 0)) * entry.quantity,
    0
  );
  const deliveryFee = isPickup ? 0 : (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE);
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon] : 0;
  const vat = (subtotal - discount) * VAT_RATE;
  const total = subtotal - discount + deliveryFee + vat;
  return { subtotal, deliveryFee, discount, vat, total };
}