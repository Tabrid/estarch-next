'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import logo from'../../public/images/Logo Png 51.png'
import baseUrl from '@/components/services/baseUrl';

const InvoiceDetail = ({id}) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  document.title = "Invoice Detail";

  const printInvoice = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <style>
        {`
          @media print {
            @page {
              size: auto;
              margin: 0;
            }
            body::before {
              content: none;
            }
            .page-content {
              padding: 0;
              margin: 0;
              box-shadow: none;
              background: none;
            }
            .card {
              box-shadow: none;
              border: none;
              background-color: transparent;
            }
            .page-title {
              display: none;
            }
          }
        `}
      </style>
      <div className="page-content max-w-screen-lg mx-auto mt-10 px-4 md:px-8 lg:px-10">
        <div className="container mx-auto p-4">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Invoices / Invoice Detail</h2>
          </div>
          <div className="flex flex-col">
            <div className="w-full">
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg md:text-xl font-semibold">{order.invoice}</h4>
                  <div>
                    <Image src={logo} alt="logo" className="w-48 bg-black md:w-24" />
                  </div>
                </div>
                <div className="text-gray-600">
                  <p className="mb-1">19/A (Front gate of Masjid E Noor), Chowdhury Para<br />Malibag, Dhaka-1219</p>
                  <p className="mb-1"><i className="uil uil-envelope-alt mr-1"></i> estarch247@gmail.com</p>
                  <p><i className="uil uil-phone mr-1"></i> +8801781813939</p>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    <h5 className="text-lg font-semibold mb-3">Billed To:</h5>
                    <h5 className="text-lg mb-2">{order.name}</h5>
                    <p className="mb-1">{order.address}</p>
                    <p>{order.phone}</p>
                  </div>
                  <div className="text-gray-600 text-left md:text-right">
                    <div>
                      <h5 className="text-lg font-semibold mb-1">Invoice No:</h5>
                      <p>{order.invoice}</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold mb-1">Invoice Date:</h5>
                      <p>{order.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold mb-1">Order No:</h5>
                      <p>#{order.orderNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <h5 className="text-lg font-semibold">Order summary</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.cartItems.map((item, key) => (
                          <tr key={key}>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">{key + 1}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500">Size: <span className="font-medium">{item.size}</span></div>
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">{(item.price+item.discountAmount)}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">{(item.price+item.discountAmount)*(item.quantity)}</td>
                          </tr>
                        ))}
                                                <tr>
                          <th colSpan="4" className="px-4 md:px-6 py-4 text-right">Discount :</th>
                          <td className="px-4 md:px-6 py-4 text-right">- {order.discount}</td>
                        </tr>
                        <tr>
                          <th colSpan="4" className="px-4 md:px-6 py-4 text-right">Sub Total</th>
                          <td className="px-4 md:px-6 py-4 text-right">{order.totalAmount}</td>
                        </tr>
                      
                        <tr>
                          <th colSpan="4" className="px-4 md:px-6 py-4 text-right">Shipping Charge :</th>
                          <td className="px-4 md:px-6 py-4 text-right">{order.deliveryCharge}</td>
                        </tr>
                        <tr>
                          <th colSpan="4" className="px-4 md:px-6 py-4 text-right">Tax</th>
                          <td className="px-4 md:px-6 py-4 text-right">00</td>
                        </tr>
                        <tr>
                          <th colSpan="4" className="px-4 md:px-6 py-4 text-right">Total</th>
                          <td className="px-4 md:px-6 py-4 text-right"><h4 className="text-lg font-semibold">{order.grandTotal}</h4></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={printInvoice}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <i className="fa fa-print mr-2"></i>
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InvoiceDetail;
