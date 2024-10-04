'use client'
import { AuthContext } from '@/components/context/AuthProvider';
import ProfileCart from '@/components/myProCart/page';
import NewOrder from '@/components/newOrder/page';
import OrderHistory from '@/components/orderHistory/page';
import baseUrl from '@/components/services/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const [allOrders, setAllOrders] = useState();
    const [userId, setUserId] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null); // State to track the selected section
    const [newOrderCount, setNewOrderCount] = useState(0); 
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
                    setAllOrders(res.data);
                })
                .catch(error => {
                    console.error('Error fetching order count:', error);
                });
        }
    }, [userId]);
    useEffect(() => {
        if (userId) {
            axios.get(`${baseUrl}/api/orders/order-count/${userId}`)
                .then(res => {
                    const orders = res.data.orders;
                    const newOrders = orders.filter(order => order.lastStatus.name === 'new');
                    setNewOrderCount(newOrders.length);
                })
                .catch(error => {
                    console.error('Error fetching order count:', error);
                });
        }
    }, [userId]);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };
   
    return (
        <div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 min-h-full'>
                <div
                    onClick={() => handleSectionClick('totalOrders')}
                    className='bg-[#eb5a0027] lg:px-12 gap-2 py-4 md:h-32 flex flex-col justify-center items-center rounded-md cursor-pointer'
                >
                    <h1 className='text-[#EB5B00] md:text-3xl font-bold'>{allOrders?.orderCount}</h1>
                    <h1 className='text-[#EB5B00] md:text-xl text-center'>Total Orders</h1>
                </div>
                <div
                    onClick={() => handleSectionClick('newOrders')}
                    className='bg-[#4ccd992c] lg:px-12 gap-2 py-4 md:h-32 flex flex-col justify-center items-center rounded-md cursor-pointer'
                >
                    <h1 className='text-[#4CCD99] md:text-3xl font-bold'>{newOrderCount}</h1>
                    <h1 className='text-[#4CCD99] md:text-xl text-center'>New Orders</h1>
                </div>
                <div
                    onClick={() => handleSectionClick('wishlist')}
                    className='bg-[#ff4c4c21] lg:px-12 gap-2 py-4 md:h-32 flex flex-col justify-center items-center rounded-md cursor-pointer'
                >
                    <h1 className='text-[#FF4C4C] md:text-3xl font-bold'>00</h1>
                    <h1 className='text-[#FF4C4C] md:text-xl text-center'>Wishlist</h1>
                </div>
                <div
                    onClick={() => handleSectionClick('carts')}
                    className='bg-[#387bdf34] lg:px-12 gap-2 py-4 md:h-32 flex flex-col justify-center items-center rounded-md cursor-pointer'
                >
                    <h1 className='text-[#387ADF] md:text-3xl font-bold'>{totalQuantity}</h1>
                    <h1 className='text-[#387ADF] md:text-xl text-center'>Carts</h1>
                   
                </div>
            </div>

            {/* Conditionally render details based on the selected section */}
            <div className='mt-10'>
                {selectedSection === 'totalOrders' && (
                    <div className='p-4 bg-white rounded-md shadow-md'>
                        <h2 className='text-xl font-bold text-[#EB5B00]'>Total Orders Details</h2>
                        <p>Display detailed information about total orders here.</p>
                        <OrderHistory/>
                    </div>
                )}
                {selectedSection === 'newOrders' && (
                    <div className='p-4 bg-white rounded-md shadow-md'>
                        <h2 className='text-xl font-bold text-[#4CCD99]'>New Orders Details</h2>
                        <p>Display detailed information about new orders here.</p>
                        <NewOrder/>
                    </div>
                )}
                {selectedSection === 'wishlist' && (
                    <div className='p-4 bg-white rounded-md shadow-md'>
                        <h2 className='text-xl font-bold text-[#FF4C4C]'>Wishlist Details</h2>
                        <p>Display detailed information about the wishlist here.</p>
                    </div>
                )}
                {selectedSection === 'carts' && (
                    <div className='p-4 bg-white rounded-md shadow-md'>
                        <h2 className='text-xl font-bold text-[#387ADF]'>Carts Details</h2>
                        <p>Display detailed information about the carts here.</p>
                        <ProfileCart/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
