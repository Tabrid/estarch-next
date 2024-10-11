'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openCardSlide } from "@/lib/slices/cardSlideSlice";
import { addToCart } from "@/lib/slices/cartSlice";
import baseUrl from "../services/baseUrl";
import Image from "next/image";
const ProductCard = (product) => {
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };
  const handleAddToCart = () => {
    dispatch(openCardSlide())
    const quantity = 1;
    dispatch(addToCart({
      id: product.product._id,
      product: {
        sku: product?.product.SKU,
        discount: product?.product.discount?.amount,
        title: product.product.productName,
        price: product.product?.salePrice,
        colors: [{ images: [{ url: product.product.images[0] }] }],
        stock: { quantity: 10 }, // Adjust based on actual product details
      },
      quantity,
      color: 'Blue', // Add actual color if available
      size: selectedSize,
    }));
  };
  const navigateToPage = (url) => {
    window.location.href = url;
};
  return (
   
    <div className="grid md:grid-cols-7 grid-cols-6 border-2 md:p-6 p-2 items-center gap-4 rounded-lg">
      <div className="col-span-2">
        <Image height={0} width={500} className="rounded-md" src={`${baseUrl}/${product.product.images[0]}`} />
      </div>
      <div className="md:col-span-3 col-span-2 flex flex-col gap-2 place-self-start">
        <p className="font-bold md:text-xl text-sm hover:underline cursor-pointer"  onClick={() => navigateToPage(`/product/${product?.product.productName}?sku=${product?.product.SKU}`)}>{product.product.productName}</p>
        <p className="md:text-lg text-[14px]">Sku: <span className="font-bold">{product.product.SKU}</span></p>
        <select
          className="border border-gray-300 rounded-md py-2 px-4 text-gray-700 w-full md:max-w-44  md:w-auto"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          <option value="">Select Size</option>
          {product.product?.selectedSizes?.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2  md:space-y-4 space-y-9 place-self-start ">
        <div>
          <p className="font-semibold md:text-xl">TK. {product.product.salePrice}</p>
          <p className="text-red-500 line-through md:text-xl">TK.{product.product.regularPrice}</p>
        </div>
        {selectedSize && (
          <button onClick={handleAddToCart} className="px-3 text-xs md:text-[16px] bg-black text-white md:py-3 py-1 rounded-md">
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
