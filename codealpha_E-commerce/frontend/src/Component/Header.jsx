import React, { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../Store/CartStore";

const Header = () => {
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart?.length || 0;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-amber-50/30 to-white border-b border-amber-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with subtle gradient */}
          <Link to="/" className="group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                LuxeMart
              </span>
              <span className="text-xs text-gray-500">Premium Shopping</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-lg hover:bg-amber-50 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-amber-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
