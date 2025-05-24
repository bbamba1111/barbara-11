"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { X } from "lucide-react"
import { saveAuditResults } from "@/utils/audit-storage"
import FollowUpPopup from "@/components/follow-up-popup"

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

export type Result = {
  category: Category
  percentage: number
}

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
  const [showFollowUpPopup, setShowFollowUpPopup] = useState(false)

  // YOUR ORIGINAL AUDIT QUESTIONS - Based on the 15 categories from your results
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

    // Calculate overall score
    const totalPercentage = newResults.reduce((sum, result) => sum + result.percentage, 0)
    const calculatedOverallScore = Math.round(totalPercentage / questions.length)

    // Get the 3 lowest scoring categories for personalized feedback
    const lowestCategories = [...newResults].sort((a, b) => a.percentage - b.percentage).slice(0, 3)

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
            feedback:
              "Take 5-10 minutes each morning to ground yourself through deep breathing or gratitude journaling.",
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

    // Save results to localStorage
    saveAuditResults("", "", calculatedOverallScore, newResults, personalizedFeedback)

    // Show follow-up popup directly
    setShowFollowUpPopup(true)
  }

  // If follow-up popup should be shown, render it instead of the audit
  if (showFollowUpPopup) {
    return <FollowUpPopup onClose={() => setShowFollowUpPopup(false)} />
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
      <div className="relative m-4 md:m-12 bg-white shadow-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 md:p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Make Time For More Logo"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center text-[#E26C73]">Work-Life Balance Audit</h2>
            <p className="text-gray-600 mb-6 text-center">
              Answer the following questions to assess your current work-life balance.
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <Card key={index} className="">
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
                  <Progress value={(answers[question.category] - 1) * 25} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
          >
            See Results
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WorkLifeBalanceAudit
