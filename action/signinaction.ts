"use server"

import { signinservice } from "@/services/signinservice";




export async function signinaction(username: string, password: string){
    console.log("username", username)
    return await signinservice(username,password)
}