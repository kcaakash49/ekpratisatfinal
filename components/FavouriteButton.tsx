"use client";

import React, { useState, useEffect } from "react";
import { isFavouriteService } from "@/services/favouritesService";
import { addToFavouritesAction } from "@/action/addToFavouritesAction";
import { removeFromFavouritesAction } from "@/action/removeFromFavouritesAction";

type FavouriteButtonProps = {
    listingId: number;
    userId?: number;
};

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ listingId, userId }) => {
    const [isFavourite, setIsFavourite] = useState<boolean | null>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkIfFavourite = async () => {
            if (userId) {
                const result = await isFavouriteService(userId, listingId);
                if (typeof result === "boolean") {
                    setIsFavourite(result);
                } else {
                    setError("Error checking favourites");
                }
            }
        };

        if (userId) {
            checkIfFavourite();
        }
    }, [userId, listingId]);

    const handleFavouriteToggle = async () => {
        if (userId) {
            if (!isFavourite) {
                setIsFavourite(true);
                await addToFavouritesAction(userId, listingId);
            } else {
                setIsFavourite(false);
                await removeFromFavouritesAction(userId, listingId);
            }
        }
    };

    return (
        <button
            onClick={handleFavouriteToggle}
            className={`px-5 py-2 text-lg font-semibold rounded-lg transition duration-300 ease-in-out shadow-md 
                ${isFavourite ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}
            `}
        >
            {isFavourite ? "❤️ Favourite" : "🤍 Add to Favourite"}
        </button>
    );
};

export default FavouriteButton;
