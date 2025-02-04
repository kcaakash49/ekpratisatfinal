import { categoryAction } from "@/action/categoryAction"

import Header from "@/components/Header"
import ListingListComponent from "@/components/ListingListComponent"



export default async function({params}: any){
    const category = await params;
    // console.log(category.items[0])
    
    
    const listing: any = await categoryAction(category.items[0])
    if (listing.length == 0){
        return <div className="h-full flex items-center justify-center">
            No records found
        </div>
    }
    return (
        <div>
            <Header/>
            <ListingListComponent listing={listing}/>
            
        </div>

    )
    
}