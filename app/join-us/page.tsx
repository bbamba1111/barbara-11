"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from 'lucide-react'

export default function JoinUsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set your target date here (June 1, 2025 or whatever your actual target date is)
  const targetDate = new Date("June 1, 2025 00:00:00").getTime()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Make Time For More™" width={40} height={40} className="rounded-full" />
          <span className="ml-2 font-medium">Make Time For More™</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retake The Audit
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button variant="ghost" size="sm">Learn More</Button>
          </Link>
          <Link href="/join-us">
            <Button variant="ghost" size="sm">Join Us</Button>
          </Link>
          <Link href="/apply">
            <Button className="bg-[#5D9D61] hover:bg-[#4c8050]" size="sm">APPLY NOW!</Button>
          </Link>
          <Link href="https://www.maketimeformore.com" target="_blank">
            <Button variant="outline" size="sm">Visit Our Website</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.png" alt="Make Time For More Logo" width={100} height={100} className="rounded-full" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-medium text-[#5D9D61] mb-6">
            Join Us for a 7 Day Reset, our 14 Day Momentum Builder or the 
            21-Day Habit Building Cycle + 1 Week Recovery Break = The 28 
            Day Transformation Cycle For The Month!
          </h1>

          {/* Countdown Timer - FIXED TEXT HERE */}
          <div className="bg-gradient-to-r from-[#E26C73] to-[#5D9D61] text-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">
              Counting Down to Our 28-Day Work-Life Balance Cycle In June!
            </h2>
            
            <div className="flex justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">MINS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">SECS</div>
              </div>
            </div>
            
            <p className="italic">
              Reset Your Rhythms & Reclaim Your Time As You Make Time For More.
            </p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-lg font-medium mb-4">
              Sunday Kick-Off Begins 1:PM ET | Monday - Thursday Co-Working Begins 9:AM ET
            </h3>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-center">
            <h3 className="text-xl text-red-500 font-medium mb-4">
              Important Enrollment Deadline
            </h3>
            <p className="text-gray-700">
              You must complete the enrollment process by Thursday, 10:00 PM EST to attend the
              Sunday Kick-Off and start with the group.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-[#E26C73] mb-4">
              What You'll Experience
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Daily co-working sessions with accountability</li>
              <li>Weekly planning and reflection workshops</li>
              <li>Access to our private community</li>
              <li>Personalized work-life balance strategies</li>
              <li>Tools to reclaim your time and energy</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-[#5D9D61] mb-4">
              Who This Is For
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Women entrepreneurs feeling overwhelmed</li>
              <li>Business owners seeking better work-life balance</li>
              <li>Professionals wanting to reclaim their time</li>
              <li>Anyone ready to transform their relationship with time</li>
              <li>Those committed to sustainable success</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/apply">
            <Button className="bg-[#E26C73] hover:bg-[#d15964] text-white px-8 py-6 text-xl">
              Apply Now To Join Us
            </Button>
          </Link>
          <p className="mt-4 text-gray-600">
            Limited spots available. Application required to ensure a good fit.
          </p>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2025 Make Time For More™. All rights reserved.</p>
      </footer>
    </div>
  )
}