"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { hasCompletedAudit } from "@/utils/audit-storage"
import PreviousResults from "@/components/previous-results"

export default function MyResultsPage() {
  const router = useRouter()
  const [hasResults, setHasResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has completed the audit
    const auditCompleted = hasCompletedAudit()
    setHasResults(auditCompleted)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null // or a loading spinner
  }

  if (!hasResults) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-rose-50">
        <div className="text-center space-y-6">
          <div className="w-36 h-36 mx-auto mb-6">
            <Image
              src="/images/logo.png"
              alt="Make Time For More Logo"
              width={180}
              height={180}
              className="rounded-full shadow-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#E26C73] mb-4">No Results Found</h1>

          <div className="space-y-2 text-gray-600">
            <p>You haven't completed the Work-Life Balance Audit yet.</p>
            <p>Take the audit to see your personalized results.</p>
          </div>

          <Button
            onClick={() => router.push("/")}
            className="bg-[#E26C73] hover:bg-[#d15964] text-white px-8 py-4 text-lg border-2 border-white"
          >
            Take the Audit Now
          </Button>
        </div>
      </main>
    )
  }

  // If user has results, show the full results page with all Cherry Blossom features
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-gradient-to-b from-white to-rose-50">
      <PreviousResults />
    </main>
  )
}
