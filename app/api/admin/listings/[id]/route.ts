// app/api/admin/listings/[id]/route.ts
import client from "@/db";
import { NextResponse } from "next/server";

// GET: Fetch a single listing's details
export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const params = await Promise.resolve(context.params); // ✅ Await the params
    const { id } = params;
    const listingId = parseInt(id, 10);

    if (isNaN(listingId)) {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    const listing = await client.listings.findUnique({
      where: { id: listingId },
      include: { images: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching listing:", error);
    return NextResponse.json({ error: "Failed to fetch listing data" }, { status: 500 });
  }
}

// PUT: Update listing details
export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const params = await Promise.resolve(context.params); // ✅ Await the params
    const { id } = params;
    const listingId = parseInt(id, 10);

    if (isNaN(listingId)) {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    let data = await request.json();

    // Ensure price is an integer if it exists
    if (data.price) {
      data.price = parseInt(data.price, 10);
      if (isNaN(data.price)) {
        return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
      }
    }

    const updatedListing = await client.listings.update({
      where: { id: listingId },
      data,
    });

    return NextResponse.json(updatedListing, { status: 200 });

  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}
