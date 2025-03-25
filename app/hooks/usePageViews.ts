"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // For App Router navigation

const usePageViews = () => {
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    // Ensure window and gtag exist before calling gtag
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-HXE7R1NNMT', {
        page_path: pathname,
      });
    }
  }, [pathname]); // Only trigger when the pathname changes
};

export default usePageViews;
