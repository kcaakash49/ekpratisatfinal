import { getUserFavouritesAction } from "@/action/getUserFavouritesAction";
import { NEXT_AUTH } from "@/app/lib/auth";

import MyListingCard from "@/components/MyListingCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function FavouritesPage() {
    const session: any = getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/");
    }
    
    const response: any = await getUserFavouritesAction(session?.user?.id);

    // Return "Nothing found" if there are no favourites
    if (response.length === 0) {
        return <div className="h-full flex items-center justify-center">Nothing found</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-2xl font-semibold mb-4">My Favourites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {response?.map((item: any, index: any) => (
                    
                    <a href={`/listing/${item.id}`} key={index} className="flex justify-center">
                        <MyListingCard
                            title={item.title}
                            location={item.location}
                            price={item.price}
                            images={item.images}
                            type={item.type}
                            created={item.created}
                            id={item.id}
                            isFavourite={true}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}
