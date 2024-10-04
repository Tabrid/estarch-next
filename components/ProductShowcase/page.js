'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import baseUrl from '../services/baseUrl'; // Ensure this points to your backend URL

const ProductShowcase = () => {
  const [homeImages, setHomeImages] = useState([]);
  useEffect(() => {
    const fetchHomeImageData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/home-image`);
        const data = await response.json();
        setHomeImages(data);
      } catch (error) {
        console.error('Error fetching home image data:', error);
      }
    };
  
    fetchHomeImageData();
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:mx-24 gap-5 mt-10 mx-4">
      {homeImages.length > 0 ? (
        homeImages.map((item, index) => (
          <div key={index} className="relative w-full">
            <Link href={item.link || '#'}>
              <Image
                width={400}
                height={0}
                src={item.images[0] ? `${baseUrl}/${item.images[0]}` : '/fallback-image.jpg'} // Use baseUrl here to ensure it's a valid URL
                alt={item.name}
                className="w-full h-auto"
                sizes='(max-width: 640px) 55vw, (max-width: 768px) 50vw, (max-width: 1024px) 800vw, 100vw'
              />
              <div className="absolute inset-0 flex items-end mb-5 justify-center text-white text-sm font-semibold">
                <p className="font-semibold bg-black bg-opacity-50 px-4 py-2 rounded">
                  {item.name}
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductShowcase;
