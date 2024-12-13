'use client';


import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'



const Header = () => {
    const router = useRouter();
    const {data: session} = useSession();
    // console.log(session)
    
    const headerItem = [
        {
            item: "Home",
            path: "/"
        },
        {
            item: "About",
            path: "/about"
        },
    ]
    return (
        <div className='bg-blue-950'>

            <div className='flex justify-between max-w-7xl items-center mx-auto py-2'>
                <div className='flex items-center justify-center gap-5'>
                    <div>
                        <img src="/logo.png" alt="" className='h-12 w-12 sm:h-20 sm:w-20' />

                    </div>
                    <div className='hidden sm:flex sm:gap-5'>
                        {
                            headerItem.map((list, index) => (
                                <div key={index} onClick={() => router.push(list.path)} className='text-2xl cursor-pointer text-white font-serif'>
                                    {list.item}
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    session ? (
                        <div className='flex gap-2'>
                            <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => signOut()}>SignOut</div>
                            <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => router.push('/auth/signup')}>Signup</div>

                        </div>

                    ): (
                        <div className='flex gap-2'>
                            <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => signIn()}>Login</div>
                            <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => router.push('/auth/signup')}>Signup</div>

                        </div>

                    )
                }
                
            </div>
            {/* <div className='text-white'>{JSON.stringify(session)}</div> */}
        </div>
    )
}

export default Header