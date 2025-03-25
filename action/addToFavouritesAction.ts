"use server"

import { addToFavouritesService } from "@/services/favouritesService"

export async function addToFavouritesAction(userId:number,listingId:number){
    try{
        const favourite= await addToFavouritesService(userId,listingId);
        return{success:true,favourite};
    }catch(error){
        return{success:false,message: "Failed to add to Favoutires",error};
        
    }
}