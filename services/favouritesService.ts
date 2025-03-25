"use server"

import client from "@/db";

export async function addToFavouritesService(userId:number ,listingId: number) {
    try{
        const favourite=await client.favourites.create({
            data:{
                userId,
                listingId,
            },
        });
        return favourite;
    } catch(e){
        return{
            message:"Failed to add to favourites",
            error: e,
        };
    }
}

export async function removeFromFavouritesService(userId:number,listingId:number){
    try {
        const deletedFavourite= await client.favourites.delete({
            where:{
                userId_listingId:{
                    userId,
                    listingId,
                },
            },
        });
        return deletedFavourite;
    } catch (e) {
        return{
            message:"Failed to remove from favourites",
            error:e,
        };
        
    }
}

export async function isFavouriteService(userId: number, listingId: number) {
    try {
        
        const favourite = await client.favourites.findUnique({
            where: {
                userId_listingId: {
                    userId,
                    listingId,
                },
            },
        });
        return favourite ? true : false; // Return true if the listing is in favourites, false otherwise
    } catch (e) {
        return {
            message: "Error checking favourites",
            error: e,
        };
    }
}


export async function getUserFavouritesService(userId: number) {
    try {
      // Fetching the user's favourite listings from the database, including images
      const favourites = await client.favourites.findMany({
        where: {
          userId: userId,  // Filtering by userId
        },
        include: {
          listing: {
            include: {
              images: true, 
            },
          },
        },
      });
  
      // Returning only the listing details including images
      return favourites.map((favourite: any) => favourite.listing); 
    } catch (e) {
      return {
        message: "Failed to fetch user favourites",
        error: e,
      };
    }
  }
  