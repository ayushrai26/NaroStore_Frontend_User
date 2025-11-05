import React, { useState, useEffect, useContext } from "react";
import TokenContext from "../ContextAPI/token/createContext";
import cartContext from "../ContextAPI/cart/createContext";
import EditProfile from "./EditProfile";
import { FaRupeeSign } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const API_URL = import.meta.env.VITE_API_URL;
const Profile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // 👈 popup state
  const { isAuthenticated } = useContext(TokenContext);
  const { handleLogout } = useContext(cartContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetail();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchUserDetail = async () => {
    try {
      const res = await fetch(`${API_URL}/user/fetch-user-details`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) setUser(data.existUser);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/order/fetch-user-order`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setOrders(data.isOrderExist);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      if(!updatedData.fullName.trim() || !updatedData.email.trim() || !updatedData.mobileNumber.trim()){
           toast.error('Missing Fields')
           return
      }
      const res = await fetch(`${API_URL}/user/update-user`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.updatedUser);
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className="min-h-screen mt-22 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-linear-to-r from-blue-600 to-purple-600 text-white p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  src={user?.avatar || "https://i.pravatar.cc/150?img=12"}
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                  <p className="text-blue-100">{user?.email}</p>
                  <p className="text-blue-100">{user?.mobileNumber}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="bg-white text-blue-700 font-medium px-5 py-2 rounded-full shadow hover:bg-blue-50 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-medium px-5 py-2 rounded-full shadow hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>

          
            <div className="p-8 border-b dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                Personal Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-8 text-gray-700 dark:text-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user?.mobileNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{user?.gender || "Not specified"}</p>
                </div>
              </div>
            </div>

          
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                My Orders
              </h2>

              {orders.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedOrder(order)} // 👈 open popup
                      className="cursor-pointer bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500 dark:text-gray-300">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
                          {order.items.map((item) => item.name).join(", ")}
                        </h3>

                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                            <FaRupeeSign className="mr-1" /> {order.amount}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-300">
                            ID: {order.paymentId?.slice(0, 10)}...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-300">
                    You haven’t placed any orders yet.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        
          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 40 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
                >
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                  >
                    ✕
                  </button>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Order Details
                  </h3>

                  <div className="space-y-3 text-gray-700 dark:text-gray-200">
                    <p><span className="font-medium">Order ID:</span> {selectedOrder._id}</p>
                    <p><span className="font-medium">Amount:</span> ₹{selectedOrder.amount}</p>
                    <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                    {/* <p><span className="font-medium">Payment ID:</span> {selectedOrder.paymentId}</p> */}
                    <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="mt-5 border-t pt-4">
                    <h4 className="text-lg font-semibold mb-2">Items</h4>
                    <ul className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-2"
                        >
                          <span>{item.name}</span>
                          <span className="flex items-center">
                            <FaRupeeSign className="mr-1" /> {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isEditOpen && (
            <EditProfile
              user={user}
              onClose={() => setIsEditOpen(false)}
              onSave={handleSave}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
