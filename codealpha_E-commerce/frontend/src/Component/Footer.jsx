import React from "react";
import { CreditCard, Banknote } from "lucide-react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#fcfbf8",
    padding: "64px 0",
    borderTop: "1px solid rgba(166, 144, 89, 0.1)",
  };

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "32px",
  };

  const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "Pinterest", href: "#" },
    { label: "Journal", href: "#" },
  ];

  return (
    <footer style={footerStyle}>
      <div style={containerStyle} className="md:flex-row">
        {/* Brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              letterSpacing: "0.3em",
              color: "#161513",
            }}
          >
            LUXE
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#7c786e",
              marginTop: "8px",
            }}
          >
            © 2024 LUXE Fine Jewelry. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div style={{ display: "flex", gap: "32px" }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a69059")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Payment Icons */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Banknote size={24} color="rgba(166, 144, 89, 0.4)" />
          <CreditCard size={24} color="rgba(166, 144, 89, 0.4)" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
