import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export function ListOrder({token}) {
  const [list, setLiST] = useState([]);

  // Function to get the product list from the backend
  const getLIst = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/products`);
      console.log("responses are: ", response.data.Products);
      console.log("end");

      // If the response is successful, update the list state
      if (response.data.success) {
        setLiST(response.data.Products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {

      const response = await axios.delete(`${backend_url}/api/products/remove`, {
        data: { id },
      headers: { Authorization: `Bearer ${token}` },
    });
    
      if (response.data.success) {
        toast.success(response.data.message)
        await getLIst();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getLIst();
  }, []);

  return (
    <div>
      <p className="text-2xl font-bold text-center p-10">All Product List</p>
      
      {/* Product Table Header */}
      <div className="grid grid-cols-5 gap-4 font-bold">
        <span>Name</span>
        <span>Image</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product List */}
      <div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 items-center">
              <span>{item.name}</span>
              <img
                className="w-16 mb-4 h-15 object-cover"
                src={Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "not found"} // Check if image exists, otherwise show a default image
                alt={item.name}
              />
              <span>{item.category}</span>
              <span>{item.price}</span>
              <p onClick={()=>{ 
                 console.log("Deleting product with ID:", item._id);
                removeProduct(item._id)}} className='text-right flex justify-center border text-red-500 md:ml-5 lg:ml-17 ml-2 w-1/2 md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        ) : (
          <p>No Products available.</p>
        )}
      </div>
    </div>
  );
}
