"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, RefreshCw, Gift, Sparkles, Leaf, Brain, Briefcase, Utensils, Moon, Heart, BookOpen, DollarSign, Users, Palette, HeartHandshake, Home } from 'lucide-react'
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
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E26C73] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </main>
    )
  }

  if (!results) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Make Time For More Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-4 text-[#E26C73]">No Results Found</h1>
          <p className="text-gray-600 mb-6">
            You haven't completed the Work-Life Balance Audit yet. Take the audit to see your personalized results.
          </p>
          <Link href="/">
            <Button className="bg-[#5D9D61] hover:bg-[#4c8050] text-white">Take the Audit Now</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-3xl w-full">
        <Link href="/" className="inline-flex items-center text-[#E26C73] hover:text-[#d15964] mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Make Time For More Logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-[#E26C73] mb-6">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#E26C73]">
            <Gift className="h-5 w-5" />
            <h3 className="text-lg font-bold">Your $997 Value Gift That Keeps on GIV*EN</h3>
            <Gift className="h-5 w-5" />
          </div>
          <p className="text-center text-sm italic">
            Take this audit as often as you need - daily, weekly, or monthly - to track your progress
          </p>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#E26C73] text-center">
          Your Work-Life Balance Results
        </h1>

        {results.name && <p className="text-center text-gray-600 mb-6">Results for: {results.name}</p>}

        <div className="space-y-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Overall Score: {results.overallScore}%</h3>
            <p className={`${getScoreColor(results.overallScore)} font-medium`}>
              {getScoreDescription(results.overallScore)}
            </p>

            {results.overallScore === 100 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-emerald-700 font-medium">
                  Congratulations! You've achieved perfect balance across all areas of your life. This is truly
                  remarkable and reflects your dedication to holistic well-being.
                </p>
              </div>
            )}

            {results.overallScore < 100 && results.overallScore >= 80 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-emerald-700 font-medium">
                  Congratulations! Your excellent score shows you've developed strong work-lifestyle balance habits.
                  You're already implementing many effective strategies in your daily life.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Category Breakdown</h4>
            {results.results &&
              results.results.map((result: any) => {
                const percentage = Math.round(result.percentage)
                const color = percentage < 40 ? "#dc3545" : percentage < 70 ? "#ffc107" : "#28a745"

                return (
                  <div key={result.category} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center">
                          {categoryIcons[result.category]}
                        </span>
                        <span>{categoryLabels[result.category]}</span>
                      </div>
                      <span style={{ color: color }}>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">
              {results.overallScore >= 80 ? "Top Recommendations to Maintain Your Balance" : "Top Recommendations"}
            </h4>
            <div className="grid gap-4">
              {results.results &&
                results.results.slice(0, 3).map((result: any) => (
                  <Card key={result.category}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center">
                          {categoryIcons[result.category]}
                        </span>
                        <CardTitle className="text-base">
                          {results.overallScore >= 80
                            ? `Maintain Your ${categoryLabels[result.category]}`
                            : `Improve Your ${categoryLabels[result.category]}`}
                        </CardTitle>
                      </div>
                      <CardDescription>Current score: {Math.round(result.percentage)}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {recommendations[result.category] &&
                          recommendations[result.category].slice(0, 3).map((rec: string, index: number) => (
                            <li key={index} className="text-sm">
                              {rec}
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/">
              <Button className="bg-[#5D9D61] hover:bg-[#4c8050] text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake the Audit
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-[#E26C73]">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm">A $997 value, yours completely FREE</p>
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Added Learn More button at the bottom */}
          <div className="mt-8 text-center">
            <Link href="/about">
              <Button className="bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold text-lg px-8 py-4">
                Learn More About the Audit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}