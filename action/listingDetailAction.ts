import { listingDetailService } from "@/services/listingDetailService";


export async function listingDetailAction({params}: any){
    return await listingDetailService()
}