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
      <div id = "listing-section" className="max-w-7xl mx-auto pb-10">
        <div className="text-4xl font-bold font-custom pb-10">Trial Added</div>
        <div className="flex flex-wrap">
          {data.map((item: any, index: any) => (
            <div key={index} className="mx-auto my-2 sm:mx-2 ">
              <a href={`/listing/${item.id}`}>
                <ListingCard
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  price={item.price}
                  images={item.images}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="font-bold text-7xl flex items-center justify-center h-full">
        Error fetching data
      </div>
    );
  }
}

// export const fetchCache = "force-no-store";
