import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

const backend_url = import.meta.env.VITE_BACKEND_URL

export function Add({token}){

    const [image1,setImage1] = useState(false);
    const [image2,setImage2] = useState(false);
    const [image3,setImage3] = useState(false);
    const [image4,setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller",bestSeller);
            formData.append("size", JSON.stringify(sizes))

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(`${backend_url}/api/products/add`,formData,{
                headers:  { Authorization: `Bearer ${token}` } 
            })

             
            if(response.data.success){
                toast.success(response.data.message);
                alert("product added")
                setName("");
                setDescription("");
                setPrice("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setSizes([]);
                setBestSeller(false);
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("error",error);
            toast.error(error.message);
        }
    }

  return (
  <div className="min-h-screen w-full pl-0 pr-0 lg:pl-72 bg-gray-50 flex items-center justify-center md:p-4">
    <form 
      onSubmit={onSubmitHandler} 
      className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add Product</h2>

      {/* Product Name */}
      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Description */}
      <div>
        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
          required
        />
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Category & Subcategory */}
      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestSeller}
          id="bestSeller"
          onChange={(prev) => setBestSeller(prev=> !prev)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="bestSeller" className="text-gray-700 font-medium">Best Seller</label>
      </div>

      {/* Image Upload */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[image1, image2, image3, image4].map((img, idx) => (
          <label key={idx} className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
            <img 
              src={img ? URL.createObjectURL(img) : "image.png"} 
              alt={`upload-${idx}`} 
              className="w-24 h-24 object-cover mb-2 rounded"
            />
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (idx === 0) setImage1(e.target.files[0])
                if (idx === 1) setImage2(e.target.files[0])
                if (idx === 2) setImage3(e.target.files[0])
                if (idx === 3) setImage4(e.target.files[0])
              }}
            />
            <span className="text-sm text-gray-500">Upload</span>
          </label>
        ))}
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium mb-2">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) => prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size] 
            )}
              className={`cursor-pointer border px-3 py-1 rounded-lg ${
                sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300" } transition`}>
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add Product
      </button>
    </form>
  </div>
);
}