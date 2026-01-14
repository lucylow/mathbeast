// Streaming solution generation endpoint
import type { NextRequest } from "next/server"
import { streamText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problemContent, reasoningLevel = "medium" } = body

    const systemPrompt = `
You are an expert mathematics tutor. ${
      reasoningLevel === "high"
        ? "Provide detailed step-by-step solutions with full chain-of-thought reasoning."
        : reasoningLevel === "low"
          ? "Provide concise solutions."
          : "Provide clear step-by-step solutions."
    }

Format your response with clear steps numbered 1, 2, 3, etc.
Include the final answer clearly marked.
`

    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: systemPrompt,
      prompt: problemContent || "Solve: x² - 5x + 6 = 0",
      temperature: 0.2,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Error streaming solution:", error)
    return new Response(JSON.stringify({ error: "Failed to stream solution" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
