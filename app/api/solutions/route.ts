// Solutions API endpoint
import { type NextRequest, NextResponse } from "next/server"
import { generateSolution, getProblemById } from "@/lib/math-engine"
import type { ReasoningLevel, MathProblem } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problemId, reasoningLevel = "medium", includeAlternatives = true } = body

    if (!problemId) {
      return NextResponse.json({ error: "problemId is required" }, { status: 400 })
    }

    // Try to get from cache, or create a placeholder
    let problem = getProblemById(problemId)

    if (!problem) {
      // Create a placeholder problem for demo
      problem = {
        id: problemId,
        rawContent: body.rawContent || "Solve: x² - 5x + 6 = 0",
        source: "api",
        difficulty: "intermediate",
        topic: "algebra",
        subtopics: [],
        tags: [],
        estimatedTime: 5,
        requiresCalculator: false,
        requiresDrawing: false,
        structuredFormat: {},
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as MathProblem
    }

    const solution = await generateSolution(problem, reasoningLevel as ReasoningLevel, includeAlternatives)

    return NextResponse.json(solution)
  } catch (error) {
    console.error("Error generating solution:", error)
    return NextResponse.json({ error: "Failed to generate solution" }, { status: 500 })
  }
}
