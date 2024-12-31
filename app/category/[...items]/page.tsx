import { categoryAction } from "@/action/categoryAction"


export default async function({params}: any){
    const category = await params
    console.log(category.items[0])
    const listing: any = await categoryAction(category.items[0])
    console.log("Listing in category", listing)
    return <div>
        {
            listing?.map((item: any, index: any) => (
                <div key = {index}>
                    <a href={`/listing/${item.id}`}>
                        
                    </a>
                </div>
            ))
        }
    </div>
}