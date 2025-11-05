import React, { useState } from "react";
import { FaUpload, FaRupeeSign } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
function Customize() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedSize, setSelectedSize] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [quantity, setQuantity] = useState(1);

  const basePrice = {
    tshirt: 499,
    hoodie: 799,
    sweatshirt: 699,
  };

  let extraPrice = 0;
  if (selectedSize === "XL" || selectedSize === "XXL") extraPrice += 50;
  if (uploadedImage) extraPrice += 100;
  if (customText) extraPrice += 50;
  const totalPrice = (basePrice[selectedType] + extraPrice) * quantity || 0;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedImage(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase") return Math.min(prev + 1, 20);
      if (type === "decrease") return Math.max(prev - 1, 1);
      return prev;
    });
  };

  const handleSubmit = () => {
    if (!selectedSize || !selectedType) {
      alert("⚠️ Please select type & size to continue!");
    } else {
      alert(`✅ Customization confirmed! Total: ₹${totalPrice}`);
    }
  };

  
  const ClothingSVG = () => {
  if (selectedType === "tshirt") {
    return (
      <svg viewBox="0 0 200 240" className="w-full h-full">
        <defs>
          {/* Main shirt gradient */}
          <linearGradient id="shirtGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={selectedColor} stopOpacity="0.95" />
            <stop offset="60%" stopColor={selectedColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.2" />
          </linearGradient>
          {/* Highlight */}
          <radialGradient id="shirtHighlight" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
            <stop offset="100%" stopColor={selectedColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shirt Body */}
        <path
          d="M60 45 Q50 40, 38 45 L28 75 Q25 80, 28 85 L28 205 Q28 225, 48 225 L152 225 Q172 225, 172 205 L172 85 Q175 80, 172 75 L162 45 Q150 40, 140 45 L130 55 Q120 65, 100 65 Q80 65, 70 55 Z"
          fill="url(#shirtGradient)"
          stroke="#333"
          strokeWidth="1.5"
        />

        {/* Sleeves */}
        <path
          d="M40 45 Q20 55, 15 75 L20 115 Q25 120, 38 110 Z"
          fill="url(#shirtGradient)"
          stroke="#333"
          strokeWidth="1.5"
        />
        <path
          d="M160 45 Q180 55, 185 75 L180 115 Q175 120, 162 110 Z"
          fill="url(#shirtGradient)"
          stroke="#333"
          strokeWidth="1.5"
        />

        {/* Neck Opening */}
        <ellipse
          cx="100"
          cy="55"
          rx="16"
          ry="9"
          fill="#f5f5f5"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Subtle highlight overlay */}
        <path
          d="M60 70 Q100 80, 140 70 Q150 130, 140 190 Q100 200, 60 190 Q50 130, 60 70 Z"
          fill="url(#shirtHighlight)"
          opacity="0.5"
        />

        {/* Bottom Hem Line */}
        <line
          x1="45"
          y1="215"
          x2="155"
          y2="215"
          stroke="#000"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </svg>
    );
  } else if (selectedType === "hoodie") {
    return (
      <svg viewBox="0 0 200 260" className="w-full h-full">
        <defs>
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={selectedColor} stopOpacity="0.9" />
            <stop offset="80%" stopColor={selectedColor} stopOpacity="1" />
          </linearGradient>
          <radialGradient id="hoodieHighlight" cx="50%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
            <stop offset="100%" stopColor={selectedColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hoodie Body */}
        <path
          d="M55 60 Q45 50, 35 55 L25 85 Q23 90, 25 95 L25 220 Q25 240, 45 240 L155 240 Q175 240, 175 220 L175 95 Q177 90, 175 85 L165 55 Q155 50, 145 55 L135 65 Q125 75, 100 75 Q75 75, 65 65 Z"
          fill="url(#hoodieGrad)"
          stroke="#222"
          strokeWidth="1.5"
        />

        {/* Hood */}
        <path
          d="M70 35 Q100 10, 130 35 Q135 45, 130 55 L120 60 Q110 63, 100 63 Q90 63, 80 60 L70 55 Q65 45, 70 35 Z"
          fill="url(#hoodieGrad)"
          stroke="#222"
          strokeWidth="1.5"
        />

        {/* Drawstrings */}
        <line x1="87" y1="65" x2="87" y2="90" stroke="#444" strokeWidth="2" />
        <line x1="113" y1="65" x2="113" y2="90" stroke="#444" strokeWidth="2" />
        <circle cx="87" cy="90" r="2.5" fill="#555" />
        <circle cx="113" cy="90" r="2.5" fill="#555" />

        {/* Pocket */}
        <rect
          x="70"
          y="145"
          width="60"
          height="35"
          rx="8"
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />

        {/* Highlight overlay */}
        <path
          d="M55 90 Q100 80, 145 90 Q150 150, 145 200 Q100 210, 55 200 Q50 150, 55 90 Z"
          fill="url(#hoodieHighlight)"
          opacity="0.4"
        />
      </svg>
    );
  } else if (selectedType === "sweatshirt") {
    return (
      <svg viewBox="0 0 200 250" className="w-full h-full">
        <defs>
          <linearGradient id="sweatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={selectedColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={selectedColor} stopOpacity="1" />
          </linearGradient>
          <radialGradient id="sweatHighlight" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
            <stop offset="100%" stopColor={selectedColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Body */}
        <path
          d="M58 45 Q48 40, 38 45 L28 75 Q26 80, 28 85 L28 210 Q28 230, 48 230 L152 230 Q172 230, 172 210 L172 85 Q174 80, 172 75 L162 45 Q152 40, 142 45 L132 55 Q122 65, 100 65 Q78 65, 68 55 Z"
          fill="url(#sweatGrad)"
          stroke="#333"
          strokeWidth="1.5"
        />

        {/* Sleeves */}
        <path
          d="M38 45 Q20 55, 15 75 L20 120 Q25 125, 35 115 L38 75 Z"
          fill="url(#sweatGrad)"
          stroke="#333"
          strokeWidth="1.5"
        />
        <path
          d="M162 45 Q180 55, 185 75 L180 120 Q175 125, 165 115 L162 75 Z"
          fill="url(#sweatGrad)"
          stroke="#333"
          strokeWidth="1.5"
        />

        {/* Neck */}
        <ellipse
          cx="100"
          cy="55"
          rx="15"
          ry="8"
          fill="#fafafa"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Highlight */}
        <path
          d="M60 80 Q100 90, 140 80 Q150 150, 140 200 Q100 210, 60 200 Q50 150, 60 80 Z"
          fill="url(#sweatHighlight)"
          opacity="0.5"
        />
      </svg>
    );
  }

  return null;
};


  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 px-6 py-12 md:px-20 mt-22">
    
      <div className="text-center mb-14">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          Design. Create. <span className="text-amber-500">Wear Your Imagination.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Bring your ideas to life — customize hoodies, T-shirts, and sweatshirts with your colors,
          text, and artwork. Make it truly yours ✨
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 justify-center items-start max-w-7xl mx-auto">
      
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-700 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-600">
        
          <div>
            <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Choose Clothing Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 outline-none dark:bg-gray-600 dark:text-white"
            >
              <option value="">Select Type</option>
              <option value="tshirt">T-Shirt 👕</option>
              <option value="hoodie">Hoodie 🧥</option>
              <option value="sweatshirt">Sweatshirt 👚</option>
            </select>
          </div>

        
          <div>
            <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Pick Clothing Color 🎨
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-16 h-10 border rounded-lg cursor-pointer shadow-md"
              />
              <span className="text-sm text-gray-600 dark:text-gray-200 font-mono">
                {selectedColor.toUpperCase()}
              </span>
            </div>
          </div>

        
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition font-medium ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  −
                </button>
                <span className="font-semibold text-xl dark:text-gray-200 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>

        
          <div>
            <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Upload Your Design/Logo
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-lg hover:bg-amber-600 transition font-medium">
                <FaUpload /> Upload Image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <span className="text-sm text-gray-500 truncate max-w-[200px] dark:text-gray-300">
                {fileName || "No file chosen"}
              </span>
            </div>
          </div>

        
          <div>
            <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Add Custom Text 🖋️
            </label>
            <input
              type="text"
              placeholder="E.g. Your Name or Quote"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={30}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 outline-none dark:bg-gray-600 dark:text-white"
            />
          </div>

        
          {customText && (
            <div>
              <label className="block font-semibold text-gray-800 mb-2 dark:text-gray-200">
                Text Color 🎨
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10 border rounded-lg cursor-pointer shadow-md"
                />
                <span className="text-sm text-gray-600 dark:text-gray-200 font-mono">
                  {textColor.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-linear-to-r from-black via-gray-800 to-gray-900 text-white py-3.5 rounded-xl hover:shadow-xl transition text-lg font-semibold tracking-wide"
          >
            🛍️ Confirm Customization — ₹{totalPrice}
          </button>
        </div>

      
        <div className="w-full lg:w-1/2 flex flex-col items-center sticky top-24">
          <div className="relative w-full max-w-md aspect-square rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-2xl border-4 border-white dark:border-gray-600 overflow-hidden flex items-center justify-center p-8">
            {!selectedType ? (
              <div className="text-center text-gray-400 dark:text-gray-500">
                <svg className="w-32 h-32 mx-auto mb-4 opacity-30" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                <p className="text-lg font-medium">Select a clothing type to preview</p>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
              
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClothingSVG />
                </div>

              
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Design"
                    className="absolute z-10 w-24 h-24 object-contain drop-shadow-lg"
                    style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                )}

              
                {customText && (
                  <div
                    className="absolute z-10 font-bold tracking-wider text-center px-4"
                    style={{ 
                      top: uploadedImage ? '55%' : '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: textColor,
                      fontSize: customText.length > 15 ? '1rem' : '1.25rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      maxWidth: '80%',
                      wordWrap: 'break-word'
                    }}
                  >
                    {customText}
                  </div>
                )}
              </div>
            )}
          </div>

        
          <div className="mt-6 bg-white dark:bg-gray-700 shadow-xl rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold text-gray-900 text-xl mb-4 dark:text-gray-100 border-b pb-2">
              Design Summary
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-200">
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className="capitalize">{selectedType || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Color:</span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border" style={{ backgroundColor: selectedColor }}></div>
                  <span className="text-sm font-mono">{selectedColor.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Size:</span>
                <span>{selectedSize || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Design:</span>
                <span className="truncate max-w-[150px]">{fileName || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Text:</span>
                <span className="truncate max-w-[150px]">{customText || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{quantity}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">Total:</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 flex items-center">
                <FaRupeeSign className="text-xl" /> {totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customize;