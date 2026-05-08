"use client";

import { useEffect } from 'react';

interface AdSenseProps {
  pId: string;
}

export default function AdSense({ pId }: AdSenseProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pId]);

  return null;
}