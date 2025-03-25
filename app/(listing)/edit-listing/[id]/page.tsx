"use client";

import { listingDetailAction } from "@/action/listingDetailAction";
import { updateListingAction } from "@/action/updateListingAction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface ParamType {
    id?: string;
}
const mapContainerStyle = {
    width: "100%",
    height: "300px",
};
const center = {
    lat: 27.7172, // Default to Kathmandu
    lng: 85.3240,
};
export default function () {
    const { id } = useParams() as ParamType;
    const router = useRouter();
    const [listing, setListing] = useState<any>({});
    const { data: session } = useSession();
    const [marker, setMarker] = useState<any>({
        lat: center.lat,
        lng: center.lng,
    });
    console.log("marker value", marker)
    useEffect(() => {
        const fetchListing = async () => {
            if (id) {
                const response = await listingDetailAction(id);
    
                if (response.listing) {
                    setListing(response.listing);
    
                    const lat = response.listing.latitude ? parseFloat(response.listing.latitude) : NaN;
                    const lng = response.listing.longitude ? parseFloat(response.listing.longitude) : NaN;
    
                    // If either lat or lng is NaN, use fallback values (e.g., center.lat, center.lng)
                    if (!isNaN(lat) && !isNaN(lng)) {
                        setMarker({ lat, lng });
                    } else {
                        setMarker({ lat: center.lat, lng: center.lng });
                    }
                }
            }
        };
        fetchListing();
    }, [id]);
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setListing({
            ...listing,
            [name]: name === "bedrooms" || name === "bathrooms" || name === "price" || name === "landArea" || name === "numberOfFloors" || name === "houseArea" || name === "area" ? Number(value) : value,
        });
    };

    const handleMarkerDragEnd = async(event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          setMarker(newLocation);
          // handleChange({ target: { name: "latitude", value: newLocation.lat } });
          // handleChange({ target: { name: "longitude", value: newLocation.lng } });
          setListing((prevState : any) => ({
            ...prevState,
            latitude: newLocation.lat,
            longitude: newLocation.lng,
          }));
          console.log(listing)
        }
      };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedListing = {
            ...listing,
            verified: session?.user?.role === "ADMIN" ? listing.verified : undefined, // Only send if admin
        };
        console.log(updatedListing)
        const response = await updateListingAction(updatedListing, Number(id));

        if (response?.message) {
            alert(response.message);
            if (session?.user?.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else {
                router.push("/my-listings");
            }
        } else if (response?.error) {
            alert(response.error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-semibold mb-4">Edit Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block">Title</label>
                    <input type="text" name="title" value={listing.title || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" required />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block">Description</label>
                    <textarea name="description" value={listing.description || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" />
                </div>

                {/* Category (immutable) */}
                <div>
                    <label htmlFor="category" className="block">Category</label>
                    <input type="text" name="category" value={listing.category ? listing.category.replace(/_/g, " ").charAt(0).toUpperCase() + listing.category.replace(/_/g, " ").slice(1) : ""} disabled className="w-full p-2 border rounded bg-gray-200 capitalize" />
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block">Location</label>
                    <input type="text" name="location" value={listing.location || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Location" required />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Select Location on Map</label>
                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={14}
                            center={marker}
                        // onClick={handleMapClick}
                        >
                            <Marker
                                position={marker}
                                draggable={true}
                                onDragEnd={handleMarkerDragEnd}
                            />
                        </GoogleMap>
                    </LoadScript>
                </div>
                {/* Type Selection */}
                <div className="flex gap-4 mt-2">
                    {["rent", "sell"].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input type="radio" name="type" value={type} checked={listing.type === type} onChange={handleChange} className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                            <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                        </label>
                    ))}
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block">Price</label>
                    <input type="number" name="price" value={listing.price || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Price" required />
                </div>

                {/* Land Area */}
                {listing.landArea !== null && (
                    <div>
                        <label htmlFor="landArea" className="block">Land Area</label>
                        <input type="number" name="landArea" value={listing.landArea || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Optional" />
                    </div>
                )}

                {/* House Area */}
                {listing.houseArea !== null && (
                    <div>
                        <label htmlFor="houseArea" className="block">House Area</label>
                        <input type="number" name="houseArea" value={listing.houseArea || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Optional" />
                    </div>
                )}

                {/* Bathrooms */}
                {listing.bathrooms !== null && (
                    <div>
                        <label htmlFor="bathrooms" className="block">Bathrooms</label>
                        <input type="number" name="bathrooms" value={listing.bathrooms || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Bathrooms" />
                    </div>
                )}

                {/* Bedrooms */}
                {listing.bedrooms !== null && (
                    <div>
                        <label htmlFor="bedrooms" className="block">Bedrooms</label>
                        <input type="number" name="bedrooms" value={listing.bedrooms || ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Bedrooms" />
                    </div>
                )}

                {/* Verified Checkbox (Only for Admins) */}
                {session?.user?.role === "ADMIN" && (
                    <div>
                        <label htmlFor="verified" className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="verified"
                                checked={listing.verified || false}
                                onChange={(e) => setListing({ ...listing, verified: e.target.checked })}
                                className="h-5 w-5 text-green-500 border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Verified</span>
                        </label>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
            </form>
        </div>
    );
}
