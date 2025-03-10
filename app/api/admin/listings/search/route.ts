import client from "@/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1"); // Default to page 1 if not provided
    const limit = parseInt(url.searchParams.get("limit") || "10"); // Default to 10 listings per page if not provided
    const searchQuery = url.searchParams.get("query") || ""; // Get search query if provided
    const skip = (page - 1) * limit;

    // Fetch paginated listings with search query
    const listings = await client.listings.findMany({
      where: {
        title: {
          contains: searchQuery, // Search listings by title
          mode: "insensitive", // Case-insensitive search
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
        category: true,
        created: true,
        user: {
          select: {
            fullname: true,
          },
        },
      },
      skip: skip,
      take: limit,
    });

    // Get the total count of listings for pagination calculation
    const totalListings = await client.listings.count({
      where: {
        title: {
          contains: searchQuery, // Search listings by title
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    return new Response(
      JSON.stringify({ listings, totalListings }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response("Error fetching listings", { status: 500 });
  }
}
