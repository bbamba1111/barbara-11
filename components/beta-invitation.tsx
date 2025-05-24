"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ExternalLink, ArrowLeft, Flower } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Category, Result } from "./work-life-balance-audit"
import { ButtonLink } from "./ui/button-link"

const improvedDescription = `
The Work-Life Balance Experience is designed to help high-achieving women entrepreneurs reclaim their personal lives while building successful businesses. 
Through a series of workshops, coaching sessions, and interactive activities, participants will gain practical tools and insights to improve their work-life balance.
The Work-Life Balance Business Model & SOP Installation provides a comprehensive framework for entrepreneurs to structure their businesses in a way that supports both productivity and personal well-being.
`

interface BetaInvitationProps {
  onBack: () => void
  overallScore: number
  name?: string
  email?: string
  results?: Result[]
  categoryLabels?: Record<Category, string>
  personalizedFeedback?: { category: Category; feedback: string }[]
}

export default function BetaInvitation({
  onBack,
  overallScore,
  name = "",
  email = "",
  results = [],
  categoryLabels = {},
  personalizedFeedback = [],
}: BetaInvitationProps) {
  const router = useRouter()
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isCherryPromptCopied, setIsCherryPromptCopied] = useState(false)
  const cherryBlossomPromptRef = useRef<HTMLTextAreaElement>(null)

  // Function to navigate to join us page
  const goToJoinUs = () => {
    router.push("/join-us")
  }

  // Function to open external links
  const openExternalLink = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <Image
            src="/images/logo.png"
            alt="Make Time For More Logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>
        <h3 className="text-2xl font-bold text-[#E26C73] mb-2">Make Time For More™</h3>
        <p className="text-gray-600 mb-4">
          Helping High-Achieving Women Entrepreneurs Reclaim the Life You Built Your Business For
        </p>
      </div>

      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-black">
          Introducing ... The Work-Life Balance Experience & The Work-Life Balance Business Model & SOP Installation
        </h4>
      </div>

      <Card className="border-[#E26C73] bg-rose-50">
        <CardContent className="space-y-4 pt-6">
          {improvedDescription.split("\n\n").map((paragraph, index) => (
            <p key={index} className={index === 0 ? "font-medium" : ""}>
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2 mt-6 max-w-lg mx-auto">
        <Button
          onClick={goToJoinUs}
          className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Join Us
        </Button>

        <Button
          onClick={() => router.push("/learn-more")}
          className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Learn More
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

        <ButtonLink
          href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
          className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center py-4 border-2 border-white"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Chat with Cherry Blossom
          <Flower className="ml-2 h-4 w-4 text-pink-300 font-extrabold" />
        </ButtonLink>
      </div>

      <Button
        variant="outline"
        onClick={onBack}
        className="w-full max-w-lg mx-auto bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white mt-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Your Results
      </Button>
    </div>
  )
}
