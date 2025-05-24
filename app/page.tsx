"use client"

import { useState, useEffect } from "react"
import WorkLifeBalanceAudit from "@/components/WorkLifeBalanceAudit"
import { hasCompletedAudit } from "@/utils/audit-storage"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import CherryBlossomConfetti from "@/components/cherry-blossom-confetti"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAudit, setShowAudit] = useState(false)
  const [hasCompletedAuditBefore, setHasCompletedAuditBefore] = useState(false)
  const [showWelcomeConfetti, setShowWelcomeConfetti] = useState(false)

  useEffect(() => {
    // Check if user has completed the audit before
    const auditCompleted = hasCompletedAudit()
    setHasCompletedAuditBefore(auditCompleted)

    // Check if user has chosen not to see the welcome popup
    const dontShowWelcome = localStorage.getItem("dontShowAuditWelcome") === "true"

    if (dontShowWelcome) {
      setShowAudit(true)
    } else {
      setShowWelcome(true)
    }

    // Add confetti after 3 seconds for new visitors
    const timer = setTimeout(() => {
      setShowWelcomeConfetti(true)
      // Hide confetti after 8 seconds
      const hideTimer = setTimeout(() => {
        setShowWelcomeConfetti(false)
      }, 8000)
      return () => clearTimeout(hideTimer)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Function to start the audit from welcome popup
  const handleStartAudit = () => {
    setShowWelcome(false)
    setShowAudit(true)
  }

  // Function to handle "don't show again" checkbox
  const handleDontShowAgain = (checked: boolean) => {
    if (checked) {
      localStorage.setItem("dontShowAuditWelcome", "true")
    } else {
      localStorage.removeItem("dontShowAuditWelcome")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-rose-50 relative rounded-3xl">
      {showWelcomeConfetti && <CherryBlossomConfetti duration={8} speed="fast" density="medium" />}

      {showWelcome && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white shadow-lg overflow-hidden max-w-[600px] min-h-[800px] relative m-4 w-full p-8">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute right-4 top-4 rounded-full opacity-70 transition-opacity hover:opacity-100 focus:outline-none z-10 p-2 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Move content down by 50% - increased top spacing significantly */}
            <div className="h-60"></div>

            <div className="flex justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Make Time For More Logo"
                width={135}
                height={135}
                className="rounded-full"
              />
            </div>

            <h1 className="text-4xl font-bold text-center mb-2 text-[#E26C73]">Make Time For More™</h1>

            <h2 className="text-2xl font-semibold text-center mb-8 text-black">Work-Life Balance Audit</h2>

            <p className="text-center text-black mb-6 px-4 text-lg leading-relaxed">
              This is your personal 15-question Work-Life Balance Audit based on the 13 Core Life Value Areas we focus
              on inside the Make Time For More™ Work-Life Balance Experience.
            </p>

            <div className="flex justify-center mb-6">
              <Button
                onClick={handleStartAudit}
                className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white px-12 py-4 text-xl font-bold border-2 border-white"
              >
                Take The FREE Audit Now!
              </Button>
            </div>

            <p className="text-center text-black mb-6 text-lg">This is not about judgment — this is about clarity.</p>

            <div className="flex items-center justify-center mb-8">
              <input
                type="checkbox"
                id="dontShow"
                className="mr-3 w-4 h-4 rounded"
                onChange={(e) => handleDontShowAgain(e.target.checked)}
              />
              <label htmlFor="dontShow" className="text-base text-black">
                Don't show this again
              </label>
            </div>

            {/* Reduced bottom spacing since content moved down */}
            <div className="h-4"></div>
          </div>
        </div>
      )}

      {showAudit && <WorkLifeBalanceAudit onClose={() => setShowAudit(false)} />}
    </main>
  )
}
