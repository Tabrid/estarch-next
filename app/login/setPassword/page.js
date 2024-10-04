// pages/login/setPassword.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import baseUrl from '@/components/services/baseUrl';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const userId = localStorage.getItem('userId'); 
      await axios.post(`${baseUrl}/api/auth/set-password`, { userId, password });
      setSuccessMessage('Password set successfully');
      setErrorMessage('');
      router.push('/login');
    } catch (error) {
      console.error('Error setting password:', error);
      setErrorMessage('Error setting password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100">
      <div className="bg-white shadow-md rounded-lg max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Set Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-bold rounded-md"
          >
            Set Password
          </button>
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
