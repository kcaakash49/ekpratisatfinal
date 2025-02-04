

import React from "react";

import AuthComponent from "./AuthComponent";
import { SearchComponent } from "./SearchComponent";
import SearchBar from "./SearchBar";

const Header = ({ className }: any) => {
  const headerItem = [
    {
      item: "Home",
      path: "/",
    },
    {
      item: "About",
      path: "/about",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mx-auto px-20 py-2">

        <div>
          <a href="/">
            <img
              src="/logofinal.png"
              alt=""
              className="h-12 w-12 sm:h-40 sm:w-56"
            />
          </a>
        </div>
        
          <SearchComponent />

        

        <div>
          <AuthComponent />
        </div>
      </div>
    </div>
  );
};

export default Header;
