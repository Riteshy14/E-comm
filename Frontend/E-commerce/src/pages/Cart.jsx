import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import TopBar from '../component/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { products, currency, cartItem, updateQuantity ,token} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
  if (!token) {
    // Redirect to signin if user is not logged in
    navigate('/signup');
  } else {
    // Proceed to checkout if logged in
    navigate('/place-order');
  }
};


  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="border-t pt-14">
      <TopBar icon={"search_icon.png"} />
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData.images[0]} alt={productData.name} />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>

                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />

                <FontAwesomeIcon
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  icon={faTrashAlt} 
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleCheckoutClick}
              className="bg-black cursor-pointer text-white text-sm my-8 px-8 py-3 transition-all duration-200 active:scale-95 active:shadow-inner"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
