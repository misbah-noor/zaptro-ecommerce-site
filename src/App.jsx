import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {

  const { cartItem, setCartItem } = useCart()


  //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <div className='overflow-x-hidden'>
    <BrowserRouter>
      <Navbar />
      <div className='pt-18'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<ProtectedRoute>
          <Cart />
        </ProtectedRoute>}></Route>
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App