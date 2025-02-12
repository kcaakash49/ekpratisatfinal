import client from "@/db"

export async function getAllListingService(){
    try {
        
        const data = await client.listings.findMany({
            include: {
                images: true
            },
            orderBy: {
                created: 'desc' // Sorting by created field in descending order (latest first)
            }
        });
        
        
        return data
    }catch(e){
        return {
            message: "Some Error Occured",
            error: e
        }
    }
}