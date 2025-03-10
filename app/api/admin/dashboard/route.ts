import client from "@/db"

export async function GET(){
    try{
        const totalUsers= await client.user.count();
        const totalListings= await client.listings.count();

        return new Response(
            JSON.stringify({totalUsers,totalListings}),
            {status:200}
        );
    }catch (error){
        console.log("Error fetching admin dashboard data:", error);
        return new Response("Error fetching data",{status:500});
    }
}