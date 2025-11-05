import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { useState,useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
function HomePage() {
  
  const [products,setProducts] = useState([])
  const navigate = useNavigate()
  const fetchProduct = async()=>{
    try{
     const response = await fetch(`${API_URL}/products/fetch-product-homePage`)
     const data = await response.json()
     console.log(data,'data')
      if(response.ok){
        setProducts(data.allProducts)
      }else{
        setProducts([])
      }
    }catch(err){
    console.log(err)
    }
  }
  useEffect(()=>{
   fetchProduct()
  },[])

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      
      
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="text-amber-600">Express</span> Your{" "}
            <span className="underline decoration-amber-500 decoration-4">
              Gen-Z Style
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
            Trendy, bold, and unapologetically you — create your own vibe with{" "}
            <span className="text-amber-600 font-semibold">NaroStore</span>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/collection"
              className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/customize"
              className="px-8 py-3 border border-black dark:border-gray-300 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Customize Yours
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center mt-10"
        >
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/21544685/pexels-photo-21544685.jpeg"
              alt="Fashion Hero"
              className="rounded-3xl shadow-2xl border-8 border-white dark:border-gray-800 w-[420px] h-auto object-cover"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-5 -right-5 bg-amber-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg"
            >
              <Sparkles className="inline w-4 h-4 mr-1" /> 100% Trendy
            </motion.div>
          </div>
        </motion.div>
      </section>

    
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          🔥 New & Trending
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                title="Click for more details"
                onClick={()=>navigate('/collection')}
              />
              <div className="p-5 flex flex-col items-start">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-amber-600 font-semibold mt-2 flex items-center justify-center">
                <span>Under -</span> <FaRupeeSign /> <span>{product.price}</span>
                </p>
                
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    
      <section className="py-16 px-6 md:px-20 bg-amber-50 dark:bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          ✨ From Our Fashion Journal
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "The Rise of Street Culture 🧢",
              desc: "From alleys to runways — see how streetwear became the voice of the youth.",
              img: "https://static.fibre2fashion.com//articleresources/images/102/10134/ss762dd4_Small.jpg",
            },
            {
              title: "Colors That Speak Volumes 🌈",
              desc: "Bright, bold, unapologetic — discover how color defines individuality.",
              img: "https://images.pexels.com/photos/4066298/pexels-photo-4066298.jpeg",
            },
            {
              title: "Minimalism Reloaded 🖤",
              desc: "Clean fits. Sharp silhouettes. Elegance meets edge.",
              img: "https://images.pexels.com/photos/8454345/pexels-photo-8454345.jpeg",
            },
          ].map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <img src={blog.img} alt={blog.title} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {blog.desc}
                </p>
                <Link
                  to="/blog"
                  className="text-amber-600 dark:text-amber-400 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    
      <section className="py-20 px-6 md:px-20 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-10">💬 What People Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Riya Sharma",
              feedback:
                "Absolutely love the designs! The quality and the vibes are unmatched 🔥",
            },
            {
              name: "Arjun Mehta",
              feedback:
                "Feels premium, looks stylish — my go-to brand for everything Gen-Z.",
            },
            {
              name: "Sneha Patel",
              feedback:
                "Customization was so easy and fun! Got my hoodie just the way I wanted 💫",
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <p className="text-lg italic mb-4">“{review.feedback}”</p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-amber-400 w-4 h-4" />
                ))}
              </div>
              <h4 className="font-semibold">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

    
      <section className="py-16 bg-amber-500 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Redefine Your Wardrobe?
        </h2>
        <p className="text-lg mb-6">
          Create, customize, and conquer the street with your own style.
        </p>
        <Link
          to="/collection"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
