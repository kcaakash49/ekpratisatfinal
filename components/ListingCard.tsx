
// export default function ({ title, description, location, price, image }: any) {
//     console.log("Images is ", image)
//     return (
//         <div className="border p-2 w-[300px]">
//             <div className="w-36 h-36 border-2 border-black mb-10 mx-auto"></div>
//             <div className="font-custom text-3xl font-bold">{title}</div>
//             <div>
//                 {description.length > 35 ? `${description.substring(0, 35)}...` : description}
//             </div>

//             <div>  {location.length > 35 ? `${location.substring(0, 35)}...` : location}</div>
//             <div>Rs. {price}</div>
            
//         </div>
//     )
// }

export default function ListingCard({ title, description, location, price, images }: any) {
    console.log("Received images:", images);
  
    return (
      <div className="border p-2 w-[300px]">
        <div className=" border-2 border-black mb-10 mx-auto">
          {images && images.length > 0 ? (
            images.map((image: { id: number; url: string }, index: number) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${image.url}`}
                alt={`Listing Image ${image.id}`}
                className="w-full h-full object-cover"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="font-custom text-3xl font-bold">{title}</div>
        <div>
          {description.length > 35 ? `${description.substring(0, 35)}...` : description}
        </div>
        <div>
          {location.length > 35 ? `${location.substring(0, 35)}...` : location}
        </div>
        <div>Rs. {price}</div>
      </div>
    );
  }
  