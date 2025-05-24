"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Leaf,
  Brain,
  Briefcase,
  Utensils,
  Moon,
  Heart,
  BookOpen,
  DollarSign,
  Users,
  Palette,
  HeartHandshake,
  Home,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSavedAuditResults } from "@/utils/audit-storage"
import { categoryLabels, recommendations } from "@/components/work-life-balance-audit"

// Define the category icons directly in this file to avoid the import error
const categoryIcons: Record<string, React.ReactNode> = {
  spiritual: <Leaf className="h-5 w-5" />,
  mental: <Brain className="h-5 w-5" />,
  physicalMovement: <Briefcase className="h-5 w-5" />,
  physicalNourishment: <Utensils className="h-5 w-5" />,
  physicalSleep: <Moon className="h-5 w-5" />,
  emotional: <Heart className="h-5 w-5" />,
  personal: <Sparkles className="h-5 w-5" />,
  intellectual: <BookOpen className="h-5 w-5" />,
  professional: <Briefcase className="h-5 w-5" />,
  financial: <DollarSign className="h-5 w-5" />,
  environmental: <Home className="h-5 w-5" />,
  relational: <Users className="h-5 w-5" />,
  social: <Users className="h-5 w-5" />,
  recreational: <Palette className="h-5 w-5" />,
  charitable: <HeartHandshake className="h-5 w-5" />,
}

export default function MyResultsPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      // Get saved results from localStorage
      const savedResults = getSavedAuditResults()
      setResults(savedResults)
    } catch (error) {
      console.error("Error loading saved results:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getScoreColor = (percentage: number) => {
    if (percentage < 40) return "text-red-500"
    if (percentage < 70) return "text-amber-500"
    return "text-emerald-500"
  }

  const getScoreDescription = (percentage: number) => {
    if (percentage < 40) return "Needs significant improvement"
    if (percentage < 70) return "Room for improvement"
    if (percentage < 90) return "Good balance"
    return "Excellent balance"
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-brand-tan">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-pink mx-auto mb-4"></div>
          <p className="text-black">Loading your results...</p>
        </div>
      </main>
    )
  }

  if (!results) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-brand-tan">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Make Time For More Logo"
              width={140}
              height={140}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl brand-title mb-2 text-brand-pink">Make Time For More™</h1>
          <h2 className="text-2xl brand-subtitle mb-6 text-black">No Results Found</h2>
          <p className="text-black mb-8 text-lg">
            You haven't completed the Work-Life Balance Audit yet. Take the audit to see your personalized results.
          </p>
          <Link href="/">
            <Button className="bg-brand-green hover:bg-green-600 text-white px-8 py-4 text-lg">
              Take the Audit Now
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24 pt-32 md:pt-52 bg-gradient-to-b from-white to-brand-tan">
      <div className="max-w-4xl w-full">
        <Link href="/" className="inline-flex items-center text-black hover:text-brand-pink mb-8 mt-16">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Make Time For More Logo"
            width={140}
            height={140}
            className="rounded-full shadow-lg"
          />
        </div>

        <h1 className="text-4xl brand-title mb-2 text-brand-pink text-center">Make Time For More™</h1>
        <h2 className="text-3xl brand-subtitle mb-8 text-black text-center">Your Work-Life Balance Results</h2>

        {results.name && <p className="text-center text-black mb-8 text-lg">Results for: {results.name}</p>}

        <div className="space-y-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl header-bold mb-4">Overall Score: {results.overallScore}%</h3>
            <p className={`${getScoreColor(results.overallScore)} header-bold text-xl`}>
              {getScoreDescription(results.overallScore)}
            </p>

            {results.overallScore === 100 && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-md">
                <p className="text-emerald-700 header-bold text-lg">
                  Congratulations! You've achieved perfect balance across all areas of your life. This is truly
                  remarkable and reflects your dedication to holistic well-being.
                </p>
              </div>
            )}

            {results.overallScore < 100 && results.overallScore >= 80 && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-md">
                <p className="text-emerald-700 header-bold text-lg">
                  Congratulations! Your excellent score shows you've developed strong work-lifestyle balance habits.
                  You're already implementing many effective strategies in your daily life.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h4 className="header-bold text-xl text-black">Category Breakdown</h4>
            {results.results &&
              results.results.map((result: any) => {
                const percentage = Math.round(result.percentage)
                const color = percentage < 40 ? "#dc3545" : percentage < 70 ? "#ffc107" : "#28a745"

                return (
                  <div key={result.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center">
                          {categoryIcons[result.category]}
                        </span>
                        <span className="text-lg text-black">{categoryLabels[result.category]}</span>
                      </div>
                      <span style={{ color: color }} className="text-lg header-bold">
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>
                )
              })}
          </div>

          <div className="space-y-6">
            <h4 className="header-bold text-xl text-black">
              {results.overallScore >= 80 ? "Top Recommendations to Maintain Your Balance" : "Top Recommendations"}
            </h4>
            <div className="grid gap-6">
              {results.results &&
                results.results.slice(0, 3).map((result: any) => (
                  <Card key={result.category} className="border-brand-tan">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center">
                          {categoryIcons[result.category]}
                        </span>
                        <CardTitle className="text-lg text-black">
                          {results.overallScore >= 80
                            ? `Maintain Your ${categoryLabels[result.category]}`
                            : `Improve Your ${categoryLabels[result.category]}`}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        Current score: {Math.round(result.percentage)}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        {recommendations[result.category] &&
                          recommendations[result.category].slice(0, 3).map((rec: string, index: number) => (
                            <li key={index} className="text-base text-black">
                              {rec}
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <Link href="/">
              <Button className="bg-brand-green hover:bg-green-600 text-white px-8 py-4 text-lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Retake the Audit
              </Button>
            </Link>
          </div>

          {/* Added Learn More button at the bottom */}
          <div className="mt-12 text-center">
            <Link href="/about">
              <Button className="bg-brand-green hover:bg-green-600 text-white header-bold text-xl px-12 py-6">
                Learn More About the Audit
              </Button>
            </Link>
          </div>

          {/* Add bottom spacing */}
          <div className="h-24"></div>
        </div>
      </div>
    </main>
  )
}
