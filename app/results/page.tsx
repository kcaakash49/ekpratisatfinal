"use client";

import Header from "@/components/Header";
import ListingListComponent from "@/components/ListingListComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react"

export default function(){

    const [data,setData] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get("query");

        if(!searchQuery){
            router.push("/")
            return
        }

        const storedResult = sessionStorage.getItem("searchResults");
        if (storedResult){
            setData(JSON.parse(storedResult))
        }else {
            router.push("/")
        }

    },[searchParams])
    return (
        <div>
            <Header/>
            <ListingListComponent listing={data} />

        </div>
            
        
        
    )
}