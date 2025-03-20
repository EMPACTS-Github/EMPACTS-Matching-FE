import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeroUIProvider } from "@heroui/react";
import 'react-toastify/dist/ReactToastify.css';
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
      <body className={`${inter.className} bg-cover`} style={{ backgroundImage: `url(${HomepageBackground.src})` }}>
        <ToastContainer />
        <HeroUIProvider>
          <div className="min-h-screen flex flex-col">{children}</div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
