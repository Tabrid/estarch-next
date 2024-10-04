import Image from 'next/image'
import React from 'react'
import img1 from '../../public/images/Fastest-Shipping.efdae6a0.svg'
import img2 from '../../public/images/Easy-Return-Policy.247734ff.svg'
import img3 from '../../public/images/Premium-Qualiy-Product.220aaabd.svg'
import img4 from '../../public/images/Online-Support-24-7.a66f7a77.svg'
export default function ServiceMoto() {
  return (
    <div className="flex justify-center items-center mt-10">
        <div className="flex gap-5 ">
        <div>
            <Image width={300}  height={100} src={img1} alt=""  />
        </div>
        <div>
            <Image width={300}  height={100} src={img2} alt=""  />
        </div>
        <div>
            <Image width={300}  height={100} src={img3} alt=""  />
        </div>
        <div>
            <Image width={300}  height={100} src={img4} alt=""  />
        </div>
       
    </div>
    </div>
  )
}
