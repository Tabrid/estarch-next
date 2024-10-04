'use client'

import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import img from '../../public/images/product_img.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../services/baseUrl';
import { useDispatch } from 'react-redux';
import ProductModal from '../ProductModal/page';
import { openProductModal } from '@/lib/slices/productModalSlice';
export default function ExtraSection2() {


    const dispatch = useDispatch();
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [products, setProducts] = useState([])
    const [extraSection, setExtraSection] = useState(null)
    const [typeName, setTypeName] = useState(null)
    const [categoryName, setCategoryName] = useState(null)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Getting extra Section
        axios.get(`${baseUrl}/api/extra-section`)
            .then(res => {
                setExtraSection(res.data)
            })
    }, [extraSection?.type2])

    useEffect(() => {
        if (extraSection?.type2 === 'Category') {
            axios.get(`${baseUrl}/api/products/products/category/products/${encodeURIComponent(extraSection?.name2)}`)
                .then(res => {
                    setProducts(res.data)
                })

        } else if (extraSection?.type2 === 'Subcategory') {
            axios.get(`${baseUrl}/api/products/products/subcategory/home/${encodeURIComponent(extraSection?.name2)}`)
                .then(res => {
                    setProducts(res.data.products)
                    setCategoryName(res.data.subcategory?.category?.name)
                    axios.get(`${baseUrl}/api/types/${res.data.subcategory?.category?.type}`)
                        .then(res => {
                            setTypeName(res.data.name)
                        })
                })

        } else {
            console.log("Not accepted");

        }
    }, [extraSection?.name2, extraSection?.type2])

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div className={`${products.length < 1 ? 'hidden' : ''}`}>
            <div className="slider-container mx-0 lg:mx-20">
                <h1 className='text-center mt-8 font-bold md:text-2xl lg:text-2xl text-lg uppercase'>{extraSection?.name2} Section</h1>
                <div className='text-center mb-4'>
                    {
                        extraSection?.type2 === "Category" ?
                            <Link className='lg:text-xl font-normal text-orange-500' href={`/${products[0]?.selectedType}/${extraSection?.name2}`}>View All</Link>
                            :
                            <Link className='lg:text-xl font-normal text-orange-500' href={`/${typeName}/${categoryName}/${extraSection?.name2}`}>View All</Link>
                    }
                </div>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className="card card-compact bg-base-200 shadow-none  rounded-none relative border-2 border-base-200 hover:border-blue-300"
                        >
                            <Link href={`/product/${product?.productName}?sku=${product?.SKU}`}>
                                <figure>
                                    <Image
                                        src={`${baseUrl}/${product.images[0]}`}
                                        width={320}
                                        height={400}
                                        priority={index === 0}
                                        alt={product.productName}
                                        sizes='(max-width: 640px) 60vw, (max-width: 768px) 60vw, (max-width: 1024px) 800vw, 100vw'
                                    />
                                </figure>
                                <div className="pt-1 lg:px-6 px-2">
                                    <h2 className="md:text-[15px] text-[12px] font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                                        {truncateText(product.productName, product.productName.length)}
                                    </h2>
                                    <div className='text-center'>
                                        <div className="">
                                            <p className={`bg-black text-white text-sm md:text-[14px] mt-2 md:mx-14 mx-6 ${product.regularPrice - product.salePrice > 0 ? 'visible' : 'invisible'}`}>
                                                Save Tk. {product.regularPrice - product.salePrice}
                                            </p>
                                            {
                                                product.regularPrice - product.salePrice > 0 && (
                                                    <p className='my-1 text-[16px] md:text-[20px] text-black text-center '>
                                                        <span>TK.</span>{product.salePrice}
                                                        <span className='md:text-[17px] text-sm line-through text-red-500'> Tk.{product.regularPrice}</span>
                                                    </p>
                                                )
                                            }
                                        </div>

                                        {product.regularPrice - product.salePrice <= 0 && (
                                            <p className='my-1 text-[17px] md:text-[20px] text-black text-center bottom-8 md:bottom-10 left-14 md:left-[110px]'>
                                                <span className=''>TK.</span>{product.salePrice}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className='text-center shadow-lg  w-full bottom-0'>

                                <button onClick={() => dispatch(openProductModal(product))} className=" bg-[#1E201E] text-white w-full md:py-2 py-1">BUY NOW</button>

                            </div>
                        </div>
                    ))}
                </Slider>
                <ProductModal />
            </div>
        </div>
    )
}
