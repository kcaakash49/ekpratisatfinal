"use client";

import { deleteListingAction } from "@/action/deleteListingAction";
import SwiperComponent from "./SwiperComponent";
import { useRouter } from "next/navigation";

export default function MyListingCard({ title, location, price, type, created, images, id, onDelete }: any) {
    // Convert `created` into a relative time format
    const router = useRouter();
    const getTimeAgo = (date: number) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date) / 1000);

        if (diffInSeconds < 60) return "Just now";
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays} days ago`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} months ago`;
        return `${Math.floor(diffInMonths / 12)} years ago`;
    };

    // const handleDelete = async (e: React.MouseEvent) => {
    //     e.preventDefault()
    //     const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    //     if (!confirmDelete) return;
    //     const response = await deleteListingAction(id);
    //     console.log(response)
    //     if (response.message){
    //         alert(response.message)
    //         router.push("/my-listings")
    //     }else if (response.error){
    //         alert(response.error)
    //     }
    // }
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        onDelete(id)
    }
    return (
        <div className="w-[320px] h-[380px] border rounded-2xl shadow-lg bg-white flex flex-col overflow-hidden transition hover:shadow-2xl">
            {/* Image Section */}
            <div className="h-[180px]">
                <SwiperComponent images={images} />
            </div>

            {/* Listing Details */}
            <div className="flex-grow p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 truncate capitalize">{title}</h2>
                    <p className="text-gray-600 capitalize">{location}</p>
                    <p className="text-gray-900 font-bold text-lg">Rs. {price}</p>
                    <p className="text-sm text-gray-500 capitalize">{type}</p>
                </div>

                {/* Created Time & Actions */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-gray-400">{getTimeAgo(created)}</p>

                    <div className="flex gap-3">
                        {/* Edit Button with SVG */}
                        <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.073 2.073 0 1 1 2.934 2.935L7.125 19.093l-3.608.41a.5.5 0 0 1-.557-.558l.41-3.608L16.862 3.487z" />
                            </svg>
                            Edit
                        </button>

                        {/* Delete Button with SVG */}
                        <button className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


