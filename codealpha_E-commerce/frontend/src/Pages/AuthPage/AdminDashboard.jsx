import React from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Star,
  Award,
  Calendar,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import AdminLayout from "../AdminPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../../Store/ProductStore";
import { useOrderStore } from "../../Store/OrderStore";
import formatDate from "../../utils/FormatDate";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { getAllProduct, allProduct: topProducts } = useProductStore();

  const { getAllOrders, AllOrders: recentOrders } = useOrderStore();

  useEffect(() => {
    const FetchProduct = async () => {
      await getAllProduct();
      await getAllOrders();
    };
    FetchProduct();
  }, []);

  const totalRevenue = recentOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Past 30 days",
    },
    {
      title: "Total Orders",
      value: recentOrders.length,
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "24 new this week",
    },
    {
      title: "Active Customers",
      value: "1,284",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "42 new today",
    },
    {
      title: "Products",
      value: topProducts.length || 0,
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "15 featured",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Admin
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your store today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={stat.color} size={24} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 mb-2">{stat.title}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Orders
                </h2>
                <p className="text-sm text-gray-500">
                  Latest customer purchases
                </p>
              </div>
              <button
                ocClick={() => navigate("/admin/orders")}
                className="text-[#a69059] text-sm font-medium hover:text-[#a69059]/80 flex items-center gap-1"
              >
                View all <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.trackingId}
                    </p>
                    <p className="text-sm text-gray-500">{order.user.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${order.totalAmount}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Top Products
                </h2>
                <p className="text-sm text-gray-500">Best selling jewelry</p>
              </div>
              <button
                onClick={() => navigate("/admin/products")}
                className="text-[#a69059] text-sm font-medium hover:text-[#a69059]/80 flex items-center gap-1"
              >
                View all <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#a69059]/10 flex items-center justify-center">
                      <img src={product.image[0]} alt={product.name} />
                      <Package className="text-[#a69059]" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="text-xs text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600">
                          {product.sales} sold
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{product.revenue}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Monthly Target */}
          <div className="bg-gradient-to-br from-[#a69059] to-[#8a7548] text-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Award size={24} />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Monthly Goal
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">82%</h3>
            <p className="text-white/90 mb-4">of sales target met</p>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white w-4/5"></div>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Star className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">4.8/5</h3>
                <p className="text-sm text-gray-500">Customer Rating</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">5 Stars</span>
                <span className="text-sm font-medium">156 reviews</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Today's Overview */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Today</h3>
                <p className="text-sm text-gray-500">Store Overview</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500">New Orders</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500">New Customers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">$4,250</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">Low Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingBag size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  New order #ORD-8422 placed by Jessica Taylor
                </p>
                <p className="text-sm text-gray-500">10 minutes ago • $2,800</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Package size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  Product "Diamond Studs" stock updated to 5 units
                </p>
                <p className="text-sm text-gray-500">
                  45 minutes ago • Low stock alert
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users size={16} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  New customer David Wilson registered
                </p>
                <p className="text-sm text-gray-500">2 hours ago • Gold tier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
