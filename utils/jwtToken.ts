import jwt from "jsonwebtoken";

export function generateUserToken(userId: number,role: string){
    return jwt.sign(
         {userId ,role},
          process.env.JWT_SECRET as string,
        {expiresIn:'1h'}
    );
}