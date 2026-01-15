import React, { useState } from "react";
import Sidebar from "./AdminPages/Sidebar";
import Navbar from "./AdminPages/Navbar";
import StatsOverview from "./AdminPages/StatsOverview ";
import RecentOrders from "./AdminPages/RecentOrders";
import ProductManagement from "./AdminPages/ProductManagement ";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="w-full flex-1 p-6 ">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
