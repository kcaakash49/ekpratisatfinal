"use server"

import { signinservice } from "@/services/signinservice";




export async function signinaction(mobile: string, password: string){
    
    return await signinservice(mobile,password)
}