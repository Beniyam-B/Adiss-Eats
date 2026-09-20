import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import FullMenu from './pages/FullMenu';
import DishHighlight from './pages/DishHighlight';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import ProtectedRoute from './componenets/ProtectedRoute';
import ScrollToTop from './componenets/ScrollToTop';
import PageTitle from './componenets/PageTitle';

function App() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
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
    </>
  );
}

export default App;