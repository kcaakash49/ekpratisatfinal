import client from "@/db";

export async function signinservice(username: string, password: string){
    try {
        const user = await client.user.findUnique({
            where: {
                username: username,
                password: password
            }
        })
        
        console.log(user)
        return "signin success"
    }catch(e){
        return e
    }
}