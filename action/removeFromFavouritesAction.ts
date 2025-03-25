"use server";

import { removeFromFavouritesService } from "@/services/favouritesService";

export async function removeFromFavouritesAction(userId: number, listingId: number) {
    try {
        const removedFavourite = await removeFromFavouritesService(userId, listingId);
        return { success: true, removedFavourite };
    } catch (error) {
        return { success: false, message: "Failed to remove from favourites", error };
    }
}
