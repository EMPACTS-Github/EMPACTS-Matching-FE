'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { ROUTES } from '@/constants/routes'

export default function ProtectedRoute({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const isAuthRoute = pathname.startsWith('/auth');
    const userInfo = localStorage.getItem('user');
    (Object.keys(ROUTES) as Array<keyof typeof ROUTES>).forEach((routeName) => {
      if (ROUTES[routeName].PATHNAME === pathname && ROUTES[routeName].PRIVATE === true) {
        if (!userInfo) {
          router.replace('/auth/login');
        } else {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    })
  
    if (isAuthRoute) {
      if (userInfo) {
        router.replace('/');
      } else {
        setIsLoading(false)
      }
    }
    
  }, [pathname, router])

  return (
    <>
      {
        isLoading ? null : children
      }
    </>
  )
}
