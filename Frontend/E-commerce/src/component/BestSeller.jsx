import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "./ProductItem";
import { Spinner } from "./Spinner";

export function BestSeller() {
  const [BestSeller, setBestSeller] = useState([]);
  const { products,loading } = useContext(ShopContext);

  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProduct = products.filter((item) => item.bestSeller);

      setBestSeller(bestProduct.reverse());
    }
  }, [products]);


  return loading ? (<div className="h-50 flex-col items-center text-center content-center justify-items-center">
           <div className="flex justify-center items-center">
              <p className="text-4xl mt-7 text-gray-900 font-mono "><span className="text-gray-600">Best</span>Seller</p>
              <hr className="h-[2.5px] ml-2 mt-6 w-13 bg-gray-700"/>
          </div>
          <p className="mt-10">product loading...</p>
          <div className=" mb-10">
          <Spinner/>
          </div>
      </div>) : 
  ( <div>
      <div className="flex justify-center items-center">
        <p className="text-4xl mt-7 text-gray-900 font-mono ">
          <span className="text-gray-600">BEST</span>SELLER
        </p>
        <hr className="h-[2.5px] ml-2 mt-6 w-13 bg-gray-700" />
      </div>

      <div className="my-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
        <p>
          Check out our top-selling products loved by customers worldwide. These
          items are highly rated for quality, style, and value.
        </p>
      </div>

      <div className="grid grid-cols-2 mt-20 bg-slate-50  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-6">
        {BestSeller ? (
          BestSeller.map((item, index) => (
            <ProductItem
              image={item.images[0]}
              name={item.name}
              price={item.price}
              productId={item._id}
              key={index}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
