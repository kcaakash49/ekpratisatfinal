"use server"

// import { categoryService } from "@/services/categoryService";

// export async function categoryAction(category: string){
//     return await categoryService(category)
// }

import { categoryService } from "@/services/categoryService";

export async function categoryAction(category: string, page: number = 1, limit: number = 10) {
  return await categoryService(category, page, limit);
}
