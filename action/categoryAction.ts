"use server"

import { categoryService } from "@/services/categoryService";

export async function categoryAction(category: string){
    return await categoryService(category)
}