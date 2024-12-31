import jwt from "jsonwebtoken";

export function generateUserToken(userId: number){
    return jwt.sign( {userId }, process.env.JWT_SECRET as string)
}