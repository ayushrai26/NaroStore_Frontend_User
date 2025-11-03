import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-700 to-black text-gray-300 py-14 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

    
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-3 tracking-wide">NARO</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fashion for the fearless. <br />
            Wear your attitude, own your vibe.
          </p>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link to="/collection" className="hover:text-amber-400 transition-colors">Shop</Link></li>
            <li><Link to="/customize" className="hover:text-amber-400 transition-colors">Customize</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
          </ul>
        </div>

      
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            <li>< Link to="/shipping" className="hover:text-amber-400 transition-colors">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:text-amber-400 transition-colors">Returns</Link></li>
            <li><Link to="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-amber-400 transition-transform transform hover:scale-110"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-amber-400 transition-transform transform hover:scale-110"><FaTwitter /></a>
            <a href="#" aria-label="Facebook" className="hover:text-amber-400 transition-transform transform hover:scale-110"><FaFacebookF /></a>
            <a href="#" aria-label="Tiktok" className="hover:text-amber-400 transition-transform transform hover:scale-110"><FaTiktok /></a>
          </div>

        
          <div className="mt-6">
            <p className="text-sm mb-2 text-gray-400">Join our style circle 🖤</p>
            <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-200 w-full"
              />
              <button className="bg-amber-500 text-black px-4 py-2 font-semibold text-sm hover:bg-amber-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

    
      <div className="pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">NARO Store</span>. All rights reserved.
        <br />
        <span className="text-gray-600 text-xs">Designed with ❤️ for GenZ Fashion.</span>
      </div>
    </footer>
  );
}

export default Footer;
