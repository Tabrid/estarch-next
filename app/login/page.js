'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import baseUrl from '@/components/services/baseUrl';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, { mobile, password }, { withCredentials: true });
      localStorage.setItem("userId", JSON.stringify(response.data.userId));
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      // Redirect to a protected page or dashboard
      // router.push('/user');
      window.location.href = '/user'

    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'Login failed');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-pink-100 to-yellow-100 min-h-screen">
      <div className="bg-white shadow-md mt-10 mb-10 rounded-lg max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
          >
            Login
          </button>
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </form>
        <p className="text-sm text-center mt-4">
          have an account? <a href="/register" className="text-red-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}
