import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'SmartDL Header',
  description: 'Prototype header for SmartDL',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/StephanWagner/svgMap@v2.14.0/dist/svgMap.min.css" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/gh/StephanWagner/svgMap@v2.14.0/dist/svgMap.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
