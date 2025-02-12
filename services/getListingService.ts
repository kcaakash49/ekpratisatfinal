import client from "@/db"

// export async function getListingService(){
//     try {
//         const data = await client.listings.findMany({
//             include: {
//                 images: true
//             }
//         })
        
        
//         return data
//     }catch(e){
//         return "Some Error Occured"
//     }
// }

export async function getListingService() {
    try {
        const data = await client.listings.findMany({
            include: {
                images: true
            },
            orderBy: {
                created: 'desc' // Sorting by created field in descending order (latest first)
            },
            take: 6 // Fetch only the latest 6 records
        });

        return data;
    } catch (e) {
        return {
            message: "Some Error Occured",
            error: e
        };
    }
}
