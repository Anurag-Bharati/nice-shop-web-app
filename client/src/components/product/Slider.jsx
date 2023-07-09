"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = ({ products }) => {
    return (
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="mySwiper h-full"
            style={{
                "--swiper-navigation-color": "#111",
                "--swiper-navigation-size": "30px",
                "--swiper-pagination-color": "#111",
            }}
        >
            <SwiperSlide>
                <img
                    src="https://images.unsplash.com/photo-1601807576163-587225545555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
                    alt="Image 1"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Image 2"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;
