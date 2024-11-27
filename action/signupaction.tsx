"use server";

import client from "@/db"

interface formType{
    fullname: string,
    email: string,
    password: string
}

export async function signupaction(formData: formType){
    try{
        const data = await client.user.create({
            data: {
                username: formData.fullname,
                email: formData.email,
                password: formData.password
            }
        })
        return "signup successful"
    } catch(e){
        return "some error occured"
    }
}