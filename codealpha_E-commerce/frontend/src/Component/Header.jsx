import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Moon, Sun } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../Store/CartStore";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
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
    <header style={headerStyle}>
      <div style={containerStyle}>
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
          >
            Fine Jewelry
          </span>
        </div>

        <nav
          style={{ display: "flex", gap: "32px", alignItems: "center" }}
          className="lg-display"
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

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={searchStyle} className="md-display">
            <Search size={20} style={{ opacity: 0.5 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              style={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.875rem",
                marginLeft: "8px",
                width: "128px",
                color: darkMode ? "#e5e5e5" : "#2a2a2a",
              }}
            />
          </div>

          <button
            onClick={toggleDarkMode}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#a69059" : "inherit",
              transition: "color 0.3s",
            }}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              transition: "color 0.3s",
            }}
          >
            <Heart size={24} />
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
            aria-label="User profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
