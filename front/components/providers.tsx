"use client"

import { CartProvider } from "use-shopping-cart"
import { ThemeProvider } from "front/components/theme-provider"

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return <CartProvider
    currency="USD"
    shouldPersist
    cartMode="checkout-session"
    stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
  >
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  </CartProvider>
}
