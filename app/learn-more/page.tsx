"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ExternalLink, ArrowLeft } from "lucide-react"

const LearnMorePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-rose-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/my-results">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              Back to Results
            </Button>
          </Link>
        </div>
        <Link href="https://www.maketimeformore.com" target="_blank">
          <Button className="bg-[#E26C73] hover:bg-[#d15964] text-white" size="sm">
            Visit Website
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center p-4 md:p-8">
        <div className="max-w-3xl w-full space-y-6">
          <div className="text-center">
            <div className="w-36 h-36 mx-auto mb-4 relative">
              <Image
                src="/images/logo.png"
                alt="Make Time For More Logo"
                width={180}
                height={180}
                className="rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold text-[#E26C73] mb-2">Make Time For More™</h1>
            <h2 className="text-2xl font-medium text-black mb-6">The Spiritual Foundation of Work-Life Balance</h2>
          </div>

          <Card className="border-[#E26C73] bg-rose-50">
            <CardContent className="space-y-4 pt-6">
              <p>
                <strong>Make Time For More™</strong> isn't just another productivity system—it's a spiritual
                transformation disguised as a business model.
              </p>
              <p>
                We help high-achieving women entrepreneurs shift from <strong>matter-to-matter over-efforting</strong>{" "}
                to <strong>spiritual co-creation</strong> of their ideal work-lifestyle.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#E26C73]">Our Unique Approach</h2>

            <p>
              While others focus solely on schedules and strategies, we begin with something more powerful:{" "}
              <strong>your direct connection to Creator</strong>—whether you call that Jesus, Allah, Buddha, Jehovah,
              Higher Self, Source, Holy Spirit, or Universe.
            </p>

            <p>This spiritual foundation is what makes our approach revolutionary. We help you:</p>

            <div className="space-y-4 ml-4">
              <div>
                <strong>1. Set Your Desired Work-Lifestyle Intention</strong> - A sacred 28-day ask that becomes the
                foundation of your new life and leadership
              </div>
              <div>
                <strong>2. Align Your Energy Before Your Actions</strong> - Tap into manifestation principles that make
                transformation effortless
              </div>
              <div>
                <strong>3. Install New Patterns Through Structure</strong> - Use our proven framework to break hustle
                habits permanently
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-8 max-w-lg mx-auto">
            <Link href="/join-us">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 text-lg border-2 border-white">
                Join Us
              </Button>
            </Link>

            <Link href="https://www.maketimeformore.com" target="_blank">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 text-lg border-2 border-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Our Website
              </Button>
            </Link>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-[#E26C73]">The Complete System</h2>

            <Card className="border-[#E26C73] bg-rose-50">
              <CardHeader>
                <CardTitle className="text-[#E26C73]">Two Transformative Pathways</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">1. The Work-Life Balance Experience™</h3>
                  <p>
                    A transformative immersion that allows you to reset your rhythms, reclaim your time, and experience
                    what true work-life balance feels like in real-time.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">2. The Work-Life Balance Business Model & SOP Installation™</h3>
                  <p>
                    Our comprehensive system that completely replaces hustle culture with a sustainable, life-first
                    structure designed specifically for women entrepreneurs who want both business success AND quality
                    of life.
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="text-center italic text-gray-600">
              Both pathways are designed to help you break free from burnout cycles, create sustainable success, and
              finally enjoy the freedom you built your business for in the first place.
            </p>
          </div>

          <div className="space-y-2 mt-8 max-w-lg mx-auto">
            <Link href="/about">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                About
              </Button>
            </Link>

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header"
              target="_blank"
            >
              <Button className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold py-4 border-2 border-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                APPLY NOW!
              </Button>
            </Link>

            <Link href="/my-results">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Your Results
              </Button>
            </Link>
          </div>

          <p className="text-sm text-center text-gray-600 mt-8">
            "You didn't leave your high-stress role just to rebuild burnout inside your business."
            <br />- Thought Leader Barbara
          </p>
        </div>
      </main>
    </div>
  )
}

export default LearnMorePage
