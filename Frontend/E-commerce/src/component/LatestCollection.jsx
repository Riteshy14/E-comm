import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext.jsx";
import { ProductItem } from "./ProductItem.jsx";
import {Spinner} from "./Spinner.jsx"



export function LatestCollection(){
    const {products,loading} = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);



    useEffect(()=>{
        if (Array.isArray(products)) {
            setLatestProduct(products.slice(0,10)); // Get the first 10 products
        }
    },[products])

    return loading ? (<div className="h-50 flex-col items-center text-center content-center justify-items-center">
         <div className="flex justify-center items-center">
            <p className="text-4xl mt-7 text-gray-900 font-mono "><span className="text-gray-600">LATEST</span> COLLECTIONS</p>
            <hr className="h-[2.5px] ml-2 mt-6 w-13 bg-gray-700"/>
        </div>
        <p className="mt-10">product loading...</p>
        <div className=" mb-10">
        <Spinner/>
        </div>
    </div>): (
        <div className="my-10">
        <div className="flex justify-center items-center">
            <p className="text-xl md:text-4xl  mt-7 text-gray-900 font-mono "><span className="text-gray-600">LATEST</span> COLLECTIONS</p>
            <hr className="h-[2.5px] ml-2 mt-6 w-13 bg-gray-700"/>
        </div>
        <div className="mt-5 text-center text-sm md:text-lg text-gray-600">
            <p className="font-medium">
                Discover our exclusive range of products, carefully curated to offer the best in quality and style. Explore the latest trends, updated regularly to keep your wardrobe fresh and fashionable.
            </p>
        </div>
        <div className='grid grid-cols-2 mt-20 bg-slate-50  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-6' >
            {
                latestProduct.map((item, index)=> (
                    <ProductItem image={item.images[0]} name={item.name} price={item.price} productId={item._id} key={index}/>
                ))
            }
        </div>
    </div>
    )
}