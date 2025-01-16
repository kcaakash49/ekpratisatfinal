import { categoryAction } from "@/action/categoryAction"
import CategoryListingComponent from "@/components/CategoryListingComponent"


export default async function({params}: any){
    const category = await params
    // console.log(category.items[0])
    const listing: any = await categoryAction(category.items[0])
    if (listing.length == 0){
        return <div className="h-full flex items-center justify-center">
            No records found
        </div>
    }
    return <div className="max-w-7xl mx-auto">
        {
            listing?.map((item: any, index: any) => (
                <div key = {index} className="m-2">
                    <a href={`/listing/${item.id}`}>
                        <CategoryListingComponent title = {item.title} description = {item.description} type = {item.type} images = {item.images} price = {item.price} location = {item.location} rooms = {item.bedrooms} bathrooms = {item.numberofbathrooms}/>
                    </a>
                </div>
            ))
        }
    </div>
}