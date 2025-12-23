import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleProduct } from "../api/api"; // API function to get product details
import { TopBar } from "./TopBar";
import Footer from "./Footer";
import { ShopContext } from "../context/ShopContext"; // Assuming the context exists to manage cart
import { useContext } from "react";
import RelatedProducts from "../component/RelatedProduct"; // Importing the RelatedProducts component
import { toast } from "react-toastify";

export function ProductDetail() {
  const { productId } = useParams(); // Extract productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // For size selection
  const { addToCart } = useContext(ShopContext); // Assuming addToCart exists in ShopContext

  // Dummy Rating and Reviews Count
  const dummyRating = 4; // Example rating out of 5
  const dummyReviewsCount = 122; // Number of reviews

  useEffect(() => {
    // If productId is undefined or invalid, return early
    if (!productId) {
      setError("Product not found");
      setLoading(false);
      return;
    }

    getSingleProduct(productId)
      .then((data) => {
        setProduct(data);
        setImage(data.images[0]); // Default to the first image
      })
      .catch((err) => {
        setError("Failed to fetch product details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div> {/* Custom loading animation */}
      </div>
    );
  }

  // Error Handling
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        {error}
      </div>
    );
  }

  // Product Detail Display
  return (
    <div className="container mx-auto">
      <TopBar icon={"../search_icon.png"}/>
      {product && (
        <div className="flex flex-col md:flex-row mt-15 gap-12">
          {/* Product Image Gallery */}
          <div className="flex-1 flex flex-col md:flex-row gap-3">
            {/* Thumbnails */}
            <div className="flex gap-3 flex-wrap md:flex-col">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product thumbnail ${index}`}
                  className="w-20 h-20 object-cover cursor-pointer border-2 border-gray-200 rounded-md"
                  onClick={() => setImage(img)} // Change the main image when clicked
                />
              ))}
            </div>
            {/* Main Product Image */}
            <div className="flex-1">
              <img
                className="w-full h-auto rounded-md"
                src={image}
                alt={product.name}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

            {/* Rating Section */}
            <div className="flex items-center gap-2 mt-2">
              {/* Dummy Rating */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mb-2 ${
                    index < dummyRating ? "text-yellow-500" : "text-gray-300"
                  }`} // Fill the stars based on rating
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  style={{
                    width: "32px", // Adjust width to make stars bigger
                    height: "32px", // Adjust height to make stars bigger
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15l3.09 1.545-.59-3.454 2.5-2.5-3.465-.5L10 6l-1.535 3.091-3.465.5 2.5 2.5-.59 3.454L10 15z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-lg text-gray-600">({dummyReviewsCount} Reviews)</p>
            </div>

            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-gray-800">
              ₹{product.price}
            </p>

            {/* Size Selection (if available) */}
            {product.size && product.size.length > 0 && (
              <div className="mt-4">
                <p className="font-medium">Select Size</p>
                <div className="flex gap-4 mt-2">
                  {product.size.map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === sizeOption
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={() => { addToCart(product._id, selectedSize)}}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 active:scale-95 active:shadow-inner "
            >
              Add to Cart
            </button>

            <hr className="my-8" />

            {/* Product Details */}
            <div className="text-sm text-gray-500">
              <p>100% Original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy returns and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {product && (
        <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
        />
      )}

      <Footer />
    </div>
  );
}

export default ProductDetail;
``
