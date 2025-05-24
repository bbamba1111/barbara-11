"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ExternalLink, ArrowLeft, FileText, Flower, Globe } from 'lucide-react'
import { useRouter } from "next/navigation"
import { ButtonLink } from "@/components/ui/button-link"

export default function LearnMorePage() {
  const router = useRouter()
  const goToJoinUs = () => {
    router.push("/join-us")
  }

  const goToWebsite = () => {
    window.open("https://www.maketimeformore.com", "_blank")
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
          <h3 className="text-2xl font-bold text-[#E26C73] mb-2">Make Time For More™</h3>
          <h4 className="text-xl font-semibold text-black mb-2">The Spiritual Foundation of Work-Life Balance</h4>
        </div>

        <div className="text-center mb-6"></div>

        <Card className="border-[#E26C73] bg-rose-50">
          <CardContent className="space-y-4 pt-6">
            <p className="font-medium">
              <strong>Make Time For More™</strong> isn't just another productivity system—it's a spiritual
              transformation disguised as a business model.
            </p>

            <p>
              We help high-achieving women entrepreneurs shift from <strong>matter-to-matter over-efforting</strong> to{" "}
              <strong>spiritual co-creation</strong> of their ideal work-lifestyle.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">Our Unique Approach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While others focus solely on schedules and strategies, we begin with something more powerful:{" "}
              <strong>your direct connection to Creator</strong>—whether you call that Jesus, Allah, Buddha, Jehovah,
              Higher Self, Source, Holy Spirit, or Universe.
            </p>

            <p className="mb-3">This spiritual foundation is what makes our approach revolutionary. We help you:</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Set Your Desired Work-Lifestyle Intention</strong> - A sacred 28-day ask that becomes the
                foundation of your new life and leadership
              </li>
              <li>
                <strong>Align Your Energy Before Your Actions</strong> - Tap into manifestation principles that make
                transformation effortless
              </li>
              <li>
                <strong>Install New Patterns Through Structure</strong> - Use our proven framework to break hustle
                habits permanently
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* First Join Us button */}
        <Button onClick={goToJoinUs} className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-6 text-lg">
          Join Us
        </Button>

        <Button onClick={goToWebsite} className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white py-3">
          <Globe className="mr-2 h-4 w-4" />
          Visit Our Website
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">The Complete System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h5 className="font-bold text-black mb-2">Step 1: The Work-Life Balance Audit</h5>
              <p>
                Discover where you stand across 13 Core Life Value Areas and receive personalized guidance from Cherry
                Blossom, your AI Work-Life Balance Guide.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-black mb-2">Step 2: Choose Your Path</h5>
              <p className="mb-3">Select the experience that matches your readiness:</p>

              <div className="mb-4">
                <h6 className="font-semibold text-[#E26C73]">The Experience (One-time reset):</h6>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>7-Day Reset ($2,500)</li>
                  <li>14-Day Momentum Builder ($5,000)</li>
                  <li>21-Day Habit Builder + Recovery Week ($7,500)</li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold text-[#E26C73]">The Installation (Complete transformation):</h6>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>7-Day Installation - 3 consecutive cycles ($7,500)</li>
                  <li>14-Day Installation - 3 consecutive cycles ($15,000)</li>
                  <li>21-Day Installation - 3 consecutive cycles ($22,500)</li>
                </ul>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-black mb-2">Step 3: Access Your Success Hub</h5>
              <p className="mb-2">Immediately plug into our comprehensive digital ecosystem with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Day-by-day implementation guides</li>
                <li>Cherry Blossom AI tools for each component</li>
                <li>Video tutorials and templates</li>
                <li>Community connection points</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-black mb-2">Step 4: Live the New Model</h5>
              <p className="mb-2">Experience the daily rhythm that breaks hustle habits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Morning GIV•EN™ Routine (9-10:30 AM)</li>
                <li>30-Minute Workday Workout (10:30-11 AM)</li>
                <li>Extended Healthy Hybrid Lunch (11 AM-1 PM)</li>
                <li>4-Hour Focused CEO Workday (1-5 PM)</li>
                <li>Quality Lifestyle Experiences</li>
                <li>Power Down & Unplug Ritual</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-black mb-2">Step 5: Ongoing Support</h5>
              <p className="mb-2">After your installation (14 or 21-day), maintain your transformation with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Affordable maintenance options</li>
                <li>Continued access to the community</li>
                <li>Refresher sessions as needed</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Second Join Us button */}
        <Button onClick={goToJoinUs} className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-6 text-lg">
          Join Us
        </Button>

        <Button onClick={goToWebsite} className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white py-3">
          <Globe className="mr-2 h-4 w-4" />
          Visit Our Website
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">The Training Wheels Approach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We don't just teach concepts—we ride alongside you. Like training wheels on a bicycle, we provide the
              structure and support until the new way of working becomes second nature.
            </p>
            <p>
              Most women need about 3 months to fully integrate this new operating system. Once it's installed, you'll
              never go back to hustle mode again.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">The Science + Spirit Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="mb-3">Our approach uniquely combines:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Neuroscience</strong> - Rewiring your brain's reward pathways
              </li>
              <li>
                <strong>Quantum Physics</strong> - Energy alignment principles
              </li>
              <li>
                <strong>Epigenetics</strong> - Breaking generational hustle patterns
              </li>
              <li>
                <strong>Hormone Science</strong> - Supporting your body's natural rhythms
              </li>
              <li>
                <strong>Spiritual Co-Creation</strong> - Partnering with higher power
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#E26C73]">The Results You'll Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>152 hours of weekly time freedom</li>
              <li>A 4-day workweek with 3-day weekends</li>
              <li>Focused 4-hour CEO workdays</li>
              <li>Balanced hormones and reduced stress</li>
              <li>Deeper spiritual connection</li>
              <li>Sustainable business growth without burnout</li>
              <li>Alignment across all 13 Core Life Value Areas</li>
            </ul>
          </CardContent>
        </Card>

        {/* New BETA Opportunity Card */}
        <Card className="border-[#E26C73] bg-[#f5f0e6]">
          <CardHeader>
            <CardTitle className="text-amber-700">Ready to Transform?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Make Time For More™ Work-Life Balance Experience isn't just about doing less—it's about becoming more.
              More present. More intentional. More aligned with your highest purpose and deepest desires.
            </p>
            <p className="font-medium">
              This is your invitation to stop hustling for your worth and start co-creating the work-lifestyle you truly
              desire—with divine support, proven structure, and a community of women walking the same path.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 mt-6">
          {/* Third Join Us button */}
          <Button onClick={goToJoinUs} className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-3 text-lg">
            Join Us
          </Button>

          <Button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header",
                "_blank",
              )
            }
            className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white py-3 text-lg font-bold"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            APPLY NOW!
          </Button>

          <ButtonLink
            href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
            className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center py-3"
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

          <Button variant="outline" onClick={goToWebsite} className="flex-1 bg-[#5D9D61] text-white hover:bg-[#4c8050]">
            <Globe className="mr-2 h-4 w-4" />
            Visit Website
          </Button>
        </div>
      </div>
    </main>
  )
}
