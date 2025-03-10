import CategoryListingComponent from "./CategoryListingComponent";


export default function({listing}: {listing:any}){
    return (
        <div className="max-w-7xl mx-auto">
            {
            listing?.map((item: any, index: any) => (
                <div key = {index} className="m-4">
                    <a href={`/listing/${item.id}`}>
                        <CategoryListingComponent title = {item.title} description = {item.description} type = {item.type} images = {item.images} price = {item.price} location = {item.location} rooms = {item.bedrooms} bathrooms = {item.numberofbathrooms} verified={item.verified}/>
                    </a>
                </div>
            ))
        }
        </div>
    )
}