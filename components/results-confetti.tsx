"use client"

import { useEffect, useState } from "react"
import RepeatedConfetti from "./repeated-confetti"

interface ResultsConfettiProps {
  score: number
  speed?: "fast" | "normal" | "slow"
}

export default function ResultsConfetti({ score, speed = "normal" }: ResultsConfettiProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 10 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Only show confetti for good scores (above 70%)
  if (score < 70 || !showConfetti) return null

  return <RepeatedConfetti burstCount={3} burstDuration={3} interval={3000} />
}
