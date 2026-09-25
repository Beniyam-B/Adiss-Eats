import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import ProtectedRoute from './componenets/ProtectedRoute';
import ScrollToTop from './componenets/ScrollToTop';
import PageTitle from './componenets/PageTitle';

const Home = lazy(() => import('./pages/Home'));
const FullMenu = lazy(() => import('./pages/FullMenu'));
const DishHighlight = lazy(() => import('./pages/DishHighlight'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <Suspense fallback={<p className="status">Loading page...</p>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<FullMenu />} />
            <Route path="dish/:dishId" element={<DishHighlight />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;