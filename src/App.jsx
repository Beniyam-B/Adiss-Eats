import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import FullMenu from './pages/FullMenu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import ProtectedRoute from './componenets/ProtectedRoute';
import DishHighlight from './pages/DishHighlight';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dish/:dishId" element={<DishHighlight />} />
        <Route path="menu" element={<FullMenu />} />
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;