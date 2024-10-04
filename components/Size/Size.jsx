"use client"

import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSlide } from "@/lib/slices/sliderSlice";
import { closeSize } from "@/lib/slices/sizeSlice";
function Size() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.size.isOpen);
    const selectedChart = useSelector((state) => state.size.sizes);

    if (!selectedChart?.data || selectedChart?.data.length === 0) {
        return null;
    }

    const headers = Object.keys(selectedChart?.data[1]);

    return (
        <div>  <div className={`container mx-auto px-4 py-8 h-full  z-[100000] bg-white w-full lg:w-[30%] md:w-[30%] ${isOpen ? 'fixed right-0 top-0 ' : 'hidden'}`}>
            <h1 onClick={() => dispatch(closeSize())} className="flex justify-end text-2xl cursor-pointer"><RxCross1 /> </h1>
            <h2 className="text-2xl font-bold text-center mb-4 mt-3">FIND YOUR FIT</h2>
            <h1 className=" font-semibold  mt-3">SIZE GUIDE</h1>
            <table className="table-auto w-full border border-collapse mt-3">
                <thead>
                    <tr className="text-center border-b">

                        {selectedChart?.data[0].map((header, idx) => (
                            <th key={idx} className="p-2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {selectedChart?.data.slice(1,).map((row, index) => (
                        <tr key={index} className="text-center border-b">
                            {headers.map((header, idx) => (
                                <td key={idx} className="p-2">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>
            </table>
        </div></div>
    )
}

export default Size