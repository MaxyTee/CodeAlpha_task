import React, { useState } from "react";
import {
  Package,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Grid,
  Check,
  Eye,
  Save,
  Loader,
  Star,
  Hash,
  Layers,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductStore } from "../Store/ProductStore";
import DashboardLayout from "../Root/DashboardLayout";
// import { useProductStore } from "../";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { createProduct, updateProduct } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const location = useLocation();

  const categories = [
    "Electronics",
    "Laptops",
    "Phones",
    "Tablets",
    "Accessories",
    "Wearables",
  ];
  //   const [selectedCategories, setSelectedCategories] = useState(["Laptops"]);

  const [productData, setProductData] = useState(
    location?.state?.product || {
      name: "",
      description: "",
      price: "",
      oldPrice: "",
      category: "Laptops",
      rating: "4.7",
      reviewsCount: "",
      sizes: [""],
      stock: "",
      isFeatured: false,
      isActive: true,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...productData.sizes];
    newSizes[index] = value;
    setProductData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const addSize = () => {
    setProductData((prev) => ({ ...prev, sizes: [...prev.sizes, ""] }));
  };

  const removeSize = (index) => {
    if (productData.sizes.length > 1) {
      const newSizes = productData.sizes.filter((_, i) => i !== index);
      setProductData((prev) => ({ ...prev, sizes: newSizes }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  console.log(location?.state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare final product data
      const finalProduct = {
        ...productData,
        price: parseFloat(productData.price),
        oldPrice: productData.oldPrice
          ? parseFloat(productData.oldPrice)
          : undefined,
        rating: parseFloat(productData.rating) || 0,
        reviewsCount: parseInt(productData.reviewsCount) || 0,
        stock: parseInt(productData.stock) || 0,
        sizes: productData.sizes.filter((size) => size.trim() !== ""),
        image: images.map((img) => img.url),
        isFeatured: productData.isFeatured,
      };

      // Remove empty fields
      Object.keys(finalProduct).forEach((key) => {
        if (finalProduct[key] === "" || finalProduct[key] === undefined) {
          delete finalProduct[key];
        }
      });

      console.log("Submitting product:", finalProduct);

      const payload = { ...finalProduct };
      console.log("Payload", payload);

      // Simulate API call
      if (location?.state) {
        const payload = { update: { ...finalProduct } };
        console.log(payload);
        return await updateProduct(payload);
      }
      const response = await createProduct(payload);
      if (!response.success) return;
      setProductData({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "Laptops",
        rating: "4.7",
        reviewsCount: "",
        sizes: [""],
        stock: "",
        isFeatured: false,
        isActive: true,
      });

      // Success - redirect to products page
      //   navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex-1 bg-gradient-to-b from-amber-50/10 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link
                  to="/admin/products"
                  className="flex items-center gap-2 text-gray-600 hover:text-amber-600"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Products</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-600" />
                <span className="text-xl font-bold text-gray-900">
                  Add New Product
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Basic Information
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Required product details
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                      placeholder="e.g., MacBook Pro 16 M2"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={productData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                      placeholder="Enter detailed product description..."
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Category *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() =>
                            setProductData((prev) => ({ ...prev, category }))
                          }
                          className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-all ${
                            productData.category === category
                              ? "bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-400 text-amber-700"
                              : "border-gray-300 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                        >
                          {productData.category === category && (
                            <Check className="w-4 h-4" />
                          )}
                          <Grid className="w-4 h-4" />
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Pricing & Stock
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Set pricing and inventory information
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="price"
                          value={productData.price}
                          onChange={handleChange}
                          required
                          step="0.01"
                          min="0"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                          placeholder="2400"
                        />
                      </div>
                    </div>

                    {/* Old Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Old Price ($) - Optional
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="oldPrice"
                          value={productData.oldPrice}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                          placeholder="2600"
                        />
                      </div>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                        placeholder="10"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (0-5)
                      </label>
                      <div className="relative">
                        <Star className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="rating"
                          value={productData.rating}
                          onChange={handleChange}
                          step="0.1"
                          min="0"
                          max="5"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                          placeholder="4.7"
                        />
                      </div>
                    </div>

                    {/* Reviews Count */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reviews Count
                      </label>
                      <input
                        type="number"
                        name="reviewsCount"
                        value={productData.reviewsCount}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                        placeholder="520"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Variants (Sizes) */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Product Variants
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Add different size/configuration options
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {productData.sizes.map((size, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <Layers className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={size}
                              onChange={(e) =>
                                handleSizeChange(index, e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
                              placeholder="e.g., 16GB/512GB, 32GB/1TB, Large, Medium"
                            />
                          </div>
                        </div>
                        {productData.sizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSize(index)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addSize}
                      className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50"
                    >
                      + Add Another Variant
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Product Images
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Upload product images (At least one required)
                  </p>
                </div>

                <div className="p-6">
                  {/* Image Upload Area */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload Images *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="text-gray-900 font-medium mb-2">
                          Click to upload images
                        </div>
                        <p className="text-gray-500 text-sm">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Uploaded Images Preview */}
                  {images.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-4">
                        Uploaded Images ({images.length})
                        {images.length > 0 && (
                          <span className="ml-2 text-xs text-amber-600">
                            (First image will be featured)
                          </span>
                        )}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={image.url}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {index === 0 && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-amber-600 text-white text-xs rounded">
                                  Featured
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="mt-2 text-xs text-gray-500 truncate">
                              {image.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Settings */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Product Settings
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Additional product options
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 cursor-pointer">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-amber-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">
                            Featured Product
                          </div>
                          <div className="text-sm text-gray-500">
                            Show this product in featured sections
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={productData.isFeatured}
                        onChange={handleChange}
                        className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 cursor-pointer">
                      <div className="flex items-center">
                        <Package className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">
                            Publish Product
                          </div>
                          <div className="text-sm text-gray-500">
                            Make product visible to customers
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={productData.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/single-product-page/${productData.slug}`)
                      }
                      className="px-8 py-3 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>

                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        !productData.name ||
                        !productData.price ||
                        !productData.stock ||
                        images.length === 0
                      }
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Creating Product...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Create Product
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProductPage;
