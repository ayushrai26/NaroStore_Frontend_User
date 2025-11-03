import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {toast} from 'react-hot-toast'
import TokenContext from "../../ContextAPI/token/createContext";
const DeliveryAddress = () => {
        
  const location = useLocation();          
  const {register,handleSubmit,reset} = useForm()
  
  const state = location.state || {};
  const {source} = state;
  console.log(state,source)

  const shipping = 99;
  const price =
    source === "shop"
      ? state.shopProduct?.price || 0
      : source === "cart"
      ? state.product.cartItems?.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        )
      : source === "customize"
      ? state.customizedProduct?.totalPrice || 0
      : 0;
  const quantity =
    source === "shop"
      ? state.shopProduct?.quantity || 1
      : source === "customize"
      ? state.customizedProduct?.quantity || 1
      : 1;

  const subTotal = source==="customize"? price:(price*quantity);
  const total = subTotal + shipping

  const productData =
    source === "shop"
      ? [state.shopProduct]
      : source === "cart"
      ? state.product.cartItems
      : source === "customize"
      ? [state.customizedProduct]
      : [];
      

      const handleCheckout = async(formdata)=>{
    try{
    
    const response = await fetch('https://narostore-backend.onrender.com/payment/create-checkout-session', {
      method: 'POST',
      credentials:'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: productData,formdata,total})
    });
    const data = await response.json()
    console.log(data,'data')
    if(data.url){
      console.log(data.session,'sessionurl')
      window.location.href = data.url;
    }else{
      toast.error("Failed to create payment session");
    }
  }catch(err){
    console.log(err)
  }

  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center px-4 py-10 transition-colors duration-300 mt-20">
      <h1 className="text-3xl font-bold mb-8">Delivery Address</h1>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        
        <div className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3">
            Shipping Details
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit(handleCheckout)}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
                {...register("Name",{required:'Name is Required'})}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
                {...register("PhoneNumber",{required:'Mobile No. is Required'})}
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
              {...register("email",{required:'email is Required'})}
            />

            <textarea
              placeholder="Full Address (House No, Street, Area)"
              rows="3"
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none resize-none"
             {...register("Address",{required:'Address is Required'})}
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
               {...register("city",{required:'city is Required'})}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
                {...register("state",{required:'state is Required'})}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Pincode"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
               {...register("pincode",{required:'pincode is Required'})}
              />
              <select className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 ring-purple-500 outline-none"
              {...register("Country",{required:'country is Required'})}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
              
            >
              Continue to Payment
            </button>
          </form>
        </div>

        
        <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
            Order Summary
          </h2>

          <div className="space-y-4">
            {source ==='shop'&&(<>
            <div
              
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
            >
              <div>
                <p className="font-medium">{state.shopProduct?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {quantity || 1}
                </p>
              </div>
              <p className="font-semibold text-purple-600">
                ₹{(price * (quantity || 1)).toLocaleString()}
              </p>
            </div>
            </>)}
            {source === "cart" &&
              state.product.cartItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
                >
                  <div>
                    <p className="font-medium">{item.productId.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-purple-600">
                    ₹{(item.productId.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            {source ==='customize'&&(<>
            <div
              
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
            >
              <div>
                <p className="font-medium">{state.customizedProduct?.name || state.customizedProduct.type || "Customized Product"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {quantity || 1}
                </p>
              </div>
              <p className="font-semibold text-purple-600">
                ₹{(price).toLocaleString()}
              </p>
            </div>
            </>)}
            

            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>₹{subTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-3">
              <span>Total Amount Payable</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
