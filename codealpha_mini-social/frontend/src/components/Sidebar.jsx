import {
  Home,
  PlusCircle,
  Settings,
  Shield,
  LogOut,
  PersonStandingIcon,
  User,
  PictureInPicture,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  const handleLogout = async () => {
    await logout();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = () => (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300`}
    >
      <div
        className={`p-4 border-b border-gray-200 ${
          collapsed
            ? "flex justify-center"
            : "flex items-center justify-between"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.image ? (
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={user.image}
                  alt={user.name}
                />
              ) : (
                user.name?.charAt(0) || "U"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {user.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                @{user.name?.toLowerCase().replace(/\s+/g, "") || "user"}
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.image ? (
              <img
                className="rounded-full w-full h-full object-cover"
                src={user.image}
                alt={user.name}
              />
            ) : (
              user.name?.charAt(0) || "U"
            )}
          </div>
        )}

        {!isMobile && (
          <button
            onClick={toggleCollapse}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft
              size={20}
              className={`text-gray-500 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        <NavLink
          to="/homePage"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium border-l-4 border-purple-500"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <Home size={collapsed ? 22 : 20} />
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium border-l-4 border-purple-500"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <PlusCircle size={collapsed ? 22 : 20} />
          {!collapsed && <span>Create</span>}
        </NavLink>

        <NavLink
          to="/myPost"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium border-l-4 border-purple-500"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <PictureInPicture size={collapsed ? 22 : 20} />
          {!collapsed && <span>My posts</span>}
        </NavLink>

        <NavLink
          to="/peoplePage"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium border-l-4 border-purple-500"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <PersonStandingIcon size={collapsed ? 22 : 20} />
          {!collapsed && <span>People</span>}
        </NavLink>

        <NavLink
          to="/PersonalProfile"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium border-l-4 border-purple-500"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <User size={collapsed ? 22 : 20} />
          {!collapsed && <span>Profile</span>}
        </NavLink>
      </nav>

      {/* Settings Section */}
      <div className="space-y-1 p-3 border-t border-gray-200">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gray-100 text-gray-900 font-medium border-l-4 border-gray-400"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Settings size={collapsed ? 22 : 20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <NavLink
          to="/security"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-gray-100 text-gray-900 font-medium border-l-4 border-gray-400"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Shield size={collapsed ? 22 : 20} />
          {!collapsed && <span>Security</span>}
        </NavLink>

        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center px-3" : "gap-3 px-4"
          } py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full mt-2`}
        >
          <LogOut size={collapsed ? 22 : 20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Tooltips for collapsed state */}
      {collapsed && (
        <div className="hidden lg:block">
          {/* Invisible tooltips that appear on hover */}
          <div className="absolute left-20 ml-2 bg-gray-900 text-white text-sm rounded-lg py-1 px-3 invisible group-hover:visible">
            Tooltip
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Desktop Toggle Button (when sidebar is hidden) */}
      {!isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg lg:block hidden"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          {isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Sidebar Container */}
          <div
            className={`
            fixed lg:relative
            h-screen
            z-40
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
          >
            <SidebarContent />
          </div>
        </>
      )}

      {/* Show collapsed version by default on desktop if not open */}
      {!isOpen && !isMobile && (
        <div className="fixed h-screen z-30">
          <div className="w-20 bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300">
            {/* Minimal profile */}
            <div className="p-4 border-b border-gray-200 flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.image ? (
                  <img
                    className="rounded-full w-full h-full object-cover"
                    src={user.image}
                    alt={user.name}
                  />
                ) : (
                  user.name?.charAt(0) || "U"
                )}
              </div>
            </div>

            {/* Minimal icons */}
            <nav className="flex-1 space-y-1 p-3 flex flex-col items-center">
              <NavLink
                to="/homePage"
                className="p-3 hover:bg-gray-100 rounded-lg"
              >
                <Home size={22} />
              </NavLink>
              <NavLink
                to="/create"
                className="p-3 hover:bg-gray-100 rounded-lg"
              >
                <PlusCircle size={22} />
              </NavLink>
              <NavLink
                to="/myPost"
                className="p-3 hover:bg-gray-100 rounded-lg"
              >
                <PictureInPicture size={22} />
              </NavLink>
              <NavLink
                to="/peoplePage"
                className="p-3 hover:bg-gray-100 rounded-lg"
              >
                <PersonStandingIcon size={22} />
              </NavLink>
              <NavLink
                to="/PersonalProfile"
                className="p-3 hover:bg-gray-100 rounded-lg"
              >
                <User size={22} />
              </NavLink>
            </nav>

            {/* Logout icon */}
            <div className="p-3 border-t border-gray-200 flex justify-center">
              <button
                onClick={handleLogout}
                className="p-3 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={22} className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
