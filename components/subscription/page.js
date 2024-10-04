import React from 'react';

export default function Subscription() {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-7xl mx-auto mb-20 lg:mt-20 mt-0">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="mb-4 mt-4 w-full md:w-auto md:mr-20 text-center md:text-left">
          <h2 className="lg:text-3xl text-xl font-bold">Join Our Newsletter To Get Offers</h2>
          <p className="text-gray-600">Subscribe to our newsletter and stay updated</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered h-14 w-full sm:w-80"
          />
          <button className="btn btn-neutral h-14 w-full sm:w-36 mt-2 sm:mt-0 sm:ml-2">Subscribe</button>
        </div>
      </div>
    </div>
  );
}
