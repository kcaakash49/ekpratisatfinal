"use server";

import { deleteListingService } from "@/services/deleteListingService";


export async function deleteListingAction(id: number){
    return await deleteListingService(id);
}