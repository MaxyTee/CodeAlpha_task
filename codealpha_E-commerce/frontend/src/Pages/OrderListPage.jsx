import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ChevronRight,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useOrderStore } from "../Store/OrderStore";
import { useAuthStore } from "../Store/authStore";

// Mock data - replace with API call
const mockOrders = [
  {
    id: "ORD-789012",
    date: "2024-01-15",
    total: 129.99,
    status: "delivered",
    items: 3,
    customer: "John Doe",
  },
  {
    id: "ORD-789013",
    date: "2024-01-14",
    total: 89.5,
    status: "processing",
    items: 2,
    customer: "Jane Smith",
  },
  {
    id: "ORD-789014",
    date: "2024-01-13",
    total: 249.99,
    status: "shipped",
    items: 5,
    customer: "Bob Johnson",
  },
  {
    id: "ORD-789015",
    date: "2024-01-12",
    total: 59.99,
    status: "cancelled",
    items: 1,
    customer: "Alice Brown",
  },
  {
    id: "ORD-789016",
    date: "2024-01-11",
    total: 179.99,
    status: "delivered",
    items: 4,
    customer: "Charlie Wilson",
  },
];

const OrderListPage = () => {
  const { userOrder, getUserOrder } = useOrderStore();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState(mockOrders);
  const [filter, setFilter] = useState("all");

  console.log(userOrder);

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

  // Filter orders based on status
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      processing: {
        color: "bg-blue-100 text-blue-800",
        icon: <Clock className="w-4 h-4" />,
      },
      shipped: {
        color: "bg-purple-100 text-purple-800",
        icon: <Package className="w-4 h-4" />,
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
      },
    };

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: null,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">
            Manage and track all customer orders
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter("processing")}
            className={`px-4 py-2 rounded-lg ${
              filter === "processing"
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter("shipped")}
            className={`px-4 py-2 rounded-lg ${
              filter === "shipped"
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`px-4 py-2 rounded-lg ${
              filter === "delivered"
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Delivered
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {order.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {order.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {order.items} items
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {order.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">
              {orders.length}
            </div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              $
              {orders
                .filter((o) => o.status === "delivered")
                .reduce((sum, o) => sum + o.total, 0)
                .toFixed(2)}
            </div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "processing").length}
            </div>
            <div className="text-gray-600">Processing</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {orders.filter((o) => o.status === "shipped").length}
            </div>
            <div className="text-gray-600">Shipped</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
