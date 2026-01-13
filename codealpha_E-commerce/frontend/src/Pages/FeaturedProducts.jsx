import React, { useState, useEffect } from "react";
import { TrendingUp, ArrowRight, Crown, Sparkles } from "lucide-react";
import ProductCard from "../Component/ProductCard";
import { Link } from "react-router-dom";
import { useProductStore } from "../Store/ProductStore";
// import { fetchFeaturedProducts } from "../utils/api";

const FeaturedProducts = () => {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { allProduct: products, getAllProduct } = useProductStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await getAllProduct();
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Curated
            <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Handpicked collections of premium products that define luxury and
            quality.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-20">
          <Link
            to="/products"
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-5 border-2 border-amber-300 text-amber-700 font-bold text-lg rounded-2xl hover:bg-amber-50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-100/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative">Explore All Collections</span>
            <ArrowRight className="w-6 h-6 relative group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
