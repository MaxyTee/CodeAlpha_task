import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  MoreVertical,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  DollarSign,
  User,
  Calendar,
  ChevronDown,
  Package,
  Download,
  RefreshCw,
} from "lucide-react";
import AdminLayout from "../AdminPage";
import { useOrderStore } from "../../Store/OrderStore";
import formatDate from "../../utils/FormatDate";

const AdminOrdersPage = () => {
  const { getAllOrders, AllOrders: orders } = useOrderStore();

  console.log(orders);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await getAllOrders();
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchOrder();
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case "delivered":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          label: "Delivered",
        };
      case "shipped":
        return {
          icon: Truck,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          label: "Shipped",
        };
      case "processing":
        return {
          icon: Clock,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          label: "Processing",
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          label: "Pending",
        };
      case "cancelled":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          label: "Cancelled",
        };
      default:
        return {
          icon: Package,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          label: "Unknown",
        };
    }
  };

  console.log(
    orders.map((order) => order.totalAmount).reduce((acc, num) => acc + num, 0),
  );

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    processing: orders.filter((o) => o.status === "processing").length,
    pending: orders.filter((o) => o.status === "pending").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );
  const averageOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">
                Manage customer orders and fulfillment
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <Download size={18} />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#a69059] text-white rounded-xl hover:bg-[#a69059]/90 transition-colors shadow-sm">
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#a69059]/10 flex items-center justify-center">
                  <ShoppingBag className="text-[#a69059]" size={24} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +12.5%
                </span>
              </div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +8.2%
                </span>
              </div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Package className="text-purple-600" size={24} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +5.7%
                </span>
              </div>
              <p className="text-sm text-gray-500">Avg. Order</p>
              <p className="text-2xl font-bold text-gray-900">
                ${averageOrderValue.toFixed(0)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +15.3%
                </span>
              </div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {statusCounts.delivered}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059]"
                placeholder="Search orders by ID, customer, or email..."
              />
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  statusFilter === "all"
                    ? "bg-[#a69059] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({statusCounts.all})
              </button>
              <button
                onClick={() => setStatusFilter("delivered")}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  statusFilter === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Delivered ({statusCounts.delivered})
              </button>
              <button
                onClick={() => setStatusFilter("processing")}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  statusFilter === "processing"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Processing ({statusCounts.processing})
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  statusFilter === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending ({statusCounts.pending})
              </button>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusInfo(order.status).icon;
            const statusColor = getStatusInfo(order.status).color;
            const statusBgColor = getStatusInfo(order.status).bgColor;
            const statusLabel = getStatusInfo(order.status).label;

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.trackingId}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusBgColor}`}
                    >
                      <StatusIcon size={16} className={statusColor} />
                      <span className={`text-sm font-medium ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#a69059]/10 flex items-center justify-center">
                      <User className="text-[#a69059]" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order?.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-5">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Items ({order.items.length})
                    </p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#a69059]"></div>
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Eye size={18} className="text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg bg-[#a69059]/10 hover:bg-[#a69059]/20 transition-colors">
                        <Truck size={18} className="text-[#a69059]" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                        <MoreVertical size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="text-gray-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No orders found
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              {searchQuery
                ? `No orders match "${searchQuery}"`
                : "No orders have been placed yet"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
