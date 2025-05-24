"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ExternalLink, ArrowLeft, ArrowRight, FileText, Flower } from "lucide-react"
import { useRouter } from "next/navigation"
import { improvedDescription } from "@/components/improved-description"
import { useState, useEffect } from "react"
import { ButtonLink } from "@/components/ui/button-link"

export default function LearnMorePage() {
  const router = useRouter()
  const [isBlinking, setIsBlinking] = useState(true)

  useEffect(() => {
    // Set up blinking effect
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev)
    }, 800)

    return () => {
      clearInterval(blinkInterval)
    }
  }, [])

  // Function to open external links
  const openExternalLink = (url: string) => {
    window.open(url, "_blank")
  }

  const goToJoinUs = () => {
    router.push("/join-us")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-3xl w-full space-y-6 mb-16">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Button variant="outline" onClick={() => router.push("/my-results")} className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Back to Results
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

        {/* First Join Us button */}
        <Button onClick={goToJoinUs} className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-6 text-lg">
          Join Us
          <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">The 90-Day Business Model & SOP Installation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-bold text-black mb-2">The Work-Life Balance Business Model™ Installation</h5>
              <p className="font-medium mb-2">Your New Strategy for Sustainable Success</p>

              <p className="mb-3">
                Inside Make Time For More™, you aren't just learning about work-life balance. You're installing it —
                step by step, layer by layer — until it becomes your new Sustainable Operating Procedure (SOP) for life,
                business, and leadership.
              </p>

              <p className="mb-3">
                Designed to replace the burnout-driven hustle with a life-first structure, this model includes:
              </p>

              <ul className="list-none space-y-1 mb-4">
                <li>✅ A 4-Day Workweek with 3-Day Weekends</li>
                <li>✅ 4-Hour Focused CEO Workdays</li>
                <li>✅ 152 Hours of Weekly Time Freedom</li>
                <li>✅ Expansion into the 13 Core Life Value Areas</li>
              </ul>

              <p className="font-medium">This is your new success system:</p>
              <p>Built for freedom, not exhaustion</p>
              <p>Aligned with intention, biology, and legacy</p>

              <p className="mt-3">The Business Model & SOP is installed over 3 consecutive 28-day cycles.</p>
            </div>

            <div className="mt-6">
              <h5 className="font-bold text-black mb-2">The 9-to-5 & Night Time Non-Negotiables™ SOP Installation</h5>
              <p className="font-medium mb-2">Your New Daily Operating Rhythm</p>

              <p className="mb-3">
                While the business model sets the big picture structure, the SOP is how you live it — day in and day
                out.
              </p>

              <p className="mb-3">This science-backed, spiritually grounded routine includes:</p>

              <ul className="list-none space-y-1 mb-4">
                <li>✅ Morning GIV•EN™ Routine</li>
                <li>✅ 30-Minute Workday Workout Window</li>
                <li>✅ Extended Healthy Hybrid Lunch Break</li>
                <li>✅ 4-Hour Focused CEO Workday</li>
                <li>✅ Quality of Lifestyle Experiences</li>
                <li>✅ Power Down & Unplug Ritual</li>
              </ul>

              <p>
                This is your repeatable rhythm for balance, vitality, and intentional success — lived 4–7 days a week.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Second Join Us button */}
        <Button onClick={goToJoinUs} className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-6 text-lg">
          Join Us
          <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">The Work-Life Balance Experience™</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-bold text-black">Choose a 7-Day, 14-Day, or 21-Day + 1 Week Break = 28-Day Cycle</p>

            <p className="mb-3">
              Perfect for women ready to reset their rhythm and experience the benefits of the Make Time For More™
              Business Model + SOP without committing to a full 90-day cycle (yet).
            </p>

            <ul className="list-none space-y-1 mb-4">
              <li>✅ Try on the structure</li>
              <li>✅ Reclaim your time</li>
              <li>✅ Experience the rhythm of balance</li>
            </ul>
          </CardContent>
        </Card>

        {/* New BETA Opportunity Card */}
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-700">Special BETA Opportunity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              You're invited to join our exclusive BETA program at special BETA investment pricing!
            </p>

            <p>
              As a BETA participant, you'll receive the full premium experience at a reduced investment in exchange for:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Your valuable feedback on the experience</li>
              <li>A testimonial sharing your transformation</li>
              <li>Your insights to help shape and refine the program</li>
            </ul>

            <p className="mt-3 font-medium text-amber-700">
              This special BETA pricing is available for a limited time only. Once our BETA period concludes, the
              investment will increase to reflect the premium value of this boutique experience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">Choose Your BETA Experience or Installation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h5 className="font-bold text-black mb-3">
              How Deeply Will You Root Your New Work-Life Balance Blueprint?
            </h5>

            <p className="mb-4">You choose the installation level based on the rhythm you're ready to adopt:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-md">
                <h6 className="font-bold text-black">7-Day BETA</h6>
                <p>Work-Life Balance Reset</p>
                <p>(within 28-Day Cycle)</p>
                <p className="font-bold mt-2">$2,500</p>
              </div>

              <div className="border p-4 rounded-md">
                <h6 className="font-bold text-black">7-Day BETA</h6>
                <p>Work-Life Balance Business Model & SOP Installation</p>
                <p>(3 Consecutive Cycles)</p>
                <p className="font-bold mt-2">$7,500</p>
              </div>

              <div className="border p-4 rounded-md">
                <h6 className="font-bold text-black">14-Day BETA</h6>
                <p>Work-Life Balance Momentum Builder</p>
                <p>(within 28-Day Cycle)</p>
                <p className="font-bold mt-2">$5,000</p>
              </div>

              <div className="border p-4 rounded-md">
                <h6 className="font-bold text-black">14-Day BETA</h6>
                <p>Work-Life Balance Business Model & SOP Installation</p>
                <p>(3 Consecutive Cycles)</p>
                <p className="font-bold mt-2">$15,000</p>
              </div>

              <div className="border p-4 rounded-md">
                <h6 className="font-bold text-black">21-Day BETA</h6>
                <p>Work-Life Balance Habit Building + Recovery Week</p>
                <p>(within 28-Day Cycle)</p>
                <p className="font-bold mt-2">$7,500</p>
              </div>

              <div className="border p-4 rounded-md">
                <h6 className="font-bold text-black">28-Day BETA</h6>
                <p>Work-Life Balance Business Model & SOP Installation</p>
                <p>(3 Consecutive Cycles)</p>
                <p className="font-bold mt-2">$22,500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mt-6">
          {/* Third Join Us button */}
          <Button onClick={goToJoinUs} className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-6 text-lg">
            Join Us
            <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
          </Button>

          <Button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header",
                "_blank",
              )
            }
            className={`${
              isBlinking ? "bg-[#5D9D61] animate-pulse" : "bg-[#4c8050]"
            } text-white w-full py-6 text-lg relative font-bold`}
          >
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              <ArrowRight className="h-6 w-6 animate-bounce" />
            </div>
            <ExternalLink className="mr-2 h-5 w-5" />
            APPLY NOW!
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <ArrowLeft className="h-6 w-6 animate-bounce" />
            </div>
          </Button>

          <ButtonLink
            href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
            className="bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Chat with Cherry Blossom
            <Flower className="ml-2 h-4 w-4 text-pink-300 font-extrabold" />
          </ButtonLink>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Button variant="outline" onClick={() => router.push("/my-results")} className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
        </div>
      </div>
    </main>
  )
}
