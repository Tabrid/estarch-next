"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { useParams } from "next/navigation";
import baseUrl from "@/components/services/baseUrl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openProductModal } from "@/lib/slices/productModalSlice";
import ProductModal from "@/components/ProductModal/page";

const CategoryProduct = () => {
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [products, setProducts] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [uniqueSizes, setUniqueSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState('Sort by Serial');
    const [index, setIndex] = useState(20)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const { catName } = useParams()
    const { category } = useParams()


    const allRanges = [
        { min: 100, max: 300 },
        { min: 301, max: 500 },
        { min: 501, max: 1000 },
        { min: 1001, max: 2500 },
        { min: 2501, max: 5000 },
        { min: 5001, max: 10000 },
    ];

    // Fetch products from the backend
    useEffect(() => {
        setLoading(true);
        const selectedCategory = products[0]?.selectedCategory;

        const fetchProducts = async () => {
            let url = `${baseUrl}/api/products/products/category/products/${catName}`;


            // Add ranges to the query string if there are selected ranges
            if (selectedRanges.length > 0) {
                const rangesQuery = JSON.stringify(selectedRanges);
                url += `?ranges=${encodeURIComponent(rangesQuery)}`;
            }

            // Add subcategories to the query string if there are selected subcategories
            if (selectedSubcategories.length > 0) {
                const subcategoriesQuery = JSON.stringify(selectedSubcategories);
                const delimiter = url.includes('?') ? '&' : '?';
                url += `${delimiter}subcategories=${encodeURIComponent(subcategoriesQuery)}`;
            }

            // Add sizes to the query string if there are selected sizes
            if (selectedSizes.length > 0) {
                const sizesQuery = JSON.stringify(selectedSizes);
                const delimiter = url.includes('?') ? '&' : '?';
                url += `${delimiter}sizes=${encodeURIComponent(sizesQuery)}`;
            }

            // Add sortBy to the query string
            const delimiter = url.includes('?') ? '&' : '?';
            url += `${delimiter}sortBy=${encodeURIComponent(sortBy)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
                extractUniqueSizes(data); // Extract unique sizes from products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchSubcategories = async () => {
            if (selectedCategory) {
                try {
                    const response = await axios.get(`${baseUrl}/api/categories/subcategories/${selectedCategory}`);
                    setSubcategories(response.data);
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                }
            }
        };

        fetchSubcategories();

        fetchProducts();
    }, [selectedRanges, selectedSubcategories, selectedSizes, sortBy, products[0]?.selectedCategory]);

    // Sort
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    const handleCheckboxChangeCat = (subcategory) => {
        setSelectedSubcategories((prevSubcategories) =>
            prevSubcategories.includes(subcategory)
                ? prevSubcategories.filter((c) => c !== subcategory) // Uncheck if already selected
                : [...prevSubcategories, subcategory] // Check if not selected
        );
    };


    // Handle checkbox changes for sizes
    const handleCheckboxChangeSize = (size) => {
        setSelectedSizes(prevSizes =>
            prevSizes.includes(size)
                ? prevSizes.filter(s => s !== size) // Uncheck if already selected
                : [...prevSizes, size] // Check if not selected
        );
    };

    // Handle checkbox changes for price ranges
    const handleCheckboxChange = (range) => {
        setSelectedRanges((prevSelected) => {
            const isSelected = prevSelected.some(
                (selectedRange) => selectedRange.min === range.min && selectedRange.max === range.max
            );

            if (isSelected) {
                return prevSelected.filter(
                    (selectedRange) => !(selectedRange.min === range.min && selectedRange.max === range.max)
                );
            } else {
                return [...prevSelected, range];
            }
        });
    };


    const extractUniqueSizes = (products) => {
        const sizes = new Set();
        products.forEach(product => {
            if (product.selectedSizes) {
                product.selectedSizes.forEach(size => sizes.add(size));
            }
        });
        setUniqueSizes(Array.from(sizes));
    };


    const SkeletonCard = () => (
        <div className="flex flex-col gap-4">
            <div className="skeleton h-56 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="h-4 w-96"></div>
        </div>
    );

    return (
        <div className="mx-4 lg:mx-12 mt-5 mb-8">
            {/* Upper part */}
            <div className="flex justify-between items-center mb-4">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li>
                            <Link className="uppercase" href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link href={`/${category}`} className="uppercase font-bold">{category}</Link>
                        </li>
                        <li>
                            <Link href={`/${category}/${catName}`} className="uppercase font-bold">{decodeURIComponent(catName)}</Link>
                        </li>
                    </ul>
                </div>
                <label className="form-control w-full max-w-[30%] md:max-w-[10%] lg:flex hidden">
                    <select className="select select-bordered select-sm" value={sortBy} onChange={handleSortChange}>
                        <option disabled>Sort By</option>
                        <option>Sort by Serial</option>
                        <option>Sort by Latest</option>
                        <option>Price High to Low</option>
                        <option>Price Low to High</option>
                    </select>
                </label>
            </div>

            {/* filter button */}
            <div className="flex gap-3">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-sm drawer-button lg:hidden mb-4"
                >
                    <span>
                        <p>
                            <CiFilter />
                        </p>
                    </span>{" "}
                    Filter
                </label>
                <label
                    className="btn btn-sm drawer-button lg:hidden mb-4"
                >
                    <span>
                        <p>
                            {products.length}
                        </p>
                    </span>{" "}
                    items
                </label>
                <label className="form-control w-full max-w-[40%] md:max-w-[15%] flex lg:hidden">
                    <select className="select select-bordered select-sm" value={sortBy} onChange={handleSortChange}>
                        <option disabled>Sort By</option>
                        <option>Sort by Serial</option>
                        <option>Sort by Latest</option>
                        <option>Price High to Low</option>
                        <option>Price Low to High</option>
                    </select>
                </label>
            </div>

            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start">
                    {/* Products */}
                    <div className="col-span-10 gap-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {loading
                            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
                            : products.slice(0, index).map((product) => (
                                <div
                                key={product._id}
                                className="card card-compact bg-base-200 shadow-lg rounded-none relative border-2 border-base-200 hover:border-blue-300"
                            >
                                <Link href={`/product/${product?.productName}?sku=${product?.SKU}`}>
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
                                </Link>
                                <div className='text-center shadow-lg  w-full bottom-0'>
     
                                    <button onClick={() => dispatch(openProductModal(product))} className=" bg-[#1E201E] text-white w-full md:py-2 py-1">BUY NOW</button>
     
                                </div>
                            </div>
                            ))}
                        <div className="place-self-center md:col-span-4 col-span-2">
                            <button
                                onClick={() => setIndex(index + 20)}
                                className={`btn flex items-center gap-1 btn-sm btn-primary text-white ${products.length <= index ? "hidden" : "grid"
                                    }`}
                            >
                                SEE MORE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="drawer-side h-full lg:h-screen z-[99999]">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu lg:bg-white bg-base-200 min-h-full text-base-content lg:h-full w-60 p-4 sticky">
                        {/* Filter */}
                        <div className="mr-8">
                            <h1 className="text-xl">FILTER BY</h1>
                            <hr className="border-2 border-orange-300 max-w-[45%]" />

                            {/* PRICE */}
                            <div>
                                <h1 className='mt-4 text-gray-400'>PRICE</h1>
                                <hr className='border-2' />
                                <hr className='border-2 border-orange-300 max-w-[25%] mt-[-3px]' />
                                <div className='mt-2'>
                                    {allRanges.map((range, index) => (
                                        <div key={index} className="form-control">
                                            <label className="label cursor-pointer flex justify-start gap-4">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm"
                                                    checked={selectedRanges.some(
                                                        (selectedRange) => selectedRange.min === range.min && selectedRange.max === range.max
                                                    )}
                                                    onChange={() => handleCheckboxChange(range)}
                                                />
                                                <span className="label-text">
                                                    {range.min.toLocaleString()} TO {range.max.toLocaleString()}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* SIZE */}
                            <div>
                                <h1 className="mt-4 text-gray-400">Sizes</h1>
                                <hr className="border-2" />
                                <hr className="border-2 border-orange-300 max-w-[25%] mt-[-3px]" />
                                <div className='mt-2'>
                                    {uniqueSizes.map((size, index) => (
                                        <div key={index} className="form-control">
                                            <label className="label cursor-pointer flex justify-start gap-4">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm"
                                                    checked={selectedSizes.includes(size)}
                                                    onChange={() => handleCheckboxChangeSize(size)}
                                                />
                                                <span className="label-text">
                                                    {size}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sub-Category */}
                            <div>
                                <h1 className="mt-4 text-gray-400">Sub-Category</h1>
                                <hr className="border-2" />
                                <hr className="border-2 border-orange-300 max-w-[60%] mt-[-3px]" />
                                <div className='mt-2'>
                                    {subcategories.map((subcategory, index) => (
                                        <div key={index} className="form-control">
                                            <label className="label cursor-pointer flex justify-start gap-4">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm"
                                                    checked={selectedSubcategories.includes(subcategory.name)}
                                                    onChange={() => handleCheckboxChangeCat(subcategory.name)}
                                                />
                                                <span className="label-text">
                                                    {subcategory.name}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </ul>
                </div>
            </div>
            <ProductModal />
        </div>
    );
};

export default CategoryProduct;
