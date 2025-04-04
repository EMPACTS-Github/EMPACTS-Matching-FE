'use client'
import Header from '@/components/Header';
import { ROUTES } from '@/constants/route';
import { checkIsSameRoute } from '@/utils/checkRoute';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function HeaderDisplayHandler() {
  const pathname = usePathname();
  const [isDisplayHeader, setIsDisplayHeader] = useState(false);

  useEffect(() => {
    ROUTES.forEach((route) => {
      if (checkIsSameRoute(pathname, route.pathname)) {
        if (route.hasHeader) {
          setIsDisplayHeader(true);
        } else {
          setIsDisplayHeader(false);
        }
      }
    })
  }, [pathname])

  return (
    <div>
      {
        isDisplayHeader ? <Header /> : null
      }
    </div>
  )
}

export default HeaderDisplayHandler