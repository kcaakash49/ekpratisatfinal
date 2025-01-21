
"use client";

import { searchAction } from "@/action/searchAction";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const SearchComponent = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSearch = async () => {
        setLoading(true);
        setError("")
        try {
            console.log("search")
            const response: any = await searchAction(search)
            console.log("response", response)
            setSearch("")
            if (response.length === 0) {
                setError("Nothing found")
                return
            }
            sessionStorage.setItem("searchResults", JSON.stringify(response));
            router.push(`/results?query=${encodeURIComponent(search)}`); 


        } catch (e) {
            setError("An error occured while searching")
            console.error(e)
        } finally {
            setLoading(false)
        }

    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter"){
            handleSearch();
        }
    }
    return (
        <div>
            <div className="flex">
                <button
                    className=" text-white px-4 py-2 focus:outline-none focus:ring-2 hover:bg-gray-400 rounded-full"
                    onClick={handleSearch}
                    disabled={search.trim() === "" || loading}
                >
                    {loading ? "Searching..." : "🔍"}
                </button>
                <div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="search ...."
                        className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onKeyDown={handleKeyPress}
                        disabled = {loading}
                        
                    />

                </div>
            </div>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        </div>
    )
}