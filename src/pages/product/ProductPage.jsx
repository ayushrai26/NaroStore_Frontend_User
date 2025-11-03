import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaRupeeSign, FaUndoAlt, FaTruck, FaStar } from "react-icons/fa";
import { MdOutlineLocalAtm, MdVerified } from "react-icons/md";
import TokenContext from '../../ContextAPI/token/createContext';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import cartContext from '../../ContextAPI/cart/createContext';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [productPrice, setProductPrice] = useState();

  const { register, handleSubmit, reset } = useForm();
  const { addToCart } = useContext(cartContext);
  const { isAuthenticated } = useContext(TokenContext);
  const [isSubmit,setIsSubmit] = useState(false)
  const navigate = useNavigate();
 console.log(productId,'p')
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`https://narostore-backend.onrender.com/products/fetch-product/${productId}`);
        const data = await response.json();
        setProduct(data.product);
        setProductPrice(data.product.price);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch('https://narostore-backend.onrender.com/products/fetch-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        setReviews(data.existProductReview?.reviews || []);
        console.log(data.existProductReview,'re')
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleProduct();
    fetchReviews();
  }, [productId,isSubmit]);

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === 'increase' && prev < 20) return prev + 1;
      if (type === 'decrease' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast("Login to proceed!", { icon: "⚠️" });
      return;
    }
    if (!selectedSize) {
      toast("Select size first!", { icon: "⚠️" });
      return;
    }
    const shopProduct = { name: product.name, quantity, price: productPrice, size: selectedSize };
    navigate('/checkout', { state: { source: 'shop', shopProduct } });
  };

  const formSubmit = async (formdata) => {
    try {
      const res = await fetch('https://narostore-backend.onrender.com/products/submit-review', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, formdata }),
      });
      if (res.ok) {
        toast.success('Review submitted');
        reset({ author: '', comment: '', rating: 5 });
        setIsSubmit(prev=>!prev)
      } else toast.error('Error submitting review');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-24">
    
      <div className="flex flex-col md:flex-row gap-10">
        
      
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.images}
            alt={product.name}
            className="w-full rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

      
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {product.description}
          </p>

        
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">{'★'.repeat(4)}{'☆'}</div>
            <span className="text-sm text-gray-500">{reviews.length} Reviews</span>
          </div>

        
          <div className="text-3xl font-semibold text-amber-500 flex items-center">
            <FaRupeeSign /> {product.price}
          </div>

        
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-50">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-5 py-2 border rounded-lg font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

      
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-50">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="w-10 h-10 border rounded-full text-lg font-bold hover:bg-gray-100 dark:text-gray-50"
              >
                −
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="w-10 h-10 border rounded-full text-lg font-bold hover:bg-gray-100 dark:text-gray-50"
              >
                +
              </button>
            </div>
          </div>

      
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart({ productId, quantity, size: selectedSize, price: product.price })}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <button
              className="bg-amber-500 text-black px-6 py-3 rounded-full hover:bg-amber-400 transition font-semibold"
              onClick={handleCheckout}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

    
      <div className="mt-14 border-t border-gray-300 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-gray-700 dark:text-gray-200">
        <div>
          <FaUndoAlt className="text-amber-500 text-2xl mb-2 mx-auto" />
          <p className="font-medium">10-Day Easy Returns</p>
        </div>
        <div>
          <MdOutlineLocalAtm className="text-amber-500 text-2xl mb-2 mx-auto" />
          <p className="font-medium">Secure Online Payment</p>
        </div>
        <div>
          <FaTruck className="text-amber-500 text-2xl mb-2 mx-auto" />
          <p className="font-medium">Free Fast Delivery</p>
        </div>
        <div>
          <MdVerified className="text-amber-500 text-2xl mb-2 mx-auto" />
          <p className="font-medium">NaroStore Quality Assured</p>
        </div>
      </div>

      
    
<div className="mt-20">
  <div className="flex flex-col items-center justify-center text-center mb-8">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
      What Our Customers Say
    </h2>
    <p className="text-gray-600 max-w-xl">
      Hear directly from people who’ve experienced Naro Store’s quality and style.  
      Your voice helps us improve and inspire others!
    </p>
  </div>

  
  <form
    onSubmit={handleSubmit(formSubmit)}
    className="bg-linear-to-br from-white to-gray-50 border border-gray-200 shadow-md rounded-2xl p-6 md:p-8 w-full max-w-2xl mx-auto space-y-6 transition-transform hover:shadow-lg"
  >
    <div className="flex items-center gap-4 border-b pb-4 mb-2">
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        alt="user avatar"
        className="w-12 h-12 rounded-full border border-gray-300"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Write a Review</h2>
        <p className="text-sm text-gray-500">Share your thoughts about this product</p>
      </div>
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Your Name</label>
      <input
        type="text"
        {...register('author', { required: 'Name is required' })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Rating</label>
      <select
        {...register('rating', { required: 'Rating is required' })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {"⭐".repeat(star)} ({star} Star{star > 1 ? "s" : ""})
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Your Review</label>
      <textarea
        {...register('comment', { required: 'Comment is required' })}
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Tell us what you liked or disliked..."
      ></textarea>
    </div>

    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={() => reset({ author: '', comment: '', rating: 5 })}
        className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
      >
        Submit Review
      </button>
    </div>
  </form>

  
  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {reviews.length === 0 ? (
      <div className="col-span-full text-center text-gray-500 text-lg">
        No reviews yet. Be the first to share your experience! 🖋️
      </div>
    ) : (
      reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/150?img=${index + 10}`}
                alt="User avatar"
                className="w-10 h-10 rounded-full border"
              />
              <h3 className="font-semibold text-gray-800">{review.author}</h3>
            </div>
            <div className="flex text-yellow-400 text-lg">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < review.rating ? '★' : '☆'}</span>
              ))}
            </div>
          </div>

          <p className="text-gray-600 italic mb-3">“{review.comment}”</p>

          <p className="text-sm text-gray-400 text-right">
            — Verified Buyer <MdVerified className="inline text-blue-500 ml-1" />
          </p>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default ProductPage;
