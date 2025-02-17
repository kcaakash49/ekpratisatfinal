"use server";

import { myListingService } from "@/services/myListingService";

export async function myListingAction( id: number){
    return await myListingService(id)
}