// import { getListingAction } from "@/action/getListingAction"
// import ListingCard from "@/components/ListingCard";


// export default async function () {
//     const  data: any  = await getListingAction();
//     // console.log("data", data)
//     if (!data || data.length === 0) {
//         return <div className="font-bold text-7xl flex items-center justify-center h-full">
//             No Records Found
//         </div>
//     }
//     return (
//         <div className="max-w-7xl mx-auto pb-10">
//             <div className="text-4xl font-bold font-custom pb-10">Recently Added</div>
//             <div className="flex flex-wrap">
//                 {
//                     data?.map((item: any, index: any) => (
//                         <div key={index} className="mx-4">
//                             <a href={`/listing/${item.id}`}>
//                                 <ListingCard title={item.title} description={item.description} location={item.location} price={item.price} images = {item.images}/>
//                             </a>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

 "use client"
 
import { useEffect, useState } from "react";
import { getListingAction } from "@/action/getListingAction";
import ListingCard from "@/components/ListingCard";

export default function () {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedData: any = await getListingAction();
            setData(fetchedData);
            setLoading(false);
        };

        fetchData();
    }, []); // Empty dependency array means it runs only once after the initial render

    if (loading) {
        return (
            <div className="font-bold text-7xl flex items-center justify-center h-full">
                Loading...
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="font-bold text-7xl flex items-center justify-center h-full">
                No Records Found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="text-4xl font-bold font-custom pb-10">Recently Added</div>
            <div className="flex flex-wrap">
                {data?.map((item: any, index: any) => (
                    <div key={index} className="mx-4">
                        <a href={`/listing/${item.id}`}>
                            <ListingCard
                                title={item.title}
                                description={item.description}
                                location={item.location}
                                price={item.price}
                                images={item.images}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
