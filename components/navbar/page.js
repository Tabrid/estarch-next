'use client';

import React, { useContext, useEffect, useState } from 'react';
import { BiMessageAltDots } from "react-icons/bi";
import { FaCaretDown, FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import logo from '../../public/images/LOGO 1.png';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { openSlide } from '@/lib/slices/sliderSlice';
import { openCardSlide } from '@/lib/slices/cardSlideSlice';
import { AuthContext } from '../context/AuthProvider';
import baseUrl from '../services/baseUrl';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function NavBar() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { authUser } = useContext(AuthContext)
  const [types, setTypes] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);  // State to toggle search input visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]); // State to hold all products
  const [filteredProduct, setFilteredProduct] = useState([]); // State to hold filtered products
  const [productValue, setProductValue] = useState('');
  const router = useRouter()
  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products/navbar-search`);
        const data = await response.json();
        setProducts(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on the input value
  useEffect(() => {
    if (productValue) {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(productValue.toLowerCase()) ||
        product.SKU.toLowerCase().includes(productValue.toLowerCase())
      );
      setFilteredProduct(filtered);
    } else {
      setFilteredProduct([]);
    }
  }, [productValue, products]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    axios.get(`${baseUrl}/api/types`)
      .then(res => {
        setTypes(res.data)
      })

  }, [])

  const clickProduct = (p) => {
    router.push(`/product/${p.productName}?sku=${p.SKU}`)
    setProductValue('')
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setProductValue('');
    setFilteredProduct([]);
  };
  const handleCart = () =>{
    dispatch(openCardSlide())
  }



  return (
    <div className="">
      <div className="md:px-10 lg:px-10 bg-base-100 shadow-sm md:shadow-none navbar border-b fixed lg:relative top-0 z-[99999]">
        <div className="navbar-start ">
          <div className='hidden lg:block md:block'>
            <div className='gap-4 flex'>
              <div className="flex items-center gap-1 justify-center">
                <BiMessageAltDots className="w-[16px]" />
                <p className="text-xs">Contact Us</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xs">Download app</p>
                <p className="w-[20px] h-[20px] border flex items-center justify-center"><FaGooglePlay className="w-[14px]" /></p>
                <p className="w-[20px] h-[20px] border flex items-center justify-center"><FaApple className="w-[14px]" /></p>
              </div>
            </div>
          </div>
          <div className='text-black text-[30px] lg:hidden md:hidden'>
            <IoMdMenu onClick={() => dispatch(openSlide())} />
          </div>
        </div>
        <div className="navbar-center ">
          <Link href="/"> <Image width={150} height={20} className="h-8" src={logo} alt="logo" /></Link>
        </div>
        {!authUser ? <div className="navbar-end">
          <div className='hidden lg:block md:block'>
            <div className="group relative cursor-pointer bg-white hover:bg-white">
              <div className="flex items-center gap-[2px] text-base font-semibold">
                <div className="flex items-center gap-1 justify-center">
                  <CgProfile className="w-[16px]" />
                  <p className="text-xs">Log In / Sign Up</p>
                </div>
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </div>
              <div className="absolute z-10 bg-white right-1 hidden w-52 rounded-md h-28 p-2 text-black group-hover:block">
                <ul className="bg-white w-52 p-5">
                  <li className="text-base hover:bg-base-100"><Link href="/login">Login</Link></li>
                  <div className="divider h-1"></div>
                  <li className="text-base hover:bg-base-100"><Link href='/register'>Register</Link></li>
                  <div className="divider h-1"></div>
                  <li className="text-base hover:bg-base-100">Order Tracking</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex gap-3 ml-10 lg:hidden md:hidden">
            <CiSearch className="text-[30px] cursor-pointer opacity-70" onClick={toggleSearch} />
            <div className="relative" onClick={() => handleCart()}>
              <HiOutlineShoppingBag className="relative text-2xl" />
              {totalQuantity > 0 && (
                <span className="bg-red-600 text-white rounded-full absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            {/* Dropdown Icon (Visible on all devices) */}
            <div className="group relative cursor-pointer bg-white hover:bg-white">
              <div onClick={toggleDropdown}>
                <IoIosArrowDown
                  size={25}
                  className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
              {isOpen && (
                <div className="absolute z-10 right-[-30px] lg:right-1 md:right-1 w-52 rounded-md h-28 p-2 text-black">
                  <ul className="bg-white w-44 lg:w-52 md:w-52 p-5">
                    <li className="text-base hover:bg-base-100">
                      <Link href="/login">Login</Link>
                    </li>
                    <div className="divider h-1"></div>
                    <li className="text-base hover:bg-base-100">
                      <Link href="/register">Register</Link>
                    </li>
                    <div className="divider h-1"></div>
                    <li className="text-base hover:bg-base-100">
                      Order Tracking
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>
          :
          <div className="navbar-end">
            <div className='hidden lg:block md:block'>
              <div className="group relative cursor-pointer bg-white hover:bg-white">
                <div className="flex items-center gap-[2px] text-base font-semibold">
                  <Link href={'/user'} className="flex items-center gap-1 justify-center">
                    <CgProfile className="w-[26px] text-xl" />
                    <p className="text">My Profile</p>
                  </Link>
                </div>

              </div>
            </div>
            <div className='flex gap-2 ml-10 lg:hidden md:hidden'>
              <div>
                <CiSearch className="text-[30px] cursor-pointer opacity-70" onClick={toggleSearch} />
              </div>
              <HiOutlineShoppingBag onClick={() => handleCart()} className="text-[25px]" />
              <Link href={'/user'}>
                <CgProfile className="text-[25px]" />
              </Link>
            </div>
          </div>}
      </div>
      <div className="relative md:mx-12">
        <div className=" relative md:mt-4 mt-0  grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 px-2 pt-[72px] lg:pt-4 bg-base-100 border-b-2 lg:border-0 lg:pb-0 pb-2  ">
          {/* <Link href={'/new-arrival'} className='absolute left-[41%] top-[62%] lg:left-[47%] lg:top-[27%]  bg-yellow-300  px-2 text-[10px] lg:text-xs text-center rounded-sm' >New</Link> */}

          <div className='grid grid-cols-2 gap-5 '>
            <div className='hidden lg:block md:block'>
              <input value={productValue}
                onChange={(e) => setProductValue(e.target.value)} type="text" placeholder="Product Name Or SKU" className="input input-bordered w-72  " />

            </div>
          </div>
          <div className="flex gap-4 justify-center md:items-center items-end overflow-x-auto whitespace-nowrap px-2 scrollbar-hide md:h-[60px] h-full">
            <Link href="/">
              <button className="uppercase whitespace-nowrap text-sm md:text-[16px]">HOME</button>
            </Link>

            <Link href="/new-arrival" className='relative md:-top-[10px] top-0'>
              <button className="uppercase whitespace-nowrap text-sm md:text-[16px]"><span className='lg:text-[13px] absolute bg-yellow-300 px-1 rounded-sm text-[10px]'>New</span><br /> Arrivals</button>
            </Link>
            {types.filter(type => type.active).map(t => (
              <Link key={t._id} href={`/${t.name}`} className=''>
                <button className="uppercase whitespace-nowrap text-sm md:text-[16px]">{t.name}</button>
              </Link>
            ))}

          </div>
          <div className="lg:flex md:flex justify-end items-center hidden">
            <div className="relative " onClick={() => handleCart()}>
              <HiOutlineShoppingBag className="relative text-2xl" />
              {totalQuantity > 0 && (
                <span className="bg-red-600 text-white rounded-full absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {productValue && (
        <div className=" ml-14 absolute w-72 h-fit max-h-72 overflow-y-scroll hidden lg:block md:block bg-white border  border-gray-300 rounded shadow-md z-[100000]">
          {filteredProduct.length > 0 ? (
            filteredProduct.map((product, index) => (
              <div
                key={index}
                onClick={() => clickProduct(product)}
                className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-200 text-black"
              >
                <Image src={`${baseUrl}/${product.images[0]}`} alt='' width={20} height={20} /><span>{product.productName}</span><span>({product.SKU})</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No product available</div>
          )}
        </div>
      )}
      {isSearchOpen && (
        <div className="grid grid-cols-2 relative gap-5">
          <div className='relative left-[25%]'>
            <input
              value={productValue}
              onChange={(e) => setProductValue(e.target.value)}
              type="text"
              placeholder="Product Name Or SKU"
              className="input input-bordered mt-3 md:hidden grid w-72"
            />
            {productValue && (
              <div className="w-72 mt-1 h-fit max-h-56 overflow-y-scroll bg-white border absolute z-[1000000] border-gray-300 rounded shadow-md md:hidden">
                {filteredProduct.length > 0 ? (
                  filteredProduct.map((product, index) => (
                    <div
                      key={index}
                      onClick={() => clickProduct(product)}
                      className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-200 text-black"
                    >
                      <Image src={`${baseUrl}/${product.images[0]}`} alt={product.productName} width={20} height={20} />
                      <span>{product.productName}</span><span>({product?.SKU})</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No product available</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
