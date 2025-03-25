"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

// import dynamic from 'next/dynamic';



// export default function({images}: any){
//     return (
//         <Swiper
//       pagination={{ clickable: true }}
//       navigation={true}
//       modules={[Pagination, Navigation]}
//       className="image-swiper"
//     >
//       {images.map((image: any, index: any) => (
//         <SwiperSlide key={index}>
//           <img
//             src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
//             alt={`Property Image ${index + 1}`}
//             className="w-full h-auto object-cover"
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );

// }



export default function SwiperComponent({ images }: any) {
  // Check if images is an array and has elements
  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images available</div>; // Or you can return an empty div or placeholder
  }

  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="image-swiper w-full h-full"
    >
      {images.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
            alt={`Property Image ${index + 1}`}
            className="w-full h-full object-cover"
            
          />
          {/* <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
            alt={`Property Image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            unoptimized
          /> */}


        </SwiperSlide>
      ))}
    </Swiper>
  );
}
