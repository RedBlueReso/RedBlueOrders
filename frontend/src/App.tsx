import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Cart } from './pages/Cart';
import NotFound from './pages/NotFound.tsx'
import CreateFood from "./pages/CreateFood.tsx";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create" element={<CreateFood />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;