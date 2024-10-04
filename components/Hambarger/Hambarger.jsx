'use client';

import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import cupon from '../../public/images/Tshirt Web Slide.jpg';
import { closeSlide } from '@/lib/slices/sliderSlice';
import baseUrl from '../services/baseUrl';
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

function Hambarger() {
    const [categories, setCategories] = useState({});
    const [openTypes, setOpenTypes] = useState([]);
    const [openCategories, setOpenCategories] = useState([]);
    const isOpen = useSelector((state) => state.slide.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/categories/categories`);
                const groupedCategories = response.data
                    .filter(category => category.active) // Filter to include only active categories
                    .reduce((acc, category) => {
                        const typeName = category.type.name;

                        if (!acc[typeName]) {
                            acc[typeName] = [];
                        }

                        acc[typeName].push(category);
                        return acc;
                    }, {});

                setCategories(groupedCategories);

                // Automatically open all types initially
                setOpenTypes(Object.keys(groupedCategories));

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleTypeToggle = (typeName) => {
        setOpenTypes(prevTypes =>
            prevTypes.includes(typeName) ? prevTypes.filter(type => type !== typeName) : [...prevTypes, typeName]
        );
    };

    const handleCategoryToggle = (categoryId) => {
        setOpenCategories(prevCategories =>
            prevCategories.includes(categoryId) ? prevCategories.filter(id => id !== categoryId) : [...prevCategories, categoryId]
        );
    };

    return (
        <div className={`lg:hidden md:hidden`}>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-[99998] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => dispatch(closeSlide())}
            ></div>

            {/* Sidebar */}
            <div  className={`bg-base-100 fixed top-0 left-0 w-72 min-h-screen z-[99999] transition-right duration-500 ${isOpen ? 'right-0' : 'right-[-350px] hidden'}`}>
                <div
                    className={``}
                >
                    <p className="cursor-pointer relative left-[90%] top-3 text-2xl">
                        <IoMdClose onClick={() => dispatch(closeSlide())} />
                    </p>
                    <div className="my-6">
                        <hr />
                    </div>

                    <Image
                        src={cupon}
                        alt="Discount"
                        height={20}
                        width={600}
                        className="mx-auto"
                    />

                    <ul className="px-4 text-[#3d3d3d] text-[18px] mt-2 overflow-y-scroll h-[500px] no-scrollbar">
                        {Object.keys(categories).map((typeName) => (
                            <div className='mb-2' key={typeName}>
                                {/* Main Category Type */}
                                <li
                                    onClick={() => handleTypeToggle(typeName)}
                                    className="flex items-center justify-between uppercase font-semibold cursor-pointer"
                                >
                                    {typeName}
                                    <span
                                        className={`transition-transform duration-300 ${openTypes.includes(typeName) ? 'rotate-180' : ''
                                            }`}
                                    >
                                        {openTypes.includes(typeName) ? <FiMinus /> : <GoPlus />}
                                    </span>
                                </li>

                                {/* Categories under the selected type */}
                                {openTypes.includes(typeName) && (
                                    <ul
                                        className={`ml-3 space-y-1 text-[16px] transition-opacity ease-in-out duration-300`}
                                    >
                                        {categories[typeName].map((category) => (
                                            <div key={category._id}>
                                                <li
                                                    className="flex items-center justify-between cursor-pointer"
                                                >
                                                    <Link href={`/${typeName.toLowerCase()}/${category.name}`}>
                                                        {category.name}
                                                    </Link>
                                                    {
                                                        category.subcategories.length > 0 ? <span
                                                            className={`transition-transform duration-300 ${openCategories.includes(category._id) ? 'rotate-180' : ''
                                                                }`}
                                                        >
                                                            {openCategories.includes(category._id) ? <FiMinus onClick={() => handleCategoryToggle(category._id)} /> : <GoPlus onClick={() => handleCategoryToggle(category._id)} />}
                                                        </span> : null
                                                    }
                                                </li>

                                                {/* Subcategories under the selected category */}
                                                {openCategories.includes(category._id) && category.subcategories && (
                                                    <ul className="ml-3 space-y-1 text-[15px]">
                                                        {category.subcategories
                                                            .filter(subcategory => subcategory.active) // Filter to include only active subcategories
                                                            .map((subcategory) => (
                                                                <li className='italic opacity-80' key={subcategory._id}>
                                                                    <Link href={`/${typeName.toLowerCase()}/${category.name}/${subcategory.name}`}>
                                                                        {subcategory.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Hambarger;
