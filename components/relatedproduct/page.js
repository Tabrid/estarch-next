'use client'

import React from 'react'
import Slider from "react-slick";
import img from '../../public/images/product_img.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './relatedProduct.css'
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
export default function RelatedProducts() {
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
  const products = [
    { id: 1, title: "Premium Solid T Shirt for Men I MF-432", price: "TK. 999", oldPrice: "Tk. 1499", image: img },
    { id: 1, title: "Premium Solid T Shirt for Men I MF-432", price: "TK. 999", oldPrice: "Tk. 1499", image: img },
    { id: 1, title: "Premium Solid T Shirt for Men I MF-432", price: "TK. 999", oldPrice: "Tk. 1499", image: img },
    { id: 1, title: "Premium Solid T Shirt for Men I MF-432", price: "TK. 999", oldPrice: "Tk. 1499", image: img },
    // Add more product objects as needed
  ];

  return (
    <div>
    <div className="slider-container mx-0 lg:mx-20">
      <h1 className='text-center mb-4 mt-8 font-bold md:text-2xl text-xl'>Related Product</h1>
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <Image src={product.image} alt={product.title} />
            </figure>
            <div className="card-body">
              <h2 className="md:card-title">{product.title}</h2>
              <p className='md:text-[20px] text-gray-500'>{product.price} <span className='md:text-[17px] line-through'>{product.oldPrice}</span></p>
              <div className="card-actions justify-center">
                <Link href={`/product/${product.id}`}>
                  <button className="btn btn-sm mt-4 px-12 shadow-md">Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
  )
}


