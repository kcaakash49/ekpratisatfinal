// import { myListingAction } from "@/action/myListingAction";
// import { NEXT_AUTH } from "@/app/lib/auth";
// import MyListingCard from "@/components/MyListingCard";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// export default async function MyListingsPage() {
//     const session = await getServerSession(NEXT_AUTH);

//     if (!session) {
//         redirect("/");
//     }

//     const response = await myListingAction(session.user.id);

//     return (
//         <div className="container mx-auto p-4 max-w-7xl">
//             <h1 className="text-2xl font-semibold mb-4">My Listings</h1>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {response?.result.map((item, index) => (
//                     <a href={`/listing/${item.id}`} key={index} className="flex justify-center">
//                         <MyListingCard 
//                             title={item.title} 
//                             location={item.location} 
//                             price={item.price} 
//                             images={item.images} 
//                             type={item.type} 
//                             created={item.created}
//                             id = {item.id}
//                         />
//                     </a>
//                 ))}
//             </div>
//         </div>
//     );
// }

"use client";

import { deleteListingAction } from "@/action/deleteListingAction";
import { myListingAction } from "@/action/myListingAction";
import MyListingCard from "@/components/MyListingCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function (){
    const {data, status} = useSession();
    // console.log(data)
    const router = useRouter();
    const [listing, setListing] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        if (status === "unauthenticated"){
            router.push("/")
        }
    },[status])

    useEffect(() => {
        const fetchListings = async () => {
            if (status === "authenticated" && data?.user?.id) {
                const response = await myListingAction(data.user.id); // Call the function to get listings
                if (response?.result) {
                    setListing(response.result); // Set the listings
                }
                setLoading(false); // Hide loading spinner
            }
        };

        fetchListings();
    }, [status, data]);

    const handleDelete = async (id: number) => {
        
        const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
        if (!confirmDelete) return;

        const response = await deleteListingAction(id);
        if (response.message) {
            alert(response.message);
            setListing((prevListings) => prevListings.filter(item => item.id !== id));
        } else if (response.error) {
            alert(response.error);
        }
    };
    if (listing.length === 0){
        return <div className="flex items-center justify-center h-full">
            No Records Found
        </div>
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-2xl font-semibold mb-4">My Listings</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listing.map((item, index) => (
                    <a href={`/listing/${item.id}`} key={index} className="flex justify-center">
                        <MyListingCard
                            title={item.title} 
                            location={item.location} 
                            price={item.price} 
                            images={item.images} 
                            type={item.type} 
                            created={item.created}
                            id = {item.id}
                            onDelete = {handleDelete}
                        />
                    </a>
                ))}
            </div>
        </div>
    )
}