"use server";

import { searchService } from "@/services/searchService";

export async function searchAction(search: string){
    return await searchService(search)
}