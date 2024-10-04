"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import baseUrl from '@/components/services/baseUrl';

const SkeletonLoader = () => {
    return (
        <div className="relative flex justify-center items-center mt-5 bg-gray-100">
            <div className="relative w-full h-[150px] lg:h-[500px] md:h-[500px]">
                {/* Placeholder for Image */}
                <div className="bg-gray-300 w-full h-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-center items-center text-white">
                <div className="absolute text-center">
                    {/* Placeholder for content */}
                </div>
            </div>
        </div>
    );
}

export default function Man() {
    const [categories, setCategories] = useState([]);
    const { category } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}/api/categories/categories/${category}`)
            .then(res => {
                const activeCategories = res.data.filter(category => category.active);
                setCategories(activeCategories);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
                setLoading(false);
            });
    }, [category]);

    return (
        <div className="bg-white">
            {loading ? (
                <SkeletonLoader />
            ) : (
                <div className="relative flex justify-center items-center mt-5 bg-gray-100">
                    <div className="relative w-full h-[150px] lg:h-[500px] md:h-[500px]">
                        <Image
                            src={`${baseUrl}/${categories[0]?.type?.image}`}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="opacity-100"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-center items-center text-white">
                        <div className="absolute text-center">
                            {/* Content */}
                        </div>
                    </div>
                </div>
            )}
            <div className="grid lg:grid-cols-3 grid-cols-2 justify-center items-center px-2 py-2 lg:py-5 lg:px-5 gap-5 box-border">
                {categories.map(cat => (
                    <div key={cat._id} className="relative w-full max-w-[600px] h-auto">
                        <Link href={`/${category}/${cat.name}`}>
                            <Image
                                width={480}
                                height={300}
                                src={`${baseUrl}/${cat.image}`}
                                alt={cat.name}
                                className="rounded-lg block w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white rounded-lg">
                                <h2 className="bg-[#0000005e] lg:text-lg rounded-md text-[8px] border-2 py-1 px-2">
                                    {cat.name}
                                </h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
