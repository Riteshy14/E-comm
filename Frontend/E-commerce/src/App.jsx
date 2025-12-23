import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { SignIn } from './pages/Signin'
import { Home } from './pages/Home'
import { Collection } from './pages/Collection'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import ProductDetail from './component/ProductDetail'
import { Cart } from './pages/Cart'
import { PlaceOrder } from './pages/PlaceOrder'
import { Orders } from './pages/Orders'
import { ToastContainer } from 'react-toastify'
import { Profile } from './pages/Profile'

function App() {
  const location = useLocation()

  // Only apply padding if the route is not /signin or /signup
  const paddingClasses = location.pathname === '/signin' || location.pathname === '/signup'
    ? '' 
    : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]';

  return (
    <div className={paddingClasses}>
      <ToastContainer/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/collections/:productId" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
    </div>
  )
}

export default App
