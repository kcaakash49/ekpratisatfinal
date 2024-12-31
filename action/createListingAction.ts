"use server"

import { NEXT_AUTH } from "@/app/lib/auth";
import { createListingService } from "@/services/createListingService";
import { generateUserToken } from "@/utils/jwtToken";
import { CreateListingSchema } from "@/zod/schema";
import { getServerSession } from "next-auth";

export async function createListingAction(formData: CreateListingSchema){
    const session = await getServerSession(NEXT_AUTH)
    if (!session || !session.user?.id){
        throw new Error("Unauthorized")
    }
    const token = generateUserToken(session.user.id)
    return await createListingService(formData,token);
}