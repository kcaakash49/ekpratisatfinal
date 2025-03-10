// app/api/admin/signin/route.ts
import { NextResponse } from "next/server";
import client from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema } from "@/zod/schema"; // updated schema import

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = signinSchema.parse(body);

    const user = await client.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: You are not an admin" }, { status: 403 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 400 });
  }
}
