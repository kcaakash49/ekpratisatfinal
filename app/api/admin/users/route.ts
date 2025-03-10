// app/api/admin/users/route.ts
import client from "@/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1"); // Default to page 1 if not provided
    const limit = parseInt(url.searchParams.get("limit") || "10"); // Default to 10 users per page if not provided
    const skip = (page - 1) * limit;

    // Fetch paginated users
    const users = await client.user.findMany({
      select: {
        id: true,
        fullname: true,
        mobile: true,
        email: true,
        role: true,
        created: true,
      },
      skip: skip,
      take: limit,
    });

    // Get the total count of users for pagination calculation
    const totalUsers = await client.user.count();

    return new Response(
      JSON.stringify({ users, totalUsers }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
}
