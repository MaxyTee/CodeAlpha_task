import React from "react";
import { ArrowRight, Sparkles, Shield, Truck, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with Elegant Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-white to-amber-100/20">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fcd34d" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div> */}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-amber-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-100/30 to-amber-200/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Elevate Your
              <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                Shopping Experience
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover curated collections of premium products, delivered with
              exceptional service and attention to detail.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-2xl hover:from-amber-700 hover:to-amber-800 transition-all duration-500 shadow-2xl hover:shadow-amber-200/50 border border-amber-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative">Explore Collection</span>
                <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/products?featured=true"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-amber-300 text-amber-700 font-semibold rounded-2xl hover:bg-amber-50 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                <Star className="w-5 h-5" />
                <span>Featured Products</span>
              </Link>
            </div>

            {/* Trust Indicators */}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Modern Shopping Experience"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent"></div>

              {/* Floating Product Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-amber-100 max-w-xs transform rotate-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Premium Watch</div>
                    <div className="text-sm text-amber-600">$1,299</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Featured in Luxury Collection
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-amber-500 to-amber-700 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-3">
              <div className="text-center">
                <div className="font-bold text-lg">30% OFF</div>
                <div className="text-xs opacity-90">Summer Sale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
