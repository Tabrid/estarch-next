import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../bestSell/BestSell-theme.css';
import axios from 'axios';
import baseUrl from '../services/baseUrl';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { openProductModal } from '@/lib/slices/productModalSlice';
import ProductModal from '../ProductModal/page';
import Image from 'next/image';

// Skeleton component using Tailwind CSS
const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-md rounded-none mx-4">
      <div className="bg-gray-300 animate-pulse h-64 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 animate-pulse mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 animate-pulse mb-2 w-1/4"></div>
      </div>
      <div className='text-center'>
        <div className="h-10 bg-gray-300 animate-pulse w-full"></div>
      </div>
    </div>
  );
};

export default function NewArrival() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/api/products/home-new-arrival`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching new arrivals:', err);
        setLoading(false);
      });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          className: "center",
          centerMode: true,
          centerPadding: "35px",
        }
      }
    ]
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const navigateToPage = (url) => {
    window.location.href = url; 
  };
  return (
    <div>
      <div className="slider-container mx-0 lg:mx-20">
        <h1 className='text-center mt-12 font-bold md:text-2xl lg:text-2xl text-lg'>NEW ARRIVAL PRODUCTS</h1>
        <div className='text-center mb-4'>
          <Link className='lg:text-xl font-normal text-orange-500' href={'/new-arrival'}>View All</Link>
        </div>
        <Slider {...settings}>
          {loading
            ? [...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : products.map((product, index) => (
              <div key={product?._id} className="card bg-base-100 shadow-md rounded-none">
                <div className='cursor-pointer' onClick={() => navigateToPage(`/product/${product?.productName}?sku=${product?.SKU}`)} >
                  <div>
                    <figure className='relative'>
                      <Image
                        src={`${baseUrl}/${product.images[0]}`}
                        width={320}
                        height={400}
                        priority={index === 0}
                        alt={product.productName}
                        sizes='(max-width: 640px) 60vw, (max-width: 768px) 60vw, (max-width: 1024px) 800vw, 100vw'
                      />
                      <p className='absolute top-2 bg-error text-white left-2 px-2 rounded-md'>New</p>
                    </figure>
                    <div className="pt-1 px-6">
                      <h2 className="md:text-[17px] text-[14px] font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                        {truncateText(product.productName, product.productName.length)}
                      </h2>
                      <div className='text-center'>

                        <>
                          <p className={`bg-black text-white mt-2 w-[40%] mx-auto mb-2 ${product.regularPrice - product.salePrice > 0 ? 'visible' : 'invisible'}`}>
                            Save Tk. {product.regularPrice - product.salePrice}
                          </p>
                          {
                            product.regularPrice - product.salePrice > 0 && (
                              <p className='my-1 text-[20px] text-black text-center'>
                                <span className=''>TK.</span>{product.salePrice}
                                <span className='md:text-[17px] line-through text-red-500'> Tk.{product.regularPrice}</span>
                              </p>
                            )
                          }
                        </>

                        {product.regularPrice - product.salePrice <= 0 && (
                          <p className='my-1 text-[20px] text-black text-center'>
                            <span className=''>TK.</span>{product.salePrice}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center'>
                  <button onClick={() => dispatch(openProductModal(product))} className=" bg-[#1E201E] text-white w-full py-2">BUY NOW</button>
                </div>
              </div>

            ))}
        </Slider>
      </div>
      <ProductModal />
    </div>
  );
}
