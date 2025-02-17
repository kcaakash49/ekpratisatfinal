import client from "@/db";

export async function deleteListingService(id: number){
    console.log("id", id)
    try {
        await client.image.deleteMany({
            where: {
                listingId: id
            }
        })

        await client.listings.delete({
            where: {
                id: id
            },
            
        })
        return {
            message: "Listing Deleted Successfully"
        }
    } catch(e){
        return {
            error: "Failed to Delete Listing",
            err: e
        }
    }
}