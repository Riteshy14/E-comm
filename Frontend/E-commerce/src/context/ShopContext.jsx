import { useState } from "react";
import { createContext } from "react";
import { getProductData } from "../api/api";
import { useEffect } from "react";
import {toast} from 'react-toastify'
import axios from "axios";

export const ShopContext = createContext();
const backend_url = import.meta.env.VITE_BACKEND_URL;
const delivery_fee = 10;

export function ShopContextProvider(props){
    const currency = "₹";
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    
    const [cartItem, setCartItem] = useState({});
    const [error,setError]= useState(null);
    const [token,setToken] = useState(localStorage.getItem('token') || "")

   useEffect(()=>{
    if(token){
      localStorage.setItem('token',token)
    }
    },[token])


    useEffect(()=>{
        setLoading(true)
        getProductData()
        .then(data => setProducts(data))
        .catch(err => setError(err) )
        .finally(()=> setLoading(false))
    },[])

 const addToCart = async (itemId, size) => {
  if (!size) {
    toast.error('Select Product Size');
    return;
  }

  let cartData = structuredClone(cartItem || {}); 

  if (!cartData[itemId]) {
    cartData[itemId] = {}; 
  }

  if (cartData[itemId][size]) {
    cartData[itemId][size] += 1; 
  } else {
    cartData[itemId][size] = 1;
  }

  setCartItem(cartData);
  toast.success("Product Added")

  const currentToken = token || localStorage.getItem('token'); 

  if (currentToken) {
    try {
      const respone = await axios.post(
        `${backend_url}/api/cart/add`,
        { itemId, size },
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );


    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  } else {
    toast.error("No token found. Please log in.");
  }
};

    const getCartCount= ()=>{
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.log("error",error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItem);

        cartData[itemId][size] = quantity;

        setCartItem(cartData)

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    console.log("error:", error)
                    toast.error(error.message)
                }
            }
        }
        return totalAmount;
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.get(`${backend_url}/api/cart`,{
                headers:  { Authorization: `Bearer ${token}` } 
            })
            
            if (response.data.success) {
                setCartItem(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

        if(token){
            getUserCart(token);
        }
    },[token])

    const value ={
        products,currency,loading, setLoading,
        token,setToken,cartItem,setCartItem,
        showSearch, setShowSearch,addToCart,getCartCount,
        updateQuantity,getCartAmount,getUserCart,delivery_fee,searchText,setSearchText
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}