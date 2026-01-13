import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Search,
  Shield,
  Calendar,
  DollarSign,
  ShoppingBag,
  UserPlus,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const tabs = [
    {
      id: "dashboard",
      url: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "products",
      url: "/admin/products",
      label: "Products",
      icon: Package,
    },
    {
      id: "orders",
      url: "/admin/orders",
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      id: "customers",
      url: "/admin/customers",
      label: "Customers",
      icon: Users,
    },
    {
      id: "analytics",
      url: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      id: "payments",
      url: "/admin/payments",
      label: "Payments",
      icon: CreditCard,
    },
    {
      id: "settings",
      url: "/admin/settings",
      label: "Settings",
      icon: Settings,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Top Navigation */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-xl">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500">
                  v2.1.4 • Last updated: Today
                </p>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search admin panel..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-gray-50 w-64"
                />
              </div>

              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full"></div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          <div className="w-64 hidden lg:block pr-6">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-6">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        navigate(tab.url);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
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
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Quick Stats
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending Orders</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Low Stock</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
