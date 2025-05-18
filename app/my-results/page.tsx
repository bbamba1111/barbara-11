"use client"
import PreviousResults from "@/components/previous-results"
import { useEffect, useState } from "react"
import { hasCompletedAudit } from "@/utils/audit-storage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MyResultsPage() {
  const [hasResults, setHasResults] = useState(false)
  const router = useRouter()
  
  // Check if the user has completed the audit
  useEffect(() => {
    const completed = hasCompletedAudit()
    setHasResults(completed)
  }, [])
  
  // If no results, show a message and a button to take the audit
  if (!hasResults) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">No Previous Audit Results Found</h2>
        <p className="mb-4">You haven't completed the Work-Life Balance Audit yet.</p>
        <Button onClick={() => router.push("/")} className="bg-[#E26C73] hover:bg-[#d15964]">
          Take the Audit Now
        </Button>
      </div>
    )
  }
  
  // If results exist, show the PreviousResults component
  return <PreviousResults />
}