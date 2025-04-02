'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { ROUTES } from '@/constants/route'
import { checkIsSameRoute } from '@/utils/checkRoute';

export default function ProtectedRoute({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const isAuthRoute = pathname.startsWith('/auth');
    const userInfo = localStorage.getItem('user');

    ROUTES.forEach((route) => {
      if (pathname !== '/' && checkIsSameRoute(pathname, route.pathname) && route.isPrivate) {
        if (!userInfo) {
          router.replace('/auth/login');
        }
      }
    })

    if (isAuthRoute) {
      if (userInfo) {
        router.replace('/');
      } else {
        setIsLoading(false)
      }
    }
    setIsLoading(false)
  }, [pathname, router])

  return (
    <>
      {
        isLoading ? null : children
      }
    </>
  )
}
