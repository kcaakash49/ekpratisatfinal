"use client";
import Loading from "@/components/Loading";
import { SessionProvider } from "next-auth/react"
import { Suspense } from "react";


export function Providers({ children }: {
    children: React.ReactNode
}) {
    return <SessionProvider>
        <Suspense fallback = {<Loading/>}>
            {children}

        </Suspense>
    </SessionProvider>
}