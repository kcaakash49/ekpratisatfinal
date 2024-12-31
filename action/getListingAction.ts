"use server"

import { getListingService } from "@/services/getListingService"


export async function getListingAction(){
    return await getListingService()
}