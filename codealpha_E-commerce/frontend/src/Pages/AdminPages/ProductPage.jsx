import React, { useState, useCallback } from "react";
import {
  Plus,
  Package,
  X,
  DollarSign,
  Camera,
  Upload,
  Trash2,
  Image as ImageIcon,
  Tag,
  Star,
  Check,
  AlertCircle,
  DownloadCloud,
} from "lucide-react";
import { useProductStore } from "../../Store/ProductStore";
import AdminLayout from "../AdminPage";
import { useEffect } from "react";

const ProductPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    createProduct,
    getAllProduct,
    isLoading,
    updateProduct,
    deleteProduct,
    allProduct: products,
  } = useProductStore();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // const [products, setProducts] = useState([
  //   {
  //     _id: "1",
  //     name: "Éternité Diamond Ring",
  //     description: "18k gold ring with brilliant-cut diamond centerpiece",
  //     image: [
  //       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop",
  //       "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop",
  //     ],
  //     price: 1899,
  //     category: "Rings",
  //     oldPrice: 2299,
  //     rating: 4.8,
  //     reviewsCount: 42,
  //     slug: "eternite-diamond-ring",
  //     sizes: ["6", "7", "8", "9"],
  //     stock: 15,
  //     isFeatured: true,
  //     createdAt: "2024-01-01",
  //   },
  //   {
  //     _id: "2",
  //     name: "Celestial Pearl Earrings",
  //     description: "South Sea pearls set in 14k yellow gold",
  //     image: [
  //       "https://images.unsplash.com/photo-1594576722512-582d5577dd56?w=600&auto=format&fit=crop",
  //       "https://images.unsplash.com/photo-1535632787341-90c18cef64e1?w=600&auto=format&fit=crop",
  //     ],
  //     price: 895,
  //     category: "Earrings",
  //     oldPrice: 1095,
  //     rating: 4.5,
  //     reviewsCount: 28,
  //     slug: "celestial-pearl-earrings",
  //     sizes: [],
  //     stock: 8,
  //     isFeatured: true,
  //     createdAt: "2024-01-05",
  //   },
  // ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: [],
    price: "",
    category: "",
    oldPrice: "",
    rating: "0",
    reviewsCount: "0",
    slug: "",
    sizes: [""],
    stock: "0",
    isFeatured: false,
  });

  const categories = ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"];
  const jewelrySizes = [
    "6",
    "7",
    "8",
    "9",
    "10",
    "S",
    "M",
    "L",
    '16"',
    '18"',
    '20"',
  ];

  useEffect(() => {
    const FetchProduct = async () => {
      await getAllProduct();
    };
    FetchProduct();
  }, []);

  // console.log(allProduct);

  // Drag and Drop Handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, []);

  // File Input Handler
  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files);
    await handleFiles(files);
  };

  // Handle File Upload Simulation
  const handleFiles = async (files) => {
    const imageFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") &&
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        )
    );

    if (imageFiles.length === 0) {
      alert("Please upload only image files (JPEG, PNG, WebP)");
      return;
    }

    setUploading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setTimeout(() => {
        setUploadProgress(i);
      }, i * 20);
    }

    // Simulate file upload - in real app, upload to your server
    setTimeout(() => {
      const newImages = imageFiles.map((file) => {
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);

        // In real app, you would upload to your server and get back a URL
        return {
          file,
          preview: objectUrl,
          uploadedUrl: null, // This would be the server URL after upload
        };
      });

      setNewProduct((prev) => ({
        ...prev,
        image: [...prev.image, ...newImages],
      }));

      setUploading(false);
      setUploadProgress(0);
    }, 2000);
  };

  // Remove Image
  const removeImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  // Move Image (for reordering)
  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...newProduct.image];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setNewProduct((prev) => ({ ...prev, image: newImages }));
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setUploading(true);

    const slug = generateSlug(newProduct.name);

    const product = {
      name: newProduct.name,
      description: newProduct.description,
      image: newProduct.image, // Array of image URLs
      price: Number(newProduct.price),
      category: newProduct.category,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      rating: Number(newProduct.rating),
      reviewsCount: Number(newProduct.reviewsCount),
      slug: slug,
      sizes: newProduct.sizes.filter((size) => size.trim() !== ""),
      stock: Number(newProduct.stock),
      isFeatured: newProduct.isFeatured,
    };

    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("oldPrice", newProduct.oldPrice);
    formData.append("rating", newProduct.rating);
    formData.append("reviewsCount", newProduct.reviewsCount);
    formData.append("stock", newProduct.stock);
    formData.append("isFeatured", newProduct.isFeatured);

    newProduct.sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    newProduct.image.forEach((img) => {
      formData.append("image", img.file);
    });

    try {
      await createProduct(formData);
      setUploading(false);
      

      setProducts([
        {
          ...product,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
        ...products,
      ]);

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        image: [],
        price: "",
        category: "",
        oldPrice: "",
        rating: "0",
        reviewsCount: "0",
        slug: "",
        sizes: [""],
        stock: "0",
        isFeatured: false,
      });

      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };
  const handleUpdateProduct = async (id) => {
    await updateProduct(id);
  };

  const addSizeField = () => {
    setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, ""] });
  };

  const updateSize = (index, value) => {
    const newSizes = [...newProduct.sizes];
    newSizes[index] = value;
    setNewProduct({ ...newProduct, sizes: newSizes });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">
              Manage your luxury jewelry collection
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#a69059] text-white px-4 py-2 rounded-xl hover:bg-[#a69059]/90 transition-colors shadow-sm"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isFeatured && (
                    <div className="bg-[#a69059] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  {product.oldPrice && (
                    <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Sale
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span>{product.rating}</span>
                    <span className="text-gray-300">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-3">
                  <span className="text-xs font-medium text-[#a69059] bg-[#a69059]/10 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`${
                        product.stock < 5 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                    {product.sizes.length > 0 && (
                      <span className="text-gray-500">
                        {product.sizes.length} sizes
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateProduct(product._id)}
                    className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex-1 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Product Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl my-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#a69059]/10 flex items-center justify-center">
                    <Plus className="text-[#a69059]" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Create New Product
                    </h2>
                    <p className="text-sm text-gray-500">
                      Add a new jewelry piece to your collection
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleCreateProduct}
                className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
              >
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Basic Information
                  </h3>

                  {/* Product Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => {
                        setNewProduct({
                          ...newProduct,
                          name: e.target.value,
                          slug: generateSlug(e.target.value),
                        });
                      }}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                      placeholder="Elegant Diamond Necklace"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                      placeholder="Describe this beautiful jewelry piece..."
                    />
                  </div>

                  {/* Slug (auto-generated but editable) */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.slug}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          slug: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                      placeholder="elegant-diamond-necklace"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be used in the product URL
                    </p>
                  </div>
                </div>

                {/* Drag & Drop Image Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Images
                  </h3>

                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-2xl transition-all duration-200 ${
                      dragging
                        ? "border-[#a69059] bg-[#a69059]/5"
                        : "border-gray-300 hover:border-[#a69059] hover:bg-gray-50"
                    } ${uploading ? "pointer-events-none opacity-75" : ""}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        {uploading ? (
                          <div className="relative">
                            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#a69059] rounded-full animate-spin"></div>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                              {uploadProgress}%
                            </span>
                          </div>
                        ) : dragging ? (
                          <DownloadCloud className="text-[#a69059]" size={24} />
                        ) : (
                          <Upload className="text-gray-400" size={24} />
                        )}
                      </div>

                      <h4 className="font-medium text-gray-900 mb-2">
                        {uploading ? "Uploading..." : "Drag & drop images here"}
                      </h4>

                      <p className="text-sm text-gray-600 mb-4">
                        {uploading
                          ? `Uploading images... ${uploadProgress}% complete`
                          : "Upload up to 10 images (JPEG, PNG, WebP). Max 5MB each."}
                      </p>

                      <div className="flex items-center justify-center gap-4">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={uploading}
                          />
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#a69059] text-white rounded-lg hover:bg-[#a69059]/90 transition-colors">
                            <Camera size={16} />
                            Browse Files
                          </span>
                        </label>

                        <span className="text-sm text-gray-500">
                          or drag & drop
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="mt-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#a69059] transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Uploading images... {uploadProgress}%
                      </p>
                    </div>
                  )}

                  {/* Image Preview Grid */}
                  {newProduct.image.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          Uploaded Images ({newProduct.image.length})
                        </h4>
                        <p className="text-sm text-gray-500">
                          Drag to reorder • First image is main display
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {newProduct.image.map((img, index) => (
                          <div
                            key={index}
                            className="relative group"
                            draggable
                            onDragStart={(e) =>
                              e.dataTransfer.setData("text/plain", index)
                            }
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const fromIndex = parseInt(
                                e.dataTransfer.getData("text/plain")
                              );
                              const toIndex = index;
                              if (fromIndex !== toIndex) {
                                moveImage(fromIndex, toIndex);
                              }
                            }}
                          >
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                              <img
                                src={img.preview}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Image Actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            {/* Image Number Badge */}
                            <div
                              className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0
                                  ? "bg-[#a69059] text-white"
                                  : "bg-gray-800/80 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Pricing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Price *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <DollarSign size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <DollarSign size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newProduct.oldPrice}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              oldPrice: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                          placeholder="For sale pricing"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category & Inventory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Sizes
                    </h3>
                    <button
                      type="button"
                      onClick={addSizeField}
                      className="text-sm text-[#a69059] hover:text-[#a69059]/80"
                    >
                      + Add size
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {newProduct.sizes.map((size, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={size}
                          onChange={(e) => updateSize(index, e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-50 rounded-lg focus:ring-1 focus:ring-[#a69059] focus:bg-white"
                          placeholder="e.g., 7 or S"
                          list="size-options"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newSizes = [...newProduct.sizes];
                              newSizes.splice(index, 1);
                              setNewProduct({ ...newProduct, sizes: newSizes });
                            }}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <datalist id="size-options">
                    {jewelrySizes.map((size) => (
                      <option key={size} value={size} />
                    ))}
                  </datalist>
                </div>

                {/* Ratings & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Rating
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={newProduct.rating}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, rating: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                      placeholder="4.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Reviews Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newProduct.reviewsCount}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          reviewsCount: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#a69059] focus:bg-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProduct.isFeatured}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="h-5 w-5 text-[#a69059] rounded focus:ring-[#a69059]"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Mark as featured product (shown on homepage)
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || newProduct.image.length === 0}
                    className={`flex-1 py-3 rounded-xl transition-colors shadow-sm ${
                      uploading || newProduct.image.length === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#a69059] text-white hover:bg-[#a69059]/90"
                    }`}
                  >
                    {uploading ? "Uploading..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#a69059]/10 flex items-center justify-center">
              <Package className="text-[#a69059]" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No jewelry products yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Start building your luxury collection by adding exquisite jewelry
              pieces
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-[#a69059] text-white px-5 py-3 rounded-xl hover:bg-[#a69059]/90 shadow-sm"
            >
              <Plus size={20} />
              Add First Product
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductPage;
