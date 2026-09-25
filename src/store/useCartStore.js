import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VALID_COUPONS } from '../utils/pricing';

let toastTimer = null;

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      appliedCoupon: null,
      toast: null,

      addToCart: (item, customization = null, extraPrice = 0) => {
        const cartLineId = customization
          ? `${item.id}::${JSON.stringify(customization)}`
          : item.id;

        set((state) => {
          const existing = state.cart.find((entry) => entry.cartLineId === cartLineId);
          if (existing) {
            return {
              cart: state.cart.map((entry) =>
                entry.cartLineId === cartLineId
                  ? { ...entry, quantity: entry.quantity + 1 }
                  : entry
              ),
            };
          }
          return {
            cart: [...state.cart, { item, quantity: 1, cartLineId, customization, extraPrice }],
          };
        });

        clearTimeout(toastTimer);
        set({ toast: { message: `${item.nameEn} added to cart`, id: Date.now() } });
        toastTimer = setTimeout(() => set({ toast: null }), 3000);
      },

      removeFromCart: (cartLineId) => {
        set((state) => ({
          cart: state.cart.filter((entry) => entry.cartLineId !== cartLineId),
        }));
      },

      updateQuantity: (cartLineId, delta) => {
        set((state) => ({
          cart: state.cart
            .map((entry) =>
              entry.cartLineId === cartLineId
                ? { ...entry, quantity: entry.quantity + delta }
                : entry
            )
            .filter((entry) => entry.quantity > 0),
        }));
      },

      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        if (VALID_COUPONS[normalized]) {
          set({ appliedCoupon: normalized });
          return true;
        }
        return false;
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),
    }),
    {
      name: 'addis-eats-cart',
      partialize: (state) => ({ cart: state.cart, appliedCoupon: state.appliedCoupon }),
    }
  )
);