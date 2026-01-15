import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    alert("Thank you for your message. We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            Get in touch with any questions or inquiries
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100">
                    <Mail size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">hello@luxe.com</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100">
                    <Phone size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100">
                    <MapPin size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">
                      123 Jewelry Street
                      <br />
                      New York, NY 10001
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      By appointment only
                    </p>
                  </div>
                </div>
              </div>

              {/* Store Image */}
              <div className="pt-6 border-t border-gray-200">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop"
                    alt="Luxe store"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">
                  Common Questions
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-900">
                      How long does shipping take?
                    </p>
                    <p className="text-xs text-gray-500">
                      2-5 business days within the US
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Do you offer custom designs?
                    </p>
                    <p className="text-xs text-gray-500">
                      Yes, please email us for custom inquiries
                    </p>
                  </div>
                </div>
                <a
                  href="/faq"
                  className="inline-block text-sm text-gray-600 hover:text-gray-900 mt-3"
                >
                  View all FAQs →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
