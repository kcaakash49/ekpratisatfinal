import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({
        name: "Aakash KC",
        email: "kcaakash04@gmail.com"
    })
}