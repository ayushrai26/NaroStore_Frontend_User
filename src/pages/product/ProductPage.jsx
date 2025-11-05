import { useContext, useEffect, useState } from 'react';
import {  useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FaRupeeSign} from "react-icons/fa";
import TokenContext from '../../ContextAPI/token/createContext';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import cartContext from '../../ContextAPI/cart/createContext';

const API_URL = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [productPrice, setProductPrice] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { addToCart } = useContext(cartContext);
  const { isAuthenticated } = useContext(TokenContext);
  const navigate = useNavigate();

  
  const urlSize = searchParams.get("size") || "";
  const urlQuantity = parseInt(searchParams.get("qty")) || 1;

  const [selectedSize, setSelectedSize] = useState(urlSize);
  const [quantity, setQuantity] = useState(urlQuantity);

  
  useEffect(() => {
    const params = {};
    if (selectedSize) params.size = selectedSize;
    if (quantity > 1) params.qty = quantity;
    setSearchParams(params);
  }, [selectedSize, quantity, setSearchParams]);

  
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/fetch-product/${productId}`);
        const data = await response.json();
        setProduct(data.product);
        setProductPrice(data.product.price);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/products/fetch-reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        setReviews(data.existProductReview?.reviews || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleProduct();
    fetchReviews();
  }, [productId, isSubmit]);

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === 'increase' && prev < 20) return prev + 1;
      if (type === 'decrease' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) return toast("Login to proceed!", { icon: "⚠️" });
    if (!selectedSize) return toast("Select size first!", { icon: "⚠️" });

    const shopProduct = { name: product.name, quantity, price: productPrice, size: selectedSize };
    navigate('/checkout', { state: { source: 'shop', shopProduct } });
  };

  const formSubmit = async (formdata) => {
    try {
      const res = await fetch(`${API_URL}/products/submit-review`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, formdata }),
      });
      if (res.ok) {
        toast.success('Review submitted');
        reset({ author: '', comment: '', rating: 5 });
        setIsSubmit(prev => !prev);
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
          <p className="text-gray-600 dark:text-gray-300 text-lg">{product.description}</p>

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
    </div>
  );
};

export default ProductPage;
