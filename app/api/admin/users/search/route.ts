import { NextResponse } from "next/server";
import client from "@/db"; 

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("searchQuery") || "";  // Default to empty string if no searchQuery
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    const users = await client.user.findMany({
      where: {
        OR: [
          {
            fullname: {
              contains: searchQuery,
              mode: "insensitive", 
            },
          },
          {
            email: {
              contains: searchQuery, 
              mode: "insensitive",
            },
          },
          {
            mobile:{
              contains: searchQuery,
              mode:"insensitive",
            }
          },
        ],
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const totalUsers = await client.user.count({
      where: {
        OR: [
          {
            mobile: {
              contains: searchQuery, 
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchQuery, 
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return NextResponse.json({
      users,
      totalUsers,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}
