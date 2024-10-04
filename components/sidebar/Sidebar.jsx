// components/Sidebar.js
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiStar } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdChecklist } from 'react-icons/md';
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../Hook/useLogout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';


const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useLogout()
  const {authUser} = useContext(AuthContext)


  return (
    <div className="md:border border-gray-200">
      <ul className='hidden md:grid'>
        <li className={`md:mb-2 px-4 py-2 ${pathname === '/user' ? 'bg-gray-100' : ''}`}>
          <Link href="/user" className="flex items-center gap-2">
            <span className={`${pathname === '/user' ? 'bg-orange-400 text-4xl text-white rounded-full' : "text-xl"}`}><FaRegUserCircle /></span>My Profile
          </Link>
        </li>
        <li className={`mb-2 px-4 py-2 ${pathname === '/user/orders' ? 'bg-gray-100' : ''}`}>
          <Link href="/user/orders" className="flex md:items-center gap-2">
            <span className={`rounded-md ${pathname === '/user/orders' ? 'bg-orange-400 text-3xl text-white' : "text-xl border border-gray-500"}`}><MdChecklist /></span>My Orders
          </Link>
        </li>
        <li className={`mb-2 px-4 py-2 ${pathname === '/user/reviews' ? 'bg-gray-100' : ''}`}>
          <Link href="/user/reviews" className="flex items-center gap-2">
            <span className={`rounded-md ${pathname === '/user/reviews' ? 'bg-orange-400 text-3xl text-white' : "text-xl border border-gray-500"}`}><CiStar /></span>Review
          </Link>
        </li>
        <li className={`mb-2 px-4 py-2 ${pathname === '/user/reviews' ? 'bg-gray-100' : ''}`}>
          <button onClick={logout} className="flex items-center gap-2">
            <span className={`rounded-md ${pathname === '' ? 'bg-orange-400 text-3xl text-white' : "text-xl  border-gray-500"}`}><RiLogoutBoxLine /></span>Logout
          </button>
        </li>
      </ul>
      <div className='w-full h-44 bg-[#FF4C4C] items-center rounded-b-2xl flex justify-evenly relative mb-8 md:hidden'>
        <p className='text-white flex items-center gap-2 text-xl'><FaRegUserCircle /> Hello, {authUser?.fullName}</p>
        <Link href='/user' className={`bg-base-200 gap-3 flex flex-col justify-center items-center h-20 left-5 absolute -bottom-6 w-24 text-center rounded-lg border-b-2 ${pathname === '/user' ? 'border-2 border-gray-500' : ''}`}>
          <FaRegUserCircle className='text-2xl' /> My Profile
        </Link>
        <Link href='/user/orders' className={`bg-base-200 gap-3 flex flex-col justify-center items-center h-20 absolute -bottom-6 w-24 text-center rounded-lg border-b-2 ${pathname === '/user/orders' ? 'border-2 border-gray-500' : ''}`}>
          <MdChecklist className='text-2xl border-2 rounded-md border-black' /> My Orders
        </Link>
        <Link href='/user/reviews' className={`bg-base-200 gap-3 flex flex-col justify-center items-center h-20 right-5 absolute -bottom-6 w-24 text-center rounded-lg border-b-2 ${pathname === '/user/reviews' ? 'border-2 border-gray-500' : ''}`}>
          <CiStar className='text-2xl' /> Review
        </Link>
        <button onClick={logout} className={`bg-base-200 gap-3 flex flex-col justify-center items-center h-20 right-5 absolute -bottom-6 w-24 text-center rounded-lg border-b-2 ${pathname === '/user/reviews' ? 'border-2 border-gray-500' : ''}`}>
          <RiLogoutBoxLine  className='text-2xl' /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
