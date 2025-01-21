import { categoryAction } from "@/action/categoryAction"
import CategoryListingComponent from "@/components/CategoryListingComponent"
import ListingListComponent from "@/components/ListingListComponent"


export default async function({params}: any){
    const category = await params
    // console.log(category.items[0])
    const listing: any = await categoryAction(category.items[0])
    if (listing.length == 0){
        return <div className="h-full flex items-center justify-center">
            No records found
        </div>
    }
    return (
        <ListingListComponent listing={listing}/>

    )
    
}