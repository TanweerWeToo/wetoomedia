import React from "react";
import {
  Home,
  Building2,
  GraduationCap,
  Sparkles,
  Contact,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  {
    trigger: "Home",
    path: "#hero",
    icon: <Home className="w-4 h-4 mr-2" />,
  },
  {
    trigger: "About",
    path: "#about", 
    icon: <Building2 className="w-4 h-4 mr-2" />,
  },
  {
    trigger: "Programs",
    path: "#programs",
    icon: <GraduationCap className="w-4 h-4 mr-2" />,
  },
  {
    trigger: "Testimonials",
    path: "#testimonials",
    icon: <Sparkles className="w-4 h-4 mr-2" />,
  },
  {
    trigger: "Youtube",
    path: "#youtube",
    icon: <Play className="w-4 h-4 mr-2" />,
  },
  {
    trigger: "Contact",
    path: "#contact",
    icon: <Contact className="w-4 h-4 mr-2" />,
  }
];

const MainNav = ({ isScrolled }) => {
  const handleClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:block">
      <ul className="relative z-20 flex space-x-6">
        {menuItems.map((menu) => (
          <li
            key={menu.trigger}
            className={`relative group text-sm hover:text-secondary duration-300 transition-all cursor-pointer hover:-translate-y-1 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            <a
              href={menu.path}
              onClick={(e) => handleClick(e, menu.path)}
              className={`text-foreground hover:text-secondary ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              <motion.div
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`flex items-center hover:text-secondary duration-100 transition-all cursor-pointer hover:-translate-y-1 p-2 rounded-md hover:bg-gray-100 font-serif text-base ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                {menu.icon}
                {menu.trigger}
              </motion.div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
