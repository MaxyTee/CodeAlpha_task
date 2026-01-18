import React, { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../Store/CartStore";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop All", path: "/allProductPage" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const headerStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 50,
    backgroundColor: darkMode
      ? "rgba(31, 31, 31, 0.8)"
      : "rgba(252, 251, 248, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(166, 144, 89, 0.1)",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 24px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  };

  const searchStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: darkMode
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(166, 144, 89, 0.05)",
    padding: "6px 12px",
    borderRadius: "2px",
    border: "1px solid rgba(166, 144, 89, 0.1)",
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Mobile Menu Toggle Button - Hidden on desktop */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#ffffff" : "#161513",
              padding: "8px",
            }}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                letterSpacing: "0.3em",
                color: darkMode ? "#ffffff" : "#161513",
              }}
            >
              LUXE
            </h1>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
              className="logo-subtitle"
            >
              Fine Jewelry
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            style={{ display: "flex", gap: "32px", alignItems: "center" }}
            className="lg-display desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className="nav-link"
                style={{ fontWeight: 500 }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            {/* Desktop Search */}

            {/* Mobile Search Button */}

            <button
              onClick={toggleDarkMode}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: darkMode ? "#a69059" : "inherit",
                transition: "color 0.3s",
              }}
              className="theme-toggle"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                transition: "color 0.3s",
                position: "relative",
              }}
              className="cart-button"
            >
              <ShoppingBag size={24} />
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#a69059",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="cart-badge"
              >
                {cart.length}
              </span>
            </button>

            {/* User Avatar */}
            <div
              onClick={() => navigate("/login")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAN8xKh6LPmRR4Ps_OIyaf55SBKy6ek_yKegqxWO4yga1Tj4ekE8BMKRp7uO_xc2N5WcDnzaJ-QwLZyYr5YKiIhNvi9OAt8aVbVi9ZmQ7GRIEVN2c_9VVVaPfDxkPRSOxSbDvIVbVs6vAlYne5R2yMHaiUY82sI66qtbNEyeGQYtDMDYYTqwnbeyQWzIiIKFKMFtoOs1PD4iIW2nOxTOs2ESkH5Ln8dEqRQHVXc4gh3PNDtWYneJuRKuiI3gQVP3rXGiicj5mGswNYl')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(166, 144, 89, 0.2)",
              }}
              className="user-avatar"
              aria-label="User profile"
            />
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: darkMode ? "#1f1f1f" : "#fcfbf8",
            zIndex: 40,
            display: "none",
            flexDirection: "column",
            padding: "32px 24px",
          }}
          className="mobile-menu-overlay"
        >
          <nav
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className="nav-link"
                style={{
                  fontWeight: 500,
                  fontSize: "1.25rem",
                  padding: "12px 0",
                  color: darkMode ? "#ffffff" : "#161513",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div
            style={{
              marginTop: "auto",
              paddingTop: "32px",
              borderTop: "1px solid rgba(166, 144, 89, 0.1)",
            }}
          >
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: darkMode ? "#ffffff" : "#161513",
                fontSize: "1rem",
                padding: "16px 0",
              }}
            >
              <User size={20} />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* Responsive CSS */
        @media (max-width: 1024px) {
          .lg-display {
            display: none !important;
          }
          
          .mobile-menu-toggle {
            display: block !important;
          }
          
          .mobile-menu-overlay {
            display: flex !important;
          }
        }
        
        @media (max-width: 768px) {
          .md-display {
            display: none !important;
          }
          
          .mobile-search-button {
            display: block !important;
          }
          
          .mobile-search-bar {
            display: block !important;
          }
          
          .containerStyle {
            padding: 0 16px !important;
          }
          
          .logo-subtitle {
            font-size: 0.5rem !important;
            letter-spacing: 0.3em !important;
          }
          
          h1 {
            font-size: 1.3rem !important;
            letter-spacing: 0.2em !important;
          }
          
          .theme-toggle,
          .wishlist-button,
          .cart-button,
          .user-avatar {
            margin-left: 4px !important;
          }
        }
        
        @media (max-width: 480px) {
          header {
            height: 70px !important;
          }
          
          h1 {
            font-size: 1.2rem !important;
            letter-spacing: 0.15em !important;
          }
          
          .logo-subtitle {
            display: none !important;
          }
          
          .user-avatar {
            width: 28px !important;
            height: 28px !important;
          }
          
          .cart-badge {
            width: 14px !important;
            height: 14px !important;
            font-size: 9px !important;
          }
          
          .theme-toggle svg,
          .wishlist-button svg,
          .cart-button svg,
          .mobile-search-button svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
        
        @media (max-width: 360px) {
          .containerStyle {
            padding: 0 12px !important;
          }
          
          h1 {
            font-size: 1.1rem !important;
          }
        }
        
        /* Ensure proper spacing for mobile */
        .mobile-menu-toggle,
        .mobile-search-button,
        .theme-toggle,
        .wishlist-button,
        .cart-button {
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Prevent body scroll when mobile menu is open */
        body.mobile-menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Header;
