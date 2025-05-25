"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import NavHeader from "@/components/nav-header"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Clear the session storage for the popup when the app is loaded
    // This ensures the popup will show again if the user refreshes the page
    sessionStorage.removeItem("auditPopupSession")
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavHeader />
        {children}
      </body>
    </html>
  )
}
