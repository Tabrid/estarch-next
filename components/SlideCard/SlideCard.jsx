"use client";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { closeCardSlide } from "@/lib/slices/cardSlideSlice";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/lib/slices/cartSlice"; // import the necessary actions
import { HiOutlineShoppingBag } from "react-icons/hi2";

import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import baseUrl from "../services/baseUrl";
import { useEffect } from "react";

const SlideCard = () => {
  const isOpen = useSelector((state) => state.cardSlide.isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleSlideCard = () => {
    dispatch(closeCardSlide());
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
    // Extract Facebook cookies
    const fbc = document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1];
    const fbp = document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1];
  
    // Prepare cart items with only the necessary fields
    const simplifiedCartItems = cartItems.map(item => ({
      title: item.product.title,
      sku: item.product.sku,
      size: item.size,
      value: item.product.price,
      quantity: item.quantity
    }));
  
    // Format the cart items into a more organized structure for display
    const formattedCartItems = simplifiedCartItems.map(item => `
      Title: ${item.title}
      SKU: ${item.sku}
      Size: ${item.size}
      Price: ${item.value} BDT
      Quantity: ${item.quantity}
    `).join('\n-------------------\n');  // Join each item with a separator for clarity
  
    if (typeof fbq === 'function' && isOpen) {
      fbq('track', 'cart_view', {
        content_type: 'product',
        currency: 'BDT',
        fbc: fbc || 'not_available',
        fbp: fbp || 'not_available',
        cartItems: formattedCartItems, // Use formatted cart items here
        first_party_collection: true,
      });
    } else {
      console.error('Facebook Pixel is not loaded.');
    }
  
  }, [cartItems]); // Add cartItems as a dependency so the effect runs when cart items change
   // Add cartItems as a dependency so the effect runs when cart items change
  
  return (
    <div
      className={`w-[100%] md:w-[30%] bg-base-100 shadow-2xl h-full z-[99999] p-6 fixed top-0 transition-all duration-500 ${
        isOpen ? "right-0" : "right-[-620px] hidden"
      }`}
    >
      <p
        onClick={handleSlideCard}
        className="absolute right-5 text-xl cursor-pointer border px-3 rounded-md py-1 z-[100]"
      >
        Close
      </p>
      {cartItems.length > 0 ? (
        <div className="relative h-full flex flex-col justify-between">
          <div className="h-[70%] overflow-y-auto">
            <h1 className="font-bold text-2xl mb-6 flex gap-1">
              <HiOutlineShoppingBag size={30} />
              {cartItems.length} items
            </h1>
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex relative gap-4 py-5 border-b"
              >
                <div className="flex flex-col justify-center items-center text-lg">
                  <MdArrowDropUp onClick={() => handleIncrease(item.id)} />
                  <span>{item.quantity}</span>
                  <MdArrowDropDown onClick={() => handleDecrease(item.id)} />
                </div>
                <div>
                  {item.product.colors[0].images[0].url && (
                    <Image
                      width={80}
                      height={80}
                      src={`${baseUrl}/${item.product.colors[0].images[0].url}`}
                      alt={item.product.title}
                    />
                  )}
                </div>
                <div className="col-span-2 ml-1">
                  <h1 className="text-base font-normal ">
                    {item.product.title}
                  </h1>
                  <h1 className="text-base font-normal ">
                    SKU: {item.product.sku}
                  </h1>
                  <p className="text-xl font-semibold">
                    <span className="text-red-600 line-through" style={{ fontSize: "0.8em" }}>
                      ৳ {item.product.price + item.product.discount}
                    </span>
                    <span className="ml-2">৳ {item.product.price}</span>
                  </p>

                  {item.product.discount > 0 && (
                    <h1 className="mt-1 text-sm text-red-500">
                      Discount: -TK {item.product.discount * item.quantity} tk
                    </h1>
                  )}
                  {item.size && <p className="text-sm">Size: {item.size}</p>}
                </div>
                <div className="flex justify-end ml-5">
                  <h1
                    className="text-sm cursor-pointer text-red-600"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <RxCross2 size={20} />
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-xl">Subtotal:</h1>
              <h1 className="font-bold text-xl">{calculateSubtotal()} tk</h1>
            </div>

            <Link href="/product/order">
              <button
                onClick={handleSlideCard}
                className="btn bg-black text-white w-full hover:bg-black"
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-32 space-y-3 text-xl font-semibold">
          <SlHandbag className="text-3xl font-bold" />
          <h1>YOUR BAG IS EMPTY</h1>
          <Link href="/new-arrival">
            <button className="bg-slate-800 text-xs text-white p-3 rounded-md">
              START SHOPPING
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SlideCard;
