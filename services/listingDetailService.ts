import client from "@/db";

export async function listingDetailService(id: string) {
    const newId = Number(id);
    try {
        // Try to find the listing in the database along with its associated user and images
        const data = await client.listings.findUnique({
            where: {
                id: newId,
            },
            include: {
                images: true,
                user: true, // Assuming you have a 'user' relation in your listing model
            },
        });

        // If no listing is found, return a message indicating that
        if (!data) {
            return {
                listing: null,
                message: "Listing not found",
            };
        }

        // If listing is found, return the data and success message
        return {
            listing: data,
            userId: data.user?.id, // Assuming the user has an 'id' field
            message: "Listing found successfully",
        };
    } catch (e) {
        // Handle any errors during the process
        console.error("Error fetching listing:", e);
        return {
            error: e,
            message: "Something went wrong while fetching the listing",
        };
    }
}
