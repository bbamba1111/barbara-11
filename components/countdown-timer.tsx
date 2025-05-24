"use client"

import { useState, useEffect } from "react"
import CherryBlossomConfetti from "./cherry-blossom-confetti"

interface CountdownTimerProps {
  className?: string
}

const CountdownTimer = ({ className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [currentMonth, setCurrentMonth] = useState<string>("")

  useEffect(() => {
    const calculateTimeToNextCycleSunday = () => {
      const now = new Date()

      // Get the next target Sunday based on the cycle
      const nextTargetSunday = getNextCycleSunday(now)

      // Calculate difference
      const diff = nextTargetSunday.getTime() - now.getTime()

      // Convert to days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      // Set which Sunday we're counting down to
      const monthName = nextTargetSunday.toLocaleString("default", { month: "long" })
      setCurrentMonth(monthName)

      return { days, hours, minutes, seconds }
    }

    // Get the next 1st, 2nd, or 3rd Sunday of the month (skipping 4th Sunday)
    const getNextCycleSunday = (currentDate: Date): Date => {
      const result = new Date(currentDate)

      // Find the next Sunday
      result.setDate(result.getDate() + ((7 - result.getDay()) % 7))

      // Get which Sunday of the month it is
      const sundayNumber = getSundayNumberInMonth(result)

      // If it's the 4th or 5th Sunday, move to the 1st Sunday of next month
      if (sundayNumber >= 4) {
        // Move to the next month
        result.setDate(1) // First day of current month
        result.setMonth(result.getMonth() + 1) // Move to next month

        // Find the first Sunday of this month
        result.setDate(result.getDate() + ((7 - result.getDay()) % 7))
      }

      // Set time to 1:00 PM EST (18:00 UTC during standard time, 17:00 UTC during daylight saving)
      const isDST = isDaylightSavingTime(currentDate)
      result.setUTCHours(isDST ? 17 : 18, 0, 0, 0)

      // If the calculated time is in the past, we need to move forward
      if (result <= currentDate) {
        // If we're on a Sunday after 1 PM
        if (currentDate.getDay() === 0 && currentDate.getHours() >= 13) {
          // Move to next Sunday
          result.setDate(result.getDate() + 7)

          // Check if this would be the 4th Sunday
          const nextSundayNumber = getSundayNumberInMonth(result)
          if (nextSundayNumber >= 4) {
            // Skip to 1st Sunday of next month
            result.setDate(1) // First day of current month
            result.setMonth(result.getMonth() + 1) // Move to next month

            // Find the first Sunday of this month
            result.setDate(result.getDate() + ((7 - result.getDay()) % 7))
          }
        }
      }

      return result
    }

    // Determine which Sunday of the month a date is (1st, 2nd, 3rd, 4th, or 5th)
    const getSundayNumberInMonth = (date: Date): number => {
      const d = new Date(date)
      let count = 0

      // Go to the first day of the month
      d.setDate(1)

      // Count Sundays until we reach or pass the target date
      while (d <= date) {
        if (d.getDay() === 0) {
          // Sunday
          count++
        }
        d.setDate(d.getDate() + 1)
      }

      return count
    }

    // Simple DST detection (not perfect but works for most US dates)
    const isDaylightSavingTime = (date: Date) => {
      const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset()
      const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
      return Math.max(jan, jul) !== date.getTimezoneOffset()
    }

    // Initial calculation
    setTimeLeft(calculateTimeToNextCycleSunday())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeToNextCycleSunday())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-3 relative">
      <CherryBlossomConfetti duration={8} speed="fast" density="medium" />
      <p className="text-center font-bold text-2xl">
        Counting Down to Our 28-Day Work-Life Balance Cycle In {currentMonth}!
      </p>

      <div className={`flex justify-center space-x-6 ${className}`}>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-sm uppercase font-medium">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm uppercase font-medium">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm uppercase font-medium">Mins</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm uppercase font-medium">Secs</div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
