"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { generateHtml } from "@/utils/generate-html"
import { sendEmail } from "@/app/actions/send-email"
import { generatePdf } from "@/utils/generate-pdf"
import { generateCherryBlossomPrompt } from "@/utils/generate-cherry-blossom-prompt"
import { ButtonLink } from "@/components/ui/button-link"
import BetaInvitation from "@/components/beta-invitation"
import type { Result } from "@/types/result" // Declare the Result variable

export type Category =
  | "charitableContribution"
  | "recreationalJoy"
  | "spiritualLife"
  | "mentalClarity"
  | "physicalMovement"
  | "physicalNourishment"
  | "physicalSleep"
  | "emotionalBalance"
  | "personalGrowth"
  | "intellectualGrowth"
  | "professionalVisibility"
  | "financialFocus"
  | "environmentalBalance"
  | "relationalPresence"
  | "socialConnection"

const categoryLabels: Record<Category, string> = {
  charitableContribution: "Charitable Contribution",
  recreationalJoy: "Recreational Joy",
  spiritualLife: "Spiritual Life",
  mentalClarity: "Mental Clarity",
  physicalMovement: "Physical Movement",
  physicalNourishment: "Physical Nourishment",
  physicalSleep: "Physical Sleep",
  emotionalBalance: "Emotional Balance",
  personalGrowth: "Personal Growth",
  intellectualGrowth: "Intellectual Growth",
  professionalVisibility: "Professional Visibility",
  financialFocus: "Financial Focus",
  environmentalBalance: "Environmental Balance",
  relationalPresence: "Relational Presence",
  socialConnection: "Social Connection",
}

const WorkLifeBalanceAudit = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [showBetaInvitation, setShowBetaInvitation] = useState(false)

  const questions = [
    {
      category: "spiritualLife" as Category,
      text: "In the past 30 days, how often have you connected to your spiritual life through prayer, meditation, or nature?",
    },
    {
      category: "mentalClarity" as Category,
      text: "In the past 30 days, how often have you felt focused and clear in your thinking?",
    },
    {
      category: "physicalMovement" as Category,
      text: "In the past 30 days, how often have you engaged in physical movement or exercise?",
    },
    {
      category: "physicalNourishment" as Category,
      text: "In the past 30 days, how often have you nourished your body with healthy foods?",
    },
    {
      category: "physicalSleep" as Category,
      text: "In the past 30 days, how often have you gotten adequate, restful sleep?",
    },
    {
      category: "emotionalBalance" as Category,
      text: "In the past 30 days, how often have you felt emotionally balanced and stable?",
    },
    {
      category: "personalGrowth" as Category,
      text: "In the past 30 days, how often have you engaged in activities for personal growth and development?",
    },
    {
      category: "intellectualGrowth" as Category,
      text: "In the past 30 days, how often have you engaged in learning or intellectual stimulation?",
    },
    {
      category: "professionalVisibility" as Category,
      text: "In the past 30 days, how often have you maintained visibility and presence in your professional life?",
    },
    {
      category: "financialFocus" as Category,
      text: "In the past 30 days, how often have you focused on and managed your financial well-being?",
    },
    {
      category: "environmentalBalance" as Category,
      text: "In the past 30 days, how often has your environment supported your work-life balance?",
    },
    {
      category: "relationalPresence" as Category,
      text: "In the past 30 days, how often have you been present and engaged in your important relationships?",
    },
    {
      category: "socialConnection" as Category,
      text: "In the past 30 days, how often have you maintained meaningful social connections?",
    },
    {
      category: "recreationalJoy" as Category,
      text: "In the past 30 days, how often have you engaged in recreational activities that bring you joy?",
    },
    {
      category: "charitableContribution" as Category,
      text: "In the past 30 days, how often have you contributed to charitable causes or helped others?",
    },
  ]

  const [answers, setAnswers] = useState<Record<Category, number>>({
    charitableContribution: 3,
    recreationalJoy: 3,
    spiritualLife: 3,
    mentalClarity: 3,
    physicalMovement: 3,
    physicalNourishment: 3,
    physicalSleep: 3,
    emotionalBalance: 3,
    personalGrowth: 3,
    intellectualGrowth: 3,
    professionalVisibility: 3,
    financialFocus: 3,
    environmentalBalance: 3,
    relationalPresence: 3,
    socialConnection: 3,
  })

  const handleAnswerChange = (category: Category, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: value,
    }))
  }

  const handleSubmit = () => {
    // Calculate results - convert 1-5 scale to percentages
    const newResults: Result[] = questions.map((question) => ({
      category: question.category,
      percentage: ((answers[question.category] - 1) / 4) * 100, // Convert 1-5 to 0-100%
    }))
    setResults(newResults)

    // Calculate overall score
    const totalPercentage = newResults.reduce((sum, result) => sum + result.percentage, 0)
    const calculatedOverallScore = Math.round(totalPercentage / questions.length)
    setOverallScore(calculatedOverallScore)

    setStep(2) // Move to the results step
  }

  const handleEmailResults = async () => {
    if (!name || !email) {
      setEmailStatus({ success: false, message: "Please enter your name and email." })
      return
    }

    // Generate HTML content
    const htmlContent = generateHtml(name, email, overallScore, results, categoryLabels, personalizedFeedback)

    // Send email
    const result = await sendEmail(name, email, "Work-Life Balance Audit Results", htmlContent, results)
    setEmailStatus(result)
  }

  const handleDownloadPdf = async () => {
    if (!name || !email) {
      setEmailStatus({ success: false, message: "Please enter your name and email." })
      return
    }

    try {
      const pdfDataUri = await generatePdf(name, email, overallScore, results, categoryLabels, personalizedFeedback)

      // Create a temporary link element
      const link = document.createElement("a")
      link.href = pdfDataUri
      link.download = `Work-Life-Balance-Audit-Results-${name}.pdf` // Suggest a filename

      // Programmatically trigger the download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      setEmailStatus({ success: false, message: "Failed to generate PDF. Please try again." })
    }
  }

  const lowestCategories = [...results].sort((a, b) => a.percentage - b.percentage).slice(0, 3) // Get the 3 lowest scoring categories

  const personalizedFeedback = lowestCategories.map((item) => {
    switch (item.category) {
      case "charitableContribution":
        return {
          category: item.category,
          feedback:
            "Identify ways to share your expertise that energize rather than drain you. Set clear boundaries around your giving to prevent burnout.",
        }
      case "recreationalJoy":
        return {
          category: item.category,
          feedback:
            "Schedule time for play and creativity with no productive purpose. Explore new hobbies or revisit ones you've enjoyed in the past.",
        }
      case "spiritualLife":
        return {
          category: item.category,
          feedback: "Take 5-10 minutes each morning to ground yourself through deep breathing or gratitude journaling.",
        }
      case "mentalClarity":
        return {
          category: item.category,
          feedback: "Clear mental fog with a quick brain dump of lingering thoughts at the start or end of your day.",
        }
      case "physicalMovement":
        return {
          category: item.category,
          feedback: "Incorporate 10-minute movement breaks between meetings to energize your body and mind.",
        }
      case "physicalNourishment":
        return {
          category: item.category,
          feedback: "Focus on nourishing your body with whole foods and staying hydrated throughout the day.",
        }
      case "physicalSleep":
        return {
          category: item.category,
          feedback: "Establish a consistent sleep schedule and create a relaxing bedtime routine for better rest.",
        }
      case "emotionalBalance":
        return {
          category: item.category,
          feedback: "Practice emotional awareness and develop healthy coping strategies for stress management.",
        }
      case "personalGrowth":
        return {
          category: item.category,
          feedback: "Set aside time for self-reflection and pursue activities that challenge you to grow personally.",
        }
      case "intellectualGrowth":
        return {
          category: item.category,
          feedback: "Engage in learning opportunities that stimulate your mind and expand your knowledge base.",
        }
      case "professionalVisibility":
        return {
          category: item.category,
          feedback: "Maintain your professional presence while setting boundaries to protect your personal time.",
        }
      case "financialFocus":
        return {
          category: item.category,
          feedback: "Create a financial plan and regularly review your progress toward your financial goals.",
        }
      case "environmentalBalance":
        return {
          category: item.category,
          feedback: "Optimize your physical spaces to support both productivity and relaxation.",
        }
      case "relationalPresence":
        return {
          category: item.category,
          feedback: "Practice being fully present in your relationships and prioritize quality time with loved ones.",
        }
      case "socialConnection":
        return {
          category: item.category,
          feedback: "Nurture your social connections and make time for meaningful interactions with others.",
        }
      default:
        return {
          category: item.category,
          feedback: "Continue focusing on this area to maintain your work-life balance.",
        }
    }
  })

  const cherryBlossomPrompt = generateCherryBlossomPrompt(name, overallScore, results, categoryLabels, lowestCategories)

  const handleShowBetaInvitation = () => {
    setShowBetaInvitation(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
      <div className="relative m-4 md:m-12 bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="p-4 md:p-8">
          {step === 1 && (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center">Work-Life Balance Audit</h2>
              <p className="text-gray-600 mb-6 text-center">
                Answer the following questions to assess your current work-life balance.
              </p>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{question.text}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <Label htmlFor={`question-${index}`}>
                          On a scale from 1 to 5, where 1 = Never and 5 = Consistently:
                        </Label>
                      </div>
                      <RadioGroup
                        defaultValue={answers[question.category].toString()}
                        className="flex flex-col space-y-2"
                        onValueChange={(value) => handleAnswerChange(question.category, Number.parseInt(value, 10))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id={`r1-${index}`} />
                          <Label htmlFor={`r1-${index}`}>Never (1)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id={`r2-${index}`} />
                          <Label htmlFor={`r2-${index}`}>Rarely (2)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id={`r3-${index}`} />
                          <Label htmlFor={`r3-${index}`}>Sometimes (3)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id={`r4-${index}`} />
                          <Label htmlFor={`r4-${index}`}>Often (4)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5" id={`r5-${index}`} />
                          <Label htmlFor={`r5-${index}`}>Consistently (5)</Label>
                        </div>
                      </RadioGroup>
                      <Progress value={(answers[question.category] - 1) * 25} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={handleSubmit} className="w-full mt-6 bg-[#5D9D61] hover:bg-[#4c8050] text-white">
                See Results
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>
              <p className="text-gray-600 mb-6 text-center">Here are your work-life balance audit results.</p>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Card className="bg-green-100 border-green-200">
                <CardContent className="flex items-center gap-4">
                  <div>
                    <CardTitle className="text-base">Overall Score</CardTitle>
                    <CardDescription>Your overall work-life balance score is:</CardDescription>
                    <div className="text-2xl font-bold">{overallScore}%</div>
                  </div>
                </CardContent>
              </Card>

              <section className="mt-6">
                <CardTitle className="text-lg font-semibold">Category Breakdown</CardTitle>
                <div className="mt-4">
                  {results.map((result) => {
                    const percentage = Math.round(result.percentage)
                    const color = percentage < 40 ? "#dc3545" : percentage < 70 ? "#ffc107" : "#28a745"

                    return (
                      <div key={result.category} className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{categoryLabels[result.category]}</span>
                          <span style={{ color: color }}>{percentage}%</span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    )
                  })}
                </div>
              </section>

              <section className="mt-6">
                <CardTitle className="text-lg font-semibold">Personalized Feedback</CardTitle>
                <ul className="list-disc list-inside mt-4">
                  {personalizedFeedback.map((item) => (
                    <li key={item.category} className="mb-2">
                      <strong>{categoryLabels[item.category]}:</strong> {item.feedback}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-6 flex flex-col space-y-4">
                <Button
                  onClick={handleEmailResults}
                  disabled={!name || !email}
                  className="bg-[#5D9D61] hover:bg-[#4c8050] text-white"
                >
                  Email Me My Results
                </Button>
                <Button
                  onClick={handleDownloadPdf}
                  disabled={!name || !email}
                  className="bg-[#5D9D61] hover:bg-[#4c8050] text-white"
                >
                  Download PDF
                </Button>
                <ButtonLink
                  href={generateHtml(name, email, overallScore, results, categoryLabels, personalizedFeedback)}
                  className="bg-[#5D9D61] hover:bg-[#4c8050] text-white"
                >
                  View HTML Results
                </ButtonLink>
                <Button onClick={handleShowBetaInvitation} className="bg-[#5D9D61] hover:bg-[#4c8050] text-white">
                  Continue with Cherry Blossom
                </Button>
              </div>

              {emailStatus && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    emailStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {emailStatus.message}
                </div>
              )}
            </>
          )}

          {showBetaInvitation && (
            <BetaInvitation
              onBack={() => setShowBetaInvitation(false)}
              overallScore={overallScore}
              name={name}
              email={email}
              results={results}
              categoryLabels={categoryLabels}
              personalizedFeedback={personalizedFeedback}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkLifeBalanceAudit
