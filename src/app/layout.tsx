import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import Header from './auth/(components)/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EMPACTs Matching',
  description: 'EMPACTs matching platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <NextUIProvider>
          <Header />
          <div className="min-h-screen flex flex-col">{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
