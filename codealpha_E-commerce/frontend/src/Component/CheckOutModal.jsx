import React, { useState } from "react";
import {
  X,
  MapPin,
  Home,
  Building,
  CreditCard,
  Wallet,
  CheckCircle,
  Banknote,
} from "lucide-react";
import { useOrderStore } from "../Store/OrderStore";
import { useCartStore } from "../Store/CartStore";

const CheckoutModal = ({ isOpen, onClose, user, cartTotal }) => {
  const { createOrder } = useOrderStore();
  const { cart } = useCartStore();
  console.log(cart);
  const [selectedAddressId, setSelectedAddressId] = useState(
    user.addresses?.find((addr) => addr.default)?._id || null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  if (!isOpen) return null;

  // Get selected address
  const selectedAddress = user.addresses?.find(
    (addr) => addr._id === selectedAddressId
  );

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address");
      return;
    }

    // const { address, addressType, country, default } = selectedAddress;

    try {
      const payload = {
        user: user._id,
        items: cart,
        totalAmount: cartTotal,
        shippingDetails: selectedAddress,
        paymentMethod: selectedPaymentMethod,
      };
      await createOrder(payload);
    } catch (error) {
      console.log(error);
    }
  };

  // Payment methods
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
    },
    { id: "paypal", name: "PayPal", icon: <Wallet className="w-5 h-5" /> },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Banknote className="w-5 h-5" />,
    },
  ];

  // Address type icons
  const getAddressIcon = (type) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <p className="text-gray-600">Complete your order</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Address Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Select Delivery Address
              </h3>

              {user.addresses?.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No addresses saved</p>
                  <button className="mt-2 text-amber-600 hover:text-amber-700">
                    Add new address
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {user.addresses?.map((address) => (
                    <div
                      key={address._id}
                      onClick={() => setSelectedAddressId(address._id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddressId === address._id
                          ? "border-amber-500 border-2 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg mt-1 ${
                              selectedAddressId === address._id
                                ? "bg-amber-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {getAddressIcon(address.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium capitalize">
                                {address.type}
                              </span>
                              {address.default && (
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">
                              {address.address}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {address.country}
                            </p>
                          </div>
                        </div>

                        {selectedAddressId === address._id && (
                          <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        )}
                      </div>

                      {selectedAddressId !== address._id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAddressId(address._id);
                          }}
                          className="mt-3 text-sm text-amber-600 hover:text-amber-700"
                        >
                          Select this address
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full mt-4 py-3 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-amber-500 hover:bg-amber-50 flex items-center justify-center gap-2">
                <span className="text-xl">+</span>
                Add New Address
              </button>
            </div>

            {/* Selected Address Preview */}
            {selectedAddress && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Delivering to:
                </h4>
                <div className="flex items-start gap-2">
                  {getAddressIcon(selectedAddress.type)}
                  <div>
                    <p className="text-gray-700">{selectedAddress.address}</p>
                    <p className="text-sm text-gray-500">
                      {selectedAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="grid gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? "border-amber-500 border-2 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedPaymentMethod === method.id
                              ? "bg-amber-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <div
                            className={
                              selectedPaymentMethod === method.id
                                ? "text-amber-600"
                                : "text-gray-600"
                            }
                          >
                            {method.icon}
                          </div>
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.subtotal?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${cartTotal.shipping?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${cartTotal.tax?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.total?.toFixed(2) || "0.00"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={!selectedAddressId}
              className={`flex-1 py-3 rounded-lg font-medium ${
                selectedAddressId
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
