"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import WorkLifeBalanceAudit from "@/components/work-life-balance-audit"
import FollowUpPopup from "@/components/follow-up-popup"
import { hasCompletedAudit } from "@/utils/audit-storage"
import { useRouter } from "next/navigation"
import { RefreshCw, FileText } from 'lucide-react'

export default function Home() {
  const [showAudit, setShowAudit] = useState(false)
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [hasCompletedAuditBefore, setHasCompletedAuditBefore] = useState(false)
  const router = useRouter()

  // Check localStorage on component mount to see if user has completed the audit
  useEffect(() => {
    const auditCompleted = hasCompletedAudit()
    setHasCompletedAuditBefore(auditCompleted)

    // Only show follow-up popup for returning visitors who completed the audit
    if (auditCompleted && document.referrer !== "") {
      setShowFollowUp(true)
    }
  }, [])

  // Function to handle audit completion
  const handleAuditComplete = () => {
    setHasCompletedAuditBefore(true)
    // Don't close the audit - let the user see their results
  }

  // Function to view previous results
  const viewPreviousResults = () => {
    router.push("/my-results")
  }

  const goToWebsite = () => {
    window.open("https://www.maketimeformore.com", "_blank")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Make Time For More Logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg cursor-pointer"
            onClick={hasCompletedAuditBefore ? viewPreviousResults : () => setShowAudit(true)}
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#E26C73]">Make Time For More™</h1>
        <h2 className="text-2xl font-medium mb-6 text-gray-700">Work-Lifestyle Balance Audit</h2>
        <p className="text-lg text-gray-600 mb-4">
          This is your personal 15-question Work-Lifestyle Balance Audit based on the 13 Core Life Value Areas we focus
          on inside the Make Time For More™ Work-Lifestyle Balance Experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            onClick={() => setShowAudit(true)}
            className="bg-[#5D9D61] hover:bg-[#4c8050] text-white font-medium px-8 py-6 rounded-md shadow-md"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Take The Audit
          </Button>

          {hasCompletedAuditBefore && (
            <Button
              size="lg"
              onClick={viewPreviousResults}
              className="bg-[#E26C73] hover:bg-[#d15964] text-white font-medium px-8 py-6 rounded-md shadow-md"
            >
              <FileText className="mr-2 h-5 w-5" />
              Back to Your Results
            </Button>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-500">This is not about judgment — this is about clarity.</p>
      </div>

      {showAudit && <WorkLifeBalanceAudit onClose={() => setShowAudit(false)} onComplete={handleAuditComplete} />}

      {showFollowUp && <FollowUpPopup onClose={() => setShowFollowUp(false)} />}
    </main>
  )
}