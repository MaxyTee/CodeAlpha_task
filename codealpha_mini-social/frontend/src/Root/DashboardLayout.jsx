import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import PUkCard from "../components/PUkCard";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="bg-gray-100">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 h-screen overflow-none">
            {/* <Outlet /> */}
            {children}
          </div>

          {/* <div className="flex-1 p-4">
            <PUkCard />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
