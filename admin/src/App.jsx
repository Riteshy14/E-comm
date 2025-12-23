import { useEffect, useState } from 'react';
import { Navbar } from './component/Navbar'; // adjust path
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Order } from './pages/Order';
import {ListOrder} from './pages/ListOrder'
import {Login} from './pages/Login'
import {Add} from './pages/Add'
import './App.css'

// ...rest of imports
export const currency = "₹";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} /> 
      ) : (
        <>
          <Navbar token={token} setToken={setToken} />
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/orders" element={<Order token={token} />} />
              <Route path="/all" element={<ListOrder token={token} />} />
              <Route path="*" element={<Navigate to="/add" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
