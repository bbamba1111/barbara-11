"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ArrowLeft, Flower, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
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
          <Link href="/my-results">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              Back to Your Results
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
              Learn More
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm" className="bg-gray-100 text-black">
              About
            </Button>
          </Link>
          <Link href="/join-us">
            <Button variant="ghost" size="sm" className="bg-[#E26C73] hover:bg-[#d15964] text-white">
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
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-3xl w-full space-y-6 mb-16">
          <div className="text-center mb-6">
            <Link href="/" className="text-[#E26C73] hover:underline">
              ← Back to Home
            </Link>
          </div>

          <div className="text-center">
            <div className="w-36 h-36 mx-auto mb-4 relative">
              <Image
                src="/images/logo.png"
                alt="Make Time For More Logo"
                width={180}
                height={180}
                className="rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold text-[#E26C73] mb-6">About the Work-Life Balance Audit</h1>
          </div>

          <Card className="border-[#E26C73] bg-rose-50">
            <CardHeader>
              <CardTitle className="text-[#E26C73] text-center">
                🎁 Your Priceless Gift That Keeps on GIV•EN 🎁
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>
                <span className="line-through text-gray-500">Regular Value: $997</span> —{" "}
                <strong>Yours FREE Today</strong>
              </p>
              <p className="italic">
                "This isn't just another one-time assessment—it's your ongoing companion for work-life balance mastery."
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p>
              Welcome to the Make Time For More™ Work-Life Balance Audit—the{" "}
              <strong>Mandatory 1st Step to Achieving Your Desired Work-Lifestyle</strong> and accessing transformative
              coaching programs.
            </p>

            <h2 className="text-2xl font-bold text-[#E26C73]">What Makes This Audit Priceless</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <strong>AI-Powered Precision:</strong> Unlike generic assessments, our proprietary algorithm provides
                  hyper-personalized insights tailored to your unique situation.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <strong>Unlimited Access:</strong> Take the audit daily, weekly, or monthly to track your progress—a
                  gift that truly keeps on GIV•EN, unlike one-off assessment tools.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <strong>Cherry Blossom Integration:</strong> Receive ongoing AI coaching support to implement your
                  personalized recommendations.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <strong>Proprietary Framework:</strong> Based on the 13 Core Life Value Areas from Barbara's exclusive
                  Work-Life Balance Experience.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <strong>Beta Access:</strong> You're receiving complimentary access to a tool that will be sold for
                  $997 after our beta season ends.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-8 max-w-lg mx-auto">
            <Link href="/learn-more">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                Learn More About The Experience
              </Button>
            </Link>

            <Link href="/join-us">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                Join Us
              </Button>
            </Link>

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header"
              target="_blank"
            >
              <Button className="w-full bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold py-4 border-2 border-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                APPLY NOW!
              </Button>
            </Link>

            <a
              href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E26C73] hover:bg-[#d15964] text-white flex items-center justify-center w-full py-4 px-4 border-2 border-white"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Chat with Cherry Blossom
              <Flower className="ml-2 h-4 w-4 text-pink-300 font-extrabold" />
            </a>

            <Link href="/my-results">
              <Button className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Your Results
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full bg-[#E26C73] hover:bg-[#d15964] text-white py-4 border-2 border-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
