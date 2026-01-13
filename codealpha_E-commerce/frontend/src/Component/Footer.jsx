import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  Clock,
  Crown,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-amber-50 border-t border-amber-100">
      {/* Premium Features */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/30 border-y border-amber-200/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Free Express Shipping
                </h4>
                <p className="text-sm text-gray-600">On orders over $75</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Secure Payment</h4>
                <p className="text-sm text-gray-600">100% protected checkout</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">
                  Premium customer service
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Premium Quality
                </h4>
                <p className="text-sm text-gray-600">Curated collections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">
                  LuxeMart
                </span>
                <span className="text-sm text-amber-600 font-medium tracking-wider">
                  PREMIUM ELEGANCE
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Redefining luxury shopping with curated collections of premium
              products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all duration-300 border border-amber-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all duration-300 border border-amber-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all duration-300 border border-amber-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-8">
              Collections
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Men's Fashion
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Women's Luxury
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Home & Living
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Beauty & Wellness
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-8">
              Client Services
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-700 hover:underline transition-all duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-8">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-900">Store Address</div>
                  <div className="text-gray-600 text-sm">
                    123 Luxury Avenue, Beverly Hills, CA 90210
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <div className="text-gray-600 text-sm">+1 (310) 555-LUXE</div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-gray-600 text-sm">
                    service@luxemart.com
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2024 LuxeMart. All rights reserved.{" "}
                <span className="text-amber-600 font-medium">
                  Premium Shopping Experience
                </span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="Mastercard"
                className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/American_Express_logo_2018.svg"
                alt="Amex"
                className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
