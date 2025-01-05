"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function({images}: any){
    return (
        <Swiper
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="image-swiper"
    >
      {images.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <img
            src={`data:image/jpeg;base64,${image.url}`}
            alt={`Property Image ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
    
}