import React from "react";

import AuthComponent from "./AuthComponent";
import { SearchComponent } from "./SearchComponent";

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
      <div className="flex justify-between items-center mx-auto py-2 max-w-7xl">

        <div>
          <a href="/">
            <img
              src="/logofinal.png"
              alt=""
              className="h-12 w-12 sm:h-40 sm:w-72 pb-3"
            />
          </a>
        </div>
        <div>
          <SearchComponent />

        </div>

        <div>
          <AuthComponent />
        </div>
      </div>
    </div>
  );
};

export default Header;
