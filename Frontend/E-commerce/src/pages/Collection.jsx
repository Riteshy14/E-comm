import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { TopBar } from "../component/TopBar";
import { ProductItem } from "../component/ProductItem";
import Footer from "../component/Footer";
import SearchBar from "../component/SearchBar";
import { Spinner } from "../component/Spinner";

export function Collection() {
  const { products, searchText, showSearch,loading } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [showFilters, setShowFilters] = useState(false);


  const selectCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const selectSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relavent");
    setShowFilters(false);
  };


  useEffect(() => {
    let filtered = [...products];

    if (showSearch && searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [
    products,
    category,
    subCategory,
    searchText,
    showSearch,
    sortType,
  ]);

  return (
    <div>
      <TopBar icon={"search_icon.png"} />
      <SearchBar/>
      <div className="bg-gray-50 mt-2 p-1 min-h-screen">
        {loading ? (<div className="flex justify-center text-2xl items-center gap-7 h-screen">
          <Spinner/> <p>loading...</p>
        </div>): (<div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-12">

          <aside
            className={`lg:w-60 bg-white p-6 rounded-lg shadow-md ${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            <button
              onClick={clearFilters}
              className="text-sm text-blue-500  hover:underline mb-4"
            >
              Clear All Filters
            </button>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Categories</h4>
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={category.includes(item)}
                    onChange={() => selectCategory(item)}
                  />
                  {item}
                </label>
              ))}
            </div>

            <div>
              <h4 className="font-medium mb-2">Type</h4>
              {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={subCategory.includes(item)}
                    onChange={() => selectSubCategory(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </aside>

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* PRODUCTS */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                ALL <span className="text-gray-700">COLLECTIONS</span>
              </h2>

              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="relavent">Relevant</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterProducts.length > 0 ? (
                filterProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    productId={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.images[0]}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 mt-20">
                  No products found
                </p>
              )}
            </div>
          </main>
        </div>)}
      </div>

      <Footer />
    </div>
  );
}
