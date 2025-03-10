"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AvatarDropdownProps {
  avatarUrl?: string;
  userName?: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ avatarUrl, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/"); // Redirect to homepage after sign out
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
          src={avatarUrl || '/avatar.svg'}
          alt={userName || 'User Avatar'}
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 right-0 w-48 bg-white border rounded shadow-md z-50">
          <ul className="py-1">
            {session?.user?.role === "ADMIN" ? (
              <>
                <li>
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/createlisting"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Listing
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Listing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-listings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    My Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/update-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
