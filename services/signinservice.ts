import client from "@/db";

export async function signinservice(username: string, password: string){
    try {
        const user = await client.user.findUnique({
            where: {
                username: username,
                password: password
            }
        })
        
        if (!user){
            return{
                error: "Wrong username or password"
            }
        }
        return{
            message: "Login Success",
            user: user
        }
    }catch(e){
        return e
    }
}