import { createContext, useContext, useState, useEffect } from 'react';
import { VALID_COUPONS } from '../utils/pricing';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((entry) => ({
      ...entry,
      cartLineId: entry.cartLineId || entry.item.id,
      extraPrice: entry.extraPrice || 0,
    }));
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return localStorage.getItem('appliedCoupon') || null;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('appliedCoupon', appliedCoupon);
    } else {
      localStorage.removeItem('appliedCoupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (item, customization = null, extraPrice = 0) => {
    const cartLineId = customization ? `${item.id}::${JSON.stringify(customization)}` : item.id;

    setCart((prevCart) => {
      const existing = prevCart.find((entry) => entry.cartLineId === cartLineId);
      if (existing) {
        return prevCart.map((entry) =>
          entry.cartLineId === cartLineId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prevCart, { item, quantity: 1, cartLineId, customization, extraPrice }];
    });

    setToast({ message: `${item.nameEn} added to cart`, id: Date.now() });
  };

  const removeFromCart = (cartLineId) => {
    setCart((prevCart) => prevCart.filter((entry) => entry.cartLineId !== cartLineId));
  };

  const updateQuantity = (cartLineId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((entry) =>
          entry.cartLineId === cartLineId
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    if (VALID_COUPONS[normalized]) {
      setAppliedCoupon(normalized);
      return true;
    }
    return false;
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, appliedCoupon, applyCoupon, toast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}