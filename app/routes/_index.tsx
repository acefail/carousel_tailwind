import PromptCarousel from "~/components/Carousel";
import React from "react";
import nyan_cat from "~/assets/nyan-cat.gif";
import { Slide } from "~/components/interfaces/SlideProps";
//import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";


export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export default function Index() {
    const images = [
        {
            src:{nyan_cat},
            alt:"...release the cat",
            bg_color: "#2B2C5A"
        } as Slide,
        {
            src:{nyan_cat},
            alt:"...release the cat1",
            bg_color: "#8A2BE2"
        } as Slide,
        {
            src:{nyan_cat},
            alt:"...release the cat2",
            bg_color: "#000000"
        } as Slide,
        {
            src:{nyan_cat},
            alt:"...release the cat3",
            bg_color: "#9F2B68"
        } as Slide
    ];
  return (
     <>
        <PromptCarousel slides={images}></PromptCarousel>
    </>
  );
}
