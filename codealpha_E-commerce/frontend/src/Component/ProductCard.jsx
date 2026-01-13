import React, { useState } from "react";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import handleAddToCart from "../utils/handleAddToCart";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();
  const { pathname } = location;
  const navigate = useNavigate();

  const calculateDiscount = () => {
    if (product.oldPrice && product.oldPrice > product.price) {
      return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative">
        <div className="aspect-square">
          <img
            src={
              product.image[0] ||
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>

        {/* Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-1 hover:text-gray-700">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-gray-400 line-through text-sm">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              handleAddToCart(pathname, navigate, {
                product: product?._id,
                user: user?._id,
              });
            }}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
