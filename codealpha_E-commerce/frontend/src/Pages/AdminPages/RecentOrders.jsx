import React from "react";
import { CheckCircle, Clock, XCircle, MoreVertical } from "lucide-react";

const RecentOrders = () => {
  const orders = [
    {
      id: "#LUXE-4821",
      customer: "Emma Johnson",
      date: "2024-01-15",
      amount: "$1,850",
      status: "completed",
      items: 2,
    },
    {
      id: "#LUXE-4822",
      customer: "Michael Chen",
      date: "2024-01-15",
      amount: "$3,250",
      status: "processing",
      items: 1,
    },
    {
      id: "#LUXE-4823",
      customer: "Sarah Williams",
      date: "2024-01-14",
      amount: "$895",
      status: "completed",
      items: 3,
    },
    {
      id: "#LUXE-4824",
      customer: "Robert Garcia",
      date: "2024-01-14",
      amount: "$2,150",
      status: "pending",
      items: 1,
    },
    {
      id: "#LUXE-4825",
      customer: "Lisa Brown",
      date: "2024-01-13",
      amount: "$1,250",
      status: "cancelled",
      items: 2,
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const icons = {
      completed: CheckCircle,
      processing: Clock,
      pending: Clock,
      cancelled: XCircle,
    };

    const Icon = icons[status];

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-primary">
                    {order.id}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-bold text-gray-900">
                    {order.amount}
                  </span>
                </td>
                <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                <td className="py-4 px-6">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
