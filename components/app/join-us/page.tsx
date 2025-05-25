"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ExternalLink, ArrowLeft, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import CountdownTimer from "@/components/countdown-timer"
import RepeatedConfetti from "@/components/repeated-confetti"
import { Montserrat } from "next/font/google"

// Initialize Montserrat with multiple weights
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

export default function JoinUsPage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 10 seconds (enough for all bursts)
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 10000)

    // Scroll to top when the page loads
    window.scrollTo(0, 0)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Function to open the website
  const goToWebsite = () => {
    window.open("https://www.maketimeformore.com/products/apply-now-to-become-a-beta-tester-copy-r7kyy", "_blank")
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
          <h1 className={`text-2xl font-medium text-[#5D9D61] mb-2 ${montserrat.className}`}>
            Join Us for a 7 Day Reset, our 14 Day Momentum Builder or the 21-Day Habit Building Cycle + 1 Week Recovery
            Break = The 28 Day Transformation Cycle For The Month!
          </h1>
        </div>

        <div className="flex justify-center mb-4 relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1akick-P2UP8ICvs4G1iTkVYmy5CEDFsMtTIB.png"
            alt="Women enjoying tea under cherry blossoms"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Countdown Timer - Pink and Green */}
        <div className="mb-4">
          <div className="bg-gradient-to-r from-[#E26C73] to-[#5D9D61] p-4 rounded-lg text-white">
            <CountdownTimer className="text-white" />
          </div>
        </div>

        <div className="space-y-6 py-4">
          <p className="text-center text-lg font-bold">
            Sunday Kick-Off Begins 1:PM ET | Monday - Thursday Co-Working Begins 9:AM ET
          </p>

          <Card className="border-[#E26C73] bg-rose-50">
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-medium text-[#E26C73] text-xl mb-2">Important Enrollment Deadline</h3>
              <p className="mb-2 text-lg">
                You must complete the enrollment process by <span className="font-bold">Thursday 7:00 PM EST</span> to
                attend the Sunday Kick-Off Celebration and begin co-working on Monday.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-300 bg-amber-50">
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-medium text-amber-700 text-xl mb-2">Special BETA Opportunity</h3>
              <p className="mb-3 text-lg">
                You're invited to join our exclusive BETA program at special BETA investment pricing!
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
              className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              APPLY NOW!
            </Button>

            <Button onClick={() => router.push("/learn-more")} className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Learn More
            </Button>

            <Button onClick={goToWebsite} className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white">
              <Globe className="mr-2 h-4 w-4" />
              Visit Our Website
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
