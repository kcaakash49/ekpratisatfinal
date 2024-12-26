'use client';


import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'



const Header = ({className}: any) => {
    const router = useRouter();
    const {data: session} = useSession();
    // console.log("Session", session?.user?.email)
    
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
        <div className= {className}>
            
            <div className='flex justify-between items-center mx-auto px-5 py-2 max-w-7xl'>
                <div className='flex items-center justify-center gap-5'>
                    <div className='hidden sm:flex sm:gap-5'>
                        {
                            headerItem.map((list, index) => (
                                <div key={index} onClick={() => router.push(list.path)} className='text-2xl cursor-pointer font-custom text-gray-800'>
                                    {list.item}
                                </div>
                            ))
                        }
                    </div>
                </div>
                    <div className=''>
                        <img src="/logofinal.png" alt="" className='h-12 w-12 sm:h-40 sm:w-72 pb-3' />
                        <input type="text" name="" id="" className='bg-transparent border rounded-lg text-white px-2' />
                    </div>
                {
                    session ? (
                        <div className='flex items-center'>
                            <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => signOut()}>SignOut</div>
                            

                        </div>

                    ): (
                        <div className='flex gap-2'>
                            <div className='text-white text-xl sm:2xl font-serif bg-red-700 p-2 rounded-lg cursor-pointer hover:bg-red-900' onClick={() => signIn()}>Login</div>
                            
                        </div>

                    )
                }
                
            </div>
            {/* <div className='text-white'>{JSON.stringify(session)}</div> */}
        </div>
    )
}

export default Header