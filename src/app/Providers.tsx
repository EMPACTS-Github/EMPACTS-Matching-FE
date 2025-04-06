'use client'
import React from 'react';
import { HeroUIProvider, ToastProvider } from '@heroui/react'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement={'top-right'} toastProps={{ classNames: { base: 'top-5' } }} />
      {children} 
    </HeroUIProvider>
  )
}

export default Providers