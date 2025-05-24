"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { hasCompletedAudit } from "@/utils/audit-storage"
import { Menu, RefreshCw, FileText, Calendar, X, ExternalLink } from "lucide-react"

export default function NavHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  useEffect(() => {
    setHasResults(hasCompletedAudit())
  }, [])

  const navigateTo = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  const openApplyNow = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header",
      "_blank",
    )
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Make Time For More Logo"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => navigateTo("/")}
          />
          <span className="font-medium text-[#E26C73] hidden md:inline-block">Make Time For More™</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigateTo("/")} className={pathname === "/" ? "bg-gray-100" : ""}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake The Audit
          </Button>

          {hasResults && (
            <Button
              variant="ghost"
              onClick={() => navigateTo("/my-results")}
              className={pathname === "/my-results" ? "bg-gray-100" : ""}
            >
              <FileText className="h-4 w-4 mr-2" />
              Back to Your Results
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => navigateTo("/learn-more")}
            className={pathname === "/learn-more" ? "bg-gray-100" : ""}
          >
            <FileText className="h-4 w-4 mr-2" />
            Learn More
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigateTo("/join-us")}
            className={pathname === "/join-us" ? "bg-gray-100" : ""}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Join Us
          </Button>

          <Button variant="ghost" onClick={openApplyNow} className="bg-[#5D9D61] text-white hover:bg-[#4c8050]">
            <ExternalLink className="h-4 w-4 mr-2" />
            APPLY NOW!
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-md">
          <nav className="flex flex-col p-4">
            <Button
              variant="ghost"
              onClick={() => navigateTo("/")}
              className={`justify-start ${pathname === "/" ? "bg-gray-100" : ""} mb-2`}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake The Audit
            </Button>

            {hasResults && (
              <Button
                variant="ghost"
                onClick={() => navigateTo("/my-results")}
                className={`justify-start ${pathname === "/my-results" ? "bg-gray-100" : ""} mb-2`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Back to Your Results
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => navigateTo("/learn-more")}
              className={`justify-start ${pathname === "/learn-more" ? "bg-gray-100" : ""} mb-2`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Learn More
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigateTo("/join-us")}
              className={`justify-start ${pathname === "/join-us" ? "bg-gray-100" : ""} mb-2`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Join Us
            </Button>

            <Button
              variant="ghost"
              onClick={openApplyNow}
              className="justify-start bg-[#5D9D61] text-white hover:bg-[#4c8050] mb-2"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              APPLY NOW!
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
