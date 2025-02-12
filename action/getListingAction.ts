"use server"

import { getAllListingService } from "@/services/getAllListingService"
import { getListingService } from "@/services/getListingService"


export async function getListingAction(){
    return await getAllListingService()
}