import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

// Header component for the application
const Header = () => {
  return (
    <nav className="fixed w-full z-20 backdrop-blur bg-white/10 shadow-lg border-b border-black/20">
      {/* Container for the header content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo linking to the homepage */}
          <Link to="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-normal whitespace-nowrap">
            <span className="text-cyan-400">Jose</span> M.S. Ferreira
          </Link>
          {/* Navigation component */}
          <Navigation />
        </div>
      </div>
    </nav>
  );
};

export default Header;
