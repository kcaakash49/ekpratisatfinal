import { NEXT_AUTH } from "@/app/lib/auth";
import { CreateListingSchema } from "@/zod/schema";
import { getServerSession } from "next-auth";
import client from "@/db";

export async function createListingService(formData : CreateListingSchema){
    const {user: session} = await getServerSession(NEXT_AUTH);
    console.log("User is", session.id)
    return "Success"
}