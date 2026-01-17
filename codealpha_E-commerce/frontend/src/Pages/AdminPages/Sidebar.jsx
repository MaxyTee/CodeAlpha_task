import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Tag,
  Bell,
  Shield,
  TrendingUp,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
      active: true,
    },
    {
      icon: Package,
      label: "Products",
      path: "/admin/products",
      count: 42,
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      path: "/admin/orders",
      count: 18,
    },
    {
      icon: Users,
      label: "Customers",
      path: "/admin/customers",
      count: 156,
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/admin/analytics",
    },
    {
      icon: Tag,
      label: "Categories",
      path: "/admin/categories",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "/admin/notifications",
      count: 3,
    },
    {
      icon: TrendingUp,
      label: "Campaigns",
      path: "/admin/campaigns",
    },
    {
      icon: Shield,
      label: "Permissions",
      path: "/admin/permissions",
    },
  ];

  const settingsItems = [
    { icon: Settings, label: "Settings", path: "/admin/settings" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

  // const getNavLinkClass = ({ isActive }) => {
  //   return `
  //     flex items-center gap-3 px-3 py-3 rounded-lg
  //     transition-colors duration-200
  //     ${
  //       isActive
  //         ? "bg-[#a69059] bg-opacity-20 text-[#a69059] border-l-4 border-[#a69059]"
  //         : "hover:bg-gray-800 text-gray-300"
  //     }
  //   `;
  // };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      {!isOpen && (
        <div
          className="lg:hidden fixed  bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 h-screen bg-gray-900 text-white z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-20"}
        overflow-hidden
      `}
      >
        {/* Logo with Link */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <NavLink
            to="/admin/dashboard"
            className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#a69059] flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            {isOpen && (
              <div>
                <h2 className="text-lg font-bold tracking-wider">LUXE</h2>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            )}
          </NavLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <p
            className={`text-xs text-gray-500 uppercase tracking-wider mb-3 ${
              !isOpen && "text-center"
            }`}
          >
            {isOpen ? "Main Menu" : "•••"}
          </p>

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              className={({ isActive }) => {
                const baseClasses = `
                  flex items-center gap-3 px-3 py-3 rounded-lg
                  transition-colors duration-200
                  ${!isOpen && "justify-center"}
                `;

                if (isActive) {
                  return `${baseClasses} bg-[#a69059] bg-opacity-20 text-[#a69059] border-l-4 border-[#a69059]`;
                }
                return `${baseClasses} hover:bg-gray-800 text-gray-300`;
              }}
            >
              <item.icon size={20} />
              {isOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.count !== undefined && (
                    <span className="bg-[#a69059] text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Settings Section */}
        <div className="p-4 border-t border-gray-800 space-y-1">
          {settingsItems.map((item, index) => {
            // Special handling for logout
            if (item.label === "Logout") {
              return (
                <button
                  key={index}
                  onClick={handleLogout}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-colors duration-200
                    hover:bg-gray-800 text-gray-300
                    ${!isOpen && "justify-center"}
                  `}
                >
                  <item.icon size={20} />
                  {isOpen && <span>{item.label}</span>}
                </button>
              );
            }

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => {
                  const baseClasses = `
                    flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-colors duration-200
                    ${!isOpen && "justify-center"}
                  `;

                  if (isActive) {
                    return `${baseClasses} bg-[#a69059] bg-opacity-20 text-[#a69059] border-l-4 border-[#a69059]`;
                  }
                  return `${baseClasses} hover:bg-gray-800 text-gray-300`;
                }}
              >
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* User Profile */}
        {isOpen && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a69059] bg-opacity-20 flex items-center justify-center">
                <span className="text-[#a69059] font-bold">A</span>
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@luxe.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
