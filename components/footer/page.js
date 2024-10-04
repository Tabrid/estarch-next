import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';
import bank_payment_logo from "../../public/images/payment-gateway.eb02d190.png";
import pic from '../../public/images/1707379719303-manfare_bd-id-13.jpeg';
import logo from '../../public/images/Logo Png 51.png';
import footer from '../../public/images/footer.jpg'
import Link from 'next/link';
export default function Footer() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:  `url(${footer.src})`,
        backgroundBlendMode: "overlay",
        opacity: 0.9, // Adjust opacity as needed
      }}
    >
      <div className="bg-black bg-opacity-70">
        <footer className="footer text-base-content p-10 flex flex-col lg:flex-row justify-between">
          <div className="md:mb-8 mb-2 lg:mb-0 lg:w-1/3 w-full items-center flex flex-col justify-center">
            <Image
              src={logo}
              alt="Logo"
              width={280}
              height={300}
              className="  w-3/4"
            />
            <p
              className="text-3xl md:text-3xl mt-2 font-bold"
              style={{ color: "rgb(184, 149, 121)", "--tw-text-opacity": "1" }}
            >
              +8801781813939
            </p>

            <p className="text-white mt-2"> SUN - SAT, 10:30 AM - 10 PM</p>
            <div className="flex flex-row gap-3 mt-4">
            <Link rel='preconnect' href='https://wa.me/01781813939'>
              <div
                className="border rounded-full h-10 w-10 px-2 py-1 flex justify-center items-center"
                style={{ borderColor: "rgb(184, 149, 121)" }}
              >
                
                <FontAwesomeIcon
                  size="2x"
                  style={{
                    color: "rgb(184, 149, 121)",
                    "--tw-text-opacity": "1",
                  }}
                  icon={faWhatsapp}
                />
              
                </div>
              </Link>
              <Link rel='preconnect' href='https://www.instagram.com/estarch.com.bd'>
              <div
                className="border rounded-full h-10 w-10 px-2 py-1 flex justify-center items-center"
                style={{ borderColor: "rgb(184, 149, 121)" }}
              >
                <FontAwesomeIcon
                  size="2x"
                  style={{
                    color: "rgb(184, 149, 121)",
                    "--tw-text-opacity": "1",
                  }}
                  icon={faInstagram}
                />
              </div>
              </Link>
              <Link rel='preconnect' href='https://www.facebook.com/Estarch.com.bd '>
              <div
                className="border rounded-full h-10 w-10 py-1 p-2 flex justify-center items-center"
                style={{ borderColor: "rgb(184, 149, 121)" }}
              >
                <FontAwesomeIcon
                  style={{
                    color: "rgb(184, 149, 121)",
                    "--tw-text-opacity": "1",
                  }}
                  icon={faFacebook}
                />
                </div>
              </Link>
              <Link rel='preconnect' href='https://m.me/estarch.com.bd'>
              <div
                className="border rounded-full h-10 w-10 px-2 py-1 flex justify-center items-center"
                style={{ borderColor: "rgb(184, 149, 121)" }}
              >
                <FontAwesomeIcon
                  size="2x"
                  style={{
                    color: "rgb(184, 149, 121)",
                    "--tw-text-opacity": "1",
                  }}
                  icon={faFacebookMessenger}
                />
                </div>
                </Link>
            </div>
          </div>
          <nav className="mb-4 lg:mb-0 lg:w-1/3 w-full items-center flex flex-col justify-center text-center">
            <h6
              className="font-bold uppercase text-3xl mb-4"
              style={{ color: "rgb(184, 149, 121)", "--tw-text-opacity": "1" }}
            >
              Information
            </h6>
            <ul className="text-white">
              <li className="mb-2">About Us</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
              <li className="mb-2">Return Policy</li>
            </ul>
          </nav>
          <nav className="mb-8 lg:mb-0 lg:w-1/3 w-full items-center text-center flex flex-col justify-center">
            <h6
              className="font-bold text-3xl uppercase mb-4"
              style={{ color: "rgb(184, 149, 121)", "--tw-text-opacity": "1" }}
            >
              Contact Info
            </h6>
            <p className="text-white mb-2 text-base">
            Shop Address - 19/A (Front gate of Masjid E Noor) , Near Abul Hotel, Chowdhury Para,Malibag,Dhaka-1219
              
            </p>
            <p className="text-white mb-2">Estarchbd@gmail.com</p>
            <p className="text-white">
            01781813939 | 01779994888
              
            </p>
          </nav>

        </footer>

        <div className="py-4">
          <div className="mx-auto flex items-center justify-center">
            <Image
              src={bank_payment_logo}
              alt="Bank Payment Logo"
              width={1500}
              height={48}
              className=" p-1 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
