import React, { useContext, useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeContext from "../ContextAPI/theme/createContext";
import TokenContext from "../ContextAPI/token/createContext";
import cartContext from "../ContextAPI/cart/createContext";
import { motion } from "framer-motion";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItems } = useContext(cartContext);
  const { isAuthenticated } = useContext(TokenContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUserDetail = async () => {
      try {
        const res = await fetch("https://narostore-backend.onrender.com/user/fetch-user-details", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUser(data.existUser);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetail();
  }, [isAuthenticated]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/collection" },
    { name: "Customize", path: "/customize" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-lg  dark:bg-gray-900/50 shadow-md fixed top-0 w-full z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
        <Link
          to="/"
          className="text-2xl font-extrabold bg-linear-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition"
        >
          ✨ Naro<span className="text-gray-800 dark:text-white">Store</span>
        </Link>

        
        <ul className="hidden md:flex space-x-8 text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-600 border-b-2 border-amber-500 pb-1 transition"
                    : "hover:text-amber-500 hover:border-b-2 border-amber-400 pb-1 transition"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        
        <div className="flex items-center gap-6">
      
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 dark:bg-gray-700 hover:scale-110 transition text-gray-800 dark:text-amber-100"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MdDarkMode className="text-xl" />
            ) : (
              <MdOutlineDarkMode className="text-xl" />
            )}
          </motion.button>

        
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              isAuthenticated ? navigate("/user-profile") : navigate("/login")
            }
            className="flex items-center gap-3 bg-white dark:bg-gray-800 px-3 py-2 rounded-full hover:shadow-lg border border-gray-200 dark:border-gray-700 transition"
          >
            {isAuthenticated ? (
              <>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="user"
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {user?.fullName?.split(" ")[0]}
                </span>
              </>
            ) : (
              <>
                <VscAccount className="text-2xl text-gray-700 dark:text-amber-50" />
                <span className="font-medium text-gray-800 dark:text-white">
                  Login
                </span>
              </>
            )}
          </motion.button>

        
          <Link to="/cart" className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-amber-100 dark:bg-gray-700 hover:scale-110 transition text-gray-800 dark:text-amber-100"
            >
              <FaCartArrowDown className="text-xl" />
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                >
                  {cartItems.length > 99 ? "99+" : cartItems.length}
                </motion.span>
              )}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
