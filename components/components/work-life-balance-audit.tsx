"use client"

import type React from "react"
import { saveAuditResults } from "@/utils/audit-storage"
import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Home,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Check,
  Sparkles,
  Brain,
  Leaf,
  Utensils,
  BookOpen,
  DollarSign,
  Users,
  Palette,
  HeartHandshake,
  Moon,
  User,
  Copy,
  ExternalLink,
  Info,
  Flower,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import BetaInvitation from "./beta-invitation"
import { ButtonLink } from "./ui/button-link"
import CherryBlossomConfetti from "./cherry-blossom-confetti"

interface WorkLifeBalanceAuditProps {
  onClose: () => void
  onComplete?: () => void // New prop to handle audit completion
}

export type Category =
  | "spiritual"
  | "mental"
  | "physicalMovement"
  | "physicalNourishment"
  | "physicalSleep"
  | "emotional"
  | "personal"
  | "intellectual"
  | "professional"
  | "financial"
  | "environmental"
  | "relational"
  | "social"
  | "recreational"
  | "charitable"

type Answer = 1 | 2 | 3 | 4 | 5

interface Question {
  id: string
  number: number
  title: string
  text: string
  category: Category
}

export interface Result {
  category: Category
  score: number
  maxScore: number
  percentage: number
}

const questions: Question[] = [
  {
    id: "q1",
    number: 1,
    title: "Spiritual",
    text: "In the past 30 days, how often have you connected to your spiritual life through prayer, fellowship, praise, worship, meditation, music, nature, etc?",
    category: "spiritual",
  },
  {
    id: "q2",
    number: 2,
    title: "Mental",
    text: "In the past 30 days, how often have you felt focused and clear in your thinking?",
    category: "mental",
  },
  {
    id: "q3",
    number: 3,
    title: "Physical Movement",
    text: "In the past 30 days, how often have you engaged in intentional movement or exercise?",
    category: "physicalMovement",
  },
  {
    id: "q4",
    number: 4,
    title: "Physical Nourishment",
    text: "In the past 30 days, how often have you nourished your body with adequate hydration and healthy meals?",
    category: "physicalNourishment",
  },
  {
    id: "q5",
    number: 5,
    title: "Physical Sleep",
    text: "In the past 30 days, how often have you gone to bed on time and gotten 8 hours of restorative sleep?",
    category: "physicalSleep",
  },
  {
    id: "q6",
    number: 6,
    title: "Emotional",
    text: "In the past 30 days, how often have you felt balanced, peaceful, and joyful emotionally?",
    category: "emotional",
  },
  {
    id: "q7",
    number: 7,
    title: "Personal",
    text: "In the past 30 days, how often have you made time for self-care and/or personal growth & development activities?",
    category: "personal",
  },
  {
    id: "q8",
    number: 8,
    title: "Intellectual",
    text: "In the past 30 days, how often have you engaged in learning something new or a skill-building activity?",
    category: "intellectual",
  },
  {
    id: "q9",
    number: 9,
    title: "Professional Visibility",
    text: "In the past 30 days, how often have you shared your expertise or expanded your professional visibility through networking, partnerships, collaboration, media & podcast interviews, speaking engagements and brand publicity?",
    category: "professional",
  },
  {
    id: "q10",
    number: 10,
    title: "Financial",
    text: "In the past 30 days, how often have you focused intentionally on income generation, financial planning, retirement planning, business valuation and/or exit strategy?",
    category: "financial",
  },
  {
    id: "q11",
    number: 11,
    title: "Environmental",
    text: "In the past 30 days, how often have you made effort to create beauty, balance, or order in your home or office environment?",
    category: "environmental",
  },
  {
    id: "q12",
    number: 12,
    title: "Relational",
    text: "In the past 30 days, how often have you been attentive and present in your closest relationships?",
    category: "relational",
  },
  {
    id: "q13",
    number: 13,
    title: "Social",
    text: "In the past 30 days, how often have you socialized with friends or engaged with supportive, like-minded individuals?",
    category: "social",
  },
  {
    id: "q14",
    number: 14,
    title: "Recreational",
    text: "In the past 30 days, how often have you created space for joy, creativity, vacation, travel, play or something on your bucket list?",
    category: "recreational",
  },
  {
    id: "q15",
    number: 15,
    title: "Charitable",
    text: "In the past 30 days, how often have you contributed to supporting or inspiring others through a favorite charity, cause, volunteering, or philanthropic endeavors?",
    category: "charitable",
  },
]

const answerLabels = ["Never (1)", "Rarely (2)", "Sometimes (3)", "Often (4)", "Consistently (5)"]

export const categoryLabels: Record<Category, string> = {
  spiritual: "Spiritual Life",
  mental: "Mental Clarity",
  physicalMovement: "Physical Movement",
  physicalNourishment: "Physical Nourishment",
  physicalSleep: "Physical Sleep",
  emotional: "Emotional Balance",
  personal: "Personal Growth",
  intellectual: "Intellectual Growth",
  professional: "Professional Visibility",
  financial: "Financial Focus",
  environmental: "Environmental Balance",
  relational: "Relational Presence",
  social: "Social Connection",
  recreational: "Recreational Joy",
  charitable: "Charitable Contribution",
}

const categoryIcons: Record<Category, React.ReactNode> = {
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

export const recommendations: Record<Category, string[]> = {
  spiritual: [
    "Set aside 10 minutes each morning for meditation or prayer",
    "Connect with nature daily, even if just for a brief walk",
    "Journal about your spiritual insights and growth",
    "Create a sacred space in your home for reflection",
    "Explore spiritual texts or teachings that resonate with you",
  ],
  mental: [
    "Practice mindfulness to improve focus and mental clarity",
    "Take regular breaks during work to reset your mind",
    "Limit multitasking and focus on one task at a time",
    "Use tools like journaling to organize thoughts",
    "Consider a digital detox to reduce mental clutter",
  ],
  physicalMovement: [
    "Schedule movement breaks throughout your workday",
    "Find physical activities you enjoy rather than forcing yourself to exercise",
    "Start with just 10 minutes of intentional movement daily",
    "Try different forms of movement to find what energizes you",
    "Consider walking meetings or standing desks for more movement",
  ],
  physicalNourishment: [
    "Prepare healthy meals and snacks in advance",
    "Set reminders to stay hydrated throughout the day",
    "Eat mindfully, away from screens and work",
    "Focus on adding nutritious foods rather than restricting",
    "Listen to your body's hunger and fullness cues",
  ],
  physicalSleep: [
    "Create a consistent sleep schedule, even on weekends",
    "Develop a calming bedtime routine",
    "Make your bedroom a sleep sanctuary (dark, quiet, cool)",
    "Avoid screens at least 30 minutes before bed",
    "Consider sleep tracking to understand your patterns",
  ],
  emotional: [
    "Practice naming your emotions without judgment",
    "Schedule time for activities that bring you joy",
    "Create healthy boundaries to protect your emotional energy",
    "Consider working with a therapist or coach",
    "Use breathing techniques to manage stress in the moment",
  ],
  personal: [
    "Block non-negotiable time for self-care in your calendar",
    "Start a personal growth practice like journaling or reading",
    "Identify your core values and align your actions with them",
    "Practice saying no to commitments that drain you",
    "Celebrate your wins, no matter how small",
  ],
  intellectual: [
    "Set aside time for learning something new each week",
    "Join communities or groups related to your interests",
    "Read books or listen to podcasts that expand your thinking",
    "Take online courses or attend workshops",
    "Engage in meaningful conversations with diverse perspectives",
  ],
  professional: [
    "Share your expertise through content creation or speaking",
    "Update your professional profiles and portfolio regularly",
    "Network intentionally with peers and potential collaborators",
    "Seek opportunities to showcase your unique skills",
    "Collect and share testimonials from satisfied clients",
  ],
  financial: [
    "Schedule weekly money dates to review finances",
    "Create clear financial goals aligned with your values",
    "Track your income and expenses consistently",
    "Identify and focus on your most profitable activities",
    "Consider working with a financial advisor",
  ],
  environmental: [
    "Declutter one small area of your home or office each week",
    "Create a dedicated workspace that inspires productivity",
    "Add elements of beauty to your environment (plants, art, etc.)",
    "Establish systems to maintain order in your space",
    "Consider how your environment affects your energy and mood",
  ],
  relational: [
    "Create tech-free zones or times for deeper connection",
    "Practice active listening without planning your response",
    "Schedule quality time with loved ones in your calendar",
    "Express appreciation and gratitude regularly",
    "Be fully present during interactions with others",
  ],
  social: [
    "Join communities aligned with your values and interests",
    "Schedule regular check-ins with friends and colleagues",
    "Attend events or gatherings that energize rather than drain you",
    "Set boundaries around social media consumption",
    "Nurture relationships that support your growth",
  ],
  recreational: [
    "Schedule time for play and creativity with no productive purpose",
    "Explore new hobbies or revisit ones you've enjoyed in the past",
    "Take breaks throughout your day for small moments of joy",
    "Plan regular outings or activities that bring you pleasure",
    "Allow yourself to fully engage in recreational activities without guilt",
  ],
  charitable: [
    "Identify ways to share your expertise that energize rather than drain you",
    "Set clear boundaries around your giving to prevent burnout",
    "Find causes aligned with your values and strengths",
    "Consider how you can make the most impact with your unique gifts",
    "Schedule regular reflection on how your contributions affect you and others",
  ],
}

export const cherryBlossomFeedback: Record<Category, string> = {
  spiritual: "Take 5-10 minutes each morning to ground yourself through deep breathing or gratitude journaling.",
  mental: "Clear mental fog with a quick brain dump of lingering thoughts at the start or end of your day.",
  physicalMovement: "Incorporate 10-minute movement breaks between meetings to energize your body and mind.",
  physicalNourishment:
    "Prepare a water bottle and healthy snacks the night before to support your nutrition throughout the day.",
  physicalSleep: "Implement a digital detox 30 minutes before bed to support restful sleep.",
  emotional: "Reconnect with your heart space by placing a hand over your chest and breathing deeply for 5 minutes.",
  personal: "Schedule non-negotiable self-care blocks in your calendar with the same priority as client meetings.",
  intellectual: "Dedicate 15 minutes daily to reading or learning something new that expands your thinking.",
  professional: "Share one key insight with your audience today to increase your visibility.",
  financial: "Set aside 30 minutes weekly to review your finances and align your spending with your priorities.",
  environmental: "Create one small beauty spot in your workspace that brings you joy when you see it.",
  relational: "Establish tech-free zones or times to be fully present with your loved ones.",
  social: "Reach out to one supportive colleague or friend weekly for connection and mutual support.",
  recreational: "Block time for one activity weekly that brings you pure joy with no productive purpose.",
  charitable: "Identify one way to share your expertise that supports others without depleting your energy.",
}

export default function WorkLifeBalanceAudit({ onClose, onComplete }: WorkLifeBalanceAuditProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [results, setResults] = useState<Result[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isCherryPromptCopied, setIsCherryPromptCopied] = useState(false)
  const [showBetaInvite, setShowBetaInvite] = useState(false)
  const [personalizedFeedback, setPersonalizedFeedback] = useState<{ category: Category; feedback: string }[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const cherryBlossomPromptRef = useRef<HTMLTextAreaElement>(null)
  const dialogContentRef = useRef<HTMLDivElement>(null)

  const totalSteps = questions.length
  const progress = (currentStep / totalSteps) * 100
  const isLastQuestion = currentStep === totalSteps - 1
  const isResultsPage = currentStep === totalSteps
  const isPerfectScore = overallScore === 100
  const isExcellentScore = overallScore >= 80

  useEffect(() => {
    // Send message to parent window if in iframe when audit is completed
    if (isResultsPage && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "audit_completed",
          nextStep: "results",
        },
        "*",
      )
    }

    // Show confetti if on results page and score is good
    if (isResultsPage) {
      // Scroll to the top of the dialog when showing results
      if (dialogContentRef.current) {
        dialogContentRef.current.scrollTop = 0
      }

      if (overallScore >= 70) {
        setShowConfetti(true)

        // Hide confetti after 8 seconds
        const timer = setTimeout(() => {
          setShowConfetti(false)
        }, 8000)

        return () => clearTimeout(timer)
      }
    }
  }, [isResultsPage, overallScore])

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep]
    setAnswers({
      ...answers,
      [currentQuestion.id]: Number.parseInt(value) as Answer,
    })
  }

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults()

      // Mark the audit as completed when user reaches results page
      if (onComplete) {
        onComplete()
      }

      // Ensure we scroll to top when showing results
      setTimeout(() => {
        if (dialogContentRef.current) {
          dialogContentRef.current.scrollTop = 0
        }
      }, 100)
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setResults([])
    setShowBetaInvite(false)
  }

  const calculateResults = () => {
    const categoryScores: Record<Category, { score: number; count: number }> = {
      spiritual: { score: 0, count: 0 },
      mental: { score: 0, count: 0 },
      physicalMovement: { score: 0, count: 0 },
      physicalNourishment: { score: 0, count: 0 },
      physicalSleep: { score: 0, count: 0 },
      emotional: { score: 0, count: 0 },
      personal: { score: 0, count: 0 },
      intellectual: { score: 0, count: 0 },
      professional: { score: 0, count: 0 },
      financial: { score: 0, count: 0 },
      environmental: { score: 0, count: 0 },
      relational: { score: 0, count: 0 },
      social: { score: 0, count: 0 },
      recreational: { score: 0, count: 0 },
      charitable: { score: 0, count: 0 },
    }

    questions.forEach((question) => {
      const answer = answers[question.id] || 0
      categoryScores[question.category].score += answer
      categoryScores[question.category].count += 1
    })

    const calculatedResults: Result[] = Object.entries(categoryScores).map(([category, data]) => {
      const maxScore = data.count * 5
      const percentage = (data.score / maxScore) * 100

      return {
        category: category as Category,
        score: data.score,
        maxScore,
        percentage,
      }
    })

    // Sort results by percentage (lowest to highest)
    calculatedResults.sort((a, b) => a.percentage - b.percentage)

    // Calculate overall score
    const totalScore = calculatedResults.reduce((sum, result) => sum + result.score, 0)
    const totalMaxScore = calculatedResults.reduce((sum, result) => sum + result.maxScore, 0)
    const overallPercentage = Math.round((totalScore / totalMaxScore) * 100)

    // Get personalized feedback for the 3-5 lowest scoring categories
    const lowestCategories = calculatedResults.slice(0, Math.min(5, calculatedResults.length))
    const feedback = lowestCategories.map((result) => ({
      category: result.category,
      feedback: cherryBlossomFeedback[result.category],
    }))

    setResults(calculatedResults)
    setOverallScore(overallPercentage)
    setPersonalizedFeedback(feedback)

    // Save results to localStorage
    saveAuditResults(name, email, overallPercentage, calculatedResults, feedback)
  }

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

  // Function to copy Cherry Blossom prompt to clipboard
  const copyCherryBlossomPrompt = async () => {
    if (cherryBlossomPromptRef.current) {
      try {
        await navigator.clipboard.writeText(cherryBlossomPromptRef.current.value)
        setIsCherryPromptCopied(true)
        setTimeout(() => setIsCherryPromptCopied(false), 2000)
      } catch (error) {
        console.error("Error copying Cherry Blossom prompt:", error)
      }
    }
  }

  // Generate Cherry Blossom prompt
  const generateCherryBlossomPrompt = () => {
    let prompt = `Hello Cherry Blossom! I just completed the Work-Life Balance Audit. Here are my results:

`
    prompt += `Name: ${name}
`
    prompt += `Overall Score: ${overallScore}%

`

    if (isExcellentScore) {
      prompt += `I'm doing well with my work-life balance, scoring ${overallScore}% overall!

`
      prompt += `My category scores (from lowest to highest):
`
      results.forEach((result) => {
        prompt += `- ${categoryLabels[result.category]}: ${Math.round(result.percentage)}%
`
      })

      prompt += `
I'd like your guidance on maintaining my excellent work-life balance. What specific strategies would you recommend to help me continue this success?`
    } else {
      prompt += `My category scores (from lowest to highest):
`
      results.forEach((result) => {
        prompt += `- ${categoryLabels[result.category]}: ${Math.round(result.percentage)}%
`
      })

      prompt += `
My lowest scoring areas are:
`
      personalizedFeedback.forEach((item) => {
        prompt += `- ${categoryLabels[item.category]}
`
      })

      prompt += `
I'd like your guidance on improving these areas. What specific strategies would you recommend for my situation?`
    }

    return prompt
  }

  const currentQuestion = questions[currentStep]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] w-[95%] max-h-[90vh] overflow-y-auto rounded-lg p-4 md:p-6"
        ref={dialogContentRef}
      >
        {/* Add confetti effect for good scores on results page */}
        {showConfetti && <CherryBlossomConfetti duration={8} speed="fast" />}

        {!isResultsPage && (
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <Image
                src="/images/logo.png"
                alt="Make Time For More Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <DialogTitle className="text-lg">Work-Life Balance Audit</DialogTitle>
            <DialogDescription className="text-sm">
              Based on the 13 Core Life Value Areas from the Make Time For More™ Work-Life Balance Experience
            </DialogDescription>
          </DialogHeader>
        )}

        {isResultsPage && !showBetaInvite && (
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <Image
                src="/images/logo.png"
                alt="Make Time For More Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <DialogTitle className="text-xl text-center">Your Work-Life Balance Results Are In</DialogTitle>
          </DialogHeader>
        )}

        {!isResultsPage && (
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-0">
              <span>
                Question {currentStep + 1} of {totalSteps}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {!isResultsPage && (
          <div className="py-2 mt-0">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                On a scale from 1 to 5, where 1 = Never and 5 = Consistently:
              </p>
            </div>
            <h3 className="text-base font-medium mb-1">
              <span className="inline-block bg-[#E26C73] text-white rounded-full w-5 h-5 text-center mr-2">
                {currentQuestion.number}
              </span>
              {currentQuestion.title}
            </h3>
            <p className="mb-3 text-gray-700 text-sm">{currentQuestion.text}</p>
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ""}
              onValueChange={handleAnswer}
              className="space-y-2"
            >
              {answerLabels.map((label, index) => (
                <div key={index} className="flex items-center space-x-2 border p-2 rounded-md">
                  <RadioGroupItem value={(index + 1).toString()} id={`answer-${index}`} />
                  <Label htmlFor={`answer-${index}`} className="flex-1 cursor-pointer text-sm">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {isResultsPage && !showBetaInvite && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Overall Score: {overallScore}%</h3>
              <p className={`${getScoreColor(overallScore)} font-medium`}>{getScoreDescription(overallScore)}</p>

              {isPerfectScore && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-emerald-700 font-medium">
                    Congratulations! You've achieved perfect balance across all areas of your life. This is truly
                    remarkable and reflects your dedication to holistic well-being.
                  </p>
                </div>
              )}

              {!isPerfectScore && isExcellentScore && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-emerald-700 font-medium">
                    Congratulations! Your excellent score shows you've developed strong work-life balance habits. You're
                    already implementing many effective strategies in your daily life.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Category Breakdown</h4>
              {results.map((result) => {
                const percentage = Math.round(result.percentage)
                const color = percentage < 40 ? "#dc3545" : percentage < 70 ? "#ffc107" : "#28a745"

                return (
                  <div key={result.category} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {categoryIcons[result.category]}
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
                {isExcellentScore ? "Top Recommendations to Maintain Your Balance" : "Top Recommendations"}
              </h4>
              <div className="grid gap-4">
                {results.slice(0, 2).map((result) => (
                  <Card key={result.category}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {categoryIcons[result.category]}
                        <CardTitle className="text-base">
                          {isExcellentScore
                            ? `Maintain Your ${categoryLabels[result.category]}`
                            : `Improve Your ${categoryLabels[result.category]}`}
                        </CardTitle>
                      </div>
                      <CardDescription>Current score: {Math.round(result.percentage)}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {recommendations[result.category].slice(0, 3).map((rec, index) => (
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

            {/* Cherry Blossom Feedback - Now based on lowest scores */}
            <Card className="border-[#E26C73] bg-rose-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-[#E26C73] flex items-center gap-2">
                  <Image src="/images/logo.png" alt="Cherry Blossom" width={24} height={24} className="rounded-full" />
                  Cherry Blossom's Feedback
                </CardTitle>
                <CardDescription>
                  {isExcellentScore
                    ? "Your AI Work-Life Balance Guide has reviewed your responses and provided these insights to help maintain your excellent balance:"
                    : "Your AI Work-Life Balance Guide has reviewed your responses and provided these insights for your lowest scoring areas:"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {personalizedFeedback.map((item, index) => (
                    <li key={index}>
                      <strong>{categoryLabels[item.category]}:</strong>{" "}
                      {isExcellentScore
                        ? `Continue your great work in ${categoryLabels[item.category].toLowerCase()} by ${item.feedback}`
                        : item.feedback}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#E26C73] bg-rose-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-[#E26C73] flex items-center gap-2">
                  <Image src="/images/logo.png" alt="Cherry Blossom" width={24} height={24} className="rounded-full" />
                  Get Ongoing Support From Cherry Blossom
                </CardTitle>
                <CardDescription>
                  {isExcellentScore
                    ? "This FREE audit, created by Thought Leader Barbara is her gift to you that keeps on GIV*EN. Cherry Blossom can help you maintain your excellent work-life balance and continue your success journey."
                    : "This FREE audit, created by Thought Leader Barbara is her gift to you that keeps on GIV*EN -- as you can retake it anytime to access your worklife balance and holistic success. It's also the 1st Step to working with her. Enjoy the journey!"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-3 rounded-md border border-rose-100">
                  <h5 className="font-medium text-black font-bold mb-2">
                    How to Get Deeper Insights from Cherry Blossom:
                  </h5>

                  {/* Name field moved above the instructions */}
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>
                      <strong>Copy your results to share with Cherry Blossom</strong> using the button below
                    </li>
                    <li>Click the "Paste Your Results & Chat with Cherry Blossom" button to open ChatGPT</li>
                    <li>Create a free OpenAI account if you don't have one</li>
                    <li>Paste your results into the Cherry Blossom chat box</li>
                    <li>Cherry Blossom will provide personalized guidance based on your results</li>
                  </ol>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                    <Info className="h-4 w-4" />
                    <span>
                      A free OpenAI account is required to access Cherry Blossom. Sign up at{" "}
                      <a
                        href="https://chat.openai.com/auth/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E26C73] underline"
                      >
                        chat.openai.com
                      </a>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">
                    Copy Your Results From The Box Below to Share with Cherry Blossom:
                  </label>
                  <textarea
                    ref={cherryBlossomPromptRef}
                    className="w-full h-24 p-2 text-sm border rounded-md"
                    value={generateCherryBlossomPrompt()}
                    readOnly
                  />
                  <Button
                    onClick={copyCherryBlossomPrompt}
                    variant="outline"
                    className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white"
                  >
                    {isCherryPromptCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Your Results For Cherry Blossom
                      </>
                    )}
                  </Button>
                </div>

                <ButtonLink
                  href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
                  className="bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Click Here to Paste Your Results & Chat with Cherry Blossom
                  <Flower className="ml-2 h-4 w-4 text-pink-300 font-extrabold" />
                </ButtonLink>

                <Button onClick={handleReset} className="w-full bg-[#5D9D61] hover:bg-[#4c8050]">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake the Audit
                </Button>
              </CardContent>
            </Card>

            <Button
              onClick={() => (window.location.href = "/learn-more")}
              className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white mt-4"
            >
              Learn More About The Experience/Business Model & SOP Installation
            </Button>
          </div>
        )}

        {isResultsPage && showBetaInvite && (
          <BetaInvitation
            onBack={() => setShowBetaInvite(false)}
            overallScore={overallScore}
            name={name}
            email={email}
            results={results}
            categoryLabels={categoryLabels}
            personalizedFeedback={personalizedFeedback}
          />
        )}

        {!isResultsPage && (
          <DialogFooter className="flex justify-between sm:justify-between gap-2 mt-3 pt-2 border-t">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion?.id]}
              className="bg-[#E26C73] hover:bg-[#d15964]"
            >
              {isLastQuestion ? "See Results" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
