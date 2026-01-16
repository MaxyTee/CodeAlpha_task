import React, { useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Share2,
  ChevronRight,
  Star,
  Check,
  Loader2,
} from "lucide-react";
import { useCartStore } from "../Store/CartStore";
import { useEffect } from "react";
import { useAuthStore } from "../Store/authStore";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useOrderStore } from "../Store/OrderStore";

const CartPage = () => {
  const { cart, getCart, removeFromCart, increaseProductQuantity } =
    useCartStore();
  const { createOrder } = useOrderStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const { user } = useAuthStore();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const FetchCart = async () => {
      try {
        await getCart(user._id);
      } catch (error) {
        console.log("Error", error);
      }
    };

    FetchCart();
  }, []);

  console.log(cart);

  const subtotal = cart.reduce(
    (sum, item) => sum + item?.product?.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const totalSavings = cart.reduce(
    (sum, item) =>
      sum +
      (item?.product?.originalPrice - item?.product?.price) * item.quantity,
    0
  );

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const payload = { user: user._id, product: productId, newQuantity };
    await increaseProductQuantity(payload);
  };

  const removeItem = async (id) => {
    setIsDeleting(true);
    try {
      const payload = { product: id, user: user._id };
      await removeFromCart(payload);
      setIsDeleting(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const moveToWishlist = (item) => {
    setWishlist([...wishlist, item.id]);
    removeItem(item._id);
  };

  const features = [
    { icon: Truck, text: "Free Shipping on orders over $1,000" },
    { icon: Shield, text: "2-Year Warranty & Authenticity Guarantee" },
    { icon: RotateCcw, text: "30-Day Easy Returns & Exchanges" },
  ];

  const handleOrder = async () => {
    const payload = { user: user._id, items: cart, totalAmount: total };
    await createOrder(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 mt-16">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Shopping Bag
          </h1>
          <p className="text-gray-600 mt-2">
            {cart.length} exquisite jewelry pieces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              console.log(item.product);
              return (
                <div
                  key={item.product._id}
                  className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-[#a69059] bg-[#a69059]/10 px-2 py-1 rounded">
                              {item.product.category}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                                Save $
                                {(
                                  item.product.originalPrice -
                                  item.product.price.toLocaleString()
                                ).toLocaleString()}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.product.name}
                          </h3>

                          <p className="text-gray-600 text-sm mb-3">
                            {item.product.description}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${
                                    i < Math.floor(item.product.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {item.product.rating} ({item.product.reviews}{" "}
                              reviews)
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {isDeleting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={20} className="text-red-500" />
                          )}
                        </button>
                      </div>

                      {/* Size and Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Size Display */}
                          {item.product.size && (
                            <div className="text-sm">
                              <span className="text-gray-500">Size: </span>
                              <span className="font-medium">
                                {item.product.size}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-gray-900">
                                ${item.product.price * item.quantity}
                              </span>
                              {item.product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  $
                                  {(
                                    item.product.originalPrice * item.quantity
                                  ).toLocaleString()}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              ${item.product.price} each
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => moveToWishlist(item)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Heart size={18} className="text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Share2 size={18} className="text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty Cart */}
            {cart.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Your bag is empty
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Add exquisite jewelry pieces to your bag and they'll appear
                  here
                </p>
                <button className="inline-flex items-center gap-2 bg-[#a69059] text-white px-6 py-3 rounded-xl hover:bg-[#a69059]/90 transition-colors">
                  <ShoppingBag size={20} />
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span
                      className={`font-medium ${
                        shipping === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shipping === 0 ? "FREE" : `$${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">You Save</span>
                      <span className="font-medium text-green-600">
                        -${totalSavings.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${total.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500">
                        or 4 interest-free payments of ${(total / 4).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => handleOrder()}
                  className="w-full bg-[#a69059] text-white py-4 rounded-xl font-semibold hover:bg-[#a69059]/90 transition-colors shadow-sm mb-4"
                >
                  Proceed to Checkout
                </button>

                <p className="text-center text-sm text-gray-500">
                  Secure checkout • SSL encrypted
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Why Shop With LUXE
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-[#a69059]" size={18} />
                        </div>
                        <p className="text-sm text-gray-700">{feature.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a69059] focus:border-transparent"
                  />
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="bg-gradient-to-r from-[#a69059] to-[#8a7548] rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Package size={24} className="text-white/80" />
                  <ChevronRight size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Continue Shopping
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Discover more exquisite jewelry pieces
                </p>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-lg hover:bg-white/30 transition-colors">
                  Browse Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
