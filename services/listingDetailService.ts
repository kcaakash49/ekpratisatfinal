import client from "@/db"

export async function listingDetailService(id : string){
    const newId = Number(id)
    try{
        const data = await client.listings.findUnique({
            where: {
                id: newId
            },
            include: {
                images: true,
            }
        })
        return {
            listing: data,
            message: "Listing found Successfully" 
        }
    }catch(e){
        return {
            error: e,
            message: "Something Happened"
        }
    }
    
    }
