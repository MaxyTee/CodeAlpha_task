import React, { useState } from "react";
import { Edit2, Trash2, Eye, Plus, Star, Package } from "lucide-react";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Éternité Diamond Ring",
      category: "Rings",
      price: "$1,899",
      stock: 15,
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      name: "Celestial Pearl Earrings",
      category: "Earrings",
      price: "$895",
      stock: 8,
      rating: 4.5,
      status: "active",
    },
    {
      id: 3,
      name: "Infinity Pendant Necklace",
      category: "Necklaces",
      price: "$1,650",
      stock: 7,
      rating: 4.9,
      status: "low",
    },
    {
      id: 4,
      name: "Minimalist Gold Cuff",
      category: "Bracelets",
      price: "$1,250",
      stock: 12,
      rating: 4.7,
      status: "active",
    },
    {
      id: 5,
      name: "Art Deco Engagement Ring",
      category: "Rings",
      price: "$3,200",
      stock: 3,
      rating: 5.0,
      status: "low",
    },
  ]);

  const getStockBadge = (stock, status) => {
    if (status === "low") {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          Low Stock
        </span>
      );
    }
    if (stock === 0) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          Out of Stock
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        In Stock
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star size={12} className="text-yellow-400 fill-current" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Product Management
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
                      <Package size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: LUXE-{product.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-600">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-bold text-gray-900">
                    {product.price}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-1">
                    {getStockBadge(product.stock, product.status)}
                    <span className="text-xs text-gray-500">
                      {product.stock} units
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">{getRatingStars(product.rating)}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-blue-50 rounded text-blue-600"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 hover:bg-green-50 rounded text-green-600"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-red-50 rounded text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {products.length}
            </p>
            <p className="text-xs text-gray-500">Total Products</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {
                products.filter((p) => p.status === "active" && p.stock > 0)
                  .length
              }
            </p>
            <p className="text-xs text-gray-500">Active Products</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {products.filter((p) => p.status === "low").length}
            </p>
            <p className="text-xs text-gray-500">Low Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
