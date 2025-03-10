

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import client from "@/db";

export async function isAdmin(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming the token is passed in the "Authorization" header
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await client.user.findUnique({ where: { id: decoded.userId } });
    
    if (user && user.role === "ADMIN") {
      // Proceed if the user is an admin
      return next(); 
    } else {
      return res.status(403).json({ error: "Forbidden: You are not an admin" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
