import  { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import axios from "axios";
import TopBar from "../component/TopBar";
import { toast } from "react-toastify";
import { Spinner } from "../component/Spinner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Orders = (orderId) => {
  const { token, currency, loading} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Function to load order data

  const deleteOrder = async (orderId) => {
    try {
      if (!token) {
        return;
      }

      await axios.delete(`${backendUrl}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadOrderData();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const loadOrderData = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.get(`${backendUrl}/api/order/myOrder`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              orderId: order._id, // ✅ keeps productId intact
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  // Load orders on component mount or when token changes
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="">
      <TopBar icon={"search_icon.png"} />
      <div className="text-3xl pt-15 ">
        <Title text1="MY" text2="ORDERS" />
      </div>
      {loading ? (<div className="flex justify-center items-center h-72 gap-4">
        <Spinner/>
        <p>loading...</p>
      </div>): (      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.productId?.images[0]}
                  alt=""
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment Method:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <div className="flex gap-4">
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                    Track Order
                  </button>
                  <button
                    onClick={() => deleteOrder(item.orderId)}
                    className="border px-4 py-2 text-sm font-medium rounded-sm text-black bg-red-300 
             hover:bg-red-500 cursor-pointer border-black transition-all duration-150 
             active:scale-95 active:bg-red-600 active:shadow-inner"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders available.</p>
        )}
      </div>) }
    </div>
  );
};
