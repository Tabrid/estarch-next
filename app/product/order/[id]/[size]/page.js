'use client'
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { FaPhoneAlt } from "react-icons/fa";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import baseUrl from '@/components/services/baseUrl';
import cod from '../../../../../public/images/cash-on-delivery-icon.png';
import bkash from '../../../../../public/images/bkash.png';
import { AuthContext } from '@/components/context/AuthProvider';

export default function Checkout() {
    const [loading, setLoading] = useState(false)
    const newQuantity = useSearchParams()
    const q = newQuantity.get('q')
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(q);
    const { id, size } = useParams();
    const router = useRouter();
    const { authUser } = useContext(AuthContext);
    const userId = authUser ? authUser?._id : null;
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [shippingCharge, setShippingCharge] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        area: '',
        orderNotes: '',
        paymentMethod: ''
    });


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/products/products/product/${id}`);
                const fetchedProduct = response.data;

                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    console.log(paymentMethod);


    const handleAreaChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, area: value });

        if (value === "Inside Dhaka") {
            setShippingCharge(60);
        } else if (value === "Outside Dhaka") {
            setShippingCharge(120);
        } else {
            setShippingCharge(null);
        }
    };

    const calculateTotal = () => {
        if (!product) return 0;
        const subtotal = product.salePrice * quantity;
        return subtotal + (shippingCharge || 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(parseInt(quantity) + 1);
    };

    const handleRemoveItem = () => {
        setProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!product) return;

        const orderData = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            area: formData.area,
            orderNotes: formData.orderNotes,
            cartItems: [{
                productId: product._id,
                title: product.productName,
                quantity: quantity,
                size: size
            }],
            paymentMethod: formData.paymentMethod,
            userId: userId,
        };

        if (formData.paymentMethod === "bkash") {
            try {
                const response = await axios.post(`${baseUrl}/bkash-checkout`, { amount: calculateTotal() });
                window.location.href = `${response.data.bkashURL}`
            } catch (error) {
                console.error('There was an error placing the order!', error);
            }
        } else {
            try {
                const response = await axios.post(`${baseUrl}/api/orders`, orderData);
                // window.location.href = `/product/invoice/${response.data.order._id}`
                window.location.href = `/orderStatus/${response.data.order._id}`
            } catch (error) {
                console.error('There was an error placing the order!', error);
            }
        }

        setLoading(false)
    };
    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        if (!product) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null });
        const cartItems = [{
            title: product?.productName,
            price: product?.salePrice,
            quantity: quantity,
            size: size,
            sku: product?.SKU,
            brand: product?.selectedBrand,
            category: product?.selectedCategoryName

        }]
        // Prepare items array from cart
        const items = cartItems.map((product, index) => ({
            item_name: product.title || "undefined",
            item_id: product.sku || "undefined",
            price: product.price || 0,
            item_brand: product.brand,
            item_category: product.category,
            item_variant: product.size || "",
            quantity: product.quantity || 1,
            currency: "BDT",
            index: index
        }));
        const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Push the begin_checkout event to the dataLayer
        window.dataLayer.push({
            event: "begin_checkout",
            ecommerce: {
                currency: "BDT",
                value: totalValue,
                items: items
            }
        });

    }, [product, id, size, quantity]);
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 p-4 lg:px-16 py-8 border rounded-lg bg-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="grow"
                                    placeholder="Enter Your name"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
                            <label className="input input-bordered flex items-center gap-2">
                                <FaPhoneAlt className='opacity-75' />
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="grow"
                                    placeholder="Your Phone Number"
                                    pattern="\d{11}"
                                    title="Phone number must be exactly 11 digits"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="area">Area:</label>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        className="radio checked:bg-blue-500"
                                        type="radio"
                                        name="area"
                                        value="Inside Dhaka"
                                        onChange={handleAreaChange}
                                        required
                                    />
                                    <span className="ml-2">Inside Dhaka</span>
                                </label>
                                <br />
                                <label className="inline-flex items-center">
                                    <input
                                        className="radio checked:bg-red-500"
                                        type="radio"
                                        name="area"
                                        value="Outside Dhaka"
                                        onChange={handleAreaChange}
                                        required
                                    />
                                    <span className="ml-2">Outside Dhaka</span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="address">Address:</label>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="order-notes">Order notes (optional):</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                id="order-notes"
                                name="orderNotes"
                                value={formData.orderNotes}
                                rows={1}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Payment Method:</label>
                            <div className="mb-2">
                                <label className="inline-flex items-center">
                                    <input className='radio checked:bg-red-500' defaultChecked type="radio" name="paymentMethod" value="Cash on Delivery" onChange={handleChange} required />
                                    <div className='flex items-center gap-3 ml-2'>
                                        <span>Cash on delivery</span>
                                        <Image src={cod} alt='Cash on delivery' width={80} height={40} />
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold lg:text-xl border p-2'>
                                Your Total Payable Amount: {calculateTotal()} ৳
                            </p>
                        </div>

                        <div className="flex justify-center">
                            {
                                loading ? <button
                                    type="submit"
                                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-orange-800 transition duration-200"
                                >
                                   <span class="loading loading-spinner loading-sm"></span>
                                </button> :
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-orange-800 transition duration-200"
                                    >
                                        Place Order
                                    </button>
                            }
                        </div>
                    </form>
                </div>


                {product && (
                    <div className="md:w-1/2 rounded-md mt-4 md:mt-0 p-4 lg:px-16 py-8 border shadow-lg">
                        <p className='text-center py-2 bg-blue-400 text-white text-xl'>Your Order</p>
                        <div className='mt-4'>

                            <div>
                                <div className='grid grid-cols-4 lg:grid-cols-6 '>
                                    <p className='block mb-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis col-span-4 lg:col-span-6'> {product.productName} - 1 pcs</p>
                                    <div className=''>
                                        <Image
                                            className=' object-cover'
                                            src={`${baseUrl}/${product?.images[0]}`}
                                            alt={product.productName}
                                            width={70} // Width in pixels
                                            height={70} // Height in pixels
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <p className='block whitespace-nowrap text-xs lg:text-lg overflow-hidden text-ellipsis'>SKU: <span className='font-semibold'>{product.SKU}</span></p>
                                        <span>
                                            {size && (
                                                <p className="text-sm lg:text-lg">Your Size: <span className='font-semibold'>{size}</span></p>
                                            )}
                                        </span>
                                        <div className='flex items-center gap-2 mt-1'>
                                            <span>Qty:</span>
                                            <button onClick={handleDecrease} className="bg-gray-300  w-5 h-5 flex items-center justify-center">-</button>
                                            <span>{quantity}</span>
                                            <button onClick={handleIncrease} className="bg-gray-300  w-5 h-5 flex items-center justify-center">+</button>
                                        </div>
                                    </div>
                                    <div className='lg:col-span-3 place-self-end text-end'>
                                        <p className='line-through text-red-500'>৳ {product.salePrice + product?.discount?.amount}</p>
                                        <span className=''>৳ {product.salePrice}</span>
                                        <button onClick={handleRemoveItem} className=" flex items-center justify-center underline">Remove</button>
                                    </div>
                                </div>
                                <hr className='mt-2 mb-4' />
                            </div>

                            <div className='flex justify-between mt-4'>
                                <p className='text-lg '>SubTotal</p>
                                <p className='text-lg text-red-500'>৳ {(product.salePrice * quantity).toFixed(2)}</p>
                            </div>
                            {shippingCharge !== null && (
                                <div className="flex justify-between">
                                    <span>Shipping Charge</span>
                                    <span>৳ {shippingCharge}</span>
                                </div>
                            )}
                            <hr className='my-1' />
                            <div className='flex justify-between'>
                                <p className='text-xl font-bold'>Total</p>
                                <p className='text-xl text-red-500 font-bold'>৳ {calculateTotal().toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}



            </div>
        </div>
    );
}
