import type { Result, Category } from "@/components/work-life-balance-audit"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Function to create a simplified PDF with just scores, feedback, and links
export async function generatePdf(
  name: string,
  email: string,
  overallScore: number,
  results: Result[],
  categoryLabels: Record<Category, string>,
  personalizedFeedback: { category: Category; feedback: string }[],
): Promise<string> {
  // Create a temporary div to render the content
  const container = document.createElement("div")
  container.style.position = "absolute"
  container.style.left = "-9999px"
  container.style.width = "800px"
  container.style.fontFamily = "Arial, sans-serif"

  // Add content to the div - SIMPLIFIED VERSION
  container.innerHTML = `
    <div id="pdf-content" style="padding: 20px; position: relative;">
      <!-- Logo at the top center -->
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="/images/logo.png" alt="Make Time For More Logo" style="width: 200px; height: auto;" />
        <h1 style="color: #E26C73; margin-top: 15px; font-size: 28px;">Work-Life Balance Audit Results</h1>
        <p style="color: #666; font-size: 16px;">Prepared for: ${name} (${email})</p>
      </div>
      
      <!-- Overall Score -->
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 30px; text-align: center; border-left: 5px solid #E26C73;">
        <h2 style="color: #075D2D; margin-top: 0; margin-bottom: 10px;">Overall Score: ${overallScore}%</h2>
        <p style="color: ${overallScore < 40 ? "#dc3545" : overallScore < 70 ? "#ffc107" : "#28a745"}; font-weight: bold; font-size: 18px;">
          ${overallScore < 40 ? "Needs significant improvement" : overallScore < 70 ? "Room for improvement" : overallScore < 90 ? "Good balance" : "Excellent balance"}
        </p>
      </div>
      
      <!-- Category Breakdown -->
      <h2 style="color: #075D2D; border-bottom: 2px solid #E26C73; padding-bottom: 5px; margin-top: 30px;">Category Breakdown</h2>
      <div style="margin-bottom: 30px;">
  `

  // Add each category result
  results.forEach((result) => {
    const percentage = Math.round(result.percentage)
    const color = percentage < 40 ? "#dc3545" : percentage < 70 ? "#ffc107" : "#28a745"

    container.innerHTML += `
      <div style="margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="font-weight: bold;">${categoryLabels[result.category]}</span>
          <span style="color: ${color};">${percentage}%</span>
        </div>
        <div style="height: 10px; background-color: #e9ecef; border-radius: 5px; overflow: hidden;">
          <div style="height: 100%; width: ${percentage}%; background: linear-gradient(to right, #E26C73, #075D2D);"></div>
        </div>
      </div>
    `
  })

  container.innerHTML += `
      </div>
      
      <!-- Cherry Blossom Feedback -->
      <h2 style="color: #075D2D; border-bottom: 2px solid #E26C73; padding-bottom: 5px; margin-top: 30px;">Personalized Feedback</h2>
      <div style="margin-bottom: 30px;">
        <ul style="margin: 0; padding-left: 20px;">
  `

  // Add personalized feedback based on lowest scores
  personalizedFeedback.forEach((item) => {
    container.innerHTML += `<li style="margin-bottom: 8px;"><strong>${categoryLabels[item.category]}:</strong> ${item.feedback}</li>`
  })

  container.innerHTML += `
        </ul>
      </div>
      
      <!-- Links -->
      <h2 style="color: #075D2D; border-bottom: 2px solid #E26C73; padding-bottom: 5px; margin-top: 30px;">Next Steps</h2>
      <div style="margin-bottom: 30px;">
        <p style="margin-bottom: 10px;">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header" style="color: #E26C73; font-weight: bold; text-decoration: none;">
            → Apply Now to Work with Thought Leader Barbara
          </a>
        </p>
        <p style="margin-bottom: 10px;">
          <a href="https://www.maketimeformore.com/products/apply" style="color: #075D2D; font-weight: bold; text-decoration: none;">
            → Learn More About The Experience/Business Model & SOP Installation
          </a>
        </p>
        <p style="margin-bottom: 10px;">
          <a href="https://chatgpt.com/g/g-67f5422677308191aa28a86d8ae5084e-free-work-life-balance-audit-for-women-founders" style="color: #E26C73; font-weight: bold; text-decoration: none;">
            → Access Cherry Blossom for More Insights
          </a>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 50px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
        <p>"You didn't leave your high-stress role just to rebuild burnout inside your business."</p>
        <p>- Thought Leader Barbara, Work-Life Balance Mentor</p>
        <p style="margin-top: 15px;">© ${new Date().getFullYear()} Make Time For More™ | <a href="https://www.maketimeformore.com" style="color: #E26C73;">www.maketimeformore.com</a></p>
      </div>
    </div>
  `

  document.body.appendChild(container)

  try {
    // Convert the HTML to a canvas
    const canvas = await html2canvas(document.getElementById("pdf-content") as HTMLElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading of external images
      logging: false,
    })

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Add the canvas as an image to the PDF
    const imgData = canvas.toDataURL("image/png")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 0

    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

    // Generate PDF data URL
    const pdfOutput = pdf.output("datauristring")

    // Clean up
    document.body.removeChild(container)

    return pdfOutput
  } catch (error) {
    console.error("Error generating PDF:", error)
    document.body.removeChild(container)
    throw error
  }
}
