import { Link } from "react-router-dom";
import { FaStar, FaShoppingBag } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import TokenContext from "../ContextAPI/token/createContext";
import cartContext from "../ContextAPI/cart/createContext";
import { toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(cartContext);
  const { isAuthenticated } = useContext(TokenContext);
  const [productReviewLength, setProductReviewLength] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!product?._id) return;
        const res = await fetch(
          `${API_URL}/products/fetch-reviews`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: product._id }),
          }
        );
        const data = await res.json();
        setProductReviewLength(
          data.existProductReview?.reviews?.length || "No Reviews"
        );
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [product]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase" && prev < 20) return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select a size first!");
    if (!isAuthenticated) return toast.error("Please log in first!");
    addToCart({
      productId: product._id,
      quantity,
      size: selectedSize,
      price: product.price,
    });
    
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      key={product._id}
    >
      {/* Badge Section */}
      {product.isNew && (
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          NEW
        </span>
      )}
      {product.discount && (
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {product.discount}% OFF
        </span>
      )}

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`${
                i < Math.floor(product.rating || 4)
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
          <span className="ml-1 text-gray-500 dark:text-gray-400 text-sm">
            ({productReviewLength})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            ₹{product.price}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </p>
          )}
        </div>

        {/* Size Dropdown */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">Select Size</option>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="w-7 h-7 flex items-center justify-center text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              −
            </button>
            <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="w-7 h-7 flex items-center justify-center text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              selectedSize
                ? "bg-black text-white hover:bg-gray-900 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaShoppingBag /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
