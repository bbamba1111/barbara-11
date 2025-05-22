"use client"

import { useState, useEffect } from "react"
import WorkLifeBalanceAudit from "@/components/work-life-balance-audit"
import { hasCompletedAudit } from "@/utils/audit-storage"
import { useRouter } from "next/navigation"

export default function Home() {
  // Automatically show the audit when the page loads
  const [showAudit, setShowAudit] = useState(true)
  const [hasCompletedAuditBefore, setHasCompletedAuditBefore] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auditCompleted = hasCompletedAudit()
    setHasCompletedAuditBefore(auditCompleted)

    // If they've completed the audit before, show them their results
    if (auditCompleted) {
      router.push("/my-results")
    }
  }, [router])

  // Function to handle audit completion
  const handleAuditComplete = () => {
    setHasCompletedAuditBefore(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-rose-50">
      {showAudit && <WorkLifeBalanceAudit onClose={() => setShowAudit(false)} onComplete={handleAuditComplete} />}
    </main>
  )
}