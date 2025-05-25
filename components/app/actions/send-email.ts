"use server"

import { z } from "zod"
import type { Category } from "@/components/work-life-balance-audit"

// Define the schema for email validation
const emailSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string(),
  htmlContent: z.string(),
})

export type EmailResult = {
  success: boolean
  message: string
}

export async function sendEmail(
  name: string,
  email: string,
  subject: string,
  htmlContent: string,
  results?: { category: Category; percentage: number }[],
): Promise<EmailResult> {
  try {
    // Validate the input
    const validatedData = emailSchema.parse({
      name,
      email,
      subject,
      htmlContent,
    })

    // Create a subject line with the user's name and email
    const subjectLine = `Audit Results From ${name} (${email})`

    // In a production environment, you would use a service like SendGrid, Mailgun, or Resend
    // For this preview/demo, we'll simulate sending an email
    console.log("Simulating email send in preview environment")
    console.log("Email would be sent to:", validatedData.email)
    console.log("BCC sent to: coachbarbara@maketimeformore.com")
    console.log("Subject:", subjectLine)
    console.log("Content:", htmlContent.substring(0, 100) + "...")

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message: "Results sent to your email successfully! (Preview Mode)",
    }
  } catch (error) {
    console.error("Error sending email:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid input. Please check your name and email address.",
      }
    }

    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    }
  }
}

// Note: For production deployment, you would replace the simulation with actual email sending
// using a service like SendGrid, Mailgun, or Resend. Example implementation:
/*
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Inside the sendEmail function:
const data = await resend.emails.send({
  from: 'Work-Life Balance Audit <audit@maketimeformore.com>',
  to: [validatedData.email],
  bcc: ['coachbarbara@maketimeformore.com'],
  subject: subjectLine,
  html: htmlContent,
});

if (data.error) {
  throw new Error(data.error.message);
}
*/
