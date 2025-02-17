"use server"

import { NEXT_AUTH } from "@/app/lib/auth";
import { createListingService } from "@/services/createListingService";
import { generateUserToken } from "@/utils/jwtToken";
import { CreateListingSchema } from "@/zod/schema";
import { getServerSession } from "next-auth";

export async function createListingAction(formData: CreateListingSchema){
    console.log("FormData", formData)
    const session = await getServerSession(NEXT_AUTH)
    // console.log("Session", session);
    if (!session || !session.user?.id){
        // throw new Error("Unauthorized")
        return {
            error: "unauthorized"
        }
        
    }
    const token = generateUserToken(session.user.id)
    return await createListingService(formData,token);
}