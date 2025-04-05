import React from 'react';
import { HeroUIProvider, ToastProvider } from '@heroui/react'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement={'top-right'} toastOffset={60} toastProps={{ color: "primary" }} />
      {children} 
    </HeroUIProvider>
  )
}

export default Providers