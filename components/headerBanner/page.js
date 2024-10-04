'use client';  // Ensure it's a client component

import React, { useEffect, useState } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import baseUrl from '../services/baseUrl';  // Adjust this path based on your project structure
import './styles.css';  // Ensure you have the correct styles for Swiper
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

export default function HeaderBanner() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/carosul`);
        const data = await response.json();
        setCarousels(data);
      } catch (error) {
        console.error('Error fetching carousels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);  // Empty dependency array to fetch once on mount

  return (
    <div className="max-h-[600px] mt-4 lg:mt-8 md:mt-4">
      <div className="relative">
        <Swiper
          pagination={{ clickable: true }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {loading ? (
            <SwiperSlide className="w-full">
              <p className='flex justify-center'><PropagateLoader color="#060101" /></p>
            </SwiperSlide>
          ) : (
            carousels.length > 0 ? (
              carousels.map((carousel, index) => (
                <SwiperSlide key={index} className="w-full">
                  <Link href={carousel.link}>
                  <Image
                      className="overflow-hidden md:max-h-[600px] w-full"
                      src={`${baseUrl}/${carousel.images[0]}`}
                      alt={`Carousel Image ${index + 1}`}
                      width={1200}
                      height={600}
                      sizes='(max-width: 640px) 100vw, (max-width: 768px) 70vw, (max-width: 1024px) 100vw, 100vw'
                     
                      loading={index === 0 ? 'eager' : 'lazy'}  // Eager load the first image, lazy load the rest
                    />
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="w-full">
                <p className='flex justify-center'>No data available</p>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
