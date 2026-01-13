import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
  Tag,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../Store/CartStore";
import { useAuthStore } from "../Store/authStore";
import CheckoutModal from "../Component/CheckOutModal";

const CartPage = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { getCart, cart, removeFromCart, clearCart, increaseProductQuantity } =
    useCartStore();
  const { user } = useAuthStore();

  // const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const FetchCart = async () => {
      try {
        await getCart(user._id);
        // setCartItems(cart);
      } catch (error) {
        console.log(error);
      }
    };
    FetchCart();
  }, []);

  console.log(cart);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const savings = cart.reduce(
    (sum, item) =>
      sum +
      ((item.product.oldPrice || item.product.price) - item.product.price) *
        item.quantity,
    0
  );

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const payload = { user: user._id, product: productId, newQuantity };
      await increaseProductQuantity(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      console.log("Prodct:", productId);
      const payload = { user: user?._id, product: productId };
      console.log(payload);
      await removeFromCart(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(user._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/10 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 text-gray-600 hover:text-amber-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>
              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <ChevronRight className="w-4 h-4" />
                <span>Shopping Cart</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-amber-600" />
              <span className="text-xl font-bold text-gray-900">Cart</span>
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
                {cart.length} items
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <Link
              to="/products"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Shopping Cart ({cart.length} items)
                    </h2>
                    {savings > 0 && (
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        You save ${savings.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg hover:shadow-md transition-shadow bg-gray-50/50"
                      >
                        {/* Product Image */}
                        <div className="sm:w-32 sm:h-32">
                          <img
                            src={item?.product?.image}
                            alt={item?.product?.name}
                            className="w-full h-full object-cover rounded-lg shadow-sm"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 text-lg mb-2">
                                {item.product.name}
                              </h3>
                              <div className="flex items-center gap-4 mb-3">
                                <span className="text-sm text-gray-600">
                                  Color: {item.color}
                                </span>
                                {item?.product?.stock ? (
                                  <span className="flex items-center gap-1 text-sm text-green-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="text-sm text-red-600">
                                    Out of Stock
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl font-bold text-amber-700">
                                  ${item?.product?.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-gray-400 line-through">
                                    ${item.product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                {item.delivery}
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex flex-col items-end gap-4 mt-4 sm:mt-0">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  $
                                  {(
                                    item?.product?.price * item.quantity
                                  ).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                            <button
                              onClick={() => removeItem(item?.product?._id)}
                              className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                            <button className="text-sm text-amber-600 hover:text-amber-700">
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-6">
                    Order Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span
                        className={
                          shipping === 0
                            ? "text-green-600 font-medium"
                            : "font-medium"
                        }
                      >
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    {shipping > 0 && subtotal < 50 && (
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-700">
                          <Tag className="w-4 h-4" />
                          <span className="text-sm">
                            Add ${(50 - subtotal).toFixed(2)} more for free
                            shipping!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Checkout */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Checkout Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-xl mb-6">
                      Order Total
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-amber-700">
                          ${total.toFixed(2)}
                        </span>
                      </div>

                      {savings > 0 && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-center text-green-700 font-medium">
                            You save ${savings.toFixed(2)} on this order
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleClearCart()}
                        className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all mb-4"
                      >
                        Clear Cart
                      </button>
                      <button
                        onClick={() => setShowCheckoutModal(true)}
                        disabled={cart.length === 0}
                        className={`w-full py-3 rounded-lg font-medium ${
                          cart.length > 0
                            ? "bg-amber-600 text-white hover:bg-amber-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {cart.length === 0
                          ? "Cart is Empty"
                          : "Proceed to Order"}
                      </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">or</div>

                    <button className="w-full py-3 border-2 border-amber-300 text-amber-700 font-medium rounded-lg hover:bg-amber-50 mt-4">
                      Pay with PayPal
                    </button>
                  </div>
                </div>

                <CheckoutModal
                  isOpen={showCheckoutModal}
                  onClose={() => setShowCheckoutModal(false)}
                  user={user}
                  cartTotal={total}
                />
              </div>
              <div>
                {/* Security & Shipping */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-gray-900">
                        Secure Checkout
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure. We never
                      store your credit card details.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-gray-900">
                        Shipping Information
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          Standard Shipping
                        </div>
                        <div className="text-gray-600">
                          3-5 business days • Free on orders over $50
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          Express Shipping
                        </div>
                        <div className="text-gray-600">
                          1-2 business days • $9.99
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                      <h4 className="font-medium text-gray-900">
                        Accepted Payment Methods
                      </h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty Cart Suggestions */}
      {/* {cart.length === 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Featured Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Smart Watch",
                  price: "$299",
                  image:
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
                },
                {
                  name: "Wireless Earbuds",
                  price: "$129",
                  image:
                    "https://images.unsplash.com/photo-1590658165737-15a047b8b5e5?w=300&q=80",
                },
                {
                  name: "Laptop Backpack",
                  price: "$89",
                  image:
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-amber-700">
                        {product.price}
                      </span>
                      <button className="px-3 py-1.5 bg-amber-600 text-white text-sm rounded hover:bg-amber-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CartPage;
