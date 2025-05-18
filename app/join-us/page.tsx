"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ExternalLink, Clock, ArrowLeft, FileText, Globe } from 'lucide-react'
import { useRouter } from "next/navigation"
import CountdownTimer from "@/components/countdown-timer"
import RepeatedConfetti from "@/components/repeated-confetti"

export default function JoinUsPage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 10 seconds (enough for all bursts)
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const goToWebsite = () => {
    window.open("https://www.maketimeformore.com", "_blank")
  }

  const goToLearnMore = () => {
    // Navigate to the learn-more page and ensure it scrolls to the top
    router.push("/learn-more")
    // Force scroll to top after navigation
    window.scrollTo(0, 0)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-3xl w-full space-y-6 mb-16 relative">
        {showConfetti && <RepeatedConfetti burstCount={3} burstDuration={3} interval={3000} />}

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Button variant="outline" onClick={() => router.push("/my-results")} className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Back to Results
          </Button>

          <Button variant="outline" onClick={goToWebsite} className="flex-1 bg-[#5D9D61] text-white hover:bg-[#4c8050]">
            <Globe className="mr-2 h-4 w-4" />
            Visit Website
          </Button>
        </div>

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
          <h1 className="text-2xl font-bold text-[#E26C73] mb-2">Join Us For Our Next Sunday Kick-Off Celebration!</h1>
          <p className="text-gray-600 mb-2">Immerse yourself in the top 5% sacred secret to work-lifestyle success</p>
        </div>

        <div className="flex justify-center mb-4 relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1akick-P2UP8ICvs4G1iTkVYmy5CEDFsMtTIB.png"
            alt="Women enjoying tea under cherry blossoms"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Countdown Timer - Pink and Green Gradient */}
        <div className="mb-4">
          <div className="bg-gradient-to-r from-[#E26C73] to-[#5D9D61] p-4 rounded-lg text-white shadow-md">
            <CountdownTimer className="text-white" />
          </div>
          
          {/* Timing information moved here and styled as requested */}
          <div className="text-center mt-3">
            <p className="text-black font-bold text-lg">
              Sunday Kick-Off Begins: 1:00 PM EST | Monday Co-Working Begins: 9:00 AM EST
            </p>
          </div>
        </div>

        <div className="space-y-6 py-4">
          <Card className="border-[#E26C73] bg-rose-50">
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-medium text-[#E26C73] text-xl mb-2">Important Enrollment Deadline</h3>
              <p className="mb-2 text-lg">
                You must complete the enrollment process by <span className="font-bold">Thursday 7:00 PM EST</span> to
                attend the Sunday Kick-Off Celebration and begin co-working on Monday.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E26C73] bg-[#f5f0e6]">
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-medium text-amber-700 text-xl mb-2">Special BETA Opportunity</h3>
              <p className="mb-3 text-lg">
                You're invited to discover The Sacred Secret to Success through our exclusive BETA program at special
                investment pricing!
              </p>
              <p className="mb-3">
                As a BETA participant, you'll receive the full premium experience at a reduced investment in exchange
                for:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Your valuable feedback on the experience</li>
                <li>A testimonial sharing your transformation</li>
                <li>Your insights to help shape and refine the program</li>
              </ul>
              <p className="text-md font-medium text-amber-700">
                This special BETA pricing is available for a limited time only. Once our BETA period concludes, the
                investment will increase to reflect the premium value of this boutique experience.
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header",
                  "_blank",
                )
              }
              className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white text-lg py-3 relative font-bold"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              APPLY NOW!
            </Button>

            <Button
              onClick={goToLearnMore}
              className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-3"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Learn More
            </Button>

            <Button onClick={goToWebsite} className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white py-3">
              <Globe className="mr-2 h-4 w-4" />
              Visit Our Website
            </Button>

            <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-4">
            "You didn't leave your high-stress role just to rebuild burnout inside your business."
            <br />- Thought Leader Barbara
          </p>
        </div>
      </div>
    </main>
  )
}