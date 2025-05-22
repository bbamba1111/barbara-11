import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Gift, Sparkles } from 'lucide-react'

export default function JoinUsPage() {
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

        <h1 className="text-3xl font-bold tracking-tight mb-6 text-[#E26C73] text-center">
          Join the Make Time For More™ Community
        </h1>

        <div className="space-y-6 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E26C73] mb-8">
            <div className="flex items-center justify-center gap-2 mb-4 text-[#E26C73]">
              <Gift className="h-5 w-5" />
              <h2 className="text-xl font-bold">Start With Your FREE Work-Life Balance Audit</h2>
              <Gift className="h-5 w-5" />
            </div>
            <p className="text-center mb-2">
              <span className="font-bold">Regular Value: $997</span> — Yours FREE Today
            </p>
            <p className="text-center italic mb-4">
              "The Mandatory 1st Step to Achieving Your Desired Work-Lifestyle"
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <Button className="bg-[#5D9D61] hover:bg-[#4c8050] text-white font-bold text-xl">
                  Take The FREE Audit Now!
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-center text-lg">
            Ready to transform your work-life balance and join a community of like-minded women founders?
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md my-8 border border-[#E26C73]">
            <h2 className="text-xl font-semibold text-[#E26C73] mb-4 text-center">
              The Make Time For More™ Work-Life Balance Experience
            </h2>
            <p className="mb-6">
              Join our signature program designed specifically for women founders and entrepreneurs who want to:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li>Create a sustainable work-life balance without sacrificing business growth</li>
              <li>Develop systems that support both personal wellbeing and professional success</li>
              <li>Connect with a community of like-minded women entrepreneurs</li>
              <li>Receive personalized guidance and accountability</li>
              <li>Transform your relationship with time, energy, and priorities</li>
            </ul>
            <div className="flex justify-center">
              <a href="https://www.maketimeformore.com/join" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#E26C73] hover:bg-[#d15964] text-white font-medium px-8 py-6 rounded-md shadow-md">
                  Learn More About the Program
                </Button>
              </a>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#E26C73] mt-8 text-center">Free Resources</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-[#E26C73] mb-3">Weekly Newsletter</h3>
              <p className="mb-4">
                Get practical work-life balance tips, inspiration, and resources delivered directly to your inbox.
              </p>
              <a href="https://www.maketimeformore.com/newsletter" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-[#E26C73] text-[#E26C73] hover:bg-[#E26C73] hover:text-white"
                >
                  Subscribe Now
                </Button>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-[#E26C73] mb-3">Free Workshop</h3>
              <p className="mb-4">Join our free masterclass: "3 Keys to Work-Life Balance for Women Founders"</p>
              <a href="https://www.maketimeformore.com/workshop" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-[#E26C73] text-[#E26C73] hover:bg-[#E26C73] hover:text-white"
                >
                  Register for Free
                </Button>
              </a>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#E26C73] mt-8 text-center">Connect With Us</h2>

          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://www.instagram.com/maketimeformore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#E26C73]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/maketimeformore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#E26C73]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/maketimeformore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#E26C73]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-8 border border-[#E26C73]">
            <h2 className="text-xl font-semibold text-[#E26C73] mb-4 text-center">Have Questions?</h2>
            <p className="mb-4 text-center">
              We're here to help! Reach out to our team for more information about our programs and resources.
            </p>
            <div className="flex justify-center">
              <a href="mailto:hello@maketimeformore.com">
                <Button
                  variant="outline"
                  className="border-[#E26C73] text-[#E26C73] hover:bg-[#E26C73] hover:text-white"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}