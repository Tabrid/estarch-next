"use client";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/lib/slices/cartSlice";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import baseUrl from "../services/baseUrl";

const ProfileCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="relative">
      {cartItems.length > 0 ? (
        <div className="flex flex-col h-full justify-between">
          <div className="overflow-y-auto">
            <h1 className="font-bold text-2xl mb-6 flex items-center gap-2">
              <HiOutlineShoppingBag size={30} />
              <span>{cartItems.length} items</span>
            </h1>
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-start gap-4 py-4 border-b"
              >
                <div className="flex flex-col items-center text-lg">
                  <MdArrowDropUp
                    onClick={() => handleIncrease(item.id)}
                    className="cursor-pointer"
                  />
                  <span className="my-1">{item.quantity}</span>
                  <MdArrowDropDown
                    onClick={() => handleDecrease(item.id)}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  {item.product.colors[0].images[0].url && (
                    <Image
                      width={80}
                      height={80}
                      src={`${baseUrl}/${item.product.colors[0].images[0].url}`}
                      alt={item.product.title}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h1 className="text-base font-semibold">{item.product.title}</h1>
                  <h2 className="text-sm text-gray-600">SKU: {item.product.sku}</h2>
                  <p className="text-lg font-semibold mt-1">
                    <span className="text-red-600 line-through text-sm">
                      ৳ {item.product.price + item.product.discount}
                    </span>
                    <span className="ml-2">৳ {item.product.price}</span>
                  </p>
                  {item.product.discount > 0 && (
                    <h3 className="mt-1 text-sm text-red-500">
                      Discount: -TK {item.product.discount * item.quantity}
                    </h3>
                  )}
                  {item.size && <p className="text-sm mt-1">Size: {item.size}</p>}
                </div>
                <div className="ml-4 flex items-center">
                  <RxCross2
                    size={20}
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4">
            <div className="flex justify-between items-center mb-4 border-t pt-4">
              <h1 className="font-bold text-xl">Subtotal:</h1>
              <h1 className="font-bold text-xl">{calculateSubtotal()} tk</h1>
            </div>

            <Link href="/product/order">
              <button
                className="btn bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-32 space-y-3 text-xl font-semibold">
          <SlHandbag className="text-4xl text-gray-500" />
          <h1 className="text-2xl">Your Bag is Empty</h1>
          <Link href="/new-arrival">
            <button className="bg-slate-800 text-white py-2 px-4 rounded-md text-sm hover:bg-slate-700 transition">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileCart;
