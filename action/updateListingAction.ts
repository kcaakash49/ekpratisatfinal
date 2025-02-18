"use server";

import { updateListingService } from "@/services/updateListingService";

export async function updateListingAction(listing: any, id: number){
    return await updateListingService(listing, id);
}