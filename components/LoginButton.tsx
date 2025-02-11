"use client"

import { signIn } from "next-auth/react"

export function LoginButton(){
    return (
        <div className="flex justify-center">
        <button
          className="text-white text-sm sm:text-base md:text-lg font-serif bg-red-700 p-2 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-lg cursor-pointer hover:bg-red-900 w-full max-w-[140px] text-center"
          onClick={() => signIn()}
        >
          Login
        </button>
      </div>
      );
}