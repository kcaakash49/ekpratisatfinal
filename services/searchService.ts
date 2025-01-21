
import client from "@/db"

export async function searchService(search:string){
    try {
        const data = await client.listings.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            include: {
                images: true
            }
        })
        
        return data
        
    }catch(e){
        return {
            error: e,
            message: "Something happened"
        }
    } 
}