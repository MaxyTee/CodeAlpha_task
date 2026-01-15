import React from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const heroStyle = {
    position: "relative",
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const backgroundStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmQBJ-x5fgfZoGsvu4rldYnhxdxW9vlxiIQd8Fb1rHt7XoTUMmBIGjrEAYBlwUIzuxNX1K2NhjfvLaw3GyB6pXe6yEDZPsxRIWnNwO261KG2-RUPX6lqgpvFmGaN0BfsIgUE6WFXqBOkuUJIUFLB7IBpfLrDMqAULdqbymGl5bfSCinsnynufbQkp8mLC9LW9wiWMHueq07bJoU11rNy_tnj2CPg3lg5tI1Ev1hr1mOu1cSeVSpYm-BVW7qQTPqG3bzPB5IBoNmnFN")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "transform 1s",
  };

  const contentStyle = {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "0 16px",
    maxWidth: "1024px",
  };

  const buttonStyle = {
    backgroundColor: "#a69059",
    color: "white",
    padding: "16px 40px",
    fontSize: "0.875rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  };

  const scrollIndicatorStyle = {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    opacity: 0.5,
    animation: "bounce 2s infinite",
  };

  return (
    <section style={heroStyle}>
      <div
        style={backgroundStyle}
        aria-label="Fashion model wearing luxury gold necklace and earrings"
      />

      <div style={contentStyle}>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            fontSize: "0.75rem",
            marginBottom: "24px",
          }}
        >
          Est. 1924
        </p>
        <h1
          style={{
            color: "white",
            fontSize: "clamp(3rem, 5vw, 4.5rem)",
            fontWeight: 300,
            marginBottom: "32px",
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
          }}
        >
          Timeless{" "}
          <span
            style={{ fontStyle: "italic", fontFamily: '"Noto Serif", serif' }}
          >
            Elegance
          </span>
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
            fontWeight: 300,
            marginBottom: "40px",
            maxWidth: "512px",
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          Exquisite craftsmanship for the modern era. Hand-forged treasures for
          life's most precious moments.
        </p>
        <button
          onClick={() => navigate("/allProductPage")}
          style={buttonStyle}
          className="btn-hover"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.backgroundColor = "rgba(166, 144, 89, 0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.backgroundColor = "#a69059";
          }}
        >
          Shop the Collection
        </button>
      </div>

      {/* Scroll Indicator */}
      <div style={scrollIndicatorStyle}>
        <span
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "white",
          }}
        >
          Scroll
        </span>
        <ChevronDown size={20} color="white" />
      </div>
    </section>
  );
};

export default Hero;
