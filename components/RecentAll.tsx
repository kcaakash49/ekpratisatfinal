"use client";

import { getListingAction } from "@/action/getListingAction";

import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    const handleClick = async () => {
        try {
            const response: any = await getListingAction();
            console.log(response)
            sessionStorage.setItem("searchResults", JSON.stringify(response));
            router.push("/results?query=recents")

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="p-2 bg-blue-400 text-white text-sm md:text-base cursor-pointer hover:bg-blue-600 rounded-lg shadow-lg" onClick={handleClick}>
            View All{'>>'}
        </div>
    )
}