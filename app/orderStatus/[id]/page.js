'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import truck from '../../../public/images/delivery-truck-box-Av8vKM7-600.jpg';
import baseUrl from '@/components/services/baseUrl';
import Link from 'next/link';
import crypto from 'crypto';

export default function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/orders/order/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!order) return;

    // Clear the previous ecommerce object
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });

    const items = order?.cartItems.map((product, index) => ({
      item_id: product.SKU || "undefined", // Product SKU
      item_name: product.title || "undefined", // Product name
      discount: product.discount || 0, // Discount on the product
      index, // Index of the item in the list
      item_brand: product.productId?.selectedBrand || "unknown", // Brand name
      item_category: product.productId?.selectedCategoryName || "General", // Category hierarchy
      item_variant: product.size || "",
      price: product.price || 0, // Price of the product
      quantity: product.quantity || 1 // Quantity of the product
    }));

    // Push the purchase event to the dataLayer
    window.dataLayer.push({
      event: "purchase",
      customers: {
        name: order?.name,
        name_hash: hashData(order?.name),
        phone: order?.phone,
        phone_hash:hashData(order?.phone),
        address: order?.address,
        address_hash: hashData(order?.address)
      },
      ecommerce: {
        transaction_id: order?.invoice || "T_UNKNOWN", // Transaction/Invoice ID
        affiliation: "ESTARCH", // Store name
        value: order?.grandTotal || 0, // Total order value (sum of price*quantity minus discounts)
        tax: 0, // Tax amount
        shipping: order?.deliveryCharge || 0, // Shipping cost
        currency: 'BDT', // Currency code
        items: items // Purchased items
      }
    });
  }, [order]);


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  document.title = "Invoice Detail";

  const handleShare = () => {
    const phoneNumber = "+8801781813939"; // Replace with the recipient's phone number in international format
    const message = `Hello Estarch,
\n I've just placed an order on your website. My invoice number is [${order?.invoice}]. I'm looking forward to receiving my order soon!
\n Thank you`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };



  return (
    <div className="bg-white mt-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Order Status</title>
      </Head>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-center text-2xl font-bold ">Your order is on its way</h1>
        <div className="flex justify-center ">
          <Image src={truck} alt='Delivery Truck' width={200} height={40} />
        </div>
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-gray-200 rounded-lg'>
          <div className='sm:pr-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400'>
            <h1 className='font-semibold  mb-2'>Summary</h1>
            <p className='text-sm font-medium'>Invoice: #<span className='font-normal'>{order?.invoice}</span></p>
            <p className='text-sm font-medium'>Order Date: <span className='font-normal'>{new Date(order?.createdAt).toLocaleDateString()}</span></p>
            <p className='text-sm font-medium'>Order Total: ৳ <span className='font-normal'>{order?.grandTotal}</span></p>
          </div>

          <div className='sm:pl-4'>
            <h1 className='font-semibold  mb-2'>Shipping Address</h1>
            <p className='text-sm font-medium'>Name: <span className='font-normal'>{order?.name}</span></p>
            <p className='text-sm font-medium'>Mobile No:<span className='font-normal'> {order?.phone}</span></p>
            <p className='text-sm font-medium'>Address: <span className='font-normal'>{order?.address}</span></p>
          </div>
        </div> */}

        <div>
          <p className='text-center font-bold text-2xl text-blue-500'>Thank You For Shopping</p>
          <p className='text-center font-bold text-xl '>You Deserve The Best</p>
        </div>

        <div className="rounded-lg mt-6">
          {/* <div className="bg-gray-200 p-2 rounded-t-lg">
            <h2 className="font-semibold text-right">ITEMS SHIPPED</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-black uppercase">Item</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-black uppercase">Qty</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-black uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order?.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-left text-sm text-black">{item?.title} ({item?.size}) </td>
                    <td className="px-4 py-2 text-center text-sm text-black">{item?.quantity}</td>
                    <td className="px-4 py-2 text-right text-sm text-black">৳ {item?.price * item?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* Summary Section Outside the Table */}
          {/* <div className="mt-4 flex flex-col items-end">
            <div className="w-full">
              <div className="flex justify-end  mb-2">
                <p className="text-sm  font-semibold ">Subtotal ({order?.cartItems.length} items)</p>
                <p className="text-sm font-semibold ">৳ {order?.totalAmount}</p>
              </div>
              <div className="flex justify-end  mb-2">
                <p className="text-sm font-semibold ">Delivery Charge</p>
                <p className="text-sm font-semibold">৳ {order?.deliveryCharge}</p>
              </div>
              <div className="flex justify-end  mb-2">
                <p className="text-sm font-semibold ">Order Total</p>
                <p className="text-sm font-semibold ">৳ {order?.grandTotal}</p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex justify-center items-center gap-3 text-center mt-10">
          <Link href="/">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              Shopping Again
            </button>
          </Link>
          <p className='cursor-pointer'>
            <button onClick={handleShare} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              💬 MESSAGE US
            </button>

          </p>
        </div>
      </div>
    </div>
  );
}
