
// export default function ({ title, description, location, price, image }: any) {
//     console.log("Images is ", image)
//     return (
//         <div className="border p-2 w-[300px]">
//             <div className="w-36 h-36 border-2 border-black mb-10 mx-auto"></div>
//             <div className="font-custom text-3xl font-bold">{title}</div>
//             <div>
//                 {description.length > 35 ? `${description.substring(0, 35)}...` : description}
//             </div>

import SwiperComponent from "./SwiperComponent";

//             <div>  {location.length > 35 ? `${location.substring(0, 35)}...` : location}</div>
//             <div>Rs. {price}</div>
            
//         </div>
//     )
// }

// export default function ListingCard({ title, description, location, price, images }: any) {
//   return (
//     <div className="border p-2 max-w-[300px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-[400px] flex flex-col">
//       {/* Image Container */}
//       <div className="border-2 border-black mb-4 mx-auto h-[200px] overflow-hidden w-full">
//         {images && images.length > 0 ? (
//           <SwiperComponent images={images} />
//         ) : (
//           <p>No images available</p>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-col flex-1 justify-between">
//         <div className="font-custom text-2xl sm:text-3xl font-bold mb-2">{title}</div>
//         <div className="mb-2">
//           {description.length > 35 ? `${description.substring(0, 35)}...` : description}
//         </div>
//         <div className="mb-2">
//           {location.length > 35 ? `${location.substring(0, 35)}...` : location}
//         </div>
//         <div>Rs. {price}</div>
//       </div>
//     </div>
//   );
// }

export default function ListingCard({ title, description, location, price, oldPrice, beds, baths, sqft, images }: any) {
  return (
    <div className="relative max-w-[400px] sm:w-[350px] md:w-[380px] lg:w-[430px] h-auto mb-20">
      {/* Background Card (Image) */}
      <div className="relative h-[250px] w-full rounded-lg overflow-hidden shadow-lg">
        {images && images.length > 0 ? (
          <SwiperComponent images={images} />
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>
      
      {/* Foreground Card (Info) */}
      <div className="absolute top-[75%] left-[10%] right-[5%] bg-white p-4 shadow-lg rounded-lg z-10">
        {/* Price Info */}
        <div className="mb-2">
          <span className="text-gray-500 line-through">Rs. {oldPrice}</span>
          <span className="text-black font-bold text-lg"> Rs. {price}/mo</span>
        </div>
        
        {/* Property Details */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="mr-2">🏡 {beds}</span>
          <span className="mr-2">🚿 {baths}</span>
          <span>🏢 {sqft} sqft</span>
        </div>
        
        {/* Title and Location */}
        <div className="text-lg font-bold">{title}</div>
        <div className="text-gray-500">{location}</div>
      </div>
      
     
    </div>
  );
}




