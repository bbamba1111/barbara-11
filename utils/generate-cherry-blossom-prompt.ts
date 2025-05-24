import type { Result, Category } from "@/components/work-life-balance-audit"

export function generateCherryBlossomPrompt(
  name: string,
  overallScore: number,
  results: Result[],
  categoryLabels: Record<Category, string>,
  lowestCategories: { category: Category; percentage: number }[],
): string {
  // Sort results from lowest to highest score
  const sortedResults = [...results].sort((a, b) => a.percentage - b.percentage)

  // Create the prompt text
  let prompt = `Hello Cherry Blossom! I just completed the Work-Life Balance Audit. Here are my results:\n\n`
  prompt += `Name: ${name}\n`
  prompt += `Overall Score: ${overallScore}%\n\n`

  prompt += `My 3-5 lowest scoring areas are:\n`
  lowestCategories.forEach((item) => {
    prompt += `- ${categoryLabels[item.category]}: ${Math.round(item.percentage)}%\n`
  })

  prompt += `\nI'd like your guidance on improving these areas. What specific strategies would you recommend for my situation?`

  return prompt
}
