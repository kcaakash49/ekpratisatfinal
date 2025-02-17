import client from "@/db"

export async function myListingService(id: number){
    try {
        const result = await client.listings.findMany({
            where: {
                userId: id
            },
            orderBy: {
                created: 'desc'
            },
            include: {
                images: true
            }
        })

        return {
            message: "Success",
            result: result
        }
    } catch(e){
        return {
            error : "Something Happened",
            result: []
        }
    }
}