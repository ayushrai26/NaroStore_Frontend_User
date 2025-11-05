import React, { useContext } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../ContextAPI/token/createContext";
import cartContext from "../ContextAPI/cart/createContext";
const API_URL = import.meta.env.VITE_API_URL;
const Cart = () => {
  const { isAuthenticated } = useContext(TokenContext);
  const { cartItems, handleDelete,  totalPrice,updateCart, } = useContext(cartContext);
  const navigate = useNavigate();

  const shippingCharge = cartItems.length > 0 ? 99 : 0;

  const handleIncrease = (id, size) => {
    
    updateCart({productId:id,size,type:'increase'})

};

const handleDecrease = (id, size) => {
  updateCart({productId:id,size,type:'decrease'})
};


  const handleCheckout = () => {
    const product = { cartItems };
    navigate("/checkout", { state: { source: "cart", product } });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12 flex flex-col items-center mt-22">
      <div className="flex items-center gap-3 mb-10">
        <ShoppingBag size={32} className="text-purple-600" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Your Shopping Cart
        </h1>
      </div>

      {isAuthenticated ? (
        <>
          {cartItems.length === 0 ? (
            <div className="text-center space-y-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
                className="w-40 mx-auto opacity-80"
              />
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Your cart is empty 🛒
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Looks like you haven’t added anything yet.
              </p>
              <Link
                to="/collection"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
              
              <div className="flex-1 bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId.images}
                        alt="product"
                        className="h-24 w-24 rounded-xl object-cover shadow-md"
                      />
                      <div>
                        <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                          {item.productId.name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-300">
                          ₹{item.productId.price.toLocaleString()}
                        </p>

                      
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium dark:text-gray-100">
                              Qty:
                            </span>
                           <button
  onClick={() => handleDecrease(item.productId._id, item.size)}
  className="px-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500"
>
  −
</button>

<span className="font-semibold dark:text-gray-100">
  {item.quantity}
</span>

<button
  onClick={() => handleIncrease(item.productId._id, item.size)}
  className="px-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500"
>
  +
</button>

                          </div>

                          <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-600 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium dark:text-gray-100">
                              Size:
                            </span>
                            <span className="font-semibold dark:text-gray-100">
                              {item.size}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                      <p className="font-medium text-purple-600 dark:text-purple-400">
                        ₹{(item.productId.price * item.quantity).toLocaleString()}
                      </p>
                      <Trash2
                        size={22}
                        className="text-red-500 hover:text-red-600 cursor-pointer transition"
                        onClick={() =>
                          handleDelete(item.productId._id, item.size)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

            
              <div className="w-full lg:w-1/3 bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 h-fit">
                <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
                  Order Summary
                </h2>
                <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                  <span>Shipping</span>
                  <span>₹{shippingCharge}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 dark:text-gray-100">
                  <span>Total</span>
                  <span>₹{(totalPrice + shippingCharge).toLocaleString()}</span>
                </div>

                <button
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl shadow-md transition-all"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-3xl text-amber-600">
              <VscAccount />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Login to view your cart
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Please login to see your saved items and cart details.
            </p>
            <Link
              to="/login"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
