import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import TokenContext from "../ContextAPI/token/createContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { ClipLoader } from "react-spinners";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useContext(TokenContext);
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formdata) => {
    const url = isLogin
      ? "http://localhost:3000/user/sign-in-user"
      : "http://localhost:3000/user/sign-up-user";

      setIsLoading(true)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      if (result.isUserExist?.role === "admin") {
        toast.error("Admins are not allowed to log in from user portal!");
        return;
      }

      reset();

      if (isLogin) {
        toast.success(`Welcome Back, ${result.isUserExist.fullName.split(" ")[0]} 👋`);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast.success("Account created successfully 🎉");
        setIsLogin(true);
        navigate("/login")
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Network error, please try again");
    } finally{
      setIsLoading(false)
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-amber-100 via-pink-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-center bg-linear-to-r from-amber-500 to-pink-600 bg-clip-text text-transparent mb-6">
          {isLogin ? "Welcome Back!" : "Join the Naro Fam 💫"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none dark:bg-gray-700 dark:text-white"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
         

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-linear-to-r from-amber-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
          >
            {isLogin ? (isLoading?<ClipLoader color="#9333EA" size={20} speedMultiplier={0.8} />: "Login") : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-5">
          {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              reset();
            }}
            className="text-amber-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthModal;
