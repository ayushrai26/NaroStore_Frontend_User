import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState, useContext } from "react";
import TokenContext from "../ContextAPI/token/createContext";
import cartContext from "../ContextAPI/cart/createContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(cartContext);
  const { isAuthenticated } = useContext(TokenContext);
  const [productReviewLength,setProductReviewLength] = useState(null)

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase" && prev < 20) return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart!");
      return;
    }

    addToCart({
      productId: product._id,
      quantity,
      size: selectedSize,
      price: product.price,
    });
    toast.success(`${product.name} added to cart 🛍️`);
  };
 useEffect(() => {
  const fetchReviews = async () => {
    try {
      if (!product?._id) return;

      const res = await fetch("https://narostore-backend.onrender.com/products/fetch-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();
      console.log("Review data:", data);
      setProductReviewLength(data.existProductReview.reviews.length ||'No Reviews')
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  fetchReviews();
}, [product]);


  return (
    <div
      className="relative bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer duration-300"
      key={product._id}
    >
    
      {product.isNew && (
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          NEW
        </span>
      )}
      {product.discount && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {product.discount}% OFF
        </span>
      )}

      
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={product.images?.[0]}
            alt={product.name}
            title="Click for details"
            className="w-full h-72 object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>

      
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {product.name}
        </h3>

      
        <div className="flex items-center text-yellow-400 text-sm">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`${
                i < Math.floor(product.rating || 4)
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-500"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
            ({productReviewLength || 'No Reviews'})
          </span>
        </div>

      
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ₹{product.price}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </p>
          )}
        </div>

        
        <div>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Select Size</option>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

      
        <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
          <span className="text-gray-700 font-medium dark:text-gray-100">
            Quantity:
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="w-8 h-8 flex items-center justify-center text-lg font-bold border rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              −
            </button>
            <span className="text-lg font-semibold w-6 text-center dark:text-gray-50">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="w-8 h-8 flex items-center justify-center text-lg font-bold border rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              +
            </button>
          </div>
        </div>

      
        <button
          className={`w-full py-2 rounded-full font-semibold transition ${
            selectedSize
              ? "bg-black text-white hover:bg-gray-900 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-black"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!selectedSize}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
