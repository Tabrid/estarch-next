import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaWhatsapp, FaFacebookMessenger, FaPhone, FaRegBookmark } from "react-icons/fa";
import call from '../../public/images/call.png'
const ContactCard = () => {
    return (
        <div className="flex flex-col ">
            <div className="flex items-center mb-2">
                <FaRegBookmark className="text-gray-500 w-5 h-5 mr-2" />
                <span className="text-gray-500 text-sm font-semibold">ADD TO WISHLIST</span>
            </div>
            <div className='mt-5'>
            <Link href="tel:01781813939">
        <Image src={call} width={300} height={20} alt='Call' />
      </Link>
            </div>
            <div className='flex flex-row  items-center gap-3'>
                <div className="text-sm mt-2">Share To:</div>
                <div className="flex justify-center mt-4">
                    <Link href="https://www.facebook.com/Estarch.com.bd" className="text-blue-700 mx-2 hover:text-blue-900">
                        <FaFacebookF size={20} />
                    </Link>
                    <Link href="https://wa.me/+8801781813939" className="text-green-500 mx-2 hover:text-green-700">
                        <FaWhatsapp size={20} />
                    </Link>
                    <Link href="https://m.me/estarch.com.bd" className="text-blue-500 mx-2 hover:text-blue-700">
                        <FaFacebookMessenger size={20} />
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default ContactCard;
