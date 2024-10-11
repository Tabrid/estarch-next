"use client";
import { AuthContextProvider } from '@/components/context/AuthProvider';
import { initializeCartFromLocalStorage } from '@/lib/slices/cartSlice';
import store from '@/lib/store'
import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'


export default function Providers({ children }) {
 
  
  return (
    <Provider store={store}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </Provider>
  )
}
