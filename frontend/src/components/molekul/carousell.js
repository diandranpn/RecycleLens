"use client"

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CarousellCard from "../atom/carousellCard";
import "swiper/css";

const Carousell = () => {
  const [slidesPerView, setSlidesPerView] = useState(3); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((row) => (
        <SwiperSlide key={row}>
          <CarousellCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousell;
