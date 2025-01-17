import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import HomepageBackground from '../../public/homepage-bg.png';

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
      <body className={`${inter.className} bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${HomepageBackground.src})` }}>
        <ToastContainer />
        <NextUIProvider>
          <div className="min-h-screen flex flex-col">{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
