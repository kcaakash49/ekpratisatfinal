import client from "@/db";
import { NextResponse } from "next/server";

// GET: Fetch individual user details
export async function GET(request: Request, { params }: { params: any }) {
  const param = await params;
  console.log(param)
  try {
    const userId = parseInt(param.id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullname: true,
        mobile: true,
        email: true,
        role: true,
        created: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}

// PUT: Update user details
export async function PUT(request: Request, { params }: {  params: Promise<{ id: string }>}) {
  const param = await params;
  try {
    const userId = parseInt(param.id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const body = await request.json();

    // Destructure fields that you allow for updating.
    const { fullname, mobile, email, role } = body;

    // Basic validation: all fields are required
    if (!fullname || !mobile || !email || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Attempt to update the user record
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { fullname, mobile, email, role },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
