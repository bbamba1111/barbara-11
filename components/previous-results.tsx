"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getAuditResults, type StoredAuditData } from "@/utils/audit-storage"
import { useRouter } from "next/navigation"
import { RefreshCw, ExternalLink, Flower, Copy, Check, Info, User } from "lucide-react"
import Image from "next/image"
import BetaInvitation from "./beta-invitation"
import { ButtonLink } from "./ui/button-link"
import ResultsConfetti from "./results-confetti"
import { Input } from "./ui/input"

export default function PreviousResults() {
  const [auditData, setAuditData] = useState<StoredAuditData | null>(null)
  const [showBetaInvite, setShowBetaInvite] = useState(false)
  const router = useRouter()
  const [name, setName] = useState("")
  const [isCherryPromptCopied, setIsCherryPromptCopied] = useState(false)
  const cherryBlossomPromptRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const data = getAuditResults()
    setAuditData(data)
  }, [])

  if (!auditData) {
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

  const { overallScore, results, personalizedFeedback } = auditData

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

  const generateCherryBlossomPrompt = () => {
    if (!auditData) return ""

    return `
My Work-Life Balance Audit Results:

Name: ${name}
Overall Score: ${overallScore}%
Completed on: ${auditData.timestamp ? formatDate(auditData.timestamp) : "Unknown date"}

Category Breakdown:
${results.map((result) => `${result.category}: ${Math.round(result.percentage)}%`).join("\n")}

Personalized Feedback:
${personalizedFeedback.map((item) => `${item.category}: ${item.feedback}`).join("\n")}
`
  }

  const copyCherryBlossomPrompt = () => {
    if (cherryBlossomPromptRef.current) {
      cherryBlossomPromptRef.current.select()
      document.execCommand("copy")
      setIsCherryPromptCopied(true)
      setTimeout(() => setIsCherryPromptCopied(false), 3000)
    }
  }

  return (
    <div className="space-y-6 p-4 relative">
      {/* Add confetti effect */}
      <ResultsConfetti score={overallScore} speed="fast" />

      {!showBetaInvite ? (
        <>
          <div className="flex justify-center mb-4">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white mb-2"
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

          <div className="space-y-3">
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

          <Card className="border-[#E26C73] bg-rose-50">
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

          <Card className="border-[#E26C73] bg-rose-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#E26C73] flex items-center gap-2">
                <Image src="/images/logo.png" alt="Cherry Blossom" width={24} height={24} className="rounded-full" />
                Get Ongoing Support From Cherry Blossom
              </CardTitle>
              <CardDescription>
                This FREE audit, created by Thought Leader Barbara is her gift to you that keeps on GIV•EN -- as you can
                retake it anytime to access your work-life balance and holistic success. It's also the 1st Step to
                working with her. Enjoy the journey!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-3 rounded-md border border-rose-100">
                <h5 className="font-medium text-black font-bold mb-2">
                  How to Get Deeper Insights from Cherry Blossom:
                </h5>

                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Copy your results to share with Cherry Blossom</strong> using the button below
                  </li>
                  <li>Click the "Paste Your Results & Chat with Cherry Blossom" button to open ChatGPT</li>
                  <li>Create a free OpenAI account if you don't have one</li>
                  <li>Paste your results into the Cherry Blossom chat box</li>
                  <li>Cherry Blossom will provide personalized guidance based on your results</li>
                </ol>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                  <Info className="h-4 w-4" />
                  <span>
                    A free OpenAI account is required to access Cherry Blossom. Sign up at{" "}
                    <a
                      href="https://chat.openai.com/auth/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E26C73] underline"
                    >
                      chat.openai.com
                    </a>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">
                  Copy Your Results From The Box Below to Share with Cherry Blossom:
                </label>
                <textarea
                  ref={cherryBlossomPromptRef}
                  className="w-full h-24 p-2 text-sm border rounded-md"
                  value={generateCherryBlossomPrompt()}
                  readOnly
                />
                <Button
                  onClick={copyCherryBlossomPrompt}
                  variant="outline"
                  className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white mb-2"
                >
                  {isCherryPromptCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Your Results For Cherry Blossom
                    </>
                  )}
                </Button>
              </div>

              <ButtonLink
                href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
                className="bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center w-full py-4 border-2 border-white mb-2"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Click Here to Paste Your Results & Chat with Cherry Blossom
                <Flower className="ml-2 h-4 w-4 text-pink-300 font-extrabold" />
              </ButtonLink>
            </CardContent>
          </Card>

          <div className="space-y-2 mt-6 max-w-lg mx-auto">
            <Button
              onClick={() => router.push("/learn-more")}
              className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
            >
              Learn More
            </Button>

            <Button
              onClick={() => router.push("/about")}
              className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
            >
              About
            </Button>

            <Button
              onClick={() => router.push("/join-us")}
              className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
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
              className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold py-4 border-2 border-white"
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
  )
}
