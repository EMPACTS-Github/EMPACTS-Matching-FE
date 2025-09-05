import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HomepageBackground from '/public/homepage-bg.png';
import ProtectedRoute from './ProtectedRoute';
import HeaderDisplayHandler from './HeaderDisplayHandler';
import Providers from './Providers';
import { GoogleAnalytics } from '@next/third-parties/google'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EMPACTS Connect',
  description: 'EMPACTS Connect platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`} suppressHydrationWarning>
        <Providers>
          <div
            className="fixed bg-cover inset-0 -z-10"
            style={{ backgroundImage: `url(${HomepageBackground.src})` }}
          ></div>
          <ProtectedRoute>
            <div className="min-h-screen">
              <HeaderDisplayHandler />
              {children}
            </div>
          </ProtectedRoute>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-WBV6EMVRJG" />
    </html>
  );
}
