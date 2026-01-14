// Problems API endpoints
import { type NextRequest, NextResponse } from "next/server"
import { structureProblem } from "@/lib/math-engine"
import { searchProblems } from "@/lib/aggregator"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const filters = {
    query: searchParams.get("query") || undefined,
    topic: searchParams.get("topic") || undefined,
    difficulty: searchParams.get("difficulty") || undefined,
    source: searchParams.get("source") || undefined,
    limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 50,
    offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0,
  }

  const result = searchProblems(filters)

  return NextResponse.json({
    query: filters.query,
    filters: {
      topic: filters.topic,
      difficulty: filters.difficulty,
      source: filters.source,
    },
    total: result.total,
    problems: result.problems,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rawContent, source, difficulty, topic } = body

    if (!rawContent || !source) {
      return NextResponse.json({ error: "rawContent and source are required" }, { status: 400 })
    }

    const problem = await structureProblem(rawContent, source)

    // Override with provided values if given
    if (difficulty) problem.difficulty = difficulty
    if (topic) problem.topic = topic

    return NextResponse.json(problem)
  } catch (error) {
    console.error("Error creating problem:", error)
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 })
  }
}
