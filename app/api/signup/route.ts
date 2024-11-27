import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import client from '@/db'
// const client = new PrismaClient();
export async function POST(req : NextRequest){
    const body = await req.json();
    console.log(body?.formData?.fullname);

    await client.user.create({
        data: {
            username: body.formData.fullname,
            email: body.formData.email,
            password: body.formData.password

        }
    })

    return Response.json({
        message:"user created successfully"
    })
}