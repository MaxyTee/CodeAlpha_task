import React, { useEffect, useState } from "react";
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Edit,
  Package,
  Star,
  Clock,
  ChevronRight,
  Home,
  History,
  Gift,
  Shield,
} from "lucide-react";

import OrderListPage from "./OrderListPage";
import { useAuthStore } from "../Store/authStore";
import NewAddressModal from "../Component/NewAddressModel";
import { useOrderStore } from "../Store/OrderStore";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();
  const { userAddress, user } = useAuthStore();
  const { getUserOrder, userOrders } = useOrderStore();

  useEffect(() => {
    const fetchUserOrder = async () => {
      try {
        await getUserOrder(user._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserOrder();
  }, []);

  const userData = {
    name: user.name,
    email: user.email,
    phone: "+1 (555) 123-4567",
    joinDate: user.lastlogin,
    totalOrders: userOrders.length,
    totalSpent: "$4,820.50",
    loyaltyPoints: 1250,
    membership: "Gold Member",
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const orders = userOrders || [];

  const wishlist = [
    {
      id: 1,
      name: "Premium Headphones",
      price: "$199.99",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299.99",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
    },
    {
      id: 3,
      name: "Leather Bag",
      price: "$149.99",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&q=80",
    },
  ];

  // [
  //   {
  //     id: 1,
  //     type: "Home",
  //     address: "123 Main St, New York, NY 10001",
  //     default: true,
  //   },
  //   {
  //     id: 2,
  //     type: "Work",
  //     address: "456 Business Ave, Brooklyn, NY 11201",
  //     default: false,
  //   },
  // ];

  const addresses = user.addresses || [];
  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },

    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleSaveAddress = async (addressData) => {
    console.log("Saving address:", addressData);
    const payload = { email: user.email, ...addressData };
    await userAddress(payload);
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600">Welcome back, {userData.name} 👋</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-amber-50 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-md hover:shadow-lg">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              {/* User Profile Card */}
              <div className="p-6 bg-gradient-to-r from-amber-500/5 to-amber-600/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{userData.name}</h3>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full font-medium">
                      {userData.membership}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="p-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 font-medium shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          activeTab === tab.id
                            ? "text-amber-600"
                            : "text-gray-500"
                        }`}
                      />
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <ChevronRight className="w-4 h-4 ml-auto text-amber-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="p-4 bg-gray-50">
                <button className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 py-2.5 font-medium hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl">
                        <ShoppingBag className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {userData.totalOrders}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Orders
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Last order: 2 days ago
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl">
                        <CreditCard className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {userData.totalSpent}
                        </div>
                        <div className="text-sm text-gray-600">Total Spent</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Avg. order: $200.85
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl">
                        <Star className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {userData.loyaltyPoints}
                        </div>
                        <div className="text-sm text-gray-600">
                          Loyalty Points
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        50 points to next level
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 text-xl">
                        Recent Orders
                      </h3>
                      <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order._id}
                          className="p-4 rounded-lg hover:shadow-md transition-shadow bg-gray-50/50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-amber-600" />
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    ORD-
                                    {String(order._id).slice(-6).toUpperCase()}
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString()}{" "}
                                    • {order.items.length} items
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="font-bold text-gray-900 text-lg">
                                  {formatPrice(order.totalAmount)}
                                </div>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${order.color}`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Wishlist Preview */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 text-xl">
                        Saved Items
                      </h3>
                      <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30 border border-amber-50"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <div className="flex items-center justify-between mt-2">
                                <div className="text-lg font-bold text-amber-700">
                                  {item.price}
                                </div>
                                <div className="flex gap-1">
                                  <button className="p-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200">
                                    <ShoppingBag className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                    <Heart className="w-4 h-4 fill-red-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <OrderListPage />
                {/* <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-xl mb-6">
                    Order History
                  </h3>
                  <div className="space-y-4">
                    {[...orders, ...orders].map((order, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl">
                                <Package className="w-5 h-5 text-amber-600" />
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">
                                  {order._id}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Placed on {order.date} • {order.items.length}{" "}
                                  items
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">
                                {order.totalAmount}
                              </div>
                            </div>
                            <span
                              className={`px-4 py-1.5 rounded-full text-sm font-medium ${order.color} shadow-sm`}
                            >
                              {order.status}
                            </span>
                            <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-xl mb-6">
                    My Wishlist
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...wishlist, ...wishlist].map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
                      >
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-amber-700">
                              {item.price}
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 rounded-lg hover:from-amber-100 hover:to-amber-200 shadow-sm">
                                <ShoppingBag className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-lg hover:from-red-100 hover:to-red-200 shadow-sm">
                                <Heart className="w-4 h-4 fill-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 text-xl">
                        Saved Addresses
                      </h3>
                      <div>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 shadow-md"
                        >
                          Add New Address
                        </button>

                        <NewAddressModal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          onSave={handleSaveAddress}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`rounded-xl p-5 ${
                            address.default
                              ? "bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-md"
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                  <MapPin className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-900">
                                    {address.type}
                                  </span>
                                  {address.default && (
                                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full font-medium shadow-sm">
                                      Default
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {address.address}
                              </p>
                            </div>
                            <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg">
                              <Edit className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 shadow-sm">
                              Edit
                            </button>
                            {!address.default && (
                              <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 shadow-sm">
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-xl mb-6">
                    Account Settings
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h4 className="font-medium text-gray-900 text-lg">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={userData.name}
                            className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            defaultValue={userData.phone}
                            className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white shadow-sm"
                          />
                        </div>
                      </div>
                      <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 shadow-md">
                        Save Changes
                      </button>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 text-lg mb-4">
                        Notification Preferences
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Order updates",
                          "Promotional emails",
                          "Price drop alerts",
                          "New arrivals",
                          "Shipping updates",
                          "Security alerts",
                        ].map((pref) => (
                          <label
                            key={pref}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-amber-600"
                              defaultChecked
                            />
                            <span className="ml-3 text-gray-700">{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
