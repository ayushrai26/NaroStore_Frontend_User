import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-green-900 px-6">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase. Your order is confirmed.</p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
