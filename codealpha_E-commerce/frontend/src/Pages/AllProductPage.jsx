import React, { useState } from "react";
import { Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import Header from "../Component/Header";
import { useProductStore } from "../Store/ProductStore";
import { useEffect } from "react";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const { getAllProduct, allProduct: products } = useProductStore();

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        await getAllProduct();
      } catch (error) {
        console.log("Error", error);
      }
    };
    FetchProducts();
  }, []);

  //   const products = [
  //     {
  //       id: "1",
  //       name: "Éternité Diamond Ring",
  //       description: "18k gold ring with brilliant-cut diamond",
  //       price: 1899,
  //       image:
  //         "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop",
  //       category: "Rings",
  //       rating: 4.8,
  //     },
  //     {
  //       id: "2",
  //       name: "Celestial Pearl Earrings",
  //       description: "South Sea pearls set in 14k yellow gold",
  //       price: 895,
  //       image:
  //         "https://images.unsplash.com/photo-1594576722512-582d5577dd56?w=600&auto=format&fit=crop",
  //       category: "Earrings",
  //       rating: 4.5,
  //     },
  //     {
  //       id: "3",
  //       name: "Infinity Pendant Necklace",
  //       description: "Diamond infinity pendant on gold chain",
  //       price: 1650,
  //       image:
  //         "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&auto=format&fit=crop",
  //       category: "Necklaces",
  //       rating: 4.9,
  //     },
  //     {
  //       id: "4",
  //       name: "Minimalist Gold Cuff",
  //       description: "18k gold structured cuff bracelet",
  //       price: 1250,
  //       image:
  //         "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop",
  //       category: "Bracelets",
  //       rating: 4.7,
  //     },
  //     {
  //       id: "5",
  //       name: "Art Deco Ring",
  //       description: "Vintage-inspired emerald cut diamond",
  //       price: 3200,
  //       image:
  //         "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop",
  //       category: "Rings",
  //       rating: 5.0,
  //     },
  //     {
  //       id: "6",
  //       name: "Sapphire Pendant",
  //       description: "Blue sapphire pendant on silver chain",
  //       price: 750,
  //       image:
  //         "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&auto=format&fit=crop",
  //       category: "Necklaces",
  //       rating: 4.3,
  //     },
  //   ];

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
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-4">Shop All</h1>
        <p className="text-gray-600">Timeless pieces crafted with precision</p>
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
          {filteredProducts.map((product) => (
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
                        : "text-gray-600"
                    }
                  />
                </button>

                {/* Quick Add to Cart */}
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-6 py-2 text-sm hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="font-light text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">★</span>
                    {product.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-light text-gray-900 mb-3">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              View all products
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 &&
          filteredProducts.length < products.length && (
            <div className="mt-12 text-center">
              <button className="text-sm text-gray-600 hover:text-black border-b border-transparent hover:border-black pb-1">
                Load more
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductsPage;
