import React from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Download,
  MoreVertical,
  Shield,
  Calendar,
  DollarSign,
  ShoppingBag,
  UserPlus,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Root/DashboardLayout";

const AdminPage = () => {
  // const [activeTab, setActiveTab] = useState("dashboard");
  // const navigate = useNavigate();

  // Stats Data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Orders",
      value: "2,356",
      change: "+12.3%",
      trend: "up",
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "New Customers",
      value: "189",
      change: "+5.2%",
      trend: "up",
      icon: UserPlus,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-1.4%",
      trend: "down",
      icon: TrendingUp,
      color: "from-amber-500 to-amber-600",
    },
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: "#ORD-78901",
      customer: "Alex Johnson",
      date: "2024-01-15",
      amount: "$249.99",
      status: "completed",
      payment: "credit_card",
    },
    {
      id: "#ORD-78902",
      customer: "Maria Garcia",
      date: "2024-01-15",
      amount: "$89.99",
      status: "processing",
      payment: "paypal",
    },
    {
      id: "#ORD-78903",
      customer: "David Smith",
      date: "2024-01-14",
      amount: "$429.99",
      status: "pending",
      payment: "credit_card",
    },
    {
      id: "#ORD-78904",
      customer: "Sarah Wilson",
      date: "2024-01-14",
      amount: "$199.99",
      status: "completed",
      payment: "stripe",
    },
    {
      id: "#ORD-78905",
      customer: "Michael Brown",
      date: "2024-01-13",
      amount: "$599.99",
      status: "shipped",
      payment: "credit_card",
    },
  ];

  // Top Products
  const topProducts = [
    {
      name: "Premium Headphones",
      category: "Electronics",
      sales: 342,
      revenue: "$68,400",
      stock: 45,
    },
    {
      name: "Smart Watch",
      category: "Wearables",
      sales: 289,
      revenue: "$86,700",
      stock: 32,
    },
    {
      name: "Laptop Backpack",
      category: "Accessories",
      sales: 156,
      revenue: "$15,600",
      stock: 89,
    },
    {
      name: "Wireless Earbuds",
      category: "Electronics",
      sales: 234,
      revenue: "$46,800",
      stock: 56,
    },
  ];

  // Recent Customers
  const recentCustomers = [
    {
      name: "Emma Davis",
      email: "emma@example.com",
      joined: "2 days ago",
      orders: 3,
      total: "$450.99",
    },
    {
      name: "James Wilson",
      email: "james@example.com",
      joined: "3 days ago",
      orders: 1,
      total: "$199.99",
    },
    {
      name: "Olivia Taylor",
      email: "olivia@example.com",
      joined: "4 days ago",
      orders: 2,
      total: "$329.98",
    },
    {
      name: "Noah Martinez",
      email: "noah@example.com",
      joined: "5 days ago",
      orders: 1,
      total: "$89.99",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="flex-1">
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Charts & Recent Orders */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 text-lg">
                  Revenue Overview
                </h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-lg">
                    This Month
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                    Last Month
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue chart visualization</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 text-lg">
                  Recent Orders
                </h3>
                <button className="text-sm text-amber-600 hover:text-amber-700">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {order.id}
                      </span>
                      <span className="font-bold text-amber-700">
                        {order.amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{order.customer}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products & Customers */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Top Products
                  </h3>
                  <button className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Product
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Sales
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Revenue
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Stock
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.category}
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="font-medium">{product.sales}</span>
                          </td>
                          <td className="py-4">
                            <span className="font-bold text-amber-700">
                              {product.revenue}
                            </span>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                product.stock < 50
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {product.stock} units
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Customers */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Recent Customers
                  </h3>
                  <button className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentCustomers.map((customer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-700">
                          {customer.total}
                        </div>
                        <div className="text-xs text-gray-500">
                          {customer.orders} orders
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <div className="text-center">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">
                    Add Product
                  </div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <div className="text-center">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">
                    Add User
                  </div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">
                    Generate Report
                  </div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <div className="text-center">
                  <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">
                    Settings
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
