import React from "react";
import AuthComponent from "./AuthComponent";
import { SearchComponent } from "./SearchComponent";

const Header = ({ className }: any) => {
  const headerItem = [
    { item: "Home", path: "/" },
    { item: "About", path: "/about" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-8 md:px-20 py-3">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/">
            <img
              src="/logofinal.png"
              alt="Logo"
              className="h-12 w-20 sm:h-20 sm:w-28 md:h-40 md:w-56 transition-all duration-300"
            />
          </a>
        </div>

        {/* Search Component (Hides on very small screens) */}
        <div className="hidden sm:flex flex-1 justify-center">
          <SearchComponent />
        </div>

        {/* Authentication Component */}
        <div className="flex-shrink-0">
          <AuthComponent />
        </div>

        {/* Show SearchComponent below header on small screens */}
        <div className="w-full sm:hidden mt-2">
          <SearchComponent />
        </div>
      </div>
    </div>
  );
};

export default Header;
