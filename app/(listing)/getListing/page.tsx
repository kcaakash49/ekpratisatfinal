import { getListingAction } from "@/action/getListingAction"
import ListingCard from "@/components/ListingCard";


export default async function () {
    const { data }: any = await getListingAction();
    console.log("data", data)
    if (data.length === 0) {
        return <div className="font-bold text-7xl flex items-center justify-center h-full">
            No Records Found
        </div>
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-4xl font-bold font-custom pb-10">Recently Added</div>
            <div className="flex ">
                {
                    data?.map((item: any, index: any) => (
                        <div key={index} className="mx-4">
                            <ListingCard title={item.title} description={item.description} location={item.location} price={item.price} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}