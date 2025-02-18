"use client";

import { listingDetailAction } from "@/action/listingDetailAction";
import { updateListingAction } from "@/action/updateListingAction";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface ParamType {
    id?: string
}
export default function (){
    const { id } = useParams() as ParamType;
    const router = useRouter();
    const [listing, setListing] = useState<any>({})

    // console.log(params)

    useEffect(() => {
        const fetchListing = async () => {
            if(id){
                const response = await listingDetailAction(id);
                
                if (response.listing){
                    setListing(response.listing)
                }


            }
        }
        fetchListing();
    },[id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setListing({
            ...listing,
            [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'price' || name === 'landArea' || name === 'numberOfFloors' || name === 'houseArea' || name === 'area' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await updateListingAction(listing,Number(id))
        console.log(response)
        if (response?.message){
            alert(response.message)
            router.push("/my-listings")
        }else if (response?.error){
            alert(response.error)
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-semibold mb-4">Edit Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={listing.title || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Title"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block">Description</label>
                    <textarea
                        name="description"
                        value={listing.description || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Description"
                    />
                </div>

                {/* Category (immutable) */}
                <div>
                    <label htmlFor="category" className="block">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={listing.category || ""}
                        disabled
                        className="w-full p-2 border rounded bg-gray-200"
                    />
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={listing.location || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Location"
                        required
                    />
                </div>
                <div className="flex gap-4 mt-2">
                {['rent', 'sell'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={listing.type === type}
                            onChange={handleChange}
                            className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                    </label>
                ))}
            </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={listing.price || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Price"
                        required
                    />
                </div>

                {/* Land Area (nullable) */}
                {listing.landArea !== null && (
                    <div>
                        <label htmlFor="landArea" className="block">Land Area</label>
                        <input
                            type="number"
                            name="landArea"
                            value={listing.landArea || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Optional"
                        />
                    </div>
                )}

                {listing.houseArea !== null && (
                    <div>
                        <label htmlFor="landArea" className="block">Land Area</label>
                        <input
                            type="number"
                            name="houseArea"
                            value={listing.houseArea || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Optional"
                        />
                    </div>
                )}

                {/* Bathrooms (only show if not null) */}
                {listing.bathrooms !== null && (
                    <div>
                        <label htmlFor="bathrooms" className="block">Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={listing.bathrooms || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Bathrooms"
                        />
                    </div>
                )}

                {/* Bedrooms (only show if not null) */}
                {listing.bedrooms !== null && (
                    <div>
                        <label htmlFor="bedrooms" className="block">Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={listing.bedrooms || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Bedrooms"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Save Changes
                </button>
            </form>
        </div>
        
    )
}