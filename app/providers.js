"use client";
import { AuthContextProvider } from '@/components/context/AuthProvider';
import { initializeCartFromLocalStorage } from '@/lib/slices/cartSlice';
import store from '@/lib/store'
import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'


export default function Providers({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  
    // Scroll tracking code
    const scrollTracked = {
      25: false,
      50: false,
      75: false,
      100: false,
    };
  
    function trackPageScroll() {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
  
      if (scrollPercentage > 25 && !scrollTracked[25]) {
        fbq('trackCustom', 'PageScroll25');
        scrollTracked[25] = true;
      }
      if (scrollPercentage > 50 && !scrollTracked[50]) {
        fbq('trackCustom', 'PageScroll50');
        scrollTracked[50] = true;
      }
      if (scrollPercentage > 75 && !scrollTracked[75]) {
        fbq('trackCustom', 'PageScroll75');
        scrollTracked[75] = true;
      }
      if (scrollPercentage > 100 && !scrollTracked[100]) {
        fbq('trackCustom', 'PageScroll100');
        scrollTracked[100] = true;
      }
    }
  
    // Add scroll event listener
    window.addEventListener('scroll', trackPageScroll);
  
    // 30s page view tracking
    const pageViewTimeout = setTimeout(() => {
      fbq('trackCustom', '30SecondPageView');
    }, 30000); // 30000ms = 30s
  
    // Clean up event listener and timeout on component unmount
    return () => {
      window.removeEventListener('scroll', trackPageScroll);
      clearTimeout(pageViewTimeout);
    };
  }, []);
  
  return (
    <Provider store={store}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </Provider>
  )
}
