import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
// import { navlinks } from "./navData";
// import { Link } from "react-router-dom";

const navlinks = [
  {
    name: "Home",
    path: "#hero",
  },
  {
    name: "About",
    path: "#about",
  },
  {
    name: "Programs",
    path: "#programs",
  },
  {
    name: "Testimonials",
    path: "#testimonials",
  },
  {
    name: "Youtube",
    path: "#youtube",
  },
  {
    name: "Contact",
    path: "#contact",
  },
];

const Drawer = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden block">
        <button
          className={`p-2 rounded lg:hidden ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-primary/50 backdrop-blur-sm overflow-auto border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl font-bold text-left">
            We Too Media
          </SheetTitle>
          <SheetDescription className="text-white text-left pt-5">
            <nav>
              <ul className="space-y-1">
                {navlinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.path}
                      onClick={(e) => handleClick(e, item.path)}
                      className="block py-2 px-4 font-semibold text-white tracking-wider hover:bg-white/10 rounded transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
