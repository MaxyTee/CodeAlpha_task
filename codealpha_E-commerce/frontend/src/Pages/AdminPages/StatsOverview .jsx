import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingBag,
} from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$42,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
      iconColor: "text-green-500",
    },
    {
      title: "Total Products",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Package,
      color: "bg-blue-500",
      iconColor: "text-blue-500",
    },
    {
      title: "New Orders",
      value: "42",
      change: "-3.1%",
      trend: "down",
      icon: ShoppingBag,
      color: "bg-purple-500",
      iconColor: "text-purple-500",
    },
    {
      title: "Customers",
      value: "1,284",
      change: "+5.7%",
      trend: "up",
      icon: Users,
      color: "bg-orange-500",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
              <stat.icon size={24} className={stat.iconColor} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
