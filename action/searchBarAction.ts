
"use server";

import { searchBarService } from "@/services/searchBarService";

export async function searchBarAction(location: string, category: string, price: number, bedrooms: number | null, bathrooms: number | null, type: string, landArea: number | null,area: number | null){
    return await searchBarService(location,category,price,bedrooms, bathrooms, type, landArea,area)
}
