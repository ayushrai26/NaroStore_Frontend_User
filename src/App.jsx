import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import TokenContext from "./ContextAPI/token/createContext";
import { useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL
function App() {
  const { setIsAuthenticated } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await fetch(`${API_URL}/user/generate-access-token`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Access token refreshed on load ✅", data);
          setIsAuthenticated(true);
        } else {
          console.log("Access token invalid ❌");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Token check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getAccessToken();
  }, []);

  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/user/generate-access-token`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Access token auto-refreshed 🔁", data);
          setIsAuthenticated(true);
        } else {
          console.warn("Auto-refresh failed ❌, user might need to log in again.");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auto-refresh error:", err);
      }
    }, 9 * 60 * 1000); 
 return () => clearInterval(interval);

    
  }, []);

  if (isLoading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            padding: "24px",
            fontSize: "18px",
          },
          success: {
            duration: 3000,
            style: { background: "green", color: "#fff" },
          },
          error: {
            duration: 5000,
            style: { background: "red", color: "#fff" },
          },
        }}
      />

      {!hideLayout && <Navbar />}
      <Home />
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
