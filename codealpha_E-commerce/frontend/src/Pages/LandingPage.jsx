import Header from "../Component/Header";
import Hero from "../Component/HeroSection";
import Categories from "../Component/CategorySection";
import BrandStatement from "../Component/BrandStatement";
import Footer from "../Component/Footer";
import ProductSection from "../Component/ProductSection";

function EcommerceApp({ darkMode, toggleDarkMode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1f1f1f" : "#fcfbf8",
        color: darkMode ? "#e5e5e5" : "#2a2a2a",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <div
          style={{
            height: "120px",
            backgroundColor: darkMode ? "#1f1f1f" : "#fcfbf8",
          }}
        ></div>
        <Categories darkMode={darkMode} />
        <ProductSection darkMode={darkMode} />
        <BrandStatement darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default EcommerceApp;
