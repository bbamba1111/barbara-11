import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavHeader from "@/components/nav-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Work-Life Balance Audit | Make Time For More",
  description: "Assess your work-life balance with our free audit tool",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavHeader />
        {children}
      </body>
    </html>
  )
}
