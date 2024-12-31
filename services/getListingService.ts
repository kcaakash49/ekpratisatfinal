import client from "@/db"

export async function getListingService(){
    try {
        const data = await client.listings.findMany({
            include: {
                images: true
            }
        })
        
        
        return data
    }catch(e){
        return "Some Error Occured"
    }
}