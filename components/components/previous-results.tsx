"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getAuditResults, type StoredAuditData } from "@/utils/audit-storage"
import { useRouter } from "next/navigation"
import { ArrowLeft, RefreshCw, ExternalLink, Flower } from "lucide-react"
import Image from "next/image"
import BetaInvitation from "./beta-invitation"
import { ButtonLink } from "./ui/button-link"
import ResultsConfetti from "./results-confetti"

export default function PreviousResults() {
  const [auditData, setAuditData] = useState<StoredAuditData | null>(null)
  const [showBetaInvite, setShowBetaInvite] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const data = getAuditResults()
    setAuditData(data)
  }, [])

  if (!auditData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-4">No Previous Audit Results Found</h2>
          <p className="mb-4">You haven't completed the Work-Life Balance Audit yet.</p>
          <Button onClick={() => router.push("/")} className="bg-[#E26C73] hover:bg-[#d15964]">
            Take the Audit Now
          </Button>
        </div>
      </div>
    )
  }

  const { name, overallScore, results, personalizedFeedback } = auditData

  const getScoreColor = (percentage: number) => {
    if (percentage < 40) return "text-red-500"
    if (percentage < 70) return "text-amber-500"
    return "text-emerald-500"
  }

  const getScoreDescription = (percentage: number) => {
    if (percentage < 40) return "Needs significant improvement"
    if (percentage < 70) return "Room for improvement"
    if (percentage < 90) return "Good balance"
    return "Excellent balance"
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div className="min-h-screen flex justify-center items-start py-8 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6 relative">
        {/* Add confetti effect */}
        <ResultsConfetti score={overallScore} speed="fast" />

        {!showBetaInvite ? (
          <>
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => router.push("/")} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="mb-4 bg-[#5D9D61] hover:bg-[#4c8050] text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake The Audit
              </Button>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Make Time For More Logo"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-xl font-bold">Your Previous Audit Results</h2>
              <p className="text-gray-500">
                Completed on {auditData.timestamp ? formatDate(auditData.timestamp) : "Unknown date"}
              </p>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Overall Score: {overallScore}%</h3>
              <p className={`${getScoreColor(overallScore)} font-medium`}>{getScoreDescription(overallScore)}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Category Breakdown</h4>
              {results.map((result) => (
                <div key={result.category} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>{result.category}</span>
                    <span className={getScoreColor(result.percentage)}>{Math.round(result.percentage)}%</span>
                  </div>
                  <Progress value={result.percentage} className="h-2" />
                </div>
              ))}
            </div>

            <Card className="border-[#E26C73] bg-rose-50 mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-[#E26C73]">Personalized Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {personalizedFeedback.map((item, index) => (
                    <li key={index}>
                      <strong>{item.category}:</strong> {item.feedback}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <ButtonLink
              href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
              className="bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center w-full mt-6"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Chat with Cherry Blossom
              <Flower className="ml-2 h-4 w-4 text-pink-300 font-extrabold" />
            </ButtonLink>

            <div className="space-y-4 mt-6">
              <Button
                onClick={() => router.push("/join-us")}
                className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white"
              >
                Join Us
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header",
                    "_blank",
                  )
                }
                className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                APPLY NOW!
              </Button>
            </div>
          </>
        ) : (
          <BetaInvitation
            onBack={() => setShowBetaInvite(false)}
            overallScore={overallScore}
            name={name}
            results={results}
            personalizedFeedback={personalizedFeedback}
          />
        )}
      </div>
    </div>
  )
}
