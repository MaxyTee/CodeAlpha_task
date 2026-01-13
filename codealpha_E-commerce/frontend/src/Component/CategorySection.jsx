import React from "react";
import {
  Smartphone,
  Home,
  Shirt,
  CookingPot,
  Dumbbell,
  Book,
} from "lucide-react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    {
      name: "Electronics",
      icon: <Smartphone className="w-8 h-8" />,
      items: 1250,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      name: "Home & Living",
      icon: <Home className="w-8 h-8" />,
      items: 890,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      name: "Fashion",
      icon: <Shirt className="w-8 h-8" />,
      items: 2100,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      name: "Kitchen",
      icon: <CookingPot className="w-8 h-8" />,
      items: 750,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      name: "Sports",
      icon: <Dumbbell className="w-8 h-8" />,
      items: 620,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      name: "Books",
      icon: <Book className="w-8 h-8" />,
      items: 1500,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of categories to find exactly what
            you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-[#8B4513]/30 hover:shadow-lg transition-all duration-300">
                <div
                  className={`${category.bgColor} ${category.iconColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#8B4513] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.items} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
