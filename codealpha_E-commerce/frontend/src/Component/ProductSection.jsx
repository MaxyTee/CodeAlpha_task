import React, { useState } from "react";
import { ShoppingBag, Heart, Star, Check } from "lucide-react";
import { useProductStore } from "../Store/ProductStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import handleAddToCart from "../utils/handleAddToCart";
import { useCartStore } from "../Store/CartStore";

const ProductSection = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuthStore();
  const { cart, getCart } = useCartStore();
  const { getAllProduct, allProduct: products } = useProductStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const FetchProduct = async () => {
      try {
        await getAllProduct();
        await getCart(user._id);
      } catch (error) {
        console.log("Error", error);
      }
    };

    FetchProduct();
  }, []);

  useEffect(() => {});

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const sectionStyle = {
    padding: "80px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "32px",
    marginTop: "48px",
  };

  if (typeof window !== "undefined") {
    if (window.innerWidth >= 768) {
      gridStyle.gridTemplateColumns = "repeat(2, 1fr)";
    }
    if (window.innerWidth >= 1024) {
      gridStyle.gridTemplateColumns = "repeat(4, 1fr)";
    }
  }

  return (
    <section style={sectionStyle}>
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h2
          style={{
            color: "#7c786e",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            marginBottom: "16px",
          }}
        >
          Signature Collection
        </h2>
        <p
          style={{
            fontSize: "2.25rem",
            fontWeight: 300,
            marginBottom: "16px",
            color: "#161513",
          }}
        >
          Exquisite Jewelry
        </p>
        <div
          style={{
            width: "64px",
            height: "1px",
            backgroundColor: "#a69059",
            margin: "0 auto",
          }}
        ></div>
      </div>

      {/* Products Grid */}
      <div style={gridStyle}>
        {products.map((product) => {
          let selectedCart;
          selectedCart = cart.some((cart) => cart.product._id === product?._id);

          return (
            <div
              key={product._id}
              style={{
                position: "relative",
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(166, 144, 89, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.05)";
              }}
            >
              {/* Sale Badge */}
              {product.oldPrice && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: "#a69059",
                    color: "white",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    zIndex: 10,
                  }}
                >
                  SALE
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  backgroundColor: "white",
                  border: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  color: wishlist.includes(product._id) ? "#dc2626" : "#666",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = wishlist.includes(
                    product._id
                  )
                    ? "#fee2e2"
                    : "#f8f8f8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <Heart
                  size={18}
                  fill={wishlist.includes(product._id) ? "#dc2626" : "none"}
                />
              </button>

              {/* Product Image */}
              <div
                style={{
                  aspectRatio: "1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Product Info */}
              <div style={{ padding: "20px" }}>
                {/* Category */}
                <div
                  style={{
                    color: "#a69059",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {product.category}
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#161513",
                    marginBottom: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#666",
                    marginBottom: "16px",
                    lineHeight: 1.5,
                    height: "42px",
                    overflow: "hidden",
                  }}
                >
                  {product.description}
                </p>

                {/* Rating */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(product.rating) ? "#fbbf24" : "#e5e5e5"
                        }
                        color={
                          i < Math.floor(product.rating) ? "#fbbf24" : "#e5e5e5"
                        }
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#666",
                    }}
                  >
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>

                {/* Price & Stock */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          color: "#161513",
                        }}
                      >
                        ${product.price.toLocaleString()}
                      </span>
                      {product.oldPrice && (
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "#999",
                            textDecoration: "line-through",
                          }}
                        >
                          ${product.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.75rem",
                      color: product.stock > 0 ? "#059669" : "#dc2626",
                    }}
                  >
                    {product.stock > 0 ? (
                      <>
                        <Check size={12} />
                        <span>In Stock</span>
                      </>
                    ) : (
                      <span>Out of Stock</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#a69059",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(166, 144, 89, 0.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#a69059")
                  }
                  onClick={() => {
                    handleAddToCart(pathname, navigate, {
                      product: product?._id,
                      user: user?._id,
                    });
                  }}
                >
                  <ShoppingBag size={18} />
                  {selectedCart ? "Added" : "Add to Cart"}
                  {/* Add to Cart */}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <button
          onClick={() => navigate("/allProductPage")}
          style={{
            backgroundColor: "transparent",
            color: "#a69059",
            border: "2px solid #a69059",
            padding: "12px 32px",
            borderRadius: "4px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#a69059";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#a69059";
          }}
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
