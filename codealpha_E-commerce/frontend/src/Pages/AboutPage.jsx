import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShoppingBag,
  DollarSign,
  Users,
  BadgeDollarSign,
  Truck,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

// Header Component

// Breadcrumb Component
function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-12">
      <a href="#" className="hover:text-red-500 transition">
        Home
      </a>
      <span className="text-gray-300">/</span>
      <span className="text-black font-medium">About</span>
    </div>
  );
}

// Our Story Section
function OurStorySection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
      {/* Left Content */}
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
            Our Story
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p className="hover:text-gray-900 transition duration-300">
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p className="hover:text-gray-900 transition duration-300">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative group overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
          alt="Shopping Women"
          className="w-full h-[500px] object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    {
      icon: <ShoppingBag size={36} />,
      number: "10.5k",
      label: "Sellers active our site",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-white",
      textColor: "text-gray-900",
    },
    {
      icon: <DollarSign size={36} />,
      number: "33k",
      label: "Monthly Product Sale",
      gradient: "from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-600",
      textColor: "text-white",
    },
    {
      icon: <ShoppingBag size={36} />,
      number: "45.5k",
      label: "Customer active in our site",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-white",
      textColor: "text-gray-900",
    },
    {
      icon: <BadgeDollarSign size={36} />,
      number: "25k",
      label: "Annual gross sale in our site",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-white",
      textColor: "text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.textColor} border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-10 text-center group cursor-pointer`}
        >
          <div
            className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} bg-opacity-10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
          >
            <div
              className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} text-white flex items-center justify-center shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
          <h3 className="text-4xl font-bold mb-3">{stat.number}</h3>
          <p className="text-sm font-medium opacity-80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// Team Section
function TeamSection() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const team = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Emma Watson",
      position: "Managing Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Will Smith",
      position: "Product Designer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <div className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {team.map((member, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 mb-8 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[450px] object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-3xl font-bold mb-2 group-hover:text-red-500 transition duration-300">
              {member.name}
            </h3>
            <p className="text-gray-600 mb-4 text-lg">{member.position}</p>
            <div className="flex gap-4">
              <a
                href={member.social.twitter}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href={member.social.instagram}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href={member.social.linkedin}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3, 4].map((dot) => (
          <button
            key={dot}
            onClick={() => setCurrentSlide(dot)}
            className={`transition-all duration-300 ${
              dot === currentSlide
                ? "bg-gradient-to-r from-red-500 to-pink-500 w-10 h-3 shadow-md"
                : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: <Truck size={36} />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Headphones size={36} />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
      {services.map((service, index) => (
        <div key={index} className="text-center group cursor-pointer">
          <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
            <div
              className={`w-20 h-20 bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}
            >
              {service.icon}
            </div>
          </div>
          <h3 className="font-bold text-xl mb-3 group-hover:text-red-500 transition duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>
      ))}
    </div>
  );
}

// Main App Component
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb />
        <OurStorySection />
        <StatsSection />
        <TeamSection />
        <ServicesSection />
      </main>

      <Footer />
    </div>
  );
}
