import React from 'react';
import { useState,useEffect } from 'react';
import DisplayProducts from '../../components/DisplayProduct';

function Collection() {
  const [searchQuery,setSearchQuery] = useState('')
  const [category,setCategory] = useState('all')
  const [priceRange,setPriceRange] = useState('all')
  const [filterProducts,setFilterProducts] = useState([])

  useEffect(() => {
  const fetchFiltered = async () => {
    try {
      const res = await fetch("https://narostore-backend.onrender.com/products/filter-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery, category, priceRange }),
      });
      const data = await res.json();
      console.log(data,'data')
      setFilterProducts(data.existProduct || []);
    } catch (err) {
      console.log(err);
    }
  };
  fetchFiltered();
}, [searchQuery, category, priceRange]);


  return (
    <div className="flex flex-col items-center mt-22 px-4 md:px-20 dark:bg-gray-900 p-6">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2 dark:text-gray-50">Our Collection</h1>
      <p className="text-lg text-gray-600 mb-6 dark:text-gray-50">Discover unique GenZ designs</p>

      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center">
        
        <input
          type="search"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black w-full md:w-1/3 dark:text-gray-50"
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
        />

        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black w-full md:w-1/4 dark:text-gray-50"
          id="category-filter"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="tshirts">T-Shirts</option>
          <option value="shorts">Shorts</option>
          <option value="caps">Caps</option>
          <option value="socks">Socks</option>
        </select>

       
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black w-full md:w-1/4 dark:text-gray-50"
          id="price-filter"
          value={priceRange}
          onChange={(e)=>setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-499">Rs. 99 - Rs. 499</option>
          <option value="500-749">Rs. 500 - Rs. 749</option>
          <option value="750-999">Rs. 750 - Rs. 999</option>
          <option value="1000-1499">Rs. 1000 - Rs. 1499</option>
          <option value="1500-1999">Rs. 1500 - Rs. 1999</option>
          <option value="2000-above">Rs. 2000 - Rs. 99999</option>
        </select>
      </div>
      <div>
        <DisplayProducts searchQuery={searchQuery} category={category} priceRange={priceRange} filterProducts={filterProducts}/>
      </div>
    </div>
  );
}

export default Collection;
