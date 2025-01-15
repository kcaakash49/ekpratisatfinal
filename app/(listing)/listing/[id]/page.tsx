import { getListingAction } from "@/action/getListingAction";
import { listingDetailAction } from "@/action/listingDetailAction";
import SwiperComponent from "@/components/SwiperComponent";



export async function generateStaticParams() {
  // Fetch the first 20 listings
  const listings:any = await getListingAction(); // Fetch the first 20 listings (could be a DB query or API call)
  
  return listings.map((listing: any) => ({
    id: listing.id.toString(),  // This matches the dynamic route `[id]`
  }));
}

export const metadata = {
  revalidate: 60 * 60 * 24, // This will regenerate the static page every 24 hours
};

export default async function Page({ params }: any) {
    const param = await params;
    const response = await listingDetailAction(param.id);
    const property = response.listing;
    
    if (!property){
        return <div className="h-full flex items-center justify-center">
            No listing found
        </div>
    }
    return (
        <div className="p-6">
        <div className="container mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full">
            <SwiperComponent images={property.images} />
          </div>
  
          {/* Property Information Section */}
          <div className="p-6">
            {/* Title and Price */}
            <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
            <p className="text-green-500 text-2xl font-semibold mt-2">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-gray-600 text-lg mt-1">{property.location}</p>
  
            {/* Description */}
            <p className="text-gray-700 text-md mt-4">{property.description}</p>
  
            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛏️</span>
                <p className="text-gray-600 text-md">{property.bedrooms} Bedrooms</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛁</span>
                <p className="text-gray-600 text-md">{property.bathrooms} Bathrooms</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">📐</span>
                <p className="text-gray-600 text-md">{property.landArea} sqft</p>
              </div>
            </div>
  
            {/* Additional Information */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">Additional Details</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <p className="text-gray-700">
                  <strong>Category:</strong> {property.category}
                </p>
                <p className="text-gray-700">
                  <strong>Type:</strong> {property.type}
                </p>
                <p className="text-gray-700">
                  <strong>House Area:</strong> {property.houseArea} sqft
                </p>
                <p className="text-gray-700">
                  <strong>Floors:</strong> {property.numberOfFloors}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}
