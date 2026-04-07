import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const AboutPage = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "#1f1f1f" : "#fcfbf8"}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1
            className={`text-4xl font-light ${darkMode ? "text-[#e5e5e5]" : "text-[#2a2a2a]"} mb-4`}
          >
            Our Story
          </h1>
          <p className="text-lg text-[#7c786e] max-w-2xl mx-auto">
            Crafting timeless pieces with passion and precision since 1995
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-16">
          <div
            className={`aspect-[16/9] overflow-hidden ${darkMode ? "bg-[#7c786e]" : "bg-gray-100"}`}
          >
            <img
              src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=1200&auto=format&fit=crop"
              alt="Jewelry workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Story Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          {/* Our Beginning */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-[#a69059]">
              Our Beginning
            </h2>
            <p className="text-[#7c786e] leading-relaxed">
              Founded in a small Parisian atelier in 1995, Luxe began as a
              passion project between two friends who shared a love for
              traditional craftsmanship and contemporary design. What started
              with simple silver rings has grown into a collection of exquisite
              jewelry pieces, each telling its own unique story.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-[#a69059]">
              Craftsmanship
            </h2>
            <p className="text-[#7c786e] leading-relaxed">
              Every piece in our collection is meticulously crafted by skilled
              artisans who have dedicated their lives to mastering their craft.
              We combine time-honored techniques with modern technology to
              create jewelry that stands the test of time, both in durability
              and design.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div
                className={`aspect-square overflow-hidden ${darkMode ? "bg-[#7c786e]" : "bg-gray-100"}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop"
                  alt="Crafting process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`aspect-square overflow-hidden ${darkMode ? "bg-[#7c786e]" : "bg-gray-100"}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop"
                  alt="Finished jewelry"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-[#a69059]">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 pt-4">
              <div>
                <h3 className="font-medium text-[#a69059] mb-2">Quality</h3>
                <p className="text-sm text-[#7c786e]">
                  We use only the finest materials, from ethically sourced
                  diamonds to premium precious metals.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[#a69059] mb-2">
                  Sustainability
                </h3>
                <p className="text-sm text-[#7c786e]">
                  Committed to responsible sourcing and minimizing our
                  environmental footprint.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[#a69059] mb-2">
                  Personal Touch
                </h3>
                <p className="text-sm text-[#7c786e]">
                  Each piece is designed to be cherished and passed down through
                  generations.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8">
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-light text-[#a69059] mb-4">
                Get in Touch
              </h3>
              <p className="text-[#7c786e] mb-6">
                Have questions about our pieces or process? We'd love to hear
                from you.
              </p>
              <a
                href="/contact"
                className="inline-block text-[#a69059] border-b border-gray-900 pb-1 hover:opacity-80"
              >
                Contact Us →
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default AboutPage;
