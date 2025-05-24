import type { Result, Category } from "@/components/work-life-balance-audit"

// Define the structure of stored audit data
export interface StoredAuditData {
  completed: boolean
  timestamp: number
  name: string
  email: string
  overallScore: number
  results: Result[]
  personalizedFeedback: { category: Category; feedback: string }[]
}

// Save audit results to localStorage
export function saveAuditResults(
  name: string,
  email: string,
  overallScore: number,
  results: Result[],
  personalizedFeedback: { category: Category; feedback: string }[],
): void {
  const auditData: StoredAuditData = {
    completed: true,
    timestamp: Date.now(),
    name,
    email,
    overallScore,
    results,
    personalizedFeedback,
  }

  try {
    localStorage.setItem("auditCompleted", "true")
    localStorage.setItem("auditData", JSON.stringify(auditData))
  } catch (error) {
    console.error("Error saving audit data to localStorage:", error)
  }
}

// Get audit results from localStorage
export function getAuditResults(): StoredAuditData | null {
  try {
    const auditDataString = localStorage.getItem("auditData")
    if (!auditDataString) return null

    return JSON.parse(auditDataString) as StoredAuditData
  } catch (error) {
    console.error("Error retrieving audit data from localStorage:", error)
    return null
  }
}

// Check if user has completed the audit
export function hasCompletedAudit(): boolean {
  return localStorage.getItem("auditCompleted") === "true"
}

// Clear audit data (for testing)
export function clearAuditData(): void {
  localStorage.removeItem("auditCompleted")
  localStorage.removeItem("auditData")
}
