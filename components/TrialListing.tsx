import ListingCard from "@/components/ListingCard";
import { getListingService } from "@/services/getListingService";
import axios from "axios";


// export const dynamic = "force-dynamic";
export default async function ListingsPage() {
  try {
        const data: any = await getListingService();

    if (!data || data.length === 0) {
      return (
        <div className="font-bold text-7xl flex items-center justify-center h-full">
          
        </div>
      );
    }

    return (
      <div id="listing-section" className="max-w-7xl mx-auto pb-10 px-4">
        <div className="text-4xl font-bold font-custom pb-6 text-center">Recent Listings</div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item :any, index: any) => (
            <div key={index} className="flex justify-center">
              <a href={`/listing/${item.id}`} className="w-full max-w-[400px]">
                <ListingCard 
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  beds={item.beds}
                  baths={item.baths}
                  sqft={item.sqft}
                  images={item.images}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }catch(e){
    <div>
      
    </div>
  }
}

// export const fetchCache = "force-no-store";
