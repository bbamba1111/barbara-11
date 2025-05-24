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

export type Category =
  | "timeManagement"
  | "energyLevels"
  | "relationships"
  | "selfCare"
  | "mindfulness"
  | "purpose"
  | "finances"
  | "environment"
  | "contribution"
  | "learning"
  | "creativity"
  | "spirituality"
  | "celebration"

export type Result = {
  category: Category
  percentage: number
}

const categoryLabels: Record<Category, string> = {
  timeManagement: "Time Management",
  energyLevels: "Energy Levels",
  relationships: "Personal Relationships",
  selfCare: "Self-Care",
  mindfulness: "Mindfulness & Stress Reduction",
  purpose: "Sense of Purpose",
  finances: "Financial Well-being",
  environment: "Supportive Environment",
  contribution: "Community Contribution",
  learning: "Continuous Learning",
  creativity: "Creative Expression",
  spirituality: "Spiritual Connection",
  celebration: "Celebration & Fun",
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
      category: "timeManagement" as Category,
      text: "I effectively manage my time between work and personal life.",
    },
    {
      category: "energyLevels" as Category,
      text: "I consistently have enough energy for both work and personal activities.",
    },
    {
      category: "relationships" as Category,
      text: "I dedicate enough time and energy to my relationships with family and friends.",
    },
    {
      category: "selfCare" as Category,
      text: "I prioritize activities that promote my physical and mental well-being.",
    },
    {
      category: "mindfulness" as Category,
      text: "I regularly practice mindfulness or stress-reduction techniques.",
    },
    {
      category: "purpose" as Category,
      text: "I feel a strong sense of purpose in my life, both professionally and personally.",
    },
    {
      category: "finances" as Category,
      text: "I feel in control of my finances and financial planning.",
    },
    {
      category: "environment" as Category,
      text: "My environment (home and work) supports my work-life balance.",
    },
    {
      category: "contribution" as Category,
      text: "I feel I am making a meaningful contribution to my community or the world.",
    },
    {
      category: "learning" as Category,
      text: "I am committed to continuous learning and personal growth.",
    },
    {
      category: "creativity" as Category,
      text: "I regularly engage in creative activities that bring me joy.",
    },
    {
      category: "spirituality" as Category,
      text: "I nurture my spiritual side, however I define it.",
    },
    {
      category: "celebration" as Category,
      text: "I regularly celebrate my achievements and enjoy life's simple pleasures.",
    },
  ]

  const [answers, setAnswers] = useState<Record<Category, number>>({
    timeManagement: 50,
    energyLevels: 50,
    relationships: 50,
    selfCare: 50,
    mindfulness: 50,
    purpose: 50,
    finances: 50,
    environment: 50,
    contribution: 50,
    learning: 50,
    creativity: 50,
    spirituality: 50,
    celebration: 50,
  })

  const handleAnswerChange = (category: Category, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: value,
    }))
  }

  const handleSubmit = () => {
    // Calculate results
    const newResults: Result[] = questions.map((question) => ({
      category: question.category,
      percentage: answers[question.category],
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
      case "timeManagement":
        return {
          category: item.category,
          feedback:
            "Consider time-blocking techniques and prioritizing tasks to better manage your time. Review your daily schedule and identify time-wasting activities.",
        }
      case "energyLevels":
        return {
          category: item.category,
          feedback:
            "Focus on improving your sleep, diet, and exercise habits. Incorporate short breaks during the day to recharge.",
        }
      case "relationships":
        return {
          category: item.category,
          feedback:
            "Schedule dedicated time for your loved ones and engage in activities you all enjoy. Communicate openly and actively listen to their needs.",
        }
      case "selfCare":
        return {
          category: item.category,
          feedback:
            "Make self-care a non-negotiable part of your routine. This could include reading, meditation, or spending time in nature.",
        }
      case "mindfulness":
        return {
          category: item.category,
          feedback:
            "Practice mindfulness techniques such as deep breathing or meditation to reduce stress. Try to stay present in the moment and avoid multitasking.",
        }
      case "purpose":
        return {
          category: item.category,
          feedback:
            "Reflect on your values and passions, and align your daily activities with them. Set meaningful goals and celebrate your progress.",
        }
      case "finances":
        return {
          category: item.category,
          feedback:
            "Create a budget and track your expenses to gain control over your finances. Seek advice from a financial advisor if needed.",
        }
      case "environment":
        return {
          category: item.category,
          feedback:
            "Declutter your workspace and create a calming atmosphere. Set boundaries to protect your personal time and space.",
        }
      case "contribution":
        return {
          category: item.category,
          feedback:
            "Volunteer your time or donate to causes you care about. Find ways to make a positive impact on your community.",
        }
      case "learning":
        return {
          category: item.category,
          feedback:
            "Enroll in a course, read books, or attend workshops to expand your knowledge. Set aside time each week for learning and personal development.",
        }
      case "creativity":
        return {
          category: item.category,
          feedback:
            "Engage in creative activities such as painting, writing, or playing music. Allow yourself to experiment and express your unique talents.",
        }
      case "spirituality":
        return {
          category: item.category,
          feedback:
            "Connect with your spiritual side through prayer, meditation, or spending time in nature. Reflect on your beliefs and values.",
        }
      case "celebration":
        return {
          category: item.category,
          feedback:
            "Acknowledge your accomplishments and reward yourself for your hard work. Plan fun activities and create lasting memories.",
        }
      default:
        return {
          category: item.category,
          feedback: "No specific feedback available for this category.",
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
              <h2 className="text-2xl font-bold mb-4 text-center">Work-Life Balance Audit</h2>
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
                        <Label htmlFor={`question-${index}`}>How much do you agree with the statement?</Label>
                        <p className="text-sm text-gray-500">(0% - Not at all, 100% - Completely)</p>
                      </div>
                      <RadioGroup
                        defaultValue={answers[question.category].toString()}
                        className="flex flex-col space-y-1"
                        onValueChange={(value) => handleAnswerChange(question.category, Number.parseInt(value, 10))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id={`r1-${index}`} />
                          <Label htmlFor={`r1-${index}`}>0%</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="25" id={`r2-${index}`} />
                          <Label htmlFor={`r2-${index}`}>25%</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="50" id={`r3-${index}`} />
                          <Label htmlFor={`r3-${index}`}>50%</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="75" id={`r4-${index}`} />
                          <Label htmlFor={`r4-${index}`}>75%</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="100" id={`r5-${index}`} />
                          <Label htmlFor={`r5-${index}`}>100%</Label>
                        </div>
                      </RadioGroup>
                      <Progress value={answers[question.category]} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={handleSubmit} className="w-full mt-6">
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
                <Button onClick={handleEmailResults} disabled={!name || !email}>
                  Email Me My Results
                </Button>
                <Button onClick={handleDownloadPdf} disabled={!name || !email}>
                  Download PDF
                </Button>
                <ButtonLink
                  href={generateHtml(name, email, overallScore, results, categoryLabels, personalizedFeedback)}
                  className="bg-[#5D9D61] hover:bg-[#4c8050] text-white"
                >
                  View HTML Results
                </ButtonLink>
                <Button onClick={handleShowBetaInvitation}>Continue with Cherry Blossom</Button>
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
