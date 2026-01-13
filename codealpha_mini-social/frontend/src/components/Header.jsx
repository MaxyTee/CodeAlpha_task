import { Menu, Search, User, X } from "lucide-react";
import React, { useState } from "react";
import logo from "/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              className="w-10 h-10 rounded-lg shadow-md"
              alt="Miblo Logo"
            />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Miblo
            </h2>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Search for friends here..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white shadow-lg"
            />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg shadow-md">
              <User className="text-purple-700" size={28} />
            </div>
            <div className="text-right">
              <h2 className="font-semibold text-white">{user?.name}</h2>
              <p className="text-xs text-indigo-100">@mariamAdebimpeTairu</p>
            </div>
          </div>

          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 hover:bg-white/15 rounded-lg transition">
            <Search className="h-5 w-5 text-white" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/15 rounded-lg transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/20">
          {/* Mobile Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for friends..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Mobile Profile */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-white/15 rounded-lg">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
              <User className="text-purple-700" size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-white">{user?.name}</h2>
              <p className="text-xs text-indigo-100">@mariamAdebimpeTairu</p>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          {/* <nav className="mb-6">
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/blog", label: "Blog" },
                { path: "/fashion", label: "Fashion" },
                { path: "/clothing", label: "Clothing" },
                { path: "/news", label: "News" },
                { path: "/shop", label: "Shop" },
                { path: "/video", label: "Videos" },
              ].map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white text-purple-700 font-medium"
                          : "text-white hover:bg-white/15"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav> */}

          {/* Mobile Auth Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/20">
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 px-4 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-purple-600 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
