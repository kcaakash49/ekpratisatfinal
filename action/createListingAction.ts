"use server"

import { createListingService } from "@/services/createListingService";
import { CreateListingSchema } from "@/zod/schema";

export async function createListingAction(formData: CreateListingSchema){
    console.log("Listing Data", formData);
    return createListingService(formData);
}