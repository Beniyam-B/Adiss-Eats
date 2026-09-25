# Addis Eats

A food ordering web app built with React + Vite as part of the CodeOps Full Stack program (IBT College Canada, Module 3). Styled and structured with reference to a Figma restaurant template, adapted to Addis Eats' own branding.

## Features

- Menu browsing grouped by category
- Live search by dish name
- Fasting-friendly filter toggle
- Dish detail modal (built with React Portals) with full description, spice level, servings, and ingredients
- Cart with quantity controls, persisted in `localStorage`
- Loading/error states and an Error Boundary for resilience
- Dedicated dish highlight page with heritage blurb and pairings (/dish/:id)
- Two-column Cart and Checkout with VAT, delivery threshold, and coupon codes
- Full CSS rewritten to BEM naming
- Hover animations and color transitions across buttons, cards, and links
- Accessible modal (focus trap, Escape to close, focus returns on close)
- Skip-to-content link and mobile hamburger nav
- Sort menu by price/name, "Clear Filters" on empty results
- Per-page browser tab titles, scroll-to-top on navigation
- Graceful fallback image if a dish photo fails to load
- Recently Viewed dishes section, persisted across sessions
- Skeleton loading states for menu, specials, and dish pages
- Cart and auth state managed with Zustand (persisted, no Provider)
- Form validation via react-hook-form + Zod (Login, Register, Checkout)
- Pickup vs Delivery option at checkout, with live fee adjustment
- Add-to-cart button becomes a quantity stepper once a dish is in the cart
- Sticky header with color scheme distinct from the hero

## Tech Stack

- React 19 + Vite
- Context API for cart state
- Plain CSS (no framework)

## Project Structure

src/
main.jsx Entry point — mounts App, wraps it in ErrorBoundary, AuthProvider, CartProvider, BrowserRouter
App.jsx Route declarations
Layout.jsx Persistent shell (Header + Footer) wrapping every page via <Outlet />
App.css All app styling
index.css Global resets

pages/
Home.jsx Specials teaser + full menu, search, fasting filter
Specials.jsx Dedicated "Today's Specials" page
Login.jsx Sign in (name + phone, regex-validated)
Register.jsx Create account (phone, password, confirm password)
Cart.jsx Cart as its own page
Checkout.jsx Delivery form, order confirmation — protected route
NotFound.jsx 404 fallback

componenets/
Header.jsx Nav links, cart button, login/logout state
Footer.jsx
MenuItemCard.jsx Single dish card, used across Home/Specials
CartView.jsx Cart contents, quantity controls — used by Cart.jsx
Modal.jsx Reusable portal-based modal shell
DishDetailModal.jsx Dish detail content rendered inside Modal
ErrorBoundary.jsx Class component catching render crashes
ProtectedRoute.jsx Redirects to /login if not signed in

context/
CartContext.jsx Cart state — add/remove/update quantity/clear, persisted to localStorage
AuthContext.jsx Login state — login/logout, persisted to localStorage

data/
menu.json Full menu, mirrors the real /menu/ API shape
specials.json Featured items, mirrors /menu/specials

public/
images/ Dish photos, filenames matching each item's nameEn exactly


## Data

`src/data/menu.json` and `src/data/specials.json` mirror the real API's response shape exactly (`{ status, data: [...] }`, same field names). Both are imported directly for now rather than fetched — a future step will swap the import for an actual `fetch()` call to `addis-eats-backend.onrender.com`, without needing to change anything else.

## Getting Started

npm install
npm run dev


Opens at `http://localhost:5173`.

Sign-in is phone-based (no real backend auth yet — logging in with any valid-format Ethiopian number and a name works). Cart and login state both persist across refreshes via `localStorage`.