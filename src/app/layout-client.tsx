"use client";

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const userInfo = localStorage.getItem('user');
  const isAuthRoute = pathname.startsWith('/auth');

  (Object.keys(ROUTES) as Array<keyof typeof ROUTES>).forEach((routeName) => {
    if (ROUTES[routeName].PATHNAME === pathname && ROUTES[routeName].PRIVATE === true) {
      if (!userInfo) {
        router.push('/auth/login');
      }
    }
  })

  if (isAuthRoute) {
    if (userInfo) {
      router.push('/');
    }
  }

  return (
    <>
      {!isAuthRoute && <Header />}
      <div className="min-h-screen flex flex-col">{children}</div>
    </>
  );
}
