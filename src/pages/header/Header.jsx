import MainNav from "./MainNav";
import logo from "@/assets/wetoo-logo.jpg";
import Drawer from "./Drawer";
import { useEffect, useState } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header 
      className={`shadow-sm z-50 backdrop-blur-sm transition-all duration-500 fixed w-full ${
        isVisible ? 'top-0 translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-white/70' : 'bg-transparent text-white'}`}
    >
      <div className="sm:container md:max-w-6xl lg:max-w-[1400px] mx-auto py-1">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center overflow-hidden">
            <img
              src={logo}
              alt="Wetoo Logo"
              className="p-2 rounded-full h-[70px]"
            />
            <span className="text-base font-bold">We Too Media</span>
          </a>
          <MainNav isScrolled={isScrolled} />
          <Drawer isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}