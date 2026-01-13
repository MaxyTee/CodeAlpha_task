import { Edit, Eye, Filter, Package, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Root/DashboardLayout";

import { useEffect } from "react";
import { useProductStore } from "../../Store/ProductStore";

const ProductPage = () => {
  const navigate = useNavigate();
  const { getAllProduct, allProduct, deleteProduct } = useProductStore();
  console.log(allProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getAllProduct();
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchProduct();
  }, [getAllProduct]);

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  console.log(allProduct);

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-1">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Products Management
            </h2>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button
                onClick={() => navigate("/create-product-page")}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProduct.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded"></div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{product.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-amber-700">
                        ${parseInt(product?.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={
                          product.stock < 50
                            ? "text-red-600 font-medium"
                            : "text-green-600 font-medium"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 0 ? "Active" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/single-product-page/${product.slug}`)
                          }
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/create-product-page`, {
                              state: { product },
                            });
                          }}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product?._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductPage;
