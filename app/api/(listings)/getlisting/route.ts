import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(NEXT_AUTH);
    console.log("ServerSession", session)
    return NextResponse.json(session)
}