import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 2-5 business days. International shipping may take 7-15 days."
    },
    {
      question: "Can I return an item?",
      answer: "Yes! Returns are accepted within 10 days of delivery for most items."
    },
    {
      question: "Do you offer cash on delivery?",
      answer: "Yes, COD is available for selected locations in India."
    },
    {
      question: "How can I track my order?",
      answer: "You will receive a tracking number via email once your order has been shipped."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 mt-22">
      <h1 className="text-4xl font-bold mb-8 text-center">❓ Frequently Asked Questions</h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-xl p-4">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
