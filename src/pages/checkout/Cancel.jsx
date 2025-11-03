import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-900 px-6">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Cancelled</h1>
      <p className="text-lg mb-6">Your payment was not completed. You can try again.</p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Cancel;
