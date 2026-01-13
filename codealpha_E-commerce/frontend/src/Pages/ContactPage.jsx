import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Phone,
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-16">
        <a href="#" className="hover:text-black">
          Home
        </a>
        <span>/</span>
        <span className="text-black">Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Call To Us */}
          <div className="bg-white shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <h3 className="font-semibold">Call To Us</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300"></div>

          {/* Write To Us */}
          <div className="bg-white shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="font-semibold">Write To US</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md p-8">
            <div className="space-y-6">
              {/* Name, Email, Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-100 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-100 outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-100 outline-none"
                />
              </div>

              {/* Message Textarea */}
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="10"
                className="w-full px-4 py-3 bg-gray-100 outline-none resize-none"
              ></textarea>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-red-500 text-white px-12 py-4 hover:bg-red-600 transition font-medium"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function ContactPageApp() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactPage />
      <Footer />
    </div>
  );
}
