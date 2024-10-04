'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Autoplay } from 'swiper/modules';
import axios from 'axios';
import Link from 'next/link';
import baseUrl from '../services/baseUrl';
import './styles.css';
import Image from 'next/image';

const SellingCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        axios.get(`${baseUrl}/api/categories/categories`)
            .then(res => {
                const activeCategories = res.data.filter(category => category.active);
                setCategories(activeCategories);
                setLoading(false); 
            })
            .catch(() => {
                setLoading(false); 
            });
    }, []);
    

    return (
        <div className='mx-4 md:mx-12 lg:mx-20'>
            <h1 className='text-center mt-4 md:mt-8 lg:mt-8 font-bold md:text-2xl lg:text-2xl pb-5'>
                BROWSE OUR CATEGORY
            </h1>
            <Swiper
                slidesPerView={4}
                navigation={true}
                spaceBetween={30}
                freeMode={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[FreeMode, Navigation,Autoplay]}
                className="mySwiper"
            >
                {loading ? (
                    // Render 4 skeletons (or more, depending on your design)
                    Array.from({ length: 4 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <CategorySkeleton />
                        </SwiperSlide>
                    ))
                ) : (
                    categories.map(cat => (
                        <SwiperSlide key={cat._id}>
                            <Link href={`${cat?.type?.name}/${cat.name}`}>
                                <div className="relative text-center rounded-md w-[162px] lg:w-[302px] h-[100px] lg:h-[180px]">
                                    <Image
                                        src={`${baseUrl}/${cat.image}`}
                                        alt={cat.name}
                                        width={500}
                                        height={180}
                                        sizes='(max-width: 640px) 30vw, (max-width: 768px) 50vw, (max-width: 1024px) 800vw, 100vw'
                                        className="rounded-md object-cover"
                                    />
                                    <div className="absolute z-10 mt-12 inset-0 lg:mt-20  bg-opacity-30 flex justify-center items-center">
                                        <button className="bg-[#0000005e]  lg:text-sm text-white rounded-md text-[8px] border-2 py-1 px-2">
                                            {cat.name}
                                        </button>
                                    </div>
                                    <div className="absolute rounded-lg inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

function CategorySkeleton() {
    return (
        <div className='relative text-center rounded-md bg-gray-300 animate-pulse w-[162px] lg:w-[302px] h-[100px] lg:h-[180px]'>
            <div className='absolute inset-0 bg-gray-300'></div>
            <div className="absolute inset-0 bg-gray-400 rounded-md opacity-50"></div>
            <div className='relative text-[8px] md:text-sm top-14 lg:top-32 px-3 text-white rounded-lg py-1 bg-[#00000058] z-20 border-2'>
                <div className='h-3 w-3/4 bg-gray-300 rounded-md mx-auto'></div>
            </div>
        </div>
    );
}

export default SellingCategory;
