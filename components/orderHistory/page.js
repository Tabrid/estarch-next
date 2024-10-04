'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '@/components/services/baseUrl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = JSON.parse(localStorage.getItem('userId'));
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`${baseUrl}/api/orders/order-count/${userId}`)
                .then(res => {
                    const ordersWithProductDetails = res.data.orders.map(async (order) => {
                        const updatedCartItems = await Promise.all(order.cartItems.map(async (item) => {
                            try {
                                // Fetch product details including images
                                const productResponse = await axios.get(`${baseUrl}/api/products/products/product/${item.productId}`);
                                return { ...item, product: productResponse.data };
                            } catch (error) {
                                console.error('Error fetching product details:', error);
                                return item; // Return the item without additional product data if the request fails
                            }
                        }));
                        return { ...order, cartItems: updatedCartItems };
                    });

                    Promise.all(ordersWithProductDetails).then((updatedOrders) => {
                        setOrders(updatedOrders);
                        setLoading(false);
                    });
                })
                .catch(error => {
                    console.error('Error fetching order history:', error);
                    setLoading(false);
                });
        }
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <div className=' rounded-md shadow-md'>
            {orders.length > 0 ? (
                <div className='grid lg:grid-cols-2 gap-5 mt-4'>
                    {orders.map(order => (
                        <div key={order._id} className='flex flex-row-reverse gap-5 border p-4 rounded-md shadow-sm'>
                            <div>
                                <h3 className='font-semibold text-lg'>Invoice: {order.invoice}</h3>
                               
                                    {order.cartItems.map(i => <p key={i._id}>
                                        <p>{i.title} - {i.quantity} x ${i.price} (Size: {i.size})</p>
                                        <p><strong>Selling Price:</strong> ${(i.price *i.quantity) + (i.discountAmount*i.quantity)}</p>
                                        <p><strong>Discount:</strong> ${i.discountAmount *i.quantity}</p>
                                </p>)}
                               
                                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                                <p><strong>Grand Total:</strong> ${order.grandTotal}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <p><strong>Status:</strong> {order.lastStatus.name}</p>
                             
                                  
                                <div className='flex flex-col lg:flex-row gap-2 mt-2'>
                                <button  onClick={() => router.push(`/invoice/${order._id}`)} className='btn  bg-black text-white'>Invoice</button>
                                <button className='btn   bg-black text-white'>Tracking Order</button>
                              
                               </div>
                            </div>
                            <div className=''>
            
                                <ul className=''>
                                    {order.cartItems.map(item => (
                                        <li key={item._id} className=' items-center space-x-4'>
                                            {/* Display the first product image */}
                                            {item.product?.images?.[0] && (
                                                <Image
                                                    src={`${baseUrl}/${item.product.images[0]}`} // Assuming the image path is relative
                                                    alt={item.product.productName}
                                                    width={220} height={60}
                                                />
                                            )}
                                           
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No new orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
