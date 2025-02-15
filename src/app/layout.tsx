import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeroUIProvider } from "@heroui/react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomepageBackground from '../../public/homepage-bg.png';
import ClientLayout from './layout-client';

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
        <HeroUIProvider>
          <ClientLayout>{children}</ClientLayout>
        </HeroUIProvider>
      </body>
    </html>
  );
}
