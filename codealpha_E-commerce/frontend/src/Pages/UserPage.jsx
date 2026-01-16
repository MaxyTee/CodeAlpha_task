import React, { useState } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Home,
  CreditCard,
  MapPin,
  Bell,
  ChevronRight,
  Award,
} from "lucide-react";
import Header from "../Component/Header";
import AddressPage from "./UserPages/AddressPage";
import { useAuthStore } from "../Store/authStore";

const UserPage = () => {
  const {user} = useAuthStore()
  console.log(user)
  
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    name: "Alexandra Morgan",
    email: "alexandra@example.com",
    memberSince: "March 2023",
    totalOrders: 8,
    totalSpent: 12045,
    loyaltyPoints: 1240,
  };

  const recentOrders = [
    {
      id: "LUXE-7890",
      item: "Éternité Diamond Ring",
      amount: 1899,
      date: "Dec 15, 2023",
      status: "Delivered",
    },
    {
      id: "LUXE-4567",
      item: "Celestial Pearl Earrings",
      amount: 895,
      date: "Nov 3, 2023",
      status: "Delivered",
    },
    {
      id: "LUXE-1234",
      item: "Minimalist Gold Cuff",
      amount: 1250,
      date: "Oct 10, 2023",
      status: "Delivered",
    },
    {
      id: "LUXE-8910",
      item: "Diamond Tennis Bracelet",
      amount: 3100,
      date: "Jan 5, 2024",
      status: "Processing",
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Sapphire Pendant",
      price: 750,
      image:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400",
    },
    {
      id: 2,
      name: "Art Deco Ring",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w-400",
    },
    {
      id: 3,
      name: "Pearl Drop Earrings",
      price: 560,
      image:
        "https://images.unsplash.com/photo-1594576722512-582d5577dd56?w-400",
    },
  ];

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
      badge: userData.totalOrders,
    },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "loyalty", label: "Loyalty Program", icon: Award },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Dashboard Overview
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Package className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userData.totalOrders}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Lifetime orders</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <CreditCard className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${userData.totalSpent.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Lifetime spending</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Award className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userData.loyaltyPoints}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Available points</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Orders
                </h3>
                <button className="text-sm text-amber-600 hover:text-amber-700">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-amber-50 rounded">
                        <Package size={18} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.item}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.id} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${order.amount.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              My Orders
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
              <Package className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-600 mb-2">
                You have {userData.totalOrders} orders
              </p>
              <p className="text-sm text-gray-500">
                All your orders will appear here
              </p>
            </div>
          </div>
        );

      case "wishlist":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              My Wishlist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-900">
                        ${item.price.toLocaleString()}
                      </p>
                      <button className="text-sm text-amber-600 hover:text-amber-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Account Settings
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="max-w-md">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <p className="text-gray-600">{userData.memberSince}</p>
                  </div>
                  <button className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "addresses":
        return <AddressPage />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {sidebarItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
              <p className="text-gray-600">
                Content for{" "}
                {sidebarItems.find((item) => item.id === activeTab)?.label}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Welcome back, {userData.name}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <User className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {userData.name}
                  </h3>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <nav className="p-4">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            activeTab === item.id
                              ? "bg-amber-50 text-amber-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight size={16} />
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
