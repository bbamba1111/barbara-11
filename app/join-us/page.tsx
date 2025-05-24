"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw } from "lucide-react"
import CherryBlossomConfetti from "@/components/cherry-blossom-confetti"
import LargeCountdownTimer from "@/components/large-countdown-timer"

export default function JoinUsPage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Full Menu Header */}
      <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Make Time For More™" width={40} height={40} className="rounded-full" />
          <span className="ml-2 font-medium text-[#E26C73]">Make Time For More™</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake The Audit
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              Learn More
            </Button>
          </Link>
          <Link href="/join-us">
            <Button variant="ghost" size="sm" className="bg-gray-100 text-black">
              Join Us
            </Button>
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header"
            target="_blank"
          >
            <Button className="bg-[#5D9D61] hover:bg-[#4c8050] text-white" size="sm">
              APPLY NOW!
            </Button>
          </Link>
          <Link href="https://www.maketimeformore.com" target="_blank">
            <Button className="bg-[#E26C73] hover:bg-[#d15964] text-white" size="sm">
              Visit Our Website
            </Button>
          </Link>
        </div>
      </header>

      <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-rose-50 relative">
        {showConfetti && <CherryBlossomConfetti duration={8} speed="fast" density="medium" />}

        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="text-center mb-6">
            <Link href="/" className="text-[#E26C73] hover:underline">
              ← Back to Home
            </Link>
          </div>

          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo.png"
              alt="Make Time For More Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
          </div>

          <h1
            className="text-2xl md:text-3xl font-medium text-[#5D9D61] mb-6 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
          >
            Join Us for a 7-Day Reset, our 14-Day Momentum Builder or the 21-Day Habit Building Cycle + 1 Week Recovery
            Break For The Complete 28-Day Work-Life Balance Experience!
          </h1>

          {/* Tea celebration image above countdown - increased by 50% */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/tea-celebration.png"
              alt="Women celebrating with tea under cherry blossoms"
              width={600}
              height={375}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Countdown Timer Section */}
          <div className="bg-gradient-to-r from-[#E26C73] to-[#5D9D61] p-6 rounded-lg text-white mb-8">
            <LargeCountdownTimer className="text-white" />
          </div>

          <div className="text-center mb-6">
            <p className="text-lg font-medium text-black">
              Sunday Kick-Off Begins 1:PM ET | Monday - Thursday Co-Working Begins 9:AM ET
            </p>
          </div>

          <div className="bg-rose-50 border border-[#E26C73] p-6 max-w-2xl mx-auto">
            <h3 className="font-medium text-[#E26C73] mb-3">Important Enrollment Deadline</h3>
            <p className="mb-3">
              You must complete the enrollment process by <span className="font-bold">Thursday 7:00 PM EST</span> to
              attend the Sunday Kick-Off Celebration and begin co-working on Monday.
            </p>
            <p className="text-sm font-medium">Sunday Kick-Off: 1:00 PM EST | Monday Co-Working: 9:00 AM EST</p>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-6 max-w-2xl mx-auto">
            <h3 className="font-medium text-amber-700 mb-3">Special BETA Opportunity</h3>
            <p className="mb-3">
              You're invited to join our exclusive BETA program at special BETA investment pricing!
            </p>
            <p className="text-sm">
              This special BETA pricing is available for a limited time only. Once our BETA period concludes, the
              investment will increase to reflect the premium value of this boutique experience.
            </p>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header"
              target="_blank"
            >
              <Button className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white py-4 text-xl font-bold border-2 border-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                APPLY NOW!
              </Button>
            </Link>

            <Link href="/learn-more">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                Learn More
              </Button>
            </Link>

            <Link href="/about">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                About
              </Button>
            </Link>

            <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
              Join Us
            </Button>
          </div>

          <p className="text-sm text-gray-600 mt-8">
            "You didn't leave your high-stress role just to rebuild burnout inside your business."
            <br />- Thought Leader Barbara
          </p>
        </div>
      </main>
    </>
  )
}
