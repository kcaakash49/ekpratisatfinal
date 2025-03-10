"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SearchComponent } from "./SearchComponent";
import AvatarDropdown from "./AvatarDropDown";
import { LoginButton } from "./LoginButton";

const Header = ({ className }: any) => {
  const { data: session, status } = useSession(); 
  const [isClient, setClient] = useState(false);

  useEffect(()=> {
    setClient(true)
  },[])

  if(!isClient){
    return null
  }

  

  return (
    <div className={`w-full ${className}`}>
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
        <div className="hidden sm:flex flex-1 justify-center px-4">
          <SearchComponent />
        </div>

        {/* Conditional Authentication Component */}
        <div className="flex-shrink-0">
          {status === "loading" ? (
            <div>Loading...</div> // Show loading indicator while fetching session
          ) : !session ? (
            <LoginButton /> // If not authenticated, show login button
          ) : (
            <AvatarDropdown
              avatarUrl={session.user.image || undefined}
              userName={session.user.name || undefined}
            />
          )}
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
