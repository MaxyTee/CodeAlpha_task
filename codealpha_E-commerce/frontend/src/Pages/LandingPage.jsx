import React from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  Eye,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import HeroSection from "../Component/HeroSection";
import CategorySection from "../Component/CategorySection";
import FeaturedProducts from "./FeaturedProducts";

// Main App Component
export default function EcommerceApp() {
  return (
    <div className="min-h-screen ">
      <Header />

      <div className="mb-20">
        <HeroSection />
      </div>

      <div className="mb-20">
        <CategorySection />
      </div>
      <div className="mb-20">
        <FeaturedProducts />
      </div>

      <section className=" bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#8B4513]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#8B4513]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All products are verified for quality and authenticity.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#8B4513]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#8B4513]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Express shipping with real-time tracking.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#8B4513]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#8B4513]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Multiple secure payment options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
