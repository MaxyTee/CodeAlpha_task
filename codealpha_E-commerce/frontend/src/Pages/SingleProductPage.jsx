import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Plus,
  Minus,
  Share2,
  Package,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../Store/ProductStore";

const SingleProductPage = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { getSingleProduct } = useProductStore();
  const [product, setProduct] = useState(null);
  //   console.log(slug, product);
  const [loading, setLoading] = useState(true);
  //   console.log(_);

  useEffect(() => {
    console.log("Fetching product for slug:", slug);
    const fetchSingleProduct = async () => {
      setLoading(true);
      try {
        const response = await getSingleProduct(slug);
        if (response.success) {
          setProduct(response.product);
          console.log(response);
        }
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [slug, getSingleProduct]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={24} />
      </div>
    );
  }

  //   Sample product data matching your schema
  //   const product = {
  //     name: "MacBook Pro 16 M2",
  //     description:
  //       "Apple premium laptop powered by M2 chip with improved GPU, liquid retina display. Features 16-core Neural Engine, up to 64GB unified memory, and up to 8TB SSD storage. Perfect for professionals, creators, and developers.",
  //     image: [
  //       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80",
  //       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop&q=80",
  //       "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=80",
  //       "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&auto=format&fit=crop&q=80",
  //     ],
  //     price: 2400,
  //     category: "Laptops",
  //     oldPrice: 2600,
  //     rating: 4.7,
  //     reviewsCount: 520,
  //     slug: "macbook-pro-16-m2",
  //     sizes: ["16GB/512GB", "32GB/1TB", "64GB/2TB", "128GB/4TB"],
  //     stock: 10,
  //     isFeatured: true,
  //     specifications: {
  //       display: "16.2-inch Liquid Retina XDR",
  //       processor: "Apple M2 Pro or M2 Max",
  //       memory: "Up to 96GB unified memory",
  //       storage: "Up to 8TB SSD",
  //       battery: "Up to 22 hours",
  //       weight: "4.7 pounds (2.1 kg)",
  //     },
  //   };

  const relatedProducts = [
    {
      id: 1,
      name: "MacBook Air M2",
      price: 1199,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=60",
      rating: 4.6,
    },
    {
      id: 2,
      name: "iPad Pro M2",
      price: 1099,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=60",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Mac Mini M2 Pro",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=60",
      rating: 4.5,
    },
  ];

  const discountPercentage = product?.oldPrice
    ? Math.round(
        ((product?.oldPrice - product.price) / product?.oldPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a configuration");
      return;
    }
    console.log("Added to cart:", {
      product: product?.name,
      size: selectedSize,
      quantity,
      price: product.price,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a configuration");
      return;
    }
    console.log("Buy now:", {
      product: product.name,
      size: selectedSize,
      quantity,
      price: product.price,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/10 to-white">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-600">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4 mx-2" />
            <Link to="/products" className="hover:text-amber-600">
              Products
            </Link>
            <ChevronLeft className="w-4 h-4 mx-2" />
            <Link to="/products/laptops" className="hover:text-amber-600">
              {product?.category}
            </Link>
            <ChevronLeft className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">{product?.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={product?.image[selectedImage]}
                  alt={product?.name}
                  className="w-full h-[500px] object-contain p-8"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product?.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-amber-400 shadow-md"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product?.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Status */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-3">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full font-medium">
                  {product?.category}
                </span>
                {product?.isFeatured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm rounded-full font-medium">
                    Featured
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                    Save {discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product?.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product?.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product?.rating} ({product?.reviewsCount} reviews)
              </span>
              {product?.stock > 0 && (
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  In Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-amber-700">
                  ${product.price.toLocaleString()}
                </span>
                {product?.oldPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product?.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-green-600 font-medium">
                  You save $
                  {(product?.oldPrice - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Key Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* {Object.entries(product?.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))} */}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Select Configuration
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 rounded-lg border-2 text-center transition-all ${
                      selectedSize === size
                        ? "border-amber-400 bg-amber-50 text-amber-700 font-medium"
                        : "border-gray-300 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {product.stock} units available
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 border-2 border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 font-medium"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-red-600" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Truck className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">
                  Free Shipping
                </div>
                <div className="text-xs text-gray-600">Over $50</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <RefreshCw className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">
                  30-Day Returns
                </div>
                <div className="text-xs text-gray-600">Easy returns</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Shield className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">
                  2-Year Warranty
                </div>
                <div className="text-xs text-gray-600">Full coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Related Products
            </h2>
            <Link
              to="/products"
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-100">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-amber-700">
                      {related.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-700">
                        ${related.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-gray-600">
                          {related.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
