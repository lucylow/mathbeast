// Competition problem solving API
import { type NextRequest, NextResponse } from "next/server"
import { solveCompetitionProblem } from "@/lib/gpt-oss-engine"
import type { CompetitionProblem, ReasoningLevel } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problem, reasoningLevel = "high" } = body as {
      problem: CompetitionProblem
      reasoningLevel?: ReasoningLevel
    }

    if (!problem || !problem.content) {
      return NextResponse.json({ error: "Problem content is required" }, { status: 400 })
    }

    // Ensure problem has required fields
    const fullProblem: CompetitionProblem = {
      id: problem.id || `comp_${Date.now()}`,
      competition: problem.competition || "other",
      year: problem.year || new Date().getFullYear(),
      problemNumber: problem.problemNumber || 1,
      content: problem.content,
      solution: problem.solution || "",
      difficulty: problem.difficulty || 5,
      topics: problem.topics || [],
      techniques: problem.techniques || [],
    }

    const response = await solveCompetitionProblem(fullProblem, reasoningLevel)

    return NextResponse.json({
      problem: fullProblem,
      solution: response,
      metadata: {
        modelUsed: "GPT-OSS-120B",
        reasoningLevel,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Competition solving error:", error)
    return NextResponse.json({ error: "Failed to solve competition problem" }, { status: 500 })
  }
}
