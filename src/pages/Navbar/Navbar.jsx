import MainNav from "./MainNav";
import logo from "@/assets/wetoo-logo.jpg";
import Drawer from "./Drawer";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on the services page
  const isServicesPage = location.pathname === '/services';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const heroHeight = window.innerHeight / 2; // Half of viewport height
      
      // Add delay using setTimeout
      setTimeout(() => {
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setIsScrolled(currentScrollPos > heroHeight);
        setPrevScrollPos(currentScrollPos);
      }, 100); // 100ms delay
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Determine navbar styling based on route and scroll state
  const getNavbarStyling = () => {
    if (isServicesPage) {
      return 'bg-white text-black shadow-md';
    }
    if (isScrolled) {
      return 'bg-white/70 text-black';
    }
    return 'bg-transparent text-white';
  };

  return (
    <header 
      className={`shadow-sm z-50 backdrop-blur-sm transition-all duration-500 fixed w-full ${
        isVisible ? 'top-0 translate-y-0' : '-translate-y-full'
      } ${getNavbarStyling()}`}
    >
      <div className="sm:container md:max-w-6xl lg:max-w-[1400px] mx-auto py-1">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center overflow-hidden">
            <img
              src={logo}
              alt="Wetoo Logo"
              className="p-2 rounded-full h-[70px]"
            />
            <span className={`text-base font-bold ${isServicesPage ? 'text-black' : ''}`}>
              We Too Media
            </span>
          </Link>
          <MainNav isScrolled={isScrolled} isServicesPage={isServicesPage} />
          <Drawer isScrolled={isScrolled} isServicesPage={isServicesPage} />
        </div>
      </div>
    </header>
  );
}