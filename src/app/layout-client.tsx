"use client";

import { usePathname } from 'next/navigation';
import Header from './(components)/Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');

  return (
    <>
      {!isAuthRoute && <Header />}
      <div className="min-h-screen flex flex-col">{children}</div>
    </>
  );
}
