"use server"

import { getVerifiedListingService } from "@/services/getVerifiedListingService";

export async function getVerifiedListingAction(){
    return await getVerifiedListingService();
}