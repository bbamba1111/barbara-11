"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import CherryBlossomConfetti from "./cherry-blossom-confetti"
import { Montserrat } from "next/font/google"

// Load Montserrat font with multiple weights
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"], // Adding medium weight (500) for slightly bolder option
})

interface SitePopupProps {
  onClose?: () => void
  onTakeAudit?: () => void // New prop to handle opening the audit
}

export default function SitePopup({ onClose, onTakeAudit }: SitePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has chosen not to see the popup again
    if (localStorage.getItem("dontShowAuditPopup") === "true") {
      return
    }

    // Check if this is a new session
    const lastSession = sessionStorage.getItem("auditPopupSession")
    if (lastSession) {
      return
    }

    // Mark this session
    sessionStorage.setItem("auditPopupSession", "true")

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
      setShowConfetti(true)

      // Hide confetti after 8 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 8000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  const handleDontShowAgain = () => {
    localStorage.setItem("dontShowAuditPopup", "true")
    handleClose()
  }

  const handleTakeAudit = () => {
    // Close the popup
    setIsVisible(false)

    // Call the onTakeAudit callback to open the audit
    if (onTakeAudit) {
      onTakeAudit()
    } else {
      // Fallback: If no callback is provided, try to handle it directly
      if (typeof window !== "undefined") {
        // Set a flag in sessionStorage to indicate the audit should be opened
        sessionStorage.setItem("openAuditImmediately", "true")
        // Refresh the page to trigger the audit to open
        window.location.reload()
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {showConfetti && <CherryBlossomConfetti duration={8} speed="fast" />}

      <div className="relative w-[90%] max-w-xl aspect-square rounded-[28px] bg-gradient-to-b from-white to-rose-50 p-8 shadow-xl flex items-center">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center w-full px-8 font-normal">
          <div className="mb-6 h-24 w-24 overflow-hidden rounded-full shadow-md">
            <Image
              src="/images/logo.png"
              alt="Make Time For More Logo"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className={`mb-1 text-3xl font-normal text-[#E26C73] ${montserrat.className}`}>
            Make Time For More<sup className="text-xs">™</sup>
          </h2>
          <h3 className={`mb-5 text-[22px] font-medium text-gray-800 ${montserrat.className}`}>
            Work-Life Balance Audit
          </h3>

          {/* Using slightly bolder font */}
          <p className="mb-8 text-gray-600 text-[15px] leading-relaxed font-normal">
            This is your personal 15-question Work-Life Balance Audit based on the 13 Core Life Value Areas we focus on
            inside the Make Time For More™ Work-Life Balance Experience.
          </p>

          <Button
            onClick={handleTakeAudit}
            className="mb-6 w-3/5 mx-auto bg-[#5D9D61] py-7 text-lg font-bold text-white hover:bg-[#4c8050]"
          >
            Take The FREE Audit Now!
          </Button>

          {/* Using slightly bolder font */}
          <p className="text-[14px] text-gray-500 font-normal">This is not about judgment — this is about clarity.</p>

          <div className="mt-5 flex items-center justify-center">
            {/* Using slightly bolder font */}
            <label className="flex cursor-pointer items-center text-[14px] text-gray-500 font-normal">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4"
                onChange={(e) => {
                  if (e.target.checked) {
                    localStorage.setItem("dontShowAuditPopup", "true")
                  } else {
                    localStorage.removeItem("dontShowAuditPopup")
                  }
                }}
              />
              Don't show this again
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
