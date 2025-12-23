import { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      // Collecting cart items
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log("order data",orderData);
      console.log("order items",orderItems);
      
      switch (method) {
        // API Call for COD
        case "cod":
          const response = await axios.post(`${backend_url}/api/order`,{orderData},{
            headers: {
                Authorization : `Bearer ${token}`
            }
          });

          if (response.data.success) {
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        // Razorpay (currently commented out)
        /*
                case 'razorpay':
                    const responseRazorpay = await axios.post(backend_url + '/api/order/razorpay', orderData, { headers: { token } });
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order);
                    }
                    break;
                */

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <TopBar icon={"search_icon.png"} />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        {/* ------------- Left Side ---------------- */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* ------------- Right Side ------------------ */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* --------------- Payment Method Selection ------------- */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm cursor-pointer transition-all duration-300 active:scale-95 active:shadow-inner"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
