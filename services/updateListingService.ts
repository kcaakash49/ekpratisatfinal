import client from "@/db"

export async function updateListingService(listing: any, id: number){
    try {
        const updateData: any = {};

        // Add non-null values to updateData
        if (listing.title !== undefined) updateData.title = listing.title;
        if (listing.location !== undefined) updateData.location = listing.location;
        if (listing.price !== undefined) updateData.price = listing.price;
        if (listing.bathrooms !== null) updateData.bathrooms = listing.bathrooms;
        if (listing.bedrooms !== null) updateData.bedrooms = listing.bedrooms;
        if (listing.houseArea !== null) updateData.houseArea = listing.houseArea;
        if (listing.area !== null) updateData.area = listing.area;
        if (listing.landArea !== null) updateData.landArea = listing.landArea;
        if (listing.numberOfFloors !== null) updateData.numberOfFloors = listing.numberOfFloors;
        if (listing.description !== undefined) updateData.description = listing.description;
        if (listing.type !== undefined) updateData.type = listing.type;

        console.log(updateData)

        await client.listings.update({
            where: {
                id: id
            },
            data: updateData
        })

        return {
            message: "Listing Updated Successfully",

        }
    }catch(e){
        return {
            error: "Update Unsuccessful",
            err : e
        }
    }
}