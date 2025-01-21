"use client"

import { signIn, signOut } from "next-auth/react"

export function LoginButton(){
    return <div>
        <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => signIn()}>Login</div>
    </div>
}