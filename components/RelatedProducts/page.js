'use client'

import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from 'axios';
import baseUrl from '../services/baseUrl';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { openProductModal } from '@/lib/slices/productModalSlice';
import ProductModal from '../ProductModal/page';
export default function RelatedProductsSinglePage() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${baseUrl}/api/products/feature-products`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(() => {
      });
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const navigateToPage = (url) => {
    window.location.href = url;
};
  return (
    <div>
      <div className="slider-container mx-0 lg:mx-20">
        <h1 className='text-center mb-4 mt-8 font-bold md:text-2xl text-xl uppercase'>You May Also Like</h1>

        <div className="col-span-10 gap-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card card-compact bg-base-200 shadow-lg rounded-none relative border-2 border-base-200 hover:border-blue-300"
            >
              <div className='cursor-pointer' onClick={() => navigateToPage(`/product/${product?.productName}?sku=${product?.SKU}`)}>
                <figure>
                  <Image sizes="30vw" src={`${baseUrl}/${product.images[0]}`} alt={product.productName} width={350}
                    height={400} />
                </figure>
                <div className="pt-1 lg:px-6 px-2">
                  <h2 className="md:text-[15px] text-[12px] font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {truncateText(product.productName, product.productName.length)}
                  </h2>
                  <div className='text-center'>
                    <div className="">
                      <p className={`bg-black text-white text-sm md:text-[14px] mt-2 md:mx-8 mx-4 ${product.regularPrice - product.salePrice > 0 ? 'visible' : 'invisible'}`}>
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
              </div>
              <div className='text-center shadow-lg  w-full bottom-0'>

                <button onClick={() => dispatch(openProductModal(product))} className=" bg-[#1E201E] text-white w-full md:py-2 py-1">BUY NOW</button>

              </div>
            </div>
          ))}

        </div>
      </div>
      <ProductModal />

    </div>
  )
}
