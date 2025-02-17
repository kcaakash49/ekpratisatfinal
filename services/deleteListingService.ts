// import client from "@/db";

// export async function deleteListingService(id: number){
//     console.log("id", id)
//     try {
//         await client.image.deleteMany({
//             where: {
//                 listingId: id
//             }
//         })

//         await client.listings.delete({
//             where: {
//                 id: id
//             },
            
//         })
//         return {
//             message: "Listing Deleted Successfully"
//         }
//     } catch(e){
//         return {
//             error: "Failed to Delete Listing",
//             err: e
//         }
//     }
// }

import client from "@/db";

export async function deleteListingService(id: number) {
    console.log("id", id);
    try {
        // Start by fetching the listing and associated images
        const listing = await client.listings.findUnique({
            where: { id },
            include: {
                images: true, // Fetch the related images
            },
        });

        if (!listing) {
            throw new Error("Listing not found");
        }

        // Start a transaction
        const transaction = await client.$transaction([
            // Copy the listing to TrashListings
            client.trashListings.create({
                data: {
                    id: listing.id,
                    title: listing.title,
                    description: listing.description,
                    bathrooms: listing.bathrooms,
                    bedrooms: listing.bedrooms,
                    location: listing.location,
                    price: listing.price,
                    type: listing.type,
                    category: listing.category,
                    landArea: listing.landArea,
                    numberOfFloors: listing.numberOfFloors,
                    area: listing.area,
                    houseArea: listing.houseArea,
                    userId: listing.userId,
                    images: listing.images.map(image => image.url), // Using pre-fetched images
                    created: listing.created,
                },
            }),

            // Delete all images related to the listing
            client.image.deleteMany({
                where: {
                    listingId: id,
                },
            }),

            // Finally, delete the listing from Listings
            client.listings.delete({
                where: {
                    id: id,
                },
            }),
        ]);

        return {
            message: "Listing Deleted Successfully",
        };
    } catch (e) {
        return {
            error: "Failed to delete the listing",
            err: e,
        };
    }
}
