import { NextResponse } from "next/server"

// Email credentials from environment variables
const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { to, subject, html, name } = await request.json()

    // Validate inputs
    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Format the subject with the user's name
    const formattedSubject = `${subject} - ${name}`

    // Check if we're in a development/preview environment
    const isDevelopment = process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview"

    // In development or preview, simulate email sending
    if (isDevelopment) {
      console.log("Development/Preview mode: Simulating email send")
      console.log("To:", to)
      console.log("BCC: coachbarbara@maketimeformore.com")
      console.log("Subject:", formattedSubject)
      console.log("Content:", html.substring(0, 100) + "...")

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return NextResponse.json({
        success: true,
        message: "Email simulated successfully in development/preview mode",
      })
    }

    // For production, we'll use a different approach
    // This code will only run in production, not in the Edge Runtime preview
    try {
      // In production, you would implement a different email sending mechanism
      // For example, using a third-party API like SendGrid, Mailgun, etc.
      // Or using a custom solution that doesn't rely on DNS lookup

      // For now, we'll return a success message
      // You'll need to replace this with your actual email sending code in production
      return NextResponse.json({
        success: true,
        message: "Email would be sent in production environment",
      })
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      throw new Error(`Failed to send email: ${emailError instanceof Error ? emailError.message : "Unknown error"}`)
    }
  } catch (error) {
    console.error("Error in email API:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 },
    )
  }
}
