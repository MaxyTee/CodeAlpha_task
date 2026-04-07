import React, { useState } from "react";
import { Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import Header from "../Component/Header";
import { useProductStore } from "../Store/ProductStore";
import { useEffect } from "react";
import handleAddToCart from "../utils/handleAddToCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import { useCartStore } from "../Store/CartStore";
import Footer from "../Component/Footer";

const ProductsPage = ({ darkMode, toggleDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuthStore();
  const { cart, getCart } = useCartStore();
  const { getAllProduct, allProduct: products } = useProductStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        await getAllProduct();
        await getCart(user?._id);
      } catch (error) {
        console.log("Error", error);
      }
    };
    FetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Jewelry" },
    { id: "rings", name: "Rings" },
    { id: "necklaces", name: "Necklaces" },
    { id: "earrings", name: "Earrings" },
    { id: "bracelets", name: "Bracelets" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-[#a690590d]" : "bg-[#fcfbf8]"}`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1
          className={`text-4xl font-light ${darkMode ? "text-[#e5e5e5]" : "text-[#2a2a2a]"} mb-4`}
        >
          Shop All
        </h1>
        <p className="text-[#7c786e]">Timeless pieces crafted with precision</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center border-b border-gray-300 pb-1">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm focus:outline-none w-32"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select className="appearance-none text-sm bg-transparent border-b border-gray-300 pb-1 pr-6 focus:outline-none">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            let selectedCart;
            selectedCart = cart.some(
              (cart) => cart?.product?._id === product?._id,
            );
            return (
              <div key={product.id} className="group">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden mb-4 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-opacity hover:bg-white"
                  >
                    <Heart
                      size={20}
                      className={
                        wishlist.includes(product.id)
                          ? "text-red-500 fill-red-500"
                          : "text-[#7c786e]"
                      }
                    />
                  </button>

                  {/* Quick Add to Cart */}
                  <button
                    onClick={() =>
                      handleAddToCart(pathname, navigate, {
                        product: product?._id,
                        user: user?._id,
                      })
                    }
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-6 py-2 text-sm hover:bg-gray-800"
                  >
                    {selectedCart ? "Added" : "Add to Cart"}
                  </button>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-light text-[#a69059] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#a69059]">
                      ${product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">★</span>
                      {product.rating}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-light text-[#a69059] mb-3">
              No products found
            </h3>
            <p className="text-[#7c786e] mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sm text-[#7c786e] hover:text-black underline"
            >
              View all products
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 &&
          filteredProducts.length < products.length && (
            <div className="mt-12 text-center">
              <button className="text-sm text-[#7c786e] hover:text-black border-b border-transparent hover:border-black pb-1">
                Load more
              </button>
            </div>
          )}
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default ProductsPage;
