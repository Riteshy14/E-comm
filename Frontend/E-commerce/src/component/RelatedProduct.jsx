import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "./ProductItem"; // Assuming ProductItem component is used for displaying product cards

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Filter the products based on category and sub-category
    if (products.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );
      setRelatedProducts(filtered);
    }
  }, [category, subCategory, products]);

  return (
    <div className="mt-24">
      <h2 className="text-3xl font-sans mb-6">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-10 lg:grid-cols-4 gap-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <ProductItem
              key={product._id}
              productId={product._id}
              name={product.name}
              image={product.images[0]} // Assuming first image is the main image
              price={product.price}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
