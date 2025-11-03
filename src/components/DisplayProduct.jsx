import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DisplayProduct({ searchQuery, category, priceRange, filterProducts }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://narostore-backend.onrender.com/products/fetch-all-products");
        const data = await response.json();
        console.log(data, "data");
        setProducts(data.allProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchProducts();
  }, []);


  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
      <Skeleton height={200} className="rounded-xl" />
      <div className="mt-4 space-y-2">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
        <Skeleton height={30} width="40%" />
      </div>
    </div>
  );

  
  if (isLoading) {
    return (
      <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  
  return (
    <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {searchQuery || category !== "all" || priceRange !== "all" ? (
        filterProducts && filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )
      ) : (
        products.map((product) => <ProductCard product={product} key={product._id} />)
      )}
    </div>
  );
}

export default DisplayProduct;
