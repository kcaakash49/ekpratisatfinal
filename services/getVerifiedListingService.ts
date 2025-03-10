
import client from "@/db";

export async function getVerifiedListingService(){
    try{
        const data= await client.listings.findMany({
            where:{
                verified: true,
            },
            include:{
                images: true,
            },
            orderBy:{
                created:'desc',
            },
        });
        return data;
    }catch(e){
        return{
            message:"No Data Found",
            error:e,
        };
    }
}
