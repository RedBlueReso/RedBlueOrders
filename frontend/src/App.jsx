import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';

// local
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import CreateFood from './pages/CreateFood.jsx';
import UpdateFood from './pages/UpdateFood.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx';
import Cart from './pages/Cart.jsx'

function App() {

  return (
    <>
      <Router>
        <CartProvider>
          <div className="min-h-screen bg-gray-100">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/create" element={<CreateFood />} />
              <Route path="/update" element={<UpdateFood />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </div>
        </CartProvider>
      </Router>

    </>
  )
}

export default App
