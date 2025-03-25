"use client"; // Ensure this runs on the client

import { useEffect } from "react";
import Script from "next/script";
import usePageViews from "@/app/hooks/usePageViews";

const Analytics = () => {
  usePageViews(); // Track page views

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-HXE7R1NNMT`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'YOUR_TRACKING_ID', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default Analytics;
