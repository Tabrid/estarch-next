import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductModal } from '@/lib/slices/productModalSlice';
import { addToCart } from '@/lib/slices/cartSlice';
import { openCardSlide } from '@/lib/slices/cardSlideSlice';
import { useRouter } from 'next/navigation';
import { openSize } from '@/lib/slices/sizeSlice';
import baseUrl from '../services/baseUrl';

const ProductModal = () => {
  const isOpen = useSelector((state) => state.productModal.isOpen);
  const selectedProduct = useSelector((state) => state.productModal.product);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [warning, setWarning] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;
  const quantity = 1;
  const handleAddToCart = () => {
    if (selectedSize) {
      setWarning(false)
      dispatch(addToCart({
        id: selectedProduct?._id,
        product: {
          sku: selectedProduct?.SKU,
          discount: selectedProduct?.discount?.amount,
          title: selectedProduct?.productName,
          price: selectedProduct?.salePrice,
          colors: [{ images: [{ url: selectedProduct?.images[0] }] }],
          stock: { quantity: 10 },
        },
        quantity,
        color: 'Blue',
        size: selectedSize,
      }));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });

      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          value: selectedProduct?.salePrice || 0,
          items: [{
            item_id: selectedProduct?.SKU || "undefined",
            item_name: selectedProduct?.productName || "undefined",
            discount: selectedProduct?.discount || 0,
            index: 0,
            item_brand: selectedProduct?.selectedBrand || "Brand Unknown",
            item_category: selectedProduct?.selectedCategoryName || "Category Unknown",
            price: selectedProduct?.salePrice || 0,
            quantity: 1,
          }]
        }
      });
      dispatch(closeProductModal())
      dispatch(openCardSlide())
    } else {
      setWarning(true)
    }
  };

  const buyNowButton = () => {
    if (selectedSize) {
      dispatch(closeProductModal())
      window.location.href = `/product/order/${selectedProduct._id}/${selectedSize}?q=1`
    } else {
      setWarning(true)
    }

  }
  return (
    <div>
      {/* Overlay */}

      {/* Mobile Modal */}
      <div className={`fixed lg:hidden md:hidden inset-0 bg-[#0000002b] flex items-center justify-center z-[100] w-full h-screen`}>

        <div onClick={() => { setSelectedSize(null), dispatch(closeProductModal()) }} className={` fixed bottom-0 p-6 rounded-lg shadow-lg max-w-md h-screen w-full`}
        ></div>

        <div
          className={`fixed bottom-0 bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 ${isAnimating ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <button
            onClick={() => { setSelectedSize(null), dispatch(closeProductModal()) }}
            className="absolute top-4 right-4 text-gray-800 hover:text-gray-500 text-4xl"
          >
            &times;
          </button>

          <h2 className="text-lg font-semibold mb-1">{selectedProduct?.productName}</h2>
          <h2 className="text-base font-semibold mb-4 italic">SKU: {selectedProduct?.SKU}</h2>
          <div className='flex justify-center'>
            <div className=" mb-4 w-36 aspect-[4/5]">
              <Image width={300} height={300} src={`${baseUrl}/${selectedProduct?.images[0]}`} alt="Product" className="w-full h-full object-cover" />
            </div>
          </div>
          {selectedProduct?.regularPrice - selectedProduct?.salePrice > 0 && (
            <p className='my-1 text-[20px] text-black '>
              <span className=''>TK.</span>{selectedProduct?.salePrice}
              <span className='md:text-[17px] line-through text-red-500'> Tk.{selectedProduct?.regularPrice}</span>
            </p>
          )}
          {selectedProduct?.regularPrice - selectedProduct?.salePrice <= 0 && (
            <p className='my-1 text-[20px] text-black '>
              <span className=''>TK.</span>{selectedProduct?.salePrice}
            </p>
          )}
          <div className="mb-4">
            <div className='flex justify-between'>
              <h3 className="text-sm font-semibold mb-2">Select Size</h3>
              <h3 onClick={() => dispatch(openSize(selectedProduct?.charts))} className="text-sm text-cyan-700 mb-2 flex gap-2">Size Guide <svg width="4" height="4" viewBox="0 0 20 20" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg"><path d="M18.3809 13.544L6.46212 1.6127C6.34603 1.49648 6.20817 1.40428 6.05642 1.34138C5.90468 1.27847 5.74202 1.24609 5.57775 1.24609C5.41348 1.24609 5.25082 1.27847 5.09907 1.34138C4.94733 1.40428 4.80947 1.49648 4.69337 1.6127L1.61837 4.69395C1.38556 4.92816 1.25488 5.24497 1.25488 5.5752C1.25488 5.90543 1.38556 6.22225 1.61837 6.45645L13.5371 18.3877C13.6539 18.5036 13.7924 18.5952 13.9447 18.6574C14.097 18.7196 14.2601 18.7512 14.4246 18.7502C14.7547 18.7505 15.0715 18.6202 15.3059 18.3877L18.3809 15.3065C18.6137 15.0722 18.7444 14.7554 18.7444 14.4252C18.7444 14.095 18.6137 13.7782 18.3809 13.544ZM14.4246 17.5002L2.49962 5.5752L5.57462 2.5002L7.94337 4.86895L6.53712 6.2502L7.41837 7.13145L8.82462 5.7502L11.4059 8.33145L9.99962 9.7377L10.8871 10.6252L12.2934 9.21895L14.8746 11.8002L13.4684 13.2065L14.3746 14.0877L15.7809 12.6815L17.4996 14.4252L14.4246 17.5002Z" fill="#5B9BBE"></path></svg></h3>
            </div>
            <div className="flex space-x-2">
              {selectedProduct?.sizeDetails && selectedProduct?.sizeDetails?.map(size => (

                <button
                  key={size.size}
                  className={`border px-3 ${!size.available ? 'btn-disabled' : ''}  btn btn-sm   mr-2 ${selectedSize === size.size ? 'bg-black text-white' : ''}`}
                  onClick={() => { setSelectedSize(size.size), setWarning(false) }}
                >
                  {size.size}

                </button>
              ))}
            </div>
          </div>
          {warning && <h1 className='text-red-500'>Please select a size</h1>}
          <div className='flex gap-3'>
            <button onClick={handleAddToCart} className="bg-gray-800 text-white w-full py-3 rounded-lg mt-4">
              ADD TO CART
            </button>
            <button onClick={buyNowButton} className="bg-gray-800 text-white w-full py-3 rounded-lg mt-4">
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Modal */}
      <div className="fixed inset-0 bg-[#0000002b] md:flex lg:flex  justify-center z-[99999] hidden">
        <div onClick={() => { setSelectedSize(null), dispatch(closeProductModal()) }} className={`rounded-lg w-11/12 md:w-2/3 lg:w-full p-6 absolute h-screen`}></div>
        <div className={`bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative h-fit mt-5 transform transition-all duration-300 ${isAnimating ? 'translate-y-0' : '-translate-y-full'}`}>
          <button
            onClick={() => { setSelectedSize(null), dispatch(closeProductModal()) }}
            className="absolute top-4 right-4 text-gray-800 hover:text-gray-500 text-4xl"
          >
            &times;
          </button>

          <h2 className="text-lg font-semibold mb-4 text-center">{selectedProduct?.productName}</h2>
          <div className="flex">
            <div className="flex-shrink-0">
              <Image width={300} height={300} src={`${baseUrl}/${selectedProduct?.images[0]}`} alt="Product" className="rounded-lg object-cover w-48 h-60" />
            </div>
            <div className="ml-4 flex-grow">
              <h2 className="text-base font-semibold mb-1">SKU: {selectedProduct?.SKU}</h2>
              {selectedProduct?.regularPrice - selectedProduct?.salePrice > 0 && (
                <p className='my-1 text-[20px] text-black '>
                  <span className=''>TK.</span>{selectedProduct?.salePrice}
                  <span className='md:text-[17px] line-through text-red-500'> Tk.{selectedProduct?.regularPrice}</span>
                </p>
              )}
              {selectedProduct?.regularPrice - selectedProduct?.salePrice <= 0 && (
                <p className='my-1 text-[20px] text-black '>
                  <span className=''>TK.</span>{selectedProduct?.salePrice}
                </p>
              )}

              <h3 className="text-sm font-semibold mb-2">Select Size</h3>
              <div className="flex space-x-2">
                {selectedProduct?.sizeDetails && selectedProduct?.sizeDetails?.map(size => (

                  <button
                    key={size.size}
                    className={`border px-3 ${!size.available ? 'btn-disabled' : ''}  btn btn-sm   mr-2 ${selectedSize === size.size ? 'bg-black text-white' : ''}`}
                    onClick={() => { setSelectedSize(size.size), setWarning(false) }}
                  >
                    {size.size}

                  </button>
                ))}
              </div>
              {warning && <h1 className='text-red-500'>Please select a size</h1>}
              <div className='flex gap-3 mt-10'>
                <button onClick={handleAddToCart} className="bg-gray-800 text-white w-full py-3 rounded-lg mt-4">
                  ADD TO CART
                </button>
                <button onClick={buyNowButton} className="bg-gray-800 text-white w-full py-3 rounded-lg mt-4">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
