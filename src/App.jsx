import React, { useState, useEffect } from "react";
import LandingPage from "./pages/Landing/LandingPage";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import { ArrowUp } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 100px
      setShowScrollButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-2 animate-bounce rounded-full bg-accent text-white shadow-lg transition-all duration-1000 hover:bg-accent/90 ${
          showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ zIndex: 999 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      
      {/* Add ToastContainer once at the root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
