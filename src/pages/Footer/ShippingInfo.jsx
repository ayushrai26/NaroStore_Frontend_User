import React from "react";

const ShippingInfo = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 mt-22">
      <h1 className="text-4xl font-bold mb-8 text-center">🚚 Shipping Information</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        <p>
          We ship all orders within 2-5 business days. Standard shipping costs ₹99. Expedited shipping is available at checkout.
        </p>
        <p>
          International shipping may take 7-15 business days depending on the destination. Customs charges, if any, are the responsibility of the customer.
        </p>
        <p>
          You will receive a tracking number via email once your order has been shipped.
        </p>
      </div>
    </div>
  );
};

export default ShippingInfo;
