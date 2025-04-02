import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeroUIProvider } from "@heroui/react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomepageBackground from '/public/homepage-bg.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EMPACTS Connect',
  description: 'EMPACTS connect platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <ToastContainer />
        <HeroUIProvider>
          <div className="fixed bg-cover inset-0 -z-10" style={{ backgroundImage: `url(${HomepageBackground.src})` }}>
          </div>
          <div className="min-h-screen flex flex-col">{children}</div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
