import { listingDetailService } from "@/services/listingDetailService";


export async function listingDetailAction(id : string){
    return await listingDetailService(id)
}