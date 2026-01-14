// Hint generation API endpoint
import { NextResponse } from "next/server"
import { generateHint, getHintsForProblem } from "@/lib/math-engine"
import type { HintRequest } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HintRequest

    if (!body.problemId) {
      return NextResponse.json({ error: "problemId is required" }, { status: 400 })
    }

    if (!body.hintLevel || ![1, 2, 3].includes(body.hintLevel)) {
      return NextResponse.json({ error: "hintLevel must be 1, 2, or 3" }, { status: 400 })
    }

    const hint = await generateHint({
      problemId: body.problemId,
      currentStep: body.currentStep || 1,
      userAnswer: body.userAnswer,
      hintLevel: body.hintLevel as 1 | 2 | 3,
    })

    return NextResponse.json({ hint })
  } catch (error) {
    console.error("Hint generation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate hint" },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const problemId = searchParams.get("problemId")

  if (!problemId) {
    return NextResponse.json({ error: "problemId is required" }, { status: 400 })
  }

  const hints = getHintsForProblem(problemId)
  return NextResponse.json({ hints })
}
