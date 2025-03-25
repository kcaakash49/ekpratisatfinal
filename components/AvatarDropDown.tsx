"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'; // Import usePathname hook

interface AvatarDropdownProps {
  avatarUrl?: string;
  userName?: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ avatarUrl, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current pathname

  // Check if we're on the homepage or other page
  const isHomepage = pathname === '/';

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // Add your custom redirect here after sign out
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={avatarUrl || '/avatar1.png'}
          alt={userName || 'User Avatar'}
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-15 md:h-10 rounded-full"
        />
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 right-0 w-48 rounded shadow-md z-50 ${isHomepage ? 'bg-transparent' : 'bg-black'} ${isHomepage ? '' : 'border border-gray-800'}`}
        >
          <ul className="py-1">
            {session?.user?.role === "ADMIN" ? (
              <>
                <li>
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/createlisting"
                    className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Listing
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/createlisting"
                    className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Listing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-listings"
                    className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    My Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/update-profile"
                    className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favourites"
                    className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Favourites
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] text-sm font-medium tracking-normal hover:scale-105 transform-gpu"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
