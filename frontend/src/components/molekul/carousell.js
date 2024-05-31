"use client"
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import CarousellCard from "../atom/carousellCard";

const Carousell = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/article/get-list');
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();

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

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }} 
      modules={[Autoplay]}   >
      {articles.map((article) => (
        <SwiperSlide key={article._id}>
          <CarousellCard
            row={article}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousell;
