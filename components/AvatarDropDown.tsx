"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

interface AvatarDropdownProps {
  avatarUrl?: string;
  userName: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ avatarUrl, userName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={avatarUrl || '/avatar.svg'}
          alt={userName}
          className="w-12 h-12 rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute mt-2 right-0 w-48 bg-white border rounded shadow-md z-50"
          onBlur={() => setIsOpen(false)}
        >
          <ul className="py-1">
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
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
