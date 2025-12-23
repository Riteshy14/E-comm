import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from '../App';
import Address from '../component/Address'; 
import { Spinner } from '../component/Spinner'; 

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function Order({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders (admin)
  const fetchAllOrders = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/order/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orderlist.reverse());
      } else {
        toast.error(response.data.msg || "Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/status`,
        { id: orderId, status: event.target.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders(); // Re-fetch after status update
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Server error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="p-5 bg-gray-50">
      <h3 className="text-3xl font-bold mb-5 text-gray-800">All Orders</h3>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-white shadow-lg rounded-lg my-4 hover:shadow-2xl transition-shadow duration-200"
          >
            <div>
              <div className="font-semibold text-lg">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx < order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>

              {order.address.length > 0 && (
                <Address address={order.address[0]} />
              )}
            </div>

            <div className="flex flex-col justify-between">
              <p className="text-sm text-gray-600">Items: {order.items.length}</p>
              <p className="mt-3 text-sm text-gray-600">Method: {order.paymentMethod}</p>
              <p className="text-sm text-gray-600">Payment: {order.payment ? "Done" : "Pending"}</p>
              <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="flex justify-end items-center">
              <p className="text-lg font-semibold text-gray-700">
                {currency}{order.amount}
              </p>
            </div>

            <div className="flex justify-center items-center mt-4">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 text-sm font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
